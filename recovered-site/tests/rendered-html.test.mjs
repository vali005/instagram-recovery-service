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
  assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.match(response.headers.get("permissions-policy") ?? "", /camera=\(\)/);
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

async function renderHomePage(workerInstance) {
  const response = await workerInstance.fetch(
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
  return response.text();
}

function getWorker() {
  const url = new URL("../dist/server/index.js", import.meta.url);
  url.searchParams.set("test", `stage4-${process.pid}-${Date.now()}`);
  return import(url.href);
}

test("home page explains the work process with explicit user and service roles", async () => {
  const { default: worker } = await getWorker();
  const html = await renderHomePage(worker);

  const processSection = html.match(/<section[^>]*id=["']process["'][^>]*>([\s\S]*?)<\/section>/i);
  assert.ok(processSection, "process section should render on the home page");
  const processHtml = processSection[1];

  assert.match(processSection[0], /Как проходит работа/, "process heading label should be visible");

  const stageTitles = [
    "Первичная диагностика",
    "Выбор официального пути восстановления",
    "Действия выполняете вы",
    "Проверка результата и рекомендации по защите",
  ];
  for (const title of stageTitles) {
    assert.match(
      processHtml,
      new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      `process stage "${title}" should be described`,
    );
  }

  assert.equal(
    [...processHtml.matchAll(/Делаете вы:/g)].length,
    stageTitles.length,
    "every stage should state what the account owner does",
  );
  assert.equal(
    [...processHtml.matchAll(/Помогаем мы:/g)].length,
    stageTitles.length,
    "every stage should state what help the service provides",
  );
  assert.match(
    processHtml,
    /все чувствительные действия[^<]*выполняет владелец|остаются только за владельцем/i,
    "the section should stress that sensitive actions stay with the owner",
  );

  const timing = processHtml.match(
    /<p[^>]*data-testid=["']process-timing["'][^>]*>([\s\S]*?)<\/p>/i,
  );
  assert.ok(timing, "timing note should render inside the process section");
  assert.match(timing[1], /ориентир/i, "timings must be presented as orientation only");
  assert.match(timing[1], /от одного–двух дней до нескольких недель/, "timing should use an honest range");
  assert.doesNotMatch(timing[1], /\b\d+\s*(?:час|часа|часов)\b(?![^<]*недель)/, "no exact-hour promises");
});

test("home page states what we can and cannot help with", async () => {
  const { default: worker } = await getWorker();
  const html = await renderHomePage(worker);

  assert.match(html, /<h2[^>]*>\s*Чем можем и чем не можем помочь\./, "boundaries heading should render");

  const canList = html.match(/data-testid=["']can-help-list["'][^>]*>([\s\S]*?)<\/ul>/i);
  const cannotList = html.match(/data-testid=["']cannot-help-list["'][^>]*>([\s\S]*?)<\/ul>/i);
  assert.ok(canList, "can-help list should render");
  assert.ok(cannotList, "cannot-help list should render");

  assert.match(canList[1], /официальн/i, "can-list must mention official procedures");
  assert.match(canList[1], /Разобрать ситуацию/);
  assert.match(canList[1], /Закрепить результат/);

  assert.match(cannotList[1], /Не гарантируем результат/);
  assert.match(cannotList[1], /решения площадки/, "cannot-list must explain who decides the outcome");
  assert.match(cannotList[1], /не заменяем её поддержку/i);
  assert.match(cannotList[1], /не влияем на её решения/i);
  assert.match(cannotList[1], /обхода ограничений|взлома/, "cannot-list must reject bypasses and hacking");
  assert.match(cannotList[1], /покупки доступа/);
  assert.match(cannotList[1], /выдачи себя за владельца/);

  assert.match(cannotList[1], /Не запрашиваем секретные данные/);
  assert.match(cannotList[1], /Пароли/);
  assert.match(cannotList[1], /SMS-коды/);
  assert.match(cannotList[1], /резервные коды/);
  assert.match(cannotList[1], /документов/);
  assert.match(cannotList[1], /платёжные данные/);

  assert.match(html, /href=["']#boundaries["']/, "navigation should expose the boundaries anchor");
});

const contentRoutes = [
  "/",
  "/account-blocked",
  "/account-hacked",
  "/no-phone-email-access",
  "/login-code-not-arriving",
  "/account-protection-guide",
  "/knowledge-base",
];

test("content pages avoid risky promises and fabricated social proof", async () => {
  const { default: worker } = await getWorker();

  const riskyPatterns = [
    [/100\s*%\s*гаранти|сто\s*процент\w*\s*гаранти/i, "percentage guarantee"],
    [/оплата\s+(?:только\s+)?за\s+результат|платит[еь]\s+за\s+результат/i, "pay-for-result promise"],
    [/верн\w+\s+(?:аккаунт|доступ)\s+за\s+\d+\s*(?:мин|час|дня?|недел)/i, "fixed-time recovery promise"],
    [/тысяч[иа]\s+(?:довольных\s+)?(?:клиентов|пользователей)|сотни\s+(?:довольных\s+)?(?:клиентов|пользователей)/i, "inflated client counts"],
    [/отзывы\s+наших\s+клиентов/i, "fabricated testimonial block"],
    [/сертификат\w*\s+(?:качества|соответствия)/i, "made-up certificates"],
    [/официальн\w+\s+партнёр\w*\s+(?:instagram|meta|telegram|vk|tiktok)/i, "fake platform partnership"],
    [/успешность\s+\d+\s*%|восстанавливаем\s+\d+\s*%/i, "success-rate statistics"],
  ];

  for (const route of contentRoutes) {
    const response = await worker.fetch(
      new Request(`http://localhost${route}`, {
        headers: { accept: "text/html" },
      }),
      {
        ASSETS: {
          fetch: async () => new Response("Not found", { status: 404 }),
        },
        waitUntil() {},
        passThroughOnException() {},
      },
    );
    assert.equal(response.status, 200, `${route} should respond with 200`);
    const html = await response.text();

    for (const [pattern, label] of riskyPatterns) {
      assert.doesNotMatch(
        html,
        pattern,
        `${route} must not contain ${label}`,
      );
    }

    assert.match(
      html,
      /зависит от решения (?:самой )?(?:площадки|платформы)|Гарантий полного[\s\S]{0,60}нет|не обещаем гарантированного результата|точный срок знает только сама площадка/i,
      `${route} must keep an expectation-setting disclaimer`,
    );

    if (route !== "/") {
      assert.match(
        html,
        /парол/i,
        `${route} should remind readers not to share passwords`,
      );
    }
  }
});

test("home page internal links resolve to known routes or in-page anchors", async () => {
  const { default: worker } = await getWorker();
  const html = await renderHomePage(worker);

  const knownRoutes = new Set([
    "",
    "/",
    "/account-blocked",
    "/account-hacked",
    "/no-phone-email-access",
    "/login-code-not-arriving",
    "/account-protection-guide",
    "/knowledge-base",
    "/privacy-policy",
  ]);

  const internalHrefs = [...html.matchAll(/<a\b[^>]*href=["'](\/[^"']*)["']/gi)].map((m) => m[1]);
  assert.ok(internalHrefs.length > 0, "home page should contain internal links");

  for (const rawHref of internalHrefs) {
    const path = rawHref.split("#")[0].replace(/\/$/, "") || "/";
    const normalized = path === "/" ? "/" : path;
    assert.ok(
      knownRoutes.has(normalized),
      `internal link "${rawHref}" must point to an existing route`,
    );
  }
});
