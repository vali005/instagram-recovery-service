"use client";

import { motion } from "framer-motion";
import { benefits } from "@/utils/content";

export function BenefitsSection() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#2F80ED]">Подход</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Спокойная работа без давления и сомнительных обещаний.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Вы понимаете, что происходит, какие данные нужны и где заканчивается зона ответственности специалиста.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {["Без паролей", "Один специалист", "По правилам площадок"].map((label, index) => (
              <div key={label} className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-6 text-center shadow-sm">
                <p className="text-3xl font-semibold text-[#2F80ED]">0{index + 1}</p>
                <p className="mt-2 text-sm font-medium text-slate-700">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2F80ED]/10 text-[#2F80ED]">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{benefit.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
