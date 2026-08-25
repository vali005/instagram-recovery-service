import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/utils/content";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#1D63C9]">Ситуации</p>
          <h2 id="services-title" className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
            Помощь начинается с правильного определения проблемы.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">У разных блокировок и способов потери доступа разные причины. Поэтому сначала — диагностика, затем — действия.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="group rounded-[1.75rem] border border-slate-200 bg-white/80 p-7 shadow-[0_20px_80px_rgba(8,15,35,0.06)] backdrop-blur-xl transition hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2F80ED]/10 text-[#1D63C9]">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-950">{service.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{service.description}</p>
                {service.href ? (
                  <Link
                    href={service.href}
                    className="mt-6 inline-flex items-center gap-2 rounded text-sm font-medium text-[#1D63C9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] focus-visible:ring-offset-2"
                  >
                    Изучить безопасные шаги <ArrowRight size={16} aria-hidden="true" className="transition group-hover:translate-x-1" />
                  </Link>
                ) : (
                  <a href="#diagnostic" className="mt-6 inline-flex items-center gap-2 rounded text-sm font-medium text-[#1D63C9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] focus-visible:ring-offset-2">
                    Начать безопасный разбор <ArrowRight size={16} aria-hidden="true" className="transition group-hover:translate-x-1" />
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
