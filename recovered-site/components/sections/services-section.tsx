"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/utils/content";

export function ServicesSection() {
  return (
    <section id="services" className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#2F80ED]">Ситуации</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Помощь начинается с правильного определения проблемы.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">У разных блокировок и способов потери доступа разные причины. Поэтому сначала — диагностика, затем — действия.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group rounded-[1.75rem] border border-slate-200 bg-white/80 p-7 shadow-[0_20px_80px_rgba(8,15,35,0.06)] backdrop-blur-xl transition"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2F80ED]/10 text-[#2F80ED]">
                  <Icon size={22} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-950">{service.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{service.description}</p>
                <a href="#request" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#2F80ED]">Описать ситуацию <ArrowRight size={16} className="transition group-hover:translate-x-1" /></a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
