"use client";

import { useId, useState } from "react";
import { ArrowRight, CheckCircle2, SearchCheck } from "lucide-react";
import { diagnosticPlatforms, diagnosticSituations } from "@/utils/content";

type Diagnosis = {
  platform: string;
  situation: string;
};

export function DiagnosticSection() {
  const [diagnosis, setDiagnosis] = useState<Diagnosis>({ platform: "", situation: "" });
  const { platform, situation } = diagnosis;
  const ready = Boolean(platform && situation);
  const statusId = useId();

  function continueToRequest() {
    sessionStorage.setItem("recoveryDiagnosis", JSON.stringify(diagnosis));
    window.dispatchEvent(new CustomEvent("recovery:diagnosis", { detail: diagnosis }));
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="diagnostic" aria-labelledby="diagnostic-title" className="relative z-10 -mt-8 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200/80 bg-white p-6 text-slate-950 shadow-[0_30px_100px_rgba(3,7,18,0.16)] sm:p-9 lg:p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#2F80ED]">
              <SearchCheck size={17} aria-hidden="true" /> Диагностика
            </p>
            <h2 id="diagnostic-title" className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              С чего начать именно в вашей ситуации?
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">Выберите площадку и проблему. Это не заявка: данные никуда не отправляются.</p>
          </div>
          <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} aria-hidden="true" /> Без паролей и кодов</span>
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <fieldset className="min-w-0">
            <legend className="mb-3 text-sm font-semibold text-slate-700">1. Где возникла проблема?</legend>
            <div className="flex flex-wrap gap-2">
              {diagnosticPlatforms.map((item) => (
                <label key={item} className="cursor-pointer">
                  <input
                    type="radio"
                    name="diagnostic-platform"
                    value={item}
                    checked={platform === item}
                    onChange={() => setDiagnosis((prev) => ({ ...prev, platform: item }))}
                    className="peer sr-only"
                  />
                  <span className={`inline-block rounded-full border px-4 py-2.5 text-sm font-medium transition peer-checked:border-[#2F80ED] peer-checked:bg-[#2F80ED] peer-checked:text-white peer-checked:shadow-md peer-checked:shadow-blue-200 hover:border-blue-300 hover:bg-blue-50 ${platform === item ? "border-[#2F80ED] bg-[#2F80ED] text-white shadow-md shadow-blue-200" : "border-slate-200 bg-slate-50 text-slate-700"} peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[#2F80ED] peer-focus-visible:ring-offset-2`}>
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="min-w-0">
            <legend className="mb-3 text-sm font-semibold text-slate-700">2. Что произошло?</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {diagnosticSituations.map((item) => (
                <label key={item} className="cursor-pointer">
                  <input
                    type="radio"
                    name="diagnostic-situation"
                    value={item}
                    checked={situation === item}
                    onChange={() => setDiagnosis((prev) => ({ ...prev, situation: item }))}
                    className="peer sr-only"
                  />
                  <span className={`flex h-full items-center rounded-xl border px-4 py-3 text-left text-sm font-medium transition peer-checked:border-[#2F80ED] peer-checked:bg-blue-50 peer-checked:text-blue-900 hover:border-blue-300 ${situation === item ? "border-[#2F80ED] bg-blue-50 text-blue-900" : "border-slate-200 bg-slate-50 text-slate-700"} peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[#2F80ED] peer-focus-visible:ring-offset-2`}>
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div aria-live="polite" id={statusId} className="sr-only">
          {ready ? `Выбрано: ${platform} — ${situation}` : "Выберите площадку и ситуацию"}
        </div>

        <div className={`mt-7 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between ${ready ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-slate-50"}`}>
          <p className="text-sm leading-6 text-slate-700">
            {ready ? (
              <>
                <strong className="text-slate-950">Первый шаг:</strong> зафиксируйте доступные контакты и устройства, не меняйте данные хаотично и опишите ситуацию специалисту.
              </>
            ) : (
              "Выберите площадку и проблему — появится безопасный следующий шаг."
            )}
          </p>
          <button
            type="button"
            disabled={!ready}
            onClick={continueToRequest}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#2F80ED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f6ed0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Продолжить <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
