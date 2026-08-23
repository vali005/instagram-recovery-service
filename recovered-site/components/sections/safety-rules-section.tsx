import { Ban, KeyRound, ShieldCheck } from "lucide-react";

const rules = [
  {
    title: "Никому не сообщайте пароль",
    text: "Владелец вводит пароль только самостоятельно на официальной странице площадки.",
    icon: KeyRound,
  },
  {
    title: "Не передавайте коды",
    text: "SMS-коды, коды двухфакторной защиты и резервные коды нельзя сообщать даже специалисту.",
    icon: Ban,
  },
  {
    title: "Проверяйте адрес страницы",
    text: "Переходите к формам входа и поддержки только по официальным доменам платформ.",
    icon: ShieldCheck,
  },
];

export function SafetyRulesSection() {
  return (
    <section aria-labelledby="safety-rules-title" className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#2F80ED]">Важно знать</p>
          <h2 id="safety-rules-title" className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
            Три правила, которые защищают вас от повторного взлома.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {rules.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-7 shadow-[0_20px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2F80ED]/10 text-[#2F80ED]">
                  <Icon size={21} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-slate-700">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
