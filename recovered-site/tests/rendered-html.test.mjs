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
