import React from 'react';
import Icon from '@/components/ui/icon';

const trustItems = [
  {
    icon: 'Lock',
    title: 'Конфиденциальность',
    description:
      'Имя, контакт и сообщение из формы используются только для обработки вашей заявки и доставляются на мою почту через сервис отправки форм.'
  },
  {
    icon: 'ListChecks',
    title: 'Прозрачный процесс',
    description:
      'Перед началом работы честно оцениваю ситуацию, объясняю возможные варианты и этапы — без скрытых условий.'
  },
  {
    icon: 'HandCoins',
    title: 'Оплата за результат',
    description:
      'Условия фиксируем заранее. Вы платите за достигнутый результат по согласованной схеме, а не за обещания.'
  },
  {
    icon: 'MessageCircleQuestion',
    title: 'Честная консультация',
    description:
      'Если задача решается самостоятельно или не имеет законного решения — скажу об этом прямо, до начала работы.'
  }
];

const TrustSection = () => {
  return (
    <section className="py-14 md:py-20 px-4 bg-background" id="trust">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Как я работаю</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Спокойный и понятный подход</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Восстановление доступа — это про доверие. Поэтому принципы работы простые и открыто сформулированные.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-border bg-card p-6 transition-shadow duration-300 hover:shadow-md"
            >
              <div className="inline-flex items-center justify-center rounded-md bg-accent p-2.5 mb-4">
                <Icon name={item.icon} className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
