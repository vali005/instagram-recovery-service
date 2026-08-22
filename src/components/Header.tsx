
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const NAV_LINKS = [
  { label: 'Услуги', href: '#services' },
  { label: 'Как проходит работа', href: '#process' },
  { label: 'Контакты', href: '#contact' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/ziyava_unlocking', '_blank');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="InstaРешения — на главную"
        >
          <span className="flex items-center justify-center h-9 w-9 rounded-xl bg-primary text-primary-foreground shadow-cta">
            <Icon name="ShieldCheck" className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">InstaРешения</span>
        </button>

        <nav className="hidden md:flex items-center gap-7" aria-label="Основная навигация">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => scrollToSection(link.href.slice(1))}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <Button variant="outline" size="sm" className="gap-2" onClick={openInstagram}>
            <Icon name="Instagram" className="h-4 w-4" />
            Написать
          </Button>
          <Button size="sm" className="gap-2 shadow-cta" onClick={() => scrollToSection('contact')}>
            Бесплатная консультация
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          <Icon name={menuOpen ? 'X' : 'Menu'} className="h-5 w-5" />
        </Button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border/70 bg-background/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollToSection(link.href.slice(1))}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <Button className="w-full" onClick={() => scrollToSection('contact')}>
                Бесплатная консультация
              </Button>
              <Button variant="outline" className="w-full gap-2" onClick={openInstagram}>
                <Icon name="Instagram" className="h-4 w-4" />
                Написать в Instagram
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
