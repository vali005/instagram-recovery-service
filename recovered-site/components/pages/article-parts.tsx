import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CircleAlert,
  MessageCircleMore,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/breadcrumbs";

const TELEGRAM_URL = "https://t.me/razblokirovka_instagram777";

export function ArticleHero({
  tag,
  h1,
  lead,
  crumbs,
  chips = [],
}: {
  tag: string;
  h1: string;
  lead: string;
  crumbs: BreadcrumbItem[];
  chips?: string[];
}) {
  return (
    <section className="bg-[#030712] px-6 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-12 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <Breadcrumbs items={crumbs} />
        <p className="mt-8 text-sm font-medium uppercase tracking-[0.25em] text-[#8BC4FF]">{tag}</p>
        <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
          {h1}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{lead}</p>
        {chips.length > 0 ? (
          <ul className="mt-7 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200"
              >
                {chip}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

export function StepsBlock({
  heading,
  intro,
  items,
}: {
  heading: string;
  intro?: string;
  items: { title: string; text: string }[];
}) {
  return (
    <section aria-labelledby={headingId(heading)} className="scroll-mt-24">
      <h2 id={headingId(heading)} className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
        {heading}
      </h2>
      {intro ? <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">{intro}</p> : null}
      <ol className="mt-6 space-y-4">
        {items.map((item, index) => (
          <li
            key={item.title}
            className="flex gap-4 rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-[0_14px_50px_rgba(8,15,35,0.06)] sm:p-6"
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2F80ED]/10 text-sm font-semibold text-[#2F80ED]"
            >
              {index + 1}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-2 text-base leading-7 text-slate-600">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

const toneStyles = {
  danger: {
    icon: TriangleAlert,
    badge: "bg-rose-50 text-rose-700",
    card: "border-rose-100 bg-rose-50/60",
    title: "text-rose-900",
  },
  neutral: {
    icon: CircleAlert,
    badge: "bg-slate-100 text-slate-700",
    card: "border-slate-200 bg-white",
    title: "text-slate-950",
  },
} as const;

export function PointsBlock({
  heading,
  intro,
  tone,
  items,
}: {
  heading: string;
  intro?: string;
  tone: keyof typeof toneStyles;
  items: { title: string; text: string }[];
}) {
  const styles = toneStyles[tone];
  const Icon = styles.icon;
  return (
    <section aria-labelledby={headingId(heading)} className="scroll-mt-24">
      <h2 id={headingId(heading)} className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
        {heading}
      </h2>
      {intro ? <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">{intro}</p> : null}
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.title} className={`rounded-[1.25rem] border p-5 sm:p-6 ${styles.card}`}>
            <h3 className={`flex items-start gap-2.5 text-lg font-semibold ${styles.title}`}>
              <Icon size={20} aria-hidden="true" className="mt-0.5 shrink-0" />
              {item.title}
            </h3>
            <p className="mt-2 pl-8 text-base leading-7 text-slate-600">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TextBlock({
  heading,
  paragraphs,
}: {
  heading: string;
  paragraphs: string[];
}) {
  return (
    <section aria-labelledby={headingId(heading)} className="scroll-mt-24">
      <h2 id={headingId(heading)} className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
        {heading}
      </h2>
      <div className="mt-4 max-w-3xl space-y-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-base leading-8 text-slate-600">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

export function HonestNote({ children }: { children: React.ReactNode }) {
  return (
    <aside className="flex gap-3 rounded-[1.25rem] border border-blue-100 bg-blue-50/70 p-5 text-base leading-7 text-blue-900 sm:p-6">
      <ShieldCheck size={22} aria-hidden="true" className="mt-0.5 shrink-0" />
      <p>{children}</p>
    </aside>
  );
}

export function HelpCta({ situation }: { situation: string }) {
  return (
    <section aria-labelledby="help-cta-title" className="scroll-mt-24">
      <div className="overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-slate-950 via-[#071426] to-[#102443] p-8 text-white shadow-[0_30px_100px_rgba(3,7,18,0.25)] sm:p-10">
        <h2 id="help-cta-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Нужен разбор именно вашей ситуации?
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-8 text-slate-300">
          Пройдите короткую диагностику на главной странице и опишите ситуацию: {situation}. Пароли,
          SMS-коды и резервные коды указывать не нужно — чувствительные действия вы всегда выполняете сами.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#request"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2F80ED] px-6 py-3.5 font-semibold text-white shadow-[0_12px_40px_rgba(47,128,237,0.3)] transition hover:bg-[#1f6ed0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Пройти диагностику и оставить заявку <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:border-white/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <MessageCircleMore size={18} aria-hidden="true" /> Написать в Telegram
          </a>
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-400">
          Результат зависит от решения площадки и доступных способов подтверждения. Гарантий полного
          восстановления доступа нет — сначала честная оценка ситуации.
        </p>
      </div>
    </section>
  );
}

export interface RelatedItem {
  href: string;
  label: string;
  description: string;
  external?: boolean;
}

export function RelatedMaterials({ items }: { items: RelatedItem[] }) {
  return (
    <nav aria-labelledby="related-materials-title" className="scroll-mt-24">
      <h2 id="related-materials-title" className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
        Связанные материалы
      </h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item) => {
          const content = (
            <>
              <span className="flex items-start justify-between gap-3 text-lg font-semibold text-slate-950">
                {item.label}
                {item.external ? (
                  <ArrowUpRight size={18} aria-hidden="true" className="mt-1 shrink-0 text-slate-400" />
                ) : (
                  <ArrowRight size={18} aria-hidden="true" className="mt-1 shrink-0 text-[#2F80ED]" />
                )}
              </span>
              <span className="mt-2 block text-base leading-7 text-slate-600">{item.description}</span>
            </>
          );
          const classes =
            "block h-full rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-[0_14px_50px_rgba(8,15,35,0.05)] transition hover:-translate-y-0.5 hover:border-[#2F80ED]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] focus-visible:ring-offset-2";
          return (
            <li key={item.href}>
              {item.external ? (
                <a href={item.href} target="_blank" rel="noreferrer" className={classes}>
                  {content}
                </a>
              ) : (
                <Link href={item.href} className={classes}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function headingId(heading: string): string {
  const slug = heading
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, "-")
    .replace(/(^-|-$)/g, "");
  return `section-${slug}`;
}
