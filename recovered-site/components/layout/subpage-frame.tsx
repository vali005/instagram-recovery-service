import Link from "next/link";
import { FooterSection } from "@/components/sections/footer-section";

const navLinks = [
  { label: "Диагностика", href: "/#diagnostic" },
  { label: "Ситуации", href: "/#services" },
  { label: "База знаний", href: "/knowledge-base" },
];

export function SubpageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-50">
      <a
        href="#main-content"
        className="skip-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Перейти к основному содержанию
      </a>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3 rounded text-lg font-semibold tracking-wide text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]"
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#60A5FA]/30 bg-[#2F80ED]/15 text-sm text-[#8BC4FF] transition group-hover:bg-[#2F80ED]/25"
            >
              R
            </span>
            Recovery
          </Link>
          <nav aria-label="Основная навигация" className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/#request"
            className="rounded-full bg-[#1D63C9] px-4 py-2.5 text-sm font-medium text-white shadow-[0_10px_35px_rgba(47,128,237,0.25)] transition hover:bg-[#164F9F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Описать ситуацию
          </Link>
        </div>
        <nav aria-label="Навигация по разделам" className="border-t border-white/5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-x-1 gap-y-1 px-4 pb-3 pt-2 text-sm sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded px-2 py-2 text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main id="main-content" tabIndex={-1} className="focus-visible:outline-none">
        {children}
      </main>

      <FooterSection />
    </div>
  );
}
