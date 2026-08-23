import { benefits } from "@/utils/content";

const principles = [
  {
    title: "Без паролей",
    description: "Пароль и коды остаются только у вас.",
  },
  {
    title: "Один специалист",
    description: "Общаетесь напрямую, без посредников и колл-центров.",
  },
  {
    title: "По правилам площадок",
    description: "Только официальные процедуры поддержки и восстановления.",
  },
];

export function BenefitsSection() {
  return (
    <section aria-labelledby="benefits-title" className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#1D63C9]">Подход</p>
            <h2 id="benefits-title" className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Спокойная работа без давления и сомнительных обещаний.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Вы понимаете, что происходит, какие данные нужны и где заканчивается зона ответственности специалиста.</p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-3">
            {principles.map((principle) => (
              <li key={principle.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#1D63C9]">{principle.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{principle.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl transition hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2F80ED]/10 text-[#1D63C9]">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{benefit.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
