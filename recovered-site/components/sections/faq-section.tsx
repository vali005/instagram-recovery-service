import Link from "next/link";
import { faqs } from "@/utils/content";
import { ArrowRight, ChevronDown } from "lucide-react";

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#1D63C9]">FAQ</p>
          <h2 id="faq-title" className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
            Ответы на самые частые вопросы.
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((item) => (
            <details key={item.question} className="group rounded-[1.25rem] border border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                <span className="text-lg font-semibold text-slate-950">{item.question}</span>
                <ChevronDown size={20} aria-hidden="true" className="shrink-0 text-[#1D63C9] transition group-open:rotate-180" />
              </summary>
              <p className="px-6 pb-6 text-base leading-8 text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-8 rounded-[1.25rem] border border-blue-100 bg-blue-50/70 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <p className="max-w-xl text-base leading-7 text-slate-700">
            Это короткий список. Подробные разборы ситуаций, правила безопасности и порядок работы
            собраны в отдельном разделе базы знаний.
          </p>
          <Link
            href="/knowledge-base"
            className="mt-4 inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1D63C9] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#164F9F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] focus-visible:ring-offset-2 sm:mt-0"
          >
            Открыть базу знаний <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
