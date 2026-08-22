"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, SearchCheck } from "lucide-react";

const platforms = ["Instagram", "Telegram", "VK", "Одноклассники", "Facebook", "TikTok", "Другая"];
const situations = [
  "Аккаунт заблокирован",
  "Аккаунт взломали",
  "Нет доступа к почте или номеру",
  "Не приходит код входа",
  "Нужно удалить старый профиль",
  "Нужна защита аккаунта",
];

export function DiagnosticSection() {
  const [platform, setPlatform] = useState("");
  const [situation, setSituation] = useState("");
  const ready = Boolean(platform && situation);

  function continueToRequest() {
    sessionStorage.setItem("recoveryDiagnosis", JSON.stringify({ platform, situation }));
    window.dispatchEvent(new CustomEvent("recovery:diagnosis", { detail: { platform, situation } }));
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="diagnostic" className="relative z-10 -mt-8 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200/80 bg-white p-6 text-slate-950 shadow-[0_30px_100px_rgba(3,7,18,0.16)] sm:p-9 lg:p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#2F80ED]"><SearchCheck size={17} /> Диагностика</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">С чего начать именно в вашей ситуации?</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">Выберите площадку и проблему. Это не заявка: данные никуда не отправляются.</p>
          </div>
          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} /> Без паролей и кодов</span>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-slate-700">1. Где возникла проблема?</legend>
            <div className="flex flex-wrap gap-2">
              {platforms.map((item) => (
                <button key={item} type="button" aria-pressed={platform === item} onClick={() => setPlatform(item)} className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${platform === item ? "border-[#2F80ED] bg-[#2F80ED] text-white shadow-md shadow-blue-200" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50"}`}>
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-slate-700">2. Что произошло?</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {situations.map((item) => (
                <button key={item} type="button" aria-pressed={situation === item} onClick={() => setSituation(item)} className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${situation === item ? "border-[#2F80ED] bg-blue-50 text-blue-900" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300"}`}>
                  {item}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className={`mt-7 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between ${ready ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-slate-50"}`}>
          <p className="text-sm leading-6 text-slate-700">
            {ready ? <><strong className="text-slate-950">Первый шаг:</strong> зафиксируйте доступные контакты и устройства, не меняйте данные хаотично и опишите ситуацию специалисту.</> : "Выберите два варианта выше — появится безопасный следующий шаг."}
          </p>
          <button type="button" disabled={!ready} onClick={continueToRequest} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#2F80ED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f6ed0] disabled:cursor-not-allowed disabled:bg-slate-300">
            Продолжить <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
