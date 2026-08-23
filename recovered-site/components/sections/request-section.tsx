"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, MessageCircleMore, ShieldCheck } from "lucide-react";
import { diagnosticPlatforms, diagnosticSituations } from "@/utils/content";

const TELEGRAM_URL = "https://t.me/razblokirovka_instagram777";
const PHONE_HREF = process.env.NEXT_PUBLIC_RECOVERY_PHONE_HREF;
const PHONE_LABEL = process.env.NEXT_PUBLIC_RECOVERY_PHONE_LABEL;
type Diagnosis = { platform: string; situation: string };

export function RequestSection() {
  const [platform, setPlatform] = useState("");
  const [situation, setSituation] = useState("");

  useEffect(() => {
    function applyDiagnosis(value: Diagnosis) {
      setPlatform(value.platform || "");
      setSituation(value.situation || "");
    }
    const saved = sessionStorage.getItem("recoveryDiagnosis");
    if (saved) {
      try { applyDiagnosis(JSON.parse(saved) as Diagnosis); } catch { /* ignore invalid local data */ }
    }
    const onDiagnosis = (event: Event) => applyDiagnosis((event as CustomEvent<Diagnosis>).detail);
    window.addEventListener("recovery:diagnosis", onDiagnosis);
    return () => window.removeEventListener("recovery:diagnosis", onDiagnosis);
  }, []);

  return (
    <section id="request" aria-labelledby="request-title" className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-[#071426] to-[#102443] text-white shadow-[0_30px_100px_rgba(3,7,18,0.25)]">
          <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
            <div className="border-b border-white/10 p-8 sm:p-12 lg:border-b-0 lg:border-r lg:p-14">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8BC4FF]">Следующий шаг</p>
              <h2 id="request-title" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Сформируйте понятное обращение за минуту.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">Выбранные ответы остаются в браузере. Сайт не передаёт их во внешние сервисы автоматически.</p>
              <ul className="mt-8 space-y-4 text-sm leading-6 text-slate-200">
                <li className="flex gap-3"><CheckCircle2 size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-300" /> Не указывайте пароль и коды подтверждения.</li>
                <li className="flex gap-3"><CheckCircle2 size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-300" /> Достаточно площадки и краткого описания.</li>
                <li className="flex gap-3"><ShieldCheck size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-[#8BC4FF]" /> Чувствительные действия выполняете только вы.</li>
              </ul>
              {PHONE_HREF && PHONE_LABEL ? (
                <a href={PHONE_HREF} className="mt-8 inline-flex items-center gap-2 rounded text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                  Или позвоните: {PHONE_LABEL} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ) : null}
            </div>

            <form className="p-8 sm:p-12 lg:p-14" onSubmit={(event) => event.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-slate-200">
                  <span className="mb-2 block">Площадка</span>
                  <select
                    value={platform}
                    onChange={(event) => setPlatform(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none transition focus-visible:border-[#8BC4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]"
                  >
                    <option value="">Выберите площадку</option>
                    {diagnosticPlatforms.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label className="block text-sm text-slate-200">
                  <span className="mb-2 block">Что произошло</span>
                  <select
                    value={situation}
                    onChange={(event) => setSituation(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none transition focus-visible:border-[#8BC4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]"
                  >
                    <option value="">Выберите ситуацию</option>
                    {diagnosticSituations.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
              </div>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2F80ED] px-6 py-3.5 font-semibold text-white shadow-[0_12px_40px_rgba(47,128,237,0.3)] transition hover:bg-[#1f6ed0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <MessageCircleMore size={19} aria-hidden="true" /> Открыть Telegram
              </a>
              <p className="mt-4 text-center text-xs leading-5 text-slate-300">Сайт не передаёт выбранные ответы в Telegram. Сообщение вы пишете и отправляете самостоятельно.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
