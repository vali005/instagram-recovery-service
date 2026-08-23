import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { canHelpItems, cannotHelpItems } from "@/utils/content";

export function BoundariesSection() {
  return (
    <section id="boundaries" aria-labelledby="boundaries-title" className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#1D63C9]">Границы помощи</p>
          <h2 id="boundaries-title" className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
            Чем можем и чем не можем помочь.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Помощь носит информационно-консультационный характер и строится только на законных
            официальных процедурах площадок. Она не заменяет поддержку самой платформы.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-emerald-200 bg-emerald-50/70 p-7 sm:p-9" data-testid="can-help-list">
            <h3 className="flex items-center gap-3 text-xl font-semibold text-emerald-900">
              <CheckCircle2 size={22} aria-hidden="true" className="shrink-0 text-emerald-600" />
              Чем можем помочь
            </h3>
            <ul className="mt-6 space-y-5">
              {canHelpItems.map((item) => (
                <li key={item.title} className="rounded-[1.25rem] border border-emerald-100 bg-white/80 p-5">
                  <p className="font-semibold text-slate-950">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50/60 p-7 sm:p-9" data-testid="cannot-help-list">
            <h3 className="flex items-center gap-3 text-xl font-semibold text-rose-900">
              <XCircle size={22} aria-hidden="true" className="shrink-0 text-rose-500" />
              Чем не можем помочь
            </h3>
            <ul className="mt-6 space-y-5">
              {cannotHelpItems.map((item) => (
                <li key={item.title} className="rounded-[1.25rem] border border-rose-100 bg-white/80 p-5">
                  <p className="font-semibold text-slate-950">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 rounded-[1.25rem] border border-slate-200 bg-white/80 p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="max-w-xl text-base leading-7 text-slate-700">
            Если настоящий путь восстановления для вашей ситуации отсутствует, мы скажем об этом прямо —
            до того, как вы потратите время и силы.
          </p>
          <Link
            href="/knowledge-base"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1D63C9] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#164F9F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] focus-visible:ring-offset-2"
          >
            Подробнее в базе знаний <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
