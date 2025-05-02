
import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

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
    <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-accent to-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
            <Icon name="ShieldCheck" className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-secondary">Профессиональная помощь</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Восстановление и<br /> разблокировка
            <span className="text-primary"> Instagram</span>
          </h1>
          
          <p className="text-lg text-muted-foreground">
            Помогаю вернуть доступ к вашему аккаунту, снять блокировку и решить другие проблемы с вашим профилем.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={scrollToContact} size="lg" className="gap-2">
              Получить консультацию
              <Icon name="ArrowRight" className="h-4 w-4" />
            </Button>
            
            <Button onClick={openInstagram} variant="outline" size="lg" className="gap-2">
              <Icon name="Instagram" className="h-4 w-4" />
              Instagram
            </Button>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Clock" className="h-4 w-4" />
              <span>Быстрое решение</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Shield" className="h-4 w-4" />
              <span>Гарантия результата</span>
            </div>
          </div>
        </div>
        
        <div className="relative h-[400px] hidden md:block">
          <div className="absolute top-0 right-0 w-full h-full bg-primary/5 rounded-lg overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-[300px] h-[300px] bg-primary/20 rounded-full"></div>
            <div className="absolute top-20 -left-20 w-[200px] h-[200px] bg-secondary/10 rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
              alt="Instagram на смартфоне" 
              className="absolute inset-0 w-full h-full object-cover object-center rounded-lg opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
