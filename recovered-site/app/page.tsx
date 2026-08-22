import { HeroSection } from "@/components/sections/hero-section";
import { DiagnosticSection } from "@/components/sections/diagnostic-section";
import { ServicesSection } from "@/components/sections/services-section";
import { PlatformsSection } from "@/components/sections/platforms-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { CasesSection } from "@/components/sections/cases-section";
import { GuaranteesSection } from "@/components/sections/guarantees-section";
import { ResultsSection } from "@/components/sections/results-section";
import { TrustSection } from "@/components/sections/trust-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { RequestSection } from "@/components/sections/request-section";
import { FooterSection } from "@/components/sections/footer-section";

const publicPhone = process.env.NEXT_PUBLIC_RECOVERY_PHONE;
const publicEmail = process.env.NEXT_PUBLIC_RECOVERY_EMAIL;

const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Recovery",
  url: "https://recovered-social-recovery.ppnt2qf6z9.chatgpt.site",
  description:
    "Профессиональная помощь в разблокировке и восстановлении аккаунтов Instagram, Telegram, VK, Facebook, TikTok и других социальных сетей.",
  ...(publicPhone ? { telephone: publicPhone } : {}),
  ...(publicEmail ? { email: publicEmail } : {}),
  areaServed: "RU",
  serviceType: [
    "Разблокировка аккаунтов",
    "Восстановление доступа",
    "Защита аккаунтов",
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-50">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          <a href="#top" className="group flex items-center gap-3 text-lg font-semibold tracking-wide text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#60A5FA]/30 bg-[#2F80ED]/15 text-sm text-[#8BC4FF] transition group-hover:bg-[#2F80ED]/25">R</span>
            Recovery
          </a>
          <nav aria-label="Основная навигация" className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
            <a href="#diagnostic" className="transition hover:text-white">Диагностика</a>
            <a href="#services" className="transition hover:text-white">Услуги</a>
            <a href="#process" className="transition hover:text-white">Процесс</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </nav>
          <a href="#request" className="rounded-full bg-[#2F80ED] px-4 py-2.5 text-sm font-medium text-white shadow-[0_10px_35px_rgba(47,128,237,0.25)] transition hover:bg-[#1f6ed0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]">
            Описать ситуацию
          </a>
        </div>
      </header>

      <main id="top">
        <HeroSection />
        <DiagnosticSection />
        <ServicesSection />
        <PlatformsSection />
        <BenefitsSection />
        <CasesSection />
        <GuaranteesSection />
        <ResultsSection />
        <TrustSection />
        <ProcessSection />
        <TestimonialsSection />
        <FaqSection />
        <RequestSection />
      </main>

      <FooterSection />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
