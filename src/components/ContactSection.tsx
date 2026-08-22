
import React from 'react';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const CONTACT_ITEMS = [
  {
    icon: 'Instagram',
    label: 'Instagram',
    value: '@ziyava_unlocking',
    href: 'https://www.instagram.com/ziyava_unlocking'
  },
  {
    icon: 'Mail',
    label: 'Email',
    value: 'gadjarovkurban@gmail.com',
    href: 'mailto:gadjarovkurban@gmail.com'
  },
  {
    icon: 'Phone',
    label: 'Телефон',
    value: '+7 988 430-63-15',
    href: 'tel:+79884306315'
  }
];

const ContactSection = () => {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 bg-muted/60 overflow-hidden" id="contact">
      <div className="absolute -bottom-40 -left-32 w-[420px] h-[420px] bg-glow-primary blur-3xl rounded-full pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Контакты
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">
            Расскажите о вашей ситуации
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Опишите проблему в форме или свяжитесь удобным способом — обсудим ваш вопрос и подберём оптимальное решение.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 shadow-card space-y-5">
              <h3 className="text-lg font-semibold">Контактная информация</h3>

              {CONTACT_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.icon === 'Instagram' ? '_blank' : undefined}
                  rel={item.icon === 'Instagram' ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 group rounded-xl p-2 -m-2 hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="bg-primary/10 p-3 rounded-xl text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-muted-foreground">{item.label}</span>
                    <span className="font-medium break-all">{item.value}</span>
                  </span>
                </a>
              ))}
            </div>

            <div className="rounded-2xl border border-border/70 bg-card p-6 sm:p-7 shadow-card space-y-4">
              <h3 className="text-lg font-semibold">Связаться напрямую</h3>
              <p className="text-sm text-muted-foreground">
                Отвечу вам лично — без ботов и посредников.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-full h-11 w-11" aria-label="Написать в Instagram"
                  onClick={() => window.open('https://www.instagram.com/ziyava_unlocking', '_blank')}>
                  <Icon name="Instagram" className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-11 w-11" aria-label="Позвонить"
                  onClick={() => window.open('tel:+79884306315')}>
                  <Icon name="Phone" className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-11 w-11" aria-label="Написать на почту"
                  onClick={() => window.open('mailto:gadjarovkurban@gmail.com')}>
                  <Icon name="Mail" className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 bg-card p-6 sm:p-8 rounded-2xl shadow-card-hover border border-border/70">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
