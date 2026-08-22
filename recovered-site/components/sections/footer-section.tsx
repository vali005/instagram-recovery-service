"use client";

import { ArrowUpRight } from "lucide-react";
import { contactChannels } from "@/utils/content";

export function FooterSection() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 px-6 py-16 text-slate-300 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#2F80ED]">Контакты</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Начните с безопасного описания ситуации.</h2>
          <p className="mt-4 text-base leading-8 text-slate-400">Не отправляйте пароль, SMS-коды, резервные коды и документы в первом сообщении.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:min-w-[26rem]">
          {contactChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <a key={channel.label} href={channel.href} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-[1rem] border border-white/10 bg-white/5 p-4 transition hover:border-[#2F80ED]/30 hover:bg-white/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2F80ED]/10 text-[#2F80ED]">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="font-medium text-white">{channel.label}</div>
                  <div className="text-sm text-slate-400">{channel.href.replace(/^https?:\/\//, "")}</div>
                </div>
                <ArrowUpRight size={16} className="ml-auto text-slate-400" />
              </a>
            );
          })}
        </div>
      </div>

      <div id="privacy" className="mx-auto mt-12 grid max-w-7xl gap-6 border-t border-white/10 pt-8 text-sm text-slate-500 lg:grid-cols-[1fr_1.5fr]">
        <p>© 2026 Recovery. Информационная помощь по восстановлению доступа.</p>
        <p className="leading-6 lg:text-right">Сервис не аффилирован с Instagram, Telegram, VK, Meta Platforms и другими перечисленными площадками. Результат зависит от решения соответствующей платформы и доступных способов подтверждения владельца.</p>
      </div>
    </footer>
  );
}
