
import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import SecurityVisual from '@/components/SecurityVisual';

const HERO_TRUST_ITEMS = [
  { icon: 'LockKeyhole', label: 'Конфиденциально' },
  { icon: 'SearchCheck', label: 'Честная оценка вашей ситуации' },
  { icon: 'MessagesSquare', label: 'На связи на каждом этапе' },
];

const HeroSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/ziyava_unlocking', '_blank');
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-hero pointer-events-none" aria-hidden="true" />
      <div className="absolute -top-32 right-0 w-[480px] h-[480px] bg-glow-primary blur-3xl rounded-full pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-16 md:pt-24 md:pb-24">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10 items-center">
          <div className="space-y-7 animate-fade-up text-center lg:text-left">
            <div className="inline-flex items-center gap-2 border border-border bg-card px-4 py-1.5 rounded-full shadow-card">
              <Icon name="ShieldCheck" className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-secondary">
                Профессиональная помощь с доступом к аккаунтам
              </span>
            </div>

            <h1 className="text-balance text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.08]">
              Верните доступ<br className="hidden sm:block" /> к своему{' '}
              <span className="text-primary">аккаунту</span>
            </h1>

            <p className="mx-auto lg:mx-0 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Помогаю восстановить заблокированные, взломанные или утерянные аккаунты.
              Разбираю вашу ситуацию, честно оцениваю перспективы и веду вас на каждом шаге —
              в рамках правил платформы.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Button onClick={scrollToContact} size="lg" className="w-full sm:w-auto gap-2 shadow-cta h-12 px-8 text-base font-semibold">
                Получить консультацию
                <Icon name="ArrowRight" className="h-5 w-5" />
              </Button>

              <Button onClick={openInstagram} variant="outline" size="lg" className="w-full sm:w-auto gap-2 h-12 px-8 text-base font-semibold">
                <Icon name="Instagram" className="h-5 w-5" />
                Написать в Instagram
              </Button>
            </div>

            <ul className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3 justify-items-center lg:justify-items-start">
              {HERO_TRUST_ITEMS.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-accent shrink-0">
                    <Icon name={item.icon} className="h-3.5 w-3.5 text-primary" />
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-up [animation-delay:150ms] order-first lg:order-none">
            <SecurityVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
