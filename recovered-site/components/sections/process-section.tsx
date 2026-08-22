import { steps } from "@/utils/content";
import { ArrowDown, ArrowRight } from "lucide-react";

export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" className="border-y border-slate-200 bg-slate-950 px-6 py-20 text-white sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8BC4FF]">Как проходит работа</p>
          <h2 id="process-title" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            Понятный путь без скрытых действий.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">Вы сохраняете контроль над аккаунтом и самостоятельно подтверждаете все чувствительные действия.</p>
        </div>

        <ol className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          {steps.map((step, index) => (
            <li
              key={step}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-center shadow-lg backdrop-blur-xl lg:flex-1"
            >
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#8BC4FF]">Шаг {index + 1}</p>
              <p className="mt-3 text-xl font-semibold text-white">{step}</p>
              {index < steps.length - 1 ? (
                <div aria-hidden="true" className="mt-6 flex justify-center text-slate-400">
                  <ArrowDown size={20} className="lg:hidden" />
                  <ArrowRight size={20} className="hidden lg:block" />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
