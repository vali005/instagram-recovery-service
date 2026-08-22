"use client";

import { motion } from "framer-motion";
import { Ban, KeyRound, ShieldCheck } from "lucide-react";

const rules = [
  { title: "Никому не сообщайте пароль", text: "Владелец вводит пароль только самостоятельно на официальной странице площадки.", icon: KeyRound },
  { title: "Не передавайте коды", text: "SMS-коды, коды двухфакторной защиты и резервные коды нельзя сообщать даже специалисту.", icon: Ban },
  { title: "Проверяйте адрес страницы", text: "Переходите к формам входа и поддержки только по официальным доменам платформ.", icon: ShieldCheck },
];

export function TestimonialsSection() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#2F80ED]">Важно знать</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Три правила, которые защищают вас от повторного взлома.</h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {rules.map((item, index) => {
            const Icon = item.icon;
            return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2F80ED]/10 text-[#2F80ED]"><Icon size={21} /></div>
              <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-3 text-base leading-8 text-slate-700">{item.text}</p>
            </motion.article>
          )})}
        </div>
      </div>
    </section>
  );
}
