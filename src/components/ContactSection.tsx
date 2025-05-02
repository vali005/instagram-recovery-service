
import React from 'react';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  return (
    <section className="py-16 px-4 bg-muted" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Связаться со мной</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Заполните форму ниже, и я свяжусь с вами в ближайшее время для обсуждения вашего вопроса и предложу оптимальное решение.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 md:order-1">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Контактная информация</h3>
              
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Icon name="Instagram" className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Instagram</p>
                  <a href="https://www.instagram.com/ziyava_unlocking" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary transition-colors">@ziyava_unlocking</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Icon name="Mail" className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">vali_vali05@mail.ru</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Icon name="Phone" className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Телефон</p>
                  <p className="font-medium">+7 988 430-63-15</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Свяжитесь напрямую</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-full" 
                  onClick={() => window.open('https://www.instagram.com/ziyava_unlocking', '_blank')}>
                  <Icon name="Instagram" className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full"
                  onClick={() => window.open('tel:+79884306315')}>
                  <Icon name="Phone" className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full"
                  onClick={() => window.open('mailto:vali_vali05@mail.ru')}>
                  <Icon name="Mail" className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm order-1 md:order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
