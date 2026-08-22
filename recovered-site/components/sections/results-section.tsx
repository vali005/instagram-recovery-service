"use client";

import { motion } from "framer-motion";

const metrics = [
  { value: "01", label: "Оценка ситуации" },
  { value: "02", label: "План действий" },
  { value: "03", label: "Сопровождение" },
  { value: "04", label: "Защита доступа" },
];

export function ResultsSection() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#2F80ED]/20 bg-[linear-gradient(135deg,_rgba(47,128,237,0.12),_rgba(255,255,255,0.04))] p-8 shadow-[0_30px_100px_rgba(3,7,18,0.12)] backdrop-blur-xl sm:p-10 lg:p-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8BC4FF]">Что вы получаете</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Не набор обещаний, а понятный маршрут.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">После диагностики вы знаете, что делать дальше, какие данные подготовить и каких действий избегать.</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="rounded-[1.25rem] border border-white/10 bg-slate-950/60 p-6 text-center"
            >
              <div className="text-4xl font-semibold text-white">{metric.value}</div>
              <div className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-400">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
