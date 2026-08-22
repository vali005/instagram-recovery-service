import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import SecurityVisual from '@/components/SecurityVisual';

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
    <section className="relative overflow-hidden px-4 pt-10 pb-14 md:pt-16 md:pb-24 bg-gradient-to-b from-accent via-background to-background">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-16 items-center">
        <div className="space-y-7 text-center md:text-left">
          <div className="inline-flex items-center gap-2 border border-border bg-card/70 px-4 py-1.5 rounded-full">
            <Icon name="ShieldCheck" className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Конфиденциальная работа с доступом к аккаунтам</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Восстановление доступа
            <span className="block text-primary">и разблокировка аккаунта</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0 leading-relaxed">
            Помогаю вернуть доступ к вашему профилю, снять блокировку и решить другие проблемы с аккаунтом.
            Сначала оцениваю ситуацию и объясняю план действий — вы принимаете решение осознанно.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button onClick={scrollToContact} size="lg" className="gap-2 w-full sm:w-auto">
              Получить консультацию
              <Icon name="ArrowRight" className="h-4 w-4" />
            </Button>

            <Button onClick={openInstagram} variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
              <Icon name="Send" className="h-4 w-4" />
              Написать напрямую
            </Button>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3 text-sm text-muted-foreground pt-2 max-w-xl mx-auto md:mx-0">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Icon name="Lock" className="h-4 w-4 text-primary shrink-0" />
              Заявка с формы приходит мне на почту
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Icon name="ListChecks" className="h-4 w-4 text-primary shrink-0" />
              Понятные этапы работы
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <Icon name="HandCoins" className="h-4 w-4 text-primary shrink-0" />
              Оплата за результат
            </li>
          </ul>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[240px] sm:max-w-xs md:max-w-md lg:max-w-sm">
            <SecurityVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
