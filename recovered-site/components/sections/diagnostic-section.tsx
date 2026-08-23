"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardCheck, SearchCheck } from "lucide-react";
import {
  diagnosticPlatforms,
  diagnosticSituations,
  getSituationGuidance,
} from "@/utils/catalog.mjs";

type Diagnosis = {
  platform: string;
  situation: string;
};

const STEP_TITLES = ["Площадка", "Что произошло", "Проверка ответов"];
const TOTAL_STEPS = STEP_TITLES.length;

export function DiagnosticSection() {
  const [diagnosis, setDiagnosis] = useState<Diagnosis>({ platform: "", situation: "" });
  const [step, setStep] = useState(1);
  const { platform, situation } = diagnosis;
  const ready = Boolean(platform && situation);
  const statusId = useId();
  const summaryHeadingId = useId();
  const stepHeadingRef = useRef<HTMLParagraphElement | null>(null);
  const isFirstRender = useRef(true);

  const canContinue = step === 1 ? Boolean(platform) : step === 2 ? Boolean(situation) : ready;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    stepHeadingRef.current?.focus();
  }, [step]);

  function goToStep(nextStep: number) {
    setStep(Math.min(Math.max(nextStep, 1), TOTAL_STEPS));
  }

  function continueToRequest() {
    sessionStorage.setItem("recoveryDiagnosis", JSON.stringify(diagnosis));
    window.dispatchEvent(new CustomEvent("recovery:diagnosis", { detail: diagnosis }));
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
  }

  const guidance = getSituationGuidance(situation);

  return (
    <section id="diagnostic" aria-labelledby="diagnostic-title" className="relative z-10 -mt-8 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200/80 bg-white p-6 text-slate-950 shadow-[0_30px_100px_rgba(3,7,18,0.16)] sm:p-9 lg:p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#2F80ED]">
              <SearchCheck size={17} aria-hidden="true" /> Диагностика
            </p>
            <h2 id="diagnostic-title" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              С чего начать именно в вашей ситуации?
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Три коротких шага. Ответы остаются в вашем браузере и никуда не отправляются.
            </p>
          </div>
          <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} aria-hidden="true" /> Без паролей и кодов</span>
          </p>
        </div>

        <nav aria-label="Шаги диагностики" className="mt-8">
          <ol className="grid gap-2 sm:grid-cols-3">
            {STEP_TITLES.map((title, index) => {
              const value = index + 1;
              const isCurrent = value === step;
              const isDone = value < step;
              return (
                <li
                  key={title}
                  aria-current={isCurrent ? "step" : undefined}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition ${
                    isCurrent
                      ? "border-[#2F80ED] bg-blue-50 font-semibold text-blue-900"
                      : isDone
                        ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                        : "border-slate-200 bg-slate-50 text-slate-500"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                      isCurrent
                        ? "bg-[#2F80ED] text-white"
                        : isDone
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {isDone ? "✓" : value}
                  </span>
                  <span>
                    <span className="sr-only">{isCurrent ? "Текущий шаг: " : isDone ? "Шаг пройден: " : "Шаг: "}</span>
                    {title}
                  </span>
                </li>
              );
            })}
          </ol>
        </nav>

        <p className="mt-4 text-sm font-medium text-slate-700">
          Шаг {step} из {TOTAL_STEPS}: {STEP_TITLES[step - 1]}
        </p>

        <div
          ref={stepHeadingRef}
          tabIndex={-1}
          className="mt-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED]"
        >
          <fieldset hidden={step !== 1} className="min-w-0 border-0 p-0">
            <legend className="mb-3 text-base font-semibold text-slate-900">1. Где возникла проблема?</legend>
            <div className="flex flex-wrap gap-2">
              {diagnosticPlatforms.map((item) => (
                <label key={item} className="cursor-pointer">
                  <input
                    type="radio"
                    name="diagnostic-platform"
                    value={item}
                    checked={platform === item}
                    onChange={() => {
                      setDiagnosis((prev) => ({ ...prev, platform: item }));
                    }}
                    className="peer sr-only"
                  />
                  <span className={`inline-block rounded-full border px-4 py-2.5 text-sm font-medium transition peer-checked:border-[#2F80ED] peer-checked:bg-[#2F80ED] peer-checked:text-white peer-checked:shadow-md peer-checked:shadow-blue-200 hover:border-blue-300 hover:bg-blue-50 ${platform === item ? "border-[#2F80ED] bg-[#2F80ED] text-white shadow-md shadow-blue-200" : "border-slate-200 bg-slate-50 text-slate-700"} peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[#2F80ED] peer-focus-visible:ring-offset-2`}>
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset hidden={step !== 2} className="min-w-0 border-0 p-0">
            <legend className="mb-3 text-base font-semibold text-slate-900">2. Что произошло?</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {diagnosticSituations.map((item) => (
                <label key={item} className="cursor-pointer">
                  <input
                    type="radio"
                    name="diagnostic-situation"
                    value={item}
                    checked={situation === item}
                    onChange={() => {
                      setDiagnosis((prev) => ({ ...prev, situation: item }));
                    }}
                    className="peer sr-only"
                  />
                  <span className={`flex h-full items-center rounded-xl border px-4 py-3 text-left text-sm font-medium transition peer-checked:border-[#2F80ED] peer-checked:bg-blue-50 peer-checked:text-blue-900 hover:border-blue-300 ${situation === item ? "border-[#2F80ED] bg-blue-50 text-blue-900" : "border-slate-200 bg-slate-50 text-slate-700"} peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[#2F80ED] peer-focus-visible:ring-offset-2`}>
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div hidden={step !== 3}>
            <h3 id={summaryHeadingId} className="text-base font-semibold text-slate-900">
              3. Проверьте ваши ответы
            </h3>
            <dl className="mt-3 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-medium text-slate-500">Площадка</dt>
                <dd data-testid="summary-platform" className="mt-1 font-semibold text-slate-900">{platform || "—"}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Ситуация</dt>
                <dd data-testid="summary-situation" className="mt-1 font-semibold text-slate-900">{situation || "—"}</dd>
              </div>
            </dl>
            <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-sm leading-6 text-slate-700">
              <p className="inline-flex items-center gap-2 font-semibold text-blue-900">
                <ClipboardCheck size={16} aria-hidden="true" /> Рекомендация для вашей ситуации
              </p>
              <p className="mt-2">{guidance.advice}</p>
              <Link
                href={guidance.href}
                className="mt-3 inline-flex items-center gap-2 rounded font-semibold text-[#2F80ED] hover:text-[#1f6ed0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] focus-visible:ring-offset-2"
              >
                {guidance.label} <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Ответы хранятся только в этом браузере. На следующем шаге вы сами решите, что отправить.
            </p>
          </div>
        </div>

        <div aria-live="polite" id={statusId} className="sr-only">
          {ready
            ? `Выбрано: ${platform || "площадка не выбрана"} — ${situation || "ситуация не выбрана"}. Шаг ${step} из ${TOTAL_STEPS}`
            : `Шаг ${step} из ${TOTAL_STEPS}. Выберите площадку и ситуацию`}
        </div>

        <div className={`mt-7 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between ${canContinue && step === TOTAL_STEPS ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-slate-50"}`}>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => goToStep(step - 1)}
              disabled={step === 1}
              data-testid="diagnostic-back"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeft size={17} aria-hidden="true" /> Назад
            </button>
            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={() => goToStep(step + 1)}
                disabled={!canContinue}
                data-testid="diagnostic-next"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2F80ED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f6ed0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Далее <ArrowRight size={17} aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={continueToRequest}
                disabled={!ready}
                data-testid="diagnostic-submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2F80ED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f6ed0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Перейти к заявке <ArrowRight size={17} aria-hidden="true" />
              </button>
            )}
          </div>
          <p className="text-sm leading-6 text-slate-700">
            {step < TOTAL_STEPS ? (
              <>
                Можно вернуться назад и изменить любой ответ до перехода к заявке.
              </>
            ) : ready ? (
              <>
                <strong className="text-slate-950">Первый шаг:</strong> зафиксируйте доступные контакты и устройства, не меняйте данные хаотично и опишите ситуацию специалисту.
              </>
            ) : (
              "Завершите предыдущие шаги, чтобы перейти к заявке."
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
