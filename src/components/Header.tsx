import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/ziyava_unlocking', '_blank');
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border/60">
      <div className="flex items-center justify-between py-3.5 px-4 md:px-8 max-w-6xl mx-auto">
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={scrollToServices}
          role="button"
          tabIndex={0}
          aria-label="К списку услуг"
          onKeyDown={(e) => e.key === 'Enter' && scrollToServices()}
        >
          <span className="inline-flex items-center justify-center rounded-md bg-primary p-1.5">
            <Icon name="ShieldCheck" className="text-primary-foreground h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">InstaРешения</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground mr-2">
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollToServices(); }} className="hover:text-foreground transition-colors">
            Услуги
          </a>
          <a href="#trust" onClick={(e) => { e.preventDefault(); document.getElementById('trust')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-foreground transition-colors">
            Как я работаю
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToContact(); }} className="hover:text-foreground transition-colors">
            Контакты
          </a>
        </nav>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex items-center gap-2"
            onClick={openInstagram}
            aria-label="Написать в Instagram (контакт для связи)"
          >
            <Icon name="AtSign" className="h-4 w-4" />
            <span className="hidden lg:inline">@ziyava_unlocking</span>
            <span className="lg:hidden">Написать</span>
          </Button>

          <Button onClick={scrollToContact} size="sm" className="items-center gap-2">
            Связаться
            <Icon name="ArrowRight" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
