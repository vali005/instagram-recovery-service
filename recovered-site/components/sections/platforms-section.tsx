"use client";

import { motion } from "framer-motion";
import { platforms } from "@/utils/content";

export function PlatformsSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-950 px-6 py-24 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8BC4FF]">Площадки</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Один понятный подход для разных сервисов.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">Сайт не связан с перечисленными платформами. Помощь строится на их официальных процедурах поддержки и восстановления.</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-[1.25rem] border border-white/10 bg-white/5 p-6 text-center shadow-lg backdrop-blur-xl"
            >
              <div className="text-lg font-semibold text-white">{platform}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
