import { platforms } from "@/utils/content";

export function PlatformsSection() {
  return (
    <section aria-labelledby="platforms-title" className="border-y border-slate-200 bg-slate-950 px-6 py-20 text-white sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8BC4FF]">Площадки</p>
          <h2 id="platforms-title" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            Один понятный подход для разных сервисов.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">Сайт не связан с перечисленными платформами. Помощь строится на их официальных процедурах поддержки и восстановления.</p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {platforms.map((platform) => (
            <li key={platform} className="rounded-[1.25rem] border border-white/10 bg-white/5 p-6 text-center shadow-lg backdrop-blur-xl">
              <span className="text-lg font-semibold text-white">{platform}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
