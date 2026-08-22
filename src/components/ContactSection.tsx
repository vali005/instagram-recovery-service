
import React from 'react';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const contactChannels = [
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
    <section className="py-14 md:py-20 px-4 bg-background" id="contact">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Контакты</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Опишите вашу ситуацию</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Заполните форму — свяжусь с вами в ближайшее время, задам уточняющие вопросы
            и предложу оптимальное решение.
          </p>
        </div>

        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div className="space-y-8 order-2 md:order-1 w-full max-w-md mx-auto md:mx-0 md:w-auto">
            <div className="space-y-5">
              <h3 className="text-lg font-semibold">Прямые контакты</h3>

              {contactChannels.map((channel) => (
                <div key={channel.label} className="flex items-center gap-4">
                  <div className="bg-accent p-3 rounded-md shrink-0">
                    <Icon name={channel.icon} className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{channel.label}</p>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith('http') ? '_blank' : undefined}
                      rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="font-medium hover:text-primary transition-colors break-all"
                    >
                      {channel.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-border bg-muted/50 p-5 space-y-3">
              <div className="flex items-start gap-3">
                <Icon name="Clock" className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground">Отвечаю в течение дня, обычно быстрее.</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Lock" className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Данные из формы используются только для обработки вашей заявки и доставляются на мою почту через сервис отправки форм.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="HandCoins" className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground">Оценка ситуации и первичная консультация — бесплатно, условия фиксируем до начала работы.</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Быстрая связь</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-full" aria-label="Instagram"
                  onClick={() => window.open('https://www.instagram.com/ziyava_unlocking', '_blank')}>
                  <Icon name="Instagram" className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full" aria-label="Позвонить"
                  onClick={() => window.open('tel:+79884306315')}>
                  <Icon name="Phone" className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full" aria-label="Написать письмо"
                  onClick={() => window.open('mailto:gadjarovkurban@gmail.com')}>
                  <Icon name="Mail" className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 md:p-8 rounded-lg border border-border shadow-sm order-1 md:order-2 w-full max-w-md mx-auto md:max-w-none">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
