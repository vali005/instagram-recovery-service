import { AlertTriangle, MailWarning, ShieldAlert } from "lucide-react";

const cases = [
  {
    title: "После взлома изменили почту и номер",
    description: "Важно сохранить письма от платформы, проверить активные сессии и не сообщать посторонним коды подтверждения.",
    action: "Проверяем точки возврата доступа",
    icon: MailWarning,
  },
  {
    title: "Площадка ограничила или заблокировала профиль",
    description: "Сначала уточняем тип ограничения и возможную причину, затем выбираем подходящий канал апелляции.",
    action: "Готовим корректное обращение",
    icon: ShieldAlert,
  },
  {
    title: "Код входа не приходит или не принимается",
    description: "Частые повторные запросы могут мешать. Проверяем устройство, способ получения и паузы между попытками.",
    action: "Исключаем типовые причины",
    icon: AlertTriangle,
  },
];

export function CasesSection() {
  return (
    <section aria-labelledby="cases-title" className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-[0_20px_80px_rgba(3,7,18,0.06)] backdrop-blur-xl sm:p-10 lg:p-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#2F80ED]">Типовые сценарии</p>
          <h2 id="cases-title" className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
            Что важно сделать в первые минуты.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">Правильная последовательность помогает сохранить варианты восстановления и не усложнить проверку владельца.</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {cases.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-6 text-white">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2F80ED]/15 text-[#8BC4FF]">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                <p className="mt-6 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm leading-6 text-slate-200">{item.action}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
