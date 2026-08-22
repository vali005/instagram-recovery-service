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
    <section className="py-14 md:py-20 px-4 bg-muted/60 border-y border-border/50" id="services">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Услуги</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">С чем я помогаю</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Профессиональная помощь в восстановлении и разблокировке аккаунтов, а также решение смежных вопросов.
            По каждой задаче сначала провожу бесплатную оценку ситуации.
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
