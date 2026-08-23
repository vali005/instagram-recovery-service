import { workSteps, processTimingNote } from "@/utils/content";
import { ArrowDown, ArrowRight, ClipboardCheck, UserRound } from "lucide-react";

export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" className="border-y border-slate-200 bg-slate-950 px-6 py-20 text-white sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8BC4FF]">Как проходит работа</p>
          <h2 id="process-title" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            Понятный путь из четырёх шагов — с ясными ролями.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Вы сохраняете контроль над аккаунтом: все чувствительные действия выполняет владелец,
            а мы помогаем разобраться, подготовиться и не наделать ошибок.
          </p>
        </div>

        <ol className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:justify-between">
          {workSteps.map((step, index) => (
            <li
              key={step.title}
              data-testid="process-step"
              className="flex flex-col rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-xl lg:flex-1"
            >
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#8BC4FF]">Шаг {index + 1}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>

              <div className="mt-auto space-y-3 pt-5">
                <p className="flex gap-3 rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-4 text-sm leading-6 text-slate-200">
                  <UserRound size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-300" />
                  <span>
                    <strong className="font-semibold text-emerald-200">Делаете вы:</strong> {step.userAction}
                  </span>
                </p>
                <p className="flex gap-3 rounded-xl border border-[#2F80ED]/30 bg-[#2F80ED]/10 p-4 text-sm leading-6 text-slate-200">
                  <ClipboardCheck size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#8BC4FF]" />
                  <span>
                    <strong className="font-semibold text-[#8BC4FF]">Помогаем мы:</strong> {step.serviceHelp}
                  </span>
                </p>
              </div>

              {index < workSteps.length - 1 ? (
                <div aria-hidden="true" className="mt-6 flex justify-center text-slate-400">
                  <ArrowDown size={20} className="lg:hidden" />
                  <ArrowRight size={20} className="hidden lg:block" />
                </div>
              ) : null}
            </li>
          ))}
        </ol>

        <p
          data-testid="process-timing"
          className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-300"
        >
          {processTimingNote}
        </p>
      </div>
    </section>
  );
}
