
import React from 'react';
import ServiceCard from '@/components/ServiceCard';

const services = [
  {
    icon: 'Unlock',
    title: 'Разблокировка аккаунтов',
    description: 'Помогу разблокировать ваш аккаунт Instagram после блокировки за нарушение правил платформы.'
  },
  {
    icon: 'KeyRound',
    title: 'Восстановление взломанных аккаунтов',
    description: 'Верну доступ к вашему аккаунту, если он был взломан или украден.'
  },
  {
    icon: 'FileKey',
    title: 'Восстановление доступа',
    description: 'Помогу восстановить доступ к аккаунту при потере пароля, email или номера телефона.'
  },
  {
    icon: 'Trash2',
    title: 'Удаление старых профилей',
    description: 'Удалю ненужные или забытые профили Instagram, к которым у вас нет доступа.'
  },
  {
    icon: 'BadgeCheck',
    title: 'Получение верификации',
    description: 'Помогу получить синюю галочку верификации для вашего аккаунта.'
  },
  {
    icon: 'ScrollText',
    title: 'Снятие 115 ФЗ со Сбербанка',
    description: 'Помогу решить проблемы с блокировкой счетов по 115 ФЗ в Сбербанке.'
  }
];

const ServiceSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-background" id="services">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Услуги
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">
            Чем я могу помочь
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Работаю с разными ситуациями: от блокировок и взломов до потери доступа и лишних старых профилей.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
