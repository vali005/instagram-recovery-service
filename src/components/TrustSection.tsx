
import React from 'react';
import Icon from '@/components/ui/icon';

const PROCESS_STEPS = [
  {
    number: '01',
    icon: 'MessageSquareText',
    title: 'Вы описываете ситуацию',
    description: 'Оставьте заявку в форме или напишите напрямую — расскажите, что произошло с аккаунтом.'
  },
  {
    number: '02',
    icon: 'SearchCheck',
    title: 'Честная оценка перспектив',
    description: 'Разбираю ваш случай и говорю прямо: что реально можно сделать и как лучше действовать.'
  },
  {
    number: '03',
    icon: 'Workflow',
    title: 'Работа над восстановлением',
    description: 'Действую по понятному плану и держу вас в курсе на каждом этапе, в рамках правил платформы.'
  },
  {
    number: '04',
    icon: 'KeyRound',
    title: 'Доступ снова у вас',
    description: 'Помогаю вернуть контроль над аккаунтом и подсказываю, как защитить его в дальнейшем.'
  }
];

const PRINCIPLES = [
  {
    icon: 'LockKeyhole',
    title: 'Конфиденциальность',
    description: 'Информация о вас используется только для решения вашего вопроса.'
  },
  {
    icon: 'Eye',
    title: 'Прозрачность',
    description: 'Объясняю каждый шаг простым языком — вы всегда понимаете, что происходит.'
  },
  {
    icon: 'Scale',
    title: 'Без ложных обещаний',
    description: 'Не обещаю невозможного и не предлагаю обхода защиты платформ — только рабочие пути.'
  }
];

const TrustSection = () => {
  return (
    <section id="process" className="relative py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-background to-accent/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Как это работает
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">
            Понятный процесс без сюрпризов
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Вы всегда знаете, на каком этапе находится ваша ситуация и что будет дальше.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((step) => (
            <li
              key={step.number}
              className="group relative bg-card border border-border/70 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="flex items-center justify-center h-11 w-11 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon name={step.icon} className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold tracking-wider text-muted-foreground/60" aria-hidden="true">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-semibold leading-snug">{step.title}</h3>
              <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.title}
              className="flex items-start gap-4 rounded-2xl border border-border/70 bg-card p-5 shadow-card"
            >
              <span className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary/10 text-secondary shrink-0">
                <Icon name={principle.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold">{principle.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
