import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contactChannels } from "@/utils/content";

const materialLinks = [
  { label: "Аккаунт заблокирован", href: "/account-blocked" },
  { label: "Аккаунт взломан", href: "/account-hacked" },
  { label: "Нет доступа к телефону или почте", href: "/no-phone-email-access" },
  { label: "Не приходит код входа", href: "/login-code-not-arriving" },
  { label: "Как защитить аккаунт", href: "/account-protection-guide" },
  { label: "База знаний", href: "/knowledge-base" },
];

export function FooterSection() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 px-6 py-16 text-slate-300 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8BC4FF]">Контакты</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Начните с безопасного описания ситуации.</h2>
          <p className="mt-4 text-base leading-8 text-slate-300">Не отправляйте пароль, SMS-коды, резервные коды и документы в первом сообщении.</p>
        </div>

        <nav aria-label="Полезные материалы" className="lg:min-w-[18rem]">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8BC4FF]">Материалы</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {materialLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#diagnostic"
                className="rounded text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]"
              >
                Диагностика ситуации
              </Link>
            </li>
          </ul>
        </nav>

        <ul className="grid gap-4 sm:grid-cols-2 lg:min-w-[26rem]">
          {contactChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-[1rem] border border-white/10 bg-white/5 p-4 transition hover:border-[#2F80ED]/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2F80ED]/10 text-[#8BC4FF]">
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className="block font-medium text-white">{channel.label}</span>
                    <span className="block break-all text-sm text-slate-300">{channel.href.replace(/^https?:\/\//, "")}</span>
                  </span>
                  <ArrowUpRight size={16} aria-hidden="true" className="ml-auto shrink-0 text-slate-300" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div id="privacy" className="mx-auto mt-12 grid max-w-7xl gap-6 border-t border-white/10 pt-8 text-sm text-slate-400 lg:grid-cols-[1fr_1.5fr]">
        <p>© 2026 Recovery. Информационная помощь по восстановлению доступа.</p>
        <div className="lg:text-right">
          <Link
            href="/privacy-policy"
            className="rounded font-medium text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]"
          >
            Политика конфиденциальности
          </Link>
          <p className="mt-2 leading-6">Сервис не аффилирован с Instagram, Telegram, VK, Meta Platforms и другими перечисленными площадками. Результат зависит от решения соответствующей платформы и доступных способов подтверждения владельца.</p>
        </div>
      </div>
    </footer>
  );
}
