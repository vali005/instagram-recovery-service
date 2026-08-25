import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  diagnosticPlatforms,
  diagnosticSituations,
  getSituationGuidance,
  situationGuidance,
} from "../utils/catalog.mjs";
import {
  REQUEST_STATUS,
  composeRequestMessage,
  createRequestState,
  reduceRequestState,
  validateRequestDraft,
} from "../utils/request-state.mjs";

test("every diagnostic situation has internal knowledge-base guidance", () => {
  for (const situation of diagnosticSituations) {
    const guidance = getSituationGuidance(situation);
    assert.ok(guidance.advice.length > 20, `guidance advice for "${situation}" should be useful`);
    assert.match(guidance.href, /^\//, `guidance link for "${situation}" must stay on the site`);
    assert.ok(guidance.label.length > 5, `guidance label for "${situation}" should be descriptive`);
  }

  assert.equal(
    Object.keys(situationGuidance).length,
    diagnosticSituations.length,
    "guidance map should cover exactly the diagnostic situations",
  );

  const fallback = getSituationGuidance("Неизвестная ситуация");
  assert.equal(fallback.href, "/knowledge-base");
});

test("request state machine requires explicit submit and blocks accidental resubmission", () => {
  const initial = createRequestState();
  assert.equal(initial.status, REQUEST_STATUS.idle);
  assert.equal(initial.attempts, 0);

  const filling = reduceRequestState(initial, { type: "field-change" });
  assert.equal(filling.status, REQUEST_STATUS.filling);

  const checking = reduceRequestState(filling, { type: "submit" });
  assert.equal(checking.status, REQUEST_STATUS.checking);

  const success = reduceRequestState(checking, { type: "prepared" });
  assert.equal(success.status, REQUEST_STATUS.success);
  assert.equal(success.attempts, 1);

  // Repeated submits and field changes after success are ignored.
  assert.equal(reduceRequestState(success, { type: "submit" }), success);
  assert.equal(reduceRequestState(success, { type: "field-change" }), success);
  assert.equal(reduceRequestState(success, { type: "prepared" }), success);

  // Validation failure records an attempt and an explanatory error.
  const failed = reduceRequestState(checking, {
    type: "validation-failed",
    message: "Подтвердите согласие на обработку введённых данных.",
  });
  assert.equal(failed.status, REQUEST_STATUS.error);
  assert.equal(failed.attempts, 1);
  assert.match(failed.error, /соглас/);

  // Editing after failure returns to filling without losing the attempt count.
  const retry = reduceRequestState(failed, { type: "field-change" });
  assert.equal(retry.status, REQUEST_STATUS.filling);
  assert.equal(retry.attempts, 1);

  // Explicit reset is the only way back to the clean state.
  assert.deepEqual(reduceRequestState(success, { type: "reset" }), createRequestState());
});

test("validation demands platform, situation and explicit confirmation", () => {
  const empty = validateRequestDraft({});
  assert.ok(empty.some((message) => /площадку/i.test(message)));
  assert.ok(empty.some((message) => /ситуацию/i.test(message)));
  assert.ok(empty.some((message) => /согласие/i.test(message)));

  const complete = validateRequestDraft({
    platform: "Instagram",
    situation: "Аккаунт взломали",
    description: "",
    consent: true,
  });
  assert.deepEqual(complete, []);
});

test("composed message includes only minimal fields", () => {
  const message = composeRequestMessage({
    platform: "VK",
    situation: "Не приходит код входа",
    description: "Код не приходит вторые сутки.",
    contact: "@user",
  });
  assert.match(message, /Площадка: VK/);
  assert.match(message, /Ситуация: Не приходит код входа/);
  assert.match(message, /Описание: Код не приходит вторые сутки\./);
  assert.match(message, /Дополнительный контакт: @user/);
  assert.doesNotMatch(message, /парол|password|код подтверждения|cvv/i);

  const withoutContact = composeRequestMessage({
    platform: "Telegram",
    situation: "Аккаунт взломали",
    description: "",
  });
  assert.doesNotMatch(withoutContact, /контакт|связь/i);
});

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
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
  return response;
}

test("diagnostic wizard renders progress, hidden future steps and disabled navigation initially", async () => {
  const response = await renderPage("/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /aria-current=["']step["']/, "current step should be announced");
  assert.match(html, /Шаг 1 из 3/, "visible progress counter should render");

  const backDisabled = html.match(/<button[^>]*data-testid=["']diagnostic-back["'][^>]*>/i);
  assert.ok(backDisabled, "back button should exist");
  assert.ok(backDisabled[0].includes("disabled"), "back button markup must carry disabled attribute");

  const nextDisabled = html.match(/<button[^>]*data-testid=["']diagnostic-next["'][^>]*>/i);
  assert.ok(nextDisabled, "next button should exist");
  assert.match(nextDisabled[0], /\bdisabled\b/, "next button must be disabled before any answer");

  assert.equal(
    [...html.matchAll(/name=["']diagnostic-platform["']/g)].length,
    diagnosticPlatforms.length,
    "all platform options should be in the DOM",
  );
  assert.equal(
    [...html.matchAll(/name=["']diagnostic-situation["']/g)].length,
    diagnosticSituations.length,
    "all situation options should be in the DOM",
  );
  assert.match(html, /<legend[^>]*>\s*2\. Что произошло/, "situation step should have a labelled legend");
  assert.match(html, /3\. Проверьте ваши ответы/, "summary step heading should exist");

  assert.match(html, /data-testid=["']summary-platform["']/, "summary platform slot should exist");
  assert.match(html, /data-testid=["']summary-situation["']/, "summary situation slot should exist");
  assert.match(html, /aria-live=["']polite["']/, "live region for step announcements should exist");
});

test("wizard summary exposes a recommendation with a knowledge-base link", async () => {
  const response = await renderPage("/");
  const html = await response.text();

  assert.match(html, /Рекомендация для вашей ситуации/, "recommendation block should render");
  const guidanceLink = html.match(/<a[^>]*href=["'](\/[a-z-]*)["'][^>]*>[^<]*База знаний Recovery/i);
  assert.ok(guidanceLink, "fallback guidance should link internally to the knowledge base");
  assert.equal(guidanceLink[1], "/knowledge-base");
});

test("request form follows diagnostics before long-form service content", async () => {
  const response = await renderPage("/");
  const html = await response.text();

  const diagnosticPosition = html.indexOf('id="diagnostic"');
  const requestPosition = html.indexOf('id="request"');
  const servicesPosition = html.indexOf('id="services"');

  assert.ok(diagnosticPosition >= 0, "diagnostic section should render");
  assert.ok(requestPosition > diagnosticPosition, "request should follow the diagnostic result");
  assert.ok(servicesPosition > requestPosition, "long-form service content should not delay the request");
});

test("request form requires consent, disables submission and warns about secrets", async () => {
  const response = await renderPage("/");
  const html = await response.text();

  const consentInput = html.match(/<input[^>]*type=["']checkbox["'][^>]*>/i);
  assert.ok(consentInput, "consent checkbox should render");
  assert.doesNotMatch(consentInput[0], /\bchecked\b/, "consent must be unchecked initially");

  const submit = html.match(/<button[^>]*data-testid=["']request-submit["'][^>]*>/i);
  assert.ok(submit, "submit button should render");
  assert.match(submit[0], /\bdisabled\b/, "submit button must be disabled without consent");

  assert.match(html, /href=["']\/privacy-policy["']/, "consent should reference the privacy policy");

  const warning = html.match(/<div[^>]*data-testid=["']secrets-warning["'][^>]*>([\s\S]*?)<\/div>/i);
  assert.ok(warning, "secret-data warning should render");
  assert.match(warning[1], /пароли/i);
  assert.match(warning[1], /SMS-коды/i);
  assert.match(warning[1], /резервные коды/i);
  assert.match(warning[1], /платёжные реквизиты/i);

  assert.ok(
    /aria-live=["']polite["']/.test(html),
    "form should expose a live region for state announcements",
  );
});

test("request form collects no secret fields or placeholders", async () => {
  const response = await renderPage("/");
  const html = await response.text();

  const formHtml = html.match(/<form[\s\S]*?<\/form>/i);
  assert.ok(formHtml, "home page should contain a request form");

  const secretPattern =
    /(pass\w*|парол\w*|sms|смс|backup|резервн\w*|pin|cvv|card|карт\w*|passport|паспорт|token|токен|\bcode\b|код)/i;

  const controls = [
    ...formHtml[0].matchAll(/<(?:input|textarea|select)[^>]*>/gi),
  ].map((match) => match[0]);
  assert.ok(controls.length >= 4, "expected the minimal set of form controls");

  for (const control of controls) {
    const name = control.match(/\bname=["']([^"']+)["']/i)?.[1] ?? "";
    const placeholder = control.match(/\bplaceholder=["']([^"']+)["']/i)?.[1] ?? "";
    assert.doesNotMatch(name, secretPattern, `form control name must not collect secrets: ${name}`);
    assert.doesNotMatch(placeholder, secretPattern, `placeholder must not ask for secrets: ${placeholder}`);
    if (/type=["']text["']/.test(control)) {
      assert.match(
        control,
        /auto[cC]omplete=["']off["']/,
        "free-text contact field should disable autocomplete of stored personal data",
      );
    }
  }

  const labels = [...formHtml[0].matchAll(/<label[^>]*>([\s\S]*?)<\/label>/gi)].map((m) =>
    m[1]
      .replace(/<option[\s\S]*?<\/option>/gi, " ")
      .replace(/<(input|textarea|select)[^>]*>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  );
  for (const label of labels) {
    if (/политик/i.test(label)) continue; // consent label references privacy policy
    assert.doesNotMatch(label, secretPattern, `label must not request secrets: ${label.trim()}`);
  }
});

test("forms never post externally and app bundles contain no auto-send APIs", async () => {
  const response = await renderPage("/");
  const html = await response.text();

  for (const form of html.matchAll(/<form[^>]*>/gi)) {
    assert.doesNotMatch(form[0], /\baction=/i, "forms must rely on local handling only");
    assert.doesNotMatch(form[0], /\bmethod=["']post["']/i, "no POST submissions should be configured");
  }
  assert.doesNotMatch(html, /navigator\.sendBeacon/, "no beacon API usage should ship");

  const clientAssetsDir = fileURLToPath(new URL("../dist/client/assets", import.meta.url));
  const files = readdirSync(clientAssetsDir).filter((file) => file.endsWith(".js"));

  const appChunkPattern = /^(diagnostic-section|request-section|catalog)-/;
  const forbiddenPatterns = [/fetch\(/, /XMLHttpRequest/, /\.sendBeacon\(/, /\.submit\(/];

  let scannedAppChunks = 0;
  for (const file of files) {
    const source = readFileSync(`${clientAssetsDir}/${file}`, "utf8");
    assert.doesNotMatch(source, /\.sendBeacon\(/, `${file} must not use sendBeacon`);
    if (appChunkPattern.test(file)) {
      scannedAppChunks += 1;
      for (const pattern of forbiddenPatterns) {
        assert.doesNotMatch(source, pattern, `${file} must not contain network/send primitive: ${pattern}`);
      }
    }
  }
  assert.ok(scannedAppChunks >= 3, "expected to scan the wizard, form and catalog chunks");
});

test("privacy policy page renders accessible canonical content", async () => {
  const response = await renderPage("/privacy-policy");
  assert.equal(response.status, 200);
  const html = await response.text();

  const title = html.match(/<title>([^<]+)<\/title>/i);
  assert.ok(title, "privacy page should have a title");
  assert.match(title[1], /Политика конфиденциальности/);

  const canonical = html.match(/<link[^>]*rel=["']canonical["'][^>]*>/i);
  assert.ok(canonical, "privacy page should have a canonical link");
  assert.match(canonical[0], /href=["'][^"']*\/privacy-policy["']/i);

  assert.match(html, /<h1[\s>]/, "privacy page should have an H1");
  assert.match(
    html,
    /itemtype=["']https:\/\/schema\.org\/BreadcrumbList["']/i,
    "privacy page should include breadcrumbs markup",
  );
  assert.match(html, /Какие данные вы вводите/);
  assert.match(html, /Зачем нужны эти данные/);
  assert.match(html, /Куда и когда передаются данные/);
  assert.match(html, /Согласие и его отзыв/);
  assert.match(
    html,
    /не настроен защищённый серверный канал/,
    "page must honestly describe the missing server channel",
  );
  assert.match(
    html,
    /автоматическая внешняя отправка данных не предусмотрена/,
    "page must state that no automatic external sending exists",
  );
  assert.match(
    html,
    /не утверждаем, что введённые данные хранятся на наших серверах/,
    "page must avoid unverified storage claims explicitly",
  );
  assert.match(html, /пароли, SMS-коды и коды\s+подтверждения/, "page must warn against sharing secrets");
});

test("privacy policy is linked internally and listed in the sitemap", async () => {
  const homeResponse = await renderPage("/");
  assert.equal(homeResponse.status, 200);
  const homeHtml = await homeResponse.text();
  assert.match(homeHtml, /href=["']\/privacy-policy["']/, "footer/form should link the privacy policy");

  const sitemapResponse = await worker.fetch(
    new Request("http://localhost/sitemap.xml", { headers: { accept: "application/xml" } }),
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
  assert.equal(sitemapResponse.status, 200);
  const sitemapXml = await sitemapResponse.text();
  assert.match(sitemapXml, /\/privacy-policy<\/loc>/, "sitemap should list the privacy policy");
});
