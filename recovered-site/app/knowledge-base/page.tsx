import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { SubpageFrame } from "@/components/layout/subpage-frame";
import { JsonLd } from "@/components/layout/json-ld";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { RelatedMaterials } from "@/components/pages/article-parts";
import { SITE_URL } from "@/utils/site";

export const metadata: Metadata = {
  title: "База знаний — вопросы о восстановлении доступа к аккаунтам",
  description:
    "База знаний Recovery: разборы типовых ситуаций, правила безопасности при восстановлении аккаунтов, порядок работы сервиса и честные границы возможной помощи.",
  alternates: {
    canonical: "/knowledge-base",
  },
  openGraph: {
    title: "База знаний Recovery — ответы о восстановлении доступа",
    description:
      "Типовые ситуации, безопасность данных, границы помощи и порядок работы — собраны в одном разделе.",
    url: "/knowledge-base",
    type: "article",
  },
};

interface KnowledgeEntry {
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

const groups: { id: string; title: string; intro: string; entries: KnowledgeEntry[] }[] = [
  {
    id: "kb-situations",
    title: "Разбор типовых ситуаций",
    intro: "Короткие ответы по каждой частой проблеме со ссылкой на подробное руководство.",
    entries: [
      {
        question: "Аккаунт заблокировали — это навсегда?",
        answer:
          "Не обязательно. Часть ограничений накладывается автоматикой и снимается после проверки или апелляции. Сначала нужно определить причину и тип блокировки, затем использовать официальный способ обращения площадки.",
        link: { href: "/account-blocked", label: "Читать разбор ситуации" },
      },
      {
        question: "Как понять, что аккаунт взломали?",
        answer:
          "Признаки: пароль перестал подходить, приходят уведомления о смене почты или номера, которых вы не делали, в истории входов незнакомые устройства, друзья получают странные сообщения от вашего имени.",
        link: { href: "/account-hacked", label: "Что делать при взломе" },
      },
      {
        question: "Можно ли вернуть доступ, если номер и почта уже недоступны?",
        answer:
          "Часто да: сначала восстанавливают сами контакты (перевыпуск сим-карты, восстановление ящика), затем используют официальные способы подтверждения владения. Если контакты вернуть нельзя — площадка может предложить альтернативные формы проверки.",
        link: { href: "/no-phone-email-access", label: "Порядок восстановления" },
      },
      {
        question: "Почему код входа не приходит?",
        answer:
          "Причины обычно на пути доставки: задержка оператора, папка «Спам», блокировка коротких номеров, переполненный ящик или лимиты площадки на количество запросов. Хаотичные повторные запросы только усугубляют ситуацию.",
        link: { href: "/login-code-not-arriving", label: "Что проверить сначала" },
      },
    ],
  },
  {
    id: "kb-security",
    title: "Безопасность и ваши данные",
    intro: "Правила, которые защищают вас от повторной потери аккаунта и мошенников.",
    entries: [
      {
        question: "Нужно ли сообщать пароль для разбора ситуации?",
        answer:
          "Нет, никогда. Пароли должны оставаться только у владельца. Для диагностики достаточно описания ситуации и общедоступной ссылки на профиль.",
      },
      {
        question: "Кому можно называть SMS-код или резервный код?",
        answer:
          "Никому. Настоящая поддержка площадок не запрашивает коды подтверждения. Любой звонящий или пишущий «сотрудник», который просит код, — мошенник, пытающийся завершить вход без вас.",
      },
      {
        question: "Как отличить официальное письмо площадки от фишинга?",
        answer:
          "Смотрите на домен отправителя и адреса ссылок: они должны принадлежать самой платформе. Официальные письма не просят прислать пароль или код ответным сообщением. Надёжнее всего открыть настройки аккаунта через приложение, а не по ссылке из письма.",
      },
      {
        question: "Что сделать сразу после возврата доступа?",
        answer:
          "Сменить пароль на уникальный, включить двухфакторную защиту через приложение-аутентификатор, завершить чужие сеансы, обновить резервные контакты и проверить подключённые приложения.",
        link: { href: "/account-protection-guide", label: "Полное руководство по защите" },
      },
    ],
  },
  {
    id: "kb-process",
    title: "Порядок работы и границы помощи",
    intro: "Как устроена работа сервиса и что мы принципиально не делаем.",
    entries: [
      {
        question: "Как проходит работа над ситуацией?",
        answer:
          "Вы описываете ситуацию через короткую диагностику на сайте или в мессенджере, мы определяем причину и доступные официальные сценарии, затем помогаем подготовить обращение и сопровождаем процесс. Все чувствительные действия — вход, ввод кодов, отправка данных площадке — выполняете только вы.",
      },
      {
        question: "Даёте ли вы гарантии восстановления?",
        answer:
          "Нет. Результат зависит от решения площадки и от того, какими способами подтверждения вы располагаете. Мы честно оцениваем перспективы до начала работы и не берёмся за заведомо невозможные случаи.",
      },
      {
        question: "Сколько времени занимает решение?",
        answer:
          "Зависит от площадки, типа ограничения и скорости её поддержки: от одного дня до нескольких недель. Точные сроки заранее не обещает никто, включая саму поддержку площадок.",
      },
      {
        question: "Используете ли вы неофициальные способы доступа?",
        answer:
          "Нет. Работа строится только на официальных процедурах площадок. Мы не занимаемся взломом, обходом защиты и не сотрудничаем с сервисами, которые это предлагают.",
      },
      {
        question: "Какие данные не стоит присылать в первом сообщении?",
        answer:
          "Пароли, SMS-коды, резервные коды, сканы документов и платежные реквизиты. Для первичной оценки этого не требуется, а лишние секретные данные повышают риски.",
      },
    ],
  },
];

const faqSchemaEntries = groups.flatMap((group) =>
  group.entries.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: entry.link ? `${entry.answer} Подробнее: ${entry.label}.` : entry.answer,
    },
  })),
);

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "База знаний Recovery",
      url: `${SITE_URL}/knowledge-base`,
      description:
        "Ответы на вопросы о восстановлении доступа к аккаунтам, безопасности данных и порядке работы сервиса.",
      inLanguage: "ru-RU",
      isPartOf: { "@type": "WebSite", name: "Recovery", url: SITE_URL },
      hasPart: groups.map((group) => ({
        "@type": "WebPage",
        name: group.title,
        description: group.intro,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqSchemaEntries,
    },
  ],
};

export default function KnowledgeBasePage() {
  return (
    <SubpageFrame>
      <article className="bg-[#030712]">
        <section className="px-6 pb-12 pt-10 sm:px-8 sm:pb-14 sm:pt-12 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "База знаний" },
              ]}
            />
            <p className="mt-8 text-sm font-medium uppercase tracking-[0.25em] text-[#8BC4FF]">База знаний</p>
            <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Вопросы и ответы о восстановлении доступа к аккаунтам
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Собрали здесь всё, о чём чаще всего спрашивают перед началом работы: типовые ситуации,
              правила безопасности и честные границы того, чем сервис может помочь.
            </p>

            <nav aria-label="Разделы базы знаний" className="mt-8">
              <ul className="flex flex-wrap gap-2">
                {groups.map((group) => (
                  <li key={group.id}>
                    <a
                      href={`#${group.id}`}
                      className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-[#60A5FA]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]"
                    >
                      {group.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        <div className="bg-[#f8fafc] px-6 py-14 text-slate-900 sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-4xl space-y-14">
            {groups.map((group) => (
              <section key={group.id} aria-labelledby={`${group.id}-title`} id={group.id} className="scroll-mt-24">
                <h2 id={`${group.id}-title`} className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                  {group.title}
                </h2>
                <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">{group.intro}</p>

                <div className="mt-6 space-y-4">
                  {group.entries.map((entry) => (
                    <details
                      key={entry.question}
                      className="group rounded-[1.25rem] border border-slate-200 bg-white shadow-[0_14px_50px_rgba(8,15,35,0.06)]"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden sm:px-6 sm:py-5">
                        <span className="text-lg font-semibold text-slate-950">{entry.question}</span>
                        <ChevronDown
                          size={20}
                          aria-hidden="true"
                          className="shrink-0 text-[#2F80ED] transition group-open:rotate-180"
                        />
                      </summary>
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                        <p className="text-base leading-8 text-slate-600">{entry.answer}</p>
                        {entry.link ? (
                          <Link
                            href={entry.link.href}
                            className="mt-3 inline-flex items-center gap-2 rounded text-sm font-semibold text-[#2F80ED] hover:text-[#1f6ed0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] focus-visible:ring-offset-2"
                          >
                            {entry.link.label}
                            <span aria-hidden="true">→</span>
                          </Link>
                        ) : null}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}

            <RelatedMaterials
              items={[
                {
                  href: "/account-blocked",
                  label: "Аккаунт заблокирован",
                  description: "Полный разбор причин ограничений и безопасного порядка апелляции.",
                },
                {
                  href: "/account-hacked",
                  label: "Аккаунт взломан",
                  description: "Первые шаги при компрометации и защита после возврата доступа.",
                },
                {
                  href: "/no-phone-email-access",
                  label: "Нет доступа к телефону или почте",
                  description: "Восстановление входа без привязанных контактов.",
                },
                {
                  href: "/login-code-not-arriving",
                  label: "Не приходит код входа",
                  description: "Причины недоставки кодов и правильные действия.",
                },
              ]}
            />
          </div>
        </div>
      </article>

      <JsonLd data={schema} />
    </SubpageFrame>
  );
}
