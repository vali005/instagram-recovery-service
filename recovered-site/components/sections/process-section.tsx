"use client";

import { motion } from "framer-motion";
import { steps } from "@/utils/content";
import { ArrowDown } from "lucide-react";

export function ProcessSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-950 px-6 py-24 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#2F80ED]">Как проходит работа</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Понятный путь без скрытых действий.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">Вы сохраняете контроль над аккаунтом и самостоятельно подтверждаете все чувствительные действия.</p>
        </div>

        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-center shadow-lg backdrop-blur-xl"
            >
              <div className="text-sm font-medium uppercase tracking-[0.2em] text-[#2F80ED]">Шаг {index + 1}</div>
              <p className="mt-3 text-xl font-semibold text-white">{step}</p>
              {index < steps.length - 1 ? <div className="mt-6 flex justify-center text-slate-400"><ArrowDown size={20} /></div> : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
