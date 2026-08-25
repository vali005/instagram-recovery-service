import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

const SITE_URL = "https://recovery-center.ppnt2qf6z9.chatgpt.site";

const canonicalRoutes = [
  "/",
  "/account-blocked",
  "/account-hacked",
  "/no-phone-email-access",
  "/login-code-not-arriving",
  "/account-protection-guide",
  "/knowledge-base",
  "/privacy-policy",
];

const allowedExternalHosts = new Set(["t.me", "instagram.com", "schema.org"]);

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `seo-${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function fetchPage(path, accept = "text/html") {
  const response = await worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept } }),
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
  return response;
}

async function renderPage(path) {
  const response = await fetchPage(path);
  assert.equal(response.status, 200, `${path} should respond with 200`);
  return response.text();
}

function metaContent(html, attribute, key) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tag = html.match(
    new RegExp(`<meta[^>]*${attribute}=["']${escapedKey}["'][^>]*>`, "i"),
  );
  if (!tag) return null;
  return tag[0].match(/content=["']([^"']*)["']/i)?.[1] ?? null;
}

const pages = new Map();

for (const route of canonicalRoutes) {
  pages.set(route, await renderPage(route));
}

test("every page renders unique title and description", () => {
  const titles = [];
  const descriptions = [];

  for (const route of canonicalRoutes) {
    const html = pages.get(route);

    const title = html.match(/<title>([^<]*)<\/title>/i)?.[1];
    assert.ok(title, `${route} must render a <title>`);
    assert.ok(
      title.trim().length >= 20 && title.length <= 80,
      `${route} title should stay between 20 and 80 characters, got ${title.length}`,
    );
    titles.push(title.trim());

    const description = metaContent(html, "name", "description");
    assert.ok(description, `${route} must render a meta description`);
    assert.ok(
      description.trim().length >= 50 && description.length <= 200,
      `${route} description should stay between 50 and 200 characters, got ${description.length}`,
    );
    descriptions.push(description.trim());
  }

  assert.equal(new Set(titles).size, titles.length, "titles must be unique across pages");
  assert.equal(new Set(descriptions).size, descriptions.length, "descriptions must be unique across pages");
});

test("every page declares exactly one self-canonical link without foreign domains", () => {
  for (const route of canonicalRoutes) {
    const html = pages.get(route);
    const canonicals = [...html.matchAll(/<link[^>]*rel=["']canonical["'][^>]*>/gi)];
    assert.equal(canonicals.length, 1, `${route} must render exactly one canonical link`);

    const href = canonicals[0][0].match(/href=["']([^"']*)["']/i)?.[1];
    assert.equal(
      href,
      route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`,
      `${route} canonical must point at its own absolute address`,
    );

    for (const match of html.matchAll(/href=["'](https?:\/\/[^"']+)["']/gi)) {
      const host = new URL(match[1]).hostname;
      assert.ok(
        allowedExternalHosts.has(host) || match[1].startsWith(SITE_URL),
        `${route} must not reference unexpected domain ${host}`,
      );
    }
  }
});

test("every page exposes Open Graph and Twitter metadata with a real social image", () => {
  for (const route of canonicalRoutes) {
    const html = pages.get(route);

    for (const property of ["og:title", "og:description", "og:url", "og:image", "og:site_name", "og:locale"]) {
      assert.ok(
        metaContent(html, "property", property),
        `${route} must render ${property}`,
      );
    }

    assert.match(
      metaContent(html, "property", "og:image"),
      /\/og-image\.svg$/,
      `${route} og:image should point to the bundled social image`,
    );
    assert.equal(
      metaContent(html, "property", "og:url"),
      route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`,
      `${route} og:url should match its canonical address`,
    );

    assert.match(
      metaContent(html, "name", "twitter:card") ?? "",
      /^summary_large_image$/,
      `${route} twitter:card should request a large image card`,
    );
    assert.ok(metaContent(html, "name", "twitter:title"), `${route} must render twitter:title`);
    assert.ok(metaContent(html, "name", "twitter:description"), `${route} must render twitter:description`);
    assert.match(
      metaContent(html, "name", "twitter:image") ?? "",
      /\/og-image\.svg$/,
      `${route} twitter:image should point to the bundled social image`,
    );

    const favicon = [...html.matchAll(/<link[^>]*rel=["'][^"']*icon[^"']*["'][^>]*>/gi)];
    assert.ok(favicon.length > 0, `${route} must link a favicon`);
    assert.match(favicon[0][0], /favicon\.svg/, `${route} favicon should be the bundled svg asset`);
  }

  const clientAssetsDir = fileURLToPath(new URL("../dist/client", import.meta.url));
  assert.ok(existsSync(`${clientAssetsDir}/favicon.svg`), "favicon.svg must ship in dist/client");
  assert.ok(existsSync(`${clientAssetsDir}/og-image.svg`), "og-image.svg must ship in dist/client");
});

function collectJsonLd(html) {
  const blobs = [...html.matchAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )];
  const parsed = blobs.map((blob) => JSON.parse(blob[1]));
  return parsed.flatMap((item) =>
    Array.isArray(item["@graph"]) ? item["@graph"] : [item],
  );
}

test("schema.org data is valid JSON-LD with expected types per page", () => {
  const expectedTypes = {
    "/": ["ProfessionalService", "FAQPage"],
    "/account-blocked": ["WebPage"],
    "/account-hacked": ["WebPage"],
    "/no-phone-email-access": ["WebPage"],
    "/login-code-not-arriving": ["WebPage"],
    "/account-protection-guide": ["WebPage", "HowTo"],
    "/knowledge-base": ["CollectionPage", "FAQPage"],
    "/privacy-policy": ["WebPage"],
  };

  for (const route of canonicalRoutes) {
    const graph = collectJsonLd(pages.get(route));
    const types = graph.map((entry) => entry["@type"]);

    for (const expectedType of expectedTypes[route]) {
      assert.ok(types.includes(expectedType), `${route} must include ${expectedType} schema`);
    }

    for (const entry of graph) {
      assert.ok(entry["@type"], `${route} schema entries must declare @type`);
      assert.equal(entry["@context"] ?? "https://schema.org", "https://schema.org");
    }
  }
});

test("schema.org urls resolve inside the site or to approved external channels", () => {
  for (const route of canonicalRoutes) {
    const graph = collectJsonLd(pages.get(route));
    const serialized = JSON.stringify(graph);

    for (const match of serialized.matchAll(/https?:\/\/[^"\\]+/g)) {
      const url = new URL(match[0]);
      const isVocabulary = url.hostname === "schema.org" || url.hostname.endsWith("schema.org");
      const isOwnSite = match[0].startsWith(SITE_URL);
      const isApprovedChannel = allowedExternalHosts.has(url.hostname);
      assert.ok(
        isVocabulary || isOwnSite || isApprovedChannel,
        `${route} schema must not reference unexpected url ${match[0]}`,
      );
    }
  }
});

test("ProfessionalService schema mirrors visible content without private contact data", () => {
  const graph = collectJsonLd(pages.get("/"));
  const service = graph.find((entry) => entry["@type"] === "ProfessionalService");

  assert.equal(service.name, "Recovery");
  assert.equal(service.url, SITE_URL);
  assert.ok(!("telephone" in service), "no telephone may ship without an explicit public env variable");
  assert.ok(!("email" in service), "no email may ship without an explicit public env variable");

  for (const sameAsUrl of service.sameAs) {
    const host = new URL(sameAsUrl).hostname;
    assert.ok(allowedExternalHosts.has(host), `sameAs must use approved channels, got ${host}`);
    assert.ok(
      pages.get("/").includes(sameAsUrl.replace(/^https?:\/\//, "")),
      `sameAs channel ${sameAsUrl} must also be visible in the page footer`,
    );
  }
});

test("FAQPage schema questions match the questions visible on the page", () => {
  for (const route of ["/", "/knowledge-base"]) {
    const html = pages.get(route);
    const graph = collectJsonLd(html);
    const faq = graph.find((entry) => entry["@type"] === "FAQPage");
    assert.ok(faq, `${route} must include FAQPage schema`);

    const plainHtml = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+>/g, " ");

    for (const question of faq.mainEntity) {
      assert.equal(question["@type"], "Question");
      assert.ok(question.acceptedAnswer?.text, `question "${question.name}" needs an answer`);
      assert.ok(
        plainHtml.includes(question.name),
        `${route} FAQ schema question must be visible on the page: ${question.name}`,
      );
    }
  }
});

test("HowTo steps on the protection guide match the rendered steps", () => {
  const html = pages.get("/account-protection-guide");
  const graph = collectJsonLd(html);
  const howTo = graph.find((entry) => entry["@type"] === "HowTo");
  assert.ok(howTo, "protection guide must include HowTo schema");

  const plainHtml = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ");
  assert.ok(Array.isArray(howTo.step) && howTo.step.length >= 4, "HowTo must describe several steps");
  for (const step of howTo.step) {
    assert.ok(step.name, "each HowTo step needs a name");
    assert.ok(
      plainHtml.includes(step.name),
      `HowTo step "${step.name}" must be visible in the article`,
    );
  }
});

test("sitemap lists every canonical page exactly once and nothing else", async () => {
  const response = await fetchPage("/sitemap.xml", "application/xml");
  assert.equal(response.status, 200);
  const xml = await response.text();

  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const expected = canonicalRoutes.map((route) =>
    route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`,
  ).sort();

  assert.deepEqual([...locs].sort(), expected, "sitemap urls must match the canonical routes exactly");
  assert.equal(new Set(locs).size, locs.length, "sitemap must not repeat any url");

  assert.match(xml, /<urlset[^>]*xmlns=/i, "sitemap must be a valid urlset document");
});

test("robots.txt allows the site, excludes the internal image endpoint and links the sitemap", async () => {
  const response = await fetchPage("/robots.txt", "text/plain");
  assert.equal(response.status, 200);
  const body = await response.text();

  assert.match(body, /User-agent:\s*\*/i);
  assert.match(body, /Allow:\s*\//i);
  assert.doesNotMatch(body, /Disallow:\s*\/\s*$/m, "the whole site must stay crawlable");
  assert.match(body, /Disallow:\s*\/_vinext\//i, "internal vinext endpoints must be excluded");
  assert.match(
    body,
    new RegExp(`Sitemap:\\s*${SITE_URL.replace(/\./g, "\\.")}/sitemap\\.xml`, "i"),
    "robots must reference the sitemap",
  );
});

test("service and unknown routes are not indexable documents", async () => {
  const unknown = await fetchPage("/this-page-does-not-exist");
  assert.equal(unknown.status, 404, "unknown routes must return 404");

  const imageEndpoint = await fetchPage("/_vinext/image");
  assert.notEqual(imageEndpoint.status, 200, "internal image endpoint must not serve pages");
});

test("all internal links across all pages resolve to existing routes and anchors", () => {
  function idsOf(html) {
    return new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((m) => m[1]));
  }

  const knownRoutes = new Set(canonicalRoutes);
  const idsByRoute = new Map(canonicalRoutes.map((route) => [route, idsOf(pages.get(route))]));

  let checkedLinks = 0;

  for (const route of canonicalRoutes) {
    const html = pages.get(route);
    for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)) {
      const href = match[1];
      if (/^(https?:)?\/\//i.test(href) || /^(mailto|tel):/i.test(href)) continue;

      checkedLinks += 1;
      const [rawPath, hash] = href.split("#");
      const path = rawPath === "" ? route : rawPath;
      const normalized = path === "/" || !knownRoutes.has(path)
        ? path.replace(/\/$/, "") || "/"
        : path;

      assert.ok(
        knownRoutes.has(normalized),
        `${route} links to unknown internal path "${path}"`,
      );

      if (hash) {
        const targetIds = normalized === route ? idsByRoute.get(route) : idsByRoute.get(normalized);
        assert.ok(targetIds, `anchor target page ${normalized} must exist`);
        assert.ok(
          targetIds.has(hash),
          `${route} links to missing anchor "#${hash}" on ${normalized}`,
        );
      }
    }
  }

  assert.ok(checkedLinks >= 20, `expected to verify a meaningful number of links, got ${checkedLinks}`);
});

test("breadcrumbs, navigation and CTA anchors point to sections that exist", () => {
  const homeIds = idsFrom(pages.get("/"));
  function idsFrom(html) {
    return new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((m) => m[1]));
  }

  for (const anchor of ["diagnostic", "services", "process", "boundaries", "faq", "request", "top", "main-content"]) {
    assert.ok(homeIds.has(anchor), `home page must keep the #${anchor} target`);
  }

  for (const route of canonicalRoutes.slice(1)) {
    const html = pages.get(route);
    assert.match(html, /aria-label=["']Хлебные крошки["']/i, `${route} must label breadcrumbs`);
    assert.match(html, /href=["']\/#diagnostic["']/, `${route} must keep the CTA to the diagnostic flow`);
  }
});

test("external links open safely and never leak referrer data", () => {
  for (const route of canonicalRoutes) {
    const html = pages.get(route);
    for (const anchor of html.matchAll(/<a\b[^>]*href=["']https?:\/\/[^"']+["'][^>]*>/gi)) {
      const tag = anchor[0];
      assert.match(tag, /target=["']_blank["']/i, `external link on ${route} must open in a new tab: ${tag}`);
      assert.match(tag, /rel=["'][^"']*noreferrer[^"']*["']/i, `external link on ${route} must include noreferrer: ${tag}`);
    }
  }
});

test("public source contains no secrets or collected sensitive fields", () => {
  const sourceDirs = ["app", "components", "utils", "worker", "db"].map((dir) =>
    fileURLToPath(new URL(`../${dir}`, import.meta.url)),
  );

  const secretPattern =
    /(api[_-]?key|secret[_-]?key|access[_-]?token|auth[_-]?token|bearer\s|password\s*=\s*["'][^"']+|BEGIN [A-Z ]*PRIVATE KEY)/i;

  let scannedFiles = 0;
  for (const dir of sourceDirs) {
    for (const entry of readdirSync(dir, { recursive: true })) {
      if (!/\.(ts|tsx|mjs)$/.test(String(entry))) continue;
      const filePath = `${dir}/${entry}`;
      const source = readFileSync(filePath, "utf8");
      scannedFiles += 1;
      assert.doesNotMatch(source, secretPattern, `${filePath} must not contain secrets`);
    }
  }
  assert.ok(scannedFiles >= 10, `expected to scan project sources, got ${scannedFiles}`);

  const envExample = readFileSync(fileURLToPath(new URL("../.env.example", import.meta.url)), "utf8");
  for (const line of envExample.split("\n")) {
    if (!line.trim()) continue;
    assert.match(line, /^[A-Z0-9_]+=$/, `.env.example must keep variables empty: ${line}`);
  }
});
