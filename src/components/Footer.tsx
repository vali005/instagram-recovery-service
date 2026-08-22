
import React from 'react';
import Icon from '@/components/ui/icon';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 border-t bg-muted/40">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center rounded-md bg-primary p-1.5">
              <Icon name="ShieldCheck" className="text-primary-foreground h-4 w-4" />
            </span>
            <span className="font-semibold">InstaРешения</span>
          </div>

          <p className="text-sm text-muted-foreground max-w-sm">
            © {currentYear} Услуги по восстановлению и разблокировке аккаунтов.
            Результат зависит от конкретной ситуации и обсуждается до начала работы.
          </p>

          <div className="flex gap-4 text-muted-foreground">
            <a href="https://www.instagram.com/ziyava_unlocking" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors">
              <Icon name="Instagram" className="h-5 w-5" />
            </a>
            <a href="mailto:gadjarovkurban@gmail.com" aria-label="Email" className="hover:text-primary transition-colors">
              <Icon name="Mail" className="h-5 w-5" />
            </a>
            <a href="tel:+79884306315" aria-label="Телефон" className="hover:text-primary transition-colors">
              <Icon name="Phone" className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
