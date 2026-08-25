import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `a11y-${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function renderPage(path) {
  const response = await worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
  assert.equal(response.status, 200, `${path} should respond with 200`);
  return response.text();
}

const routes = [
  "/",
  "/account-blocked",
  "/account-hacked",
  "/no-phone-email-access",
  "/login-code-not-arriving",
  "/account-protection-guide",
  "/knowledge-base",
  "/privacy-policy",
];

test("every page exposes landmarks, a working skip link and a focusable main", async () => {
  for (const route of routes) {
    const html = await renderPage(route);

    assert.match(html, /<header[\s>]/i, `${route} should have a header landmark`);
    assert.match(html, /<nav[^>]*aria-label=["'][^"']+["']/i, `${route} should label its navigation`);
    assert.match(html, /<footer[\s>]/i, `${route} should have a footer landmark`);

    const main = html.match(/<main\b[^>]*>/i);
    assert.ok(main, `${route} should have a main landmark`);
    assert.match(main[0], /id=["']main-content["']/i, `${route} main should be the skip-link target`);
    assert.match(main[0], /tabindex=["']-1["']/i, `${route} main should receive focus from the skip link`);

    const skipLink = html.match(/<a\b[^>]*href=["']#main-content["'][^>]*>/i);
    assert.ok(skipLink, `${route} should offer a skip link to the main content`);
  }
});

test("every page renders exactly one h1 with visible text", async () => {
  for (const route of routes) {
    const html = await renderPage(route);
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
    assert.equal(headings.length, 1, `${route} should have exactly one h1`);
    const text = headings[0][1].replace(/<[^>]+>/g, "").trim();
    assert.ok(text.length > 3, `${route} h1 should contain readable text`);
  }
});

test("viewport meta keeps mobile layout usable and zoomable", async () => {
  for (const route of ["/", "/knowledge-base"]) {
    const html = await renderPage(route);
    const viewport = html.match(/<meta[^>]*name=["']viewport["'][^>]*>/i);
    assert.ok(viewport, `${route} should render a viewport meta tag`);
    assert.match(viewport[0], /width=["']?device-width/i, `${route} viewport should follow device width`);
    assert.doesNotMatch(viewport[0], /user-scalable=["']?no/i, `${route} must not disable pinch zoom`);
    assert.doesNotMatch(viewport[0], /maximum-scale=["']?[01](?![\d.])/i, `${route} must not clamp zoom`);
  }
});

test("request form controls are programmatically labelled", async () => {
  const html = await renderPage("/");
  const form = html.match(/<form[\s\S]*?<\/form>/i);
  assert.ok(form, "home page should render the request form");

  const htmlForTargets = new Set(
    [...form[0].matchAll(/<label\b[^>]*for=["']([^"']+)["']/gi)].map((m) => m[1]),
  );

  const outsideControls = [
    ...form[0].replace(/<label[\s\S]*?<\/label>/gi, "").matchAll(
      /<(?:input|textarea|select)\b[^>]*>/gi,
    ),
  ].map((m) => m[0]);
  assert.ok(
    outsideControls.every((control) => /\bid=["']/.test(control)),
    "controls outside label wrappers must carry an id",
  );
  for (const control of outsideControls) {
    const id = control.match(/\bid=["']([^"']+)["']/i)[1];
    assert.ok(
      htmlForTargets.has(id),
      `control "${id}" must be referenced by a label's for attribute`,
    );
  }

  const wrappedControls = [
    ...form[0].matchAll(/<label\b[^>]*>[\s\S]*?<\/label>/gi),
  ].filter((m) => /<(?:input|textarea|select)\b/.test(m[0]));
  assert.equal(wrappedControls.length, 4, "platform/situation selects, textarea and contact input should sit inside labels");
});

test("no positive tab indexes ship and images always carry alt text", async () => {
  for (const route of routes) {
    const html = await renderPage(route);
    assert.doesNotMatch(
      html,
      /tabindex=["'][1-9]/i,
      `${route} must not reorder keyboard focus with positive tab indexes`,
    );
    for (const img of html.matchAll(/<img\b[^>]*>/gi)) {
      assert.match(img[0], /\balt=/i, `${route} image must declare an alt attribute`);
    }
  }
});

test("external links always opt out of referrer leakage", async () => {
  for (const route of routes) {
    const html = await renderPage(route);
    for (const anchor of html.matchAll(/<a\b[^>]*target=["']_blank["'][^>]*>/gi)) {
      assert.match(
        anchor[0],
        /rel=["'][^"']*noreferrer/i,
        `${route} external link must include rel=noreferrer: ${anchor[0]}`,
      );
    }
  }
});

test("FAQ relies on native details/summary so it works from the keyboard", async () => {
  const html = await renderPage("/");
  const faqSection = html.match(/<section[^>]*id=["']faq["'][^>]*>([\s\S]*?)<\/section>/i);
  assert.ok(faqSection, "home page should render the FAQ section");

  const detailsBlocks = [...faqSection[1].matchAll(/<details\b[^>]*>[\s\S]*?<\/details>/gi)];
  assert.ok(detailsBlocks.length > 0, "FAQ items should use native details elements");
  for (const block of detailsBlocks) {
    assert.match(block[0], /<summary[\s\S]*?<\/summary>/i, "each FAQ item needs a summary toggle");
    const summaryText = block[0]
      .match(/<summary[^>]*>([\s\S]*?)<\/summary>/i)[1]
      .replace(/<[^>]+>/g, "")
      .trim();
    assert.ok(summaryText.length > 3, "summary must expose an accessible name");
  }
});

test("mobile navigation to key sections stays available next to the CTA", async () => {
  for (const route of ["/", "/account-blocked"]) {
    const html = await renderPage(route);
    const mobileNav = html.match(
      /<nav[^>]*aria-label=["']Навигация по разделам["'][^>]*>([\s\S]*?)<\/nav>/i,
    );
    assert.ok(mobileNav, `${route} should render the section navigation`);
    const links = [...mobileNav[1].matchAll(/<a\b[^>]*href=["'][^"']+["']/gi)];
    assert.ok(links.length >= 3, `${route} section navigation should expose several targets`);
    const compactMenu = html.match(/<details[^>]*data-testid=["']mobile-menu["'][^>]*>/i);
    assert.ok(compactMenu, `${route} should keep mobile navigation compact by default`);
    assert.doesNotMatch(compactMenu[0], /\bopen\b/i, `${route} mobile menu should start collapsed`);
  }

  const homeHtml = await renderPage("/");
  assert.match(homeHtml, /href=["']#diagnostic["']/, "sections nav should reach diagnostics");
  assert.match(homeHtml, /href=["']#request["']/, "a persistent path to the request form must exist");
});

test("shipped stylesheet keeps focus, reduced-motion and overflow guards", () => {
  const assetsDir = fileURLToPath(new URL("../dist/client/assets", import.meta.url));
  const cssFiles = readdirSync(assetsDir).filter((file) => file.endsWith(".css"));
  assert.ok(cssFiles.length > 0, "expected a built stylesheet");

  const css = cssFiles.map((file) => readFileSync(`${assetsDir}/${file}`, "utf8")).join("\n");

  assert.match(css, /:focus-visible/, "focus indicator styles must ship");
  assert.match(css, /overflow-x:\s*clip/, "horizontal overflow guard must ship");

  const reducedMotion = css.match(
    /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*?\}\s*\}/,
  );
  assert.ok(reducedMotion, "reduced motion media query must ship");
  assert.match(reducedMotion[0], /scroll-behavior:\s*auto/, "smooth scrolling must switch off");
  assert.match(reducedMotion[0], /animation-duration:[^;}]*1ms/, "animations must collapse");
});

test("wizard scrolling honours prefers-reduced-motion", () => {
  const source = readFileSync(
    fileURLToPath(new URL("../components/sections/diagnostic-section.tsx", import.meta.url)),
    "utf8",
  );
  assert.match(source, /prefers-reduced-motion/);
  assert.match(
    source,
    /behavior:\s*prefersReducedMotion\(\)\s*\?\s*"auto"\s*:\s*"smooth"/,
    "scrollIntoView must pick instant behaviour under reduced motion",
  );
});

function relativeLuminance(hex) {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((offset) => {
    const raw = Number.parseInt(value.slice(offset, offset + 2), 16) / 255;
    return raw <= 0.03928 ? raw / 12.92 : ((raw + 0.055) / 1.055) ** 2.4;
  });
  return (
    0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
  );
}

function contrastRatio(foreground, background) {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const [lighter, darker] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

test("documented colour pairs keep WCAG AA contrast", () => {
  const pairs = [
    ["white text on solid brand buttons", "#ffffff", "#1d63c9"],
    ["brand links on white surfaces", "#1d63c9", "#ffffff"],
    ["brand links on blue-tinted panels", "#1d63c9", "#eff6ff"],
    ["secondary text on light cards", "#475569", "#f8fafc"],
    ["input placeholders on dark fields", "#94a3b8", "#030a1b"],
    ["accented labels on deep navy", "#8bc4ff", "#050b18"],
    ["footer secondary text on slate-950", "#94a3b8", "#020617"],
  ];
  for (const [label, foreground, background] of pairs) {
    const ratio = contrastRatio(foreground, background);
    assert.ok(
      ratio >= 4.5,
      `${label} (${foreground} on ${background}) must reach 4.5:1, got ${ratio.toFixed(2)}:1`,
    );
  }
});
