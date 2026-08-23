const deliverables = [
  {
    title: "Оценка ситуации",
    description: "Разбираем, что именно произошло и какие способы восстановления доступны.",
  },
  {
    title: "План действий",
    description: "Получаете понятную последовательность шагов с объяснением рисков.",
  },
  {
    title: "Сопровождение",
    description: "Подсказываю на каждом шаге официальной процедуры площадки.",
  },
  {
    title: "Защита после возврата",
    description: "Помогаю настроить резервные контакты и двухфакторную защиту.",
  },
];

export function ResultsSection() {
  return (
    <section aria-labelledby="results-title" className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#2F80ED]/20 bg-[linear-gradient(135deg,_rgba(47,128,237,0.12),_rgba(255,255,255,0.04))] p-8 shadow-[0_30px_100px_rgba(3,7,18,0.12)] backdrop-blur-xl sm:p-10 lg:p-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8BC4FF]">Что вы получаете</p>
          <h2 id="results-title" className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Не набор обещаний, а понятный маршрут.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">После диагностики вы знаете, что делать дальше, какие данные подготовить и каких действий избегать.</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {deliverables.map((item) => (
            <div key={item.title} className="rounded-[1.25rem] border border-white/10 bg-slate-950/60 p-6">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
