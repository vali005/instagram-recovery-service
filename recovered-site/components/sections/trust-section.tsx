"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Lock, MessageCircle, ShieldCheck } from "lucide-react";

const trustItems = [
  {
    title: "Фиксируем исходную ситуацию",
    description: "Уточняем, что изменилось, какие устройства и контакты ещё доступны.",
    icon: BadgeCheck,
  },
  {
    title: "Отделяем факты от догадок",
    description: "Проверяем уведомления площадки и не делаем лишних попыток, которые могут усложнить вход.",
    icon: Lock,
  },
  {
    title: "Выбираем официальный канал",
    description: "Подбираем подходящую форму, апелляцию или сценарий подтверждения владельца.",
    icon: MessageCircle,
  },
  {
    title: "Закрепляем результат",
    description: "После возврата доступа обновляем защиту, контакты и резервные способы входа.",
    icon: ShieldCheck,
  },
];

export function TrustSection() {
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-slate-950 p-8 shadow-[0_30px_100px_rgba(3,7,18,0.25)] sm:p-10 lg:p-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8BC4FF]">Логика работы</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Каждое действие должно сохранять, а не уменьшать ваши варианты.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">Поэтому работа начинается с фактов и проходит по шагам — без спешки, давления и передачи секретных данных.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="rounded-[1.25rem] border border-white/10 bg-white/8 p-6 backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2F80ED]/10 text-[#2F80ED]">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
