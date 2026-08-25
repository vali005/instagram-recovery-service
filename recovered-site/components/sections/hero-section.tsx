import { ArrowRight, Check, KeyRound, MessageCircleMore, ShieldCheck } from "lucide-react";

const heroPoints = [
  "Без паролей и кодов",
  "Официальные процедуры площадок",
  "Честная оценка перспектив",
];

export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(47,128,237,0.26),_transparent_33%),linear-gradient(135deg,_#050b18_0%,_#071426_45%,_#0d1d35_100%)] px-6 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-[#2F80ED]/25 blur-3xl" />
        <div className="absolute bottom-[-8%] right-[-5%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div className="animate-rise max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2F80ED]/30 bg-white/10 px-4 py-2 text-sm text-slate-200 backdrop-blur-xl">
            <ShieldCheck size={16} className="text-[#8BC4FF]" aria-hidden="true" />
            Помощь с доступом к аккаунтам
          </p>
          <h1 id="hero-title" className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl sm:leading-[1.15] lg:text-6xl">
            Восстановление доступа — спокойно, безопасно и по понятному плану
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-8">
            Если аккаунт заблокировали, взломали или вы потеряли доступ, сначала разберём ситуацию. Вы получите честную оценку перспектив и безопасный следующий шаг — без передачи паролей и SMS-кодов.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
            <a href="#diagnostic" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1D63C9] px-6 py-3.5 font-medium text-white transition hover:bg-[#164F9F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
              Начать безопасный разбор <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="https://t.me/razblokirovka_instagram777" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3.5 font-medium text-slate-100 backdrop-blur-xl transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
              <MessageCircleMore size={18} aria-hidden="true" /> Сразу написать в Telegram
            </a>
          </div>
          <ul className="mt-9 grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
            {heroPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Check size={16} className="shrink-0 text-emerald-300" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-rise-delayed relative">
          <div aria-hidden="true" className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#2F80ED]/30 to-transparent blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/10 via-slate-900/80 to-slate-950 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Безопасная диагностика</p>
                  <p className="mt-1 text-xl font-semibold text-white">План восстановления</p>
                </div>
                <p className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">Без риска</p>
              </div>
              <ol className="mt-8 space-y-3">
                {["Определить тип проблемы", "Проверить доступные способы", "Составить последовательность действий"].map((step, index) => (
                  <li key={step} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2F80ED]/15 text-sm font-semibold text-[#8BC4FF]">{index + 1}</span>
                    <span className="text-sm text-slate-200">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 flex gap-3 rounded-2xl border border-[#2F80ED]/30 bg-[#2F80ED]/10 p-4 text-sm leading-6 text-slate-200">
                <KeyRound size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[#8BC4FF]" />
                <span>Пароль остаётся только у вас. Для первичной оценки достаточно описать, что произошло.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
