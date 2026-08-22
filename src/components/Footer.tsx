
import React from 'react';
import Icon from '@/components/ui/icon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center h-9 w-9 rounded-xl bg-primary text-primary-foreground">
              <Icon name="ShieldCheck" className="h-5 w-5" />
            </span>
            <span className="font-bold tracking-tight">InstaРешения</span>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} InstaРешения. Услуги по восстановлению и разблокировке аккаунтов.
          </p>

          <div className="flex gap-2">
            <a href="https://www.instagram.com/ziyava_unlocking" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="flex items-center justify-center h-10 w-10 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
              <Icon name="Instagram" className="h-5 w-5" />
            </a>
            <a href="mailto:vali_vali05@mail.ru" aria-label="Email"
              className="flex items-center justify-center h-10 w-10 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
              <Icon name="Mail" className="h-5 w-5" />
            </a>
            <a href="tel:+79884306315" aria-label="Телефон"
              className="flex items-center justify-center h-10 w-10 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
              <Icon name="Phone" className="h-5 w-5" />
            </a>
          </div>
        </div>

        <p className="mt-8 pt-6 border-t border-border/60 text-xs text-muted-foreground/80 text-center max-w-3xl mx-auto leading-relaxed">
          Сайт носит информационный характер и не является аффилированным с Meta Platforms, Inc.
          Услуги не связаны с обходом защиты платформ — работа ведётся в рамках действующих правил.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
