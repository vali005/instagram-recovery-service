import assert from "node:assert/strict";
import test from "node:test";

test("renders the production Recovery page metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
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

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<html[^>]*\blang=["']ru["']/i);
  assert.match(
    html,
    /<title>Recovery — восстановление доступа к аккаунтам<\/title>/i,
  );
  assert.match(html, /<meta[^>]*\bname=["']description["'][^>]*>/i);
  assert.doesNotMatch(html, /\bname=["']codex-preview["']/i);
});

test("renders structured data for services and FAQ", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
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

  assert.equal(response.status, 200);
  const html = await response.text();

  const jsonLdBlobs = [...html.matchAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )];
  assert.ok(jsonLdBlobs.length > 0, "expected at least one JSON-LD block");

  const parsed = jsonLdBlobs.flatMap((blob) => {
    try {
      return [JSON.parse(blob[1])];
    } catch {
      return [];
    }
  });

  const graph = parsed.flatMap((item) =>
    Array.isArray(item["@graph"]) ? item["@graph"] : [item],
  );
  const types = graph.map((entry) => entry["@type"]);

  assert.ok(types.includes("ProfessionalService"), "expected ProfessionalService schema");
  assert.ok(types.includes("FAQPage"), "expected FAQPage schema");
});

const knowledgeRoutes = [
  { path: "/account-blocked", title: "Аккаунт заблокирован" },
  { path: "/account-hacked", title: "Аккаунт взломан" },
  { path: "/no-phone-email-access", title: "Нет доступа к телефону или почте" },
  { path: "/login-code-not-arriving", title: "Не приходит код входа" },
  { path: "/account-protection-guide", title: "Как защитить аккаунт" },
  { path: "/knowledge-base", title: "База знаний" },
];

test("renders SEO knowledge pages with canonical, H1 and structured data", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const titles = [];

  for (const route of knowledgeRoutes) {
    const response = await worker.fetch(
      new Request(`http://localhost${route.path}`, {
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

    assert.equal(response.status, 200, `${route.path} should respond with 200`);
    const html = await response.text();

    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    assert.ok(titleMatch, `${route.path} should render a title tag`);
    assert.ok(
      titleMatch[1].includes(route.title),
      `${route.path} title should mention "${route.title}", got: ${titleMatch[1]}`,
    );
    titles.push(titleMatch[1]);

    const canonicalMatch = html.match(/<link[^>]*\brel=["']canonical["'][^>]*>/i);
    assert.ok(canonicalMatch, `${route.path} should render a canonical link`);
    assert.match(
      canonicalMatch[0],
      new RegExp(`href=["'][^"']*${route.path.replace(/\//g, "\\/")}["']`, "i"),
      `${route.path} canonical should point to its own address`,
    );

    assert.match(html, /<h1[\s>]/i, `${route.path} should render an H1`);

    const breadcrumbs = html.match(/itemtype=["']https:\/\/schema\.org\/BreadcrumbList["']/i);
    assert.ok(breadcrumbs, `${route.path} should include BreadcrumbList markup`);
  }

  assert.equal(new Set(titles).size, titles.length, "page titles should be unique");
});

test("renders FAQPage structured data on the knowledge base page", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/knowledge-base", {
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

  assert.equal(response.status, 200);
  const html = await response.text();

  const jsonLdBlobs = [...html.matchAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )];
  const parsed = jsonLdBlobs.flatMap((blob) => {
    try {
      return [JSON.parse(blob[1])];
    } catch {
      return [];
    }
  });

  const graph = parsed.flatMap((item) =>
    Array.isArray(item["@graph"]) ? item["@graph"] : [item],
  );
  const types = graph.map((entry) => entry["@type"]);

  assert.ok(types.includes("FAQPage"), "knowledge base should include FAQPage schema");

  const howToResponse = await worker.fetch(
    new Request("http://localhost/account-protection-guide", {
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

  assert.equal(howToResponse.status, 200);
  const howToHtml = await howToResponse.text();
  const howToBlobs = [...howToHtml.matchAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )];
  const howToParsed = howToBlobs.flatMap((blob) => {
    try {
      return [JSON.parse(blob[1])];
    } catch {
      return [];
    }
  });
  const howToGraph = howToParsed.flatMap((item) =>
    Array.isArray(item["@graph"]) ? item["@graph"] : [item],
  );

  assert.ok(
    howToGraph.some((entry) => entry["@type"] === "HowTo"),
    "protection guide should include HowTo schema",
  );
});
