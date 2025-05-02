
import React from 'react';
import Icon from '@/components/ui/icon';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 border-t">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Instagram" className="text-primary h-5 w-5" />
            <span className="font-semibold">InstaРешения</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {currentYear} Все права защищены. Услуги по восстановлению и разблокировке Instagram
          </p>
          
          <div className="flex gap-4 text-muted-foreground">
            <a href="mailto:vali_vali05@mail.ru" className="hover:text-primary transition-colors">
              <Icon name="Mail" className="h-5 w-5" />
            </a>
            <a href="tel:+79884306315" className="hover:text-primary transition-colors">
              <Icon name="Phone" className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
