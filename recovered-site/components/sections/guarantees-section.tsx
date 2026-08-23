import { ShieldCheck, Lock, Eye, Sparkles } from "lucide-react";

const guarantees = [
  {
    title: "Конфиденциальность",
    description: "Не публикую детали обращения и не передаю их посторонним без необходимости.",
    icon: Eye,
  },
  {
    title: "Безопасность",
    description: "Не предлагаю обход защиты и не прошу передавать пароли, SMS-коды или резервные коды.",
    icon: ShieldCheck,
  },
  {
    title: "Прозрачный план",
    description: "До начала действий объясняю последовательность, ограничения и возможные риски.",
    icon: Sparkles,
  },
  {
    title: "Поддержка после восстановления",
    description: "После возврата доступа помогу закрыть уязвимости и защитить аккаунт от повторного взлома.",
    icon: Lock,
  },
];

export function GuaranteesSection() {
  return (
    <section aria-labelledby="guarantees-title" className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8BC4FF]">Принципы безопасности</p>
            <h2 id="guarantees-title" className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Соблюдаем понятные принципы процесса — результат за площадку обещать не можем.
            </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {guarantees.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/8 p-6 backdrop-blur-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2F80ED]/10 text-[#8BC4FF]">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
