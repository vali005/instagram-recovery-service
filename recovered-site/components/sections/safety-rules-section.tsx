import Link from "next/link";
import { ArrowRight, Ban, KeyRound, ShieldCheck } from "lucide-react";

const rules = [
  {
    title: "Никому не сообщайте пароль",
    text: "Владелец вводит пароль только самостоятельно на официальной странице площадки.",
    icon: KeyRound,
  },
  {
    title: "Не передавайте коды",
    text: "SMS-коды, коды двухфакторной защиты и резервные коды нельзя сообщать даже специалисту.",
    icon: Ban,
  },
  {
    title: "Проверяйте адрес страницы",
    text: "Переходите к формам входа и поддержки только по официальным доменам платформ.",
    icon: ShieldCheck,
  },
];

export function SafetyRulesSection() {
  return (
    <section aria-labelledby="safety-rules-title" className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#1D63C9]">Важно знать</p>
          <h2 id="safety-rules-title" className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
            Три правила, которые защищают вас от повторного взлома.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {rules.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2F80ED]/10 text-[#1D63C9]">
                  <Icon size={21} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-slate-700">{item.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 rounded-[1.25rem] border border-slate-200 bg-white/80 p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="max-w-xl text-base leading-7 text-slate-700">
            Хотите закрепить результат? В пошаговом руководстве собраны настройки защиты, которые
            снижают риск повторной потери доступа.
          </p>
          <Link
            href="/account-protection-guide"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1D63C9] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#164F9F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] focus-visible:ring-offset-2"
          >
            Руководство по защите <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
