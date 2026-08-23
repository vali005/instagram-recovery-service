import type { Metadata } from "next";
import Link from "next/link";
import { SubpageFrame } from "@/components/layout/subpage-frame";
import { JsonLd } from "@/components/layout/json-ld";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SITE_URL } from "@/utils/site";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Какие данные вы вводите на сайте Recovery, зачем они нужны, как формируется обращение и почему сайт не передаёт данные автоматически.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Политика конфиденциальности — Recovery",
    description:
      "Честное описание данных, которые вводит пользователь, целей их обработки и ограничений сайта.",
    url: "/privacy-policy",
    type: "article",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Политика конфиденциальности",
  url: `${SITE_URL}/privacy-policy`,
  description:
    "Описание данных, которые пользователь вводит на сайте Recovery, целей их использования и ограничений: автоматическая внешняя передача данных отсутствует.",
  inLanguage: "ru-RU",
  isPartOf: { "@type": "WebSite", name: "Recovery", url: SITE_URL },
};

const collectedFields: { term: string; description: string }[] = [
  {
    term: "Площадка и ситуация",
    description:
      "Выбираются в короткой диагностике или в форме обращения: какая социальная сеть затронута и что произошло. Это нужно, чтобы подобрать подходящий официальный сценарий восстановления.",
  },
  {
    term: "Описание ситуации (необязательно)",
    description:
      "Свободный текст до 800 символов. Помогает заранее понять контекст и подготовить осмысленный первый ответ. Заполнять не обязательно.",
  },
  {
    term: "Способ связи",
    description:
      "Один контакт для ответа — например, ник в мессенджере. Нужен только для того, чтобы вы получили ответ на обращение.",
  },
  {
    term: "Согласие на обработку",
    description:
      "Отметка подтверждает, что вы разрешили использовать введённые данные для подготовки и ответа на ваше обращение. Без этой отметки кнопка формирования обращения остаётся неактивной.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <SubpageFrame>
      <article className="bg-[#030712]">
        <section className="px-6 pb-12 pt-10 sm:px-8 sm:pb-14 sm:pt-12 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Политика конфиденциальности" },
              ]}
            />
            <p className="mt-8 text-sm font-medium uppercase tracking-[0.25em] text-[#8BC4FF]">Приватность</p>
            <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Политика конфиденциальности
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              В этом документе честно описано, какие данные вы можете ввести на сайте,
              зачем они нужны и что происходит с ними дальше — включая ограничения,
              о которых мы предпочитаем говорить прямо.
            </p>
          </div>
        </section>

        <div className="bg-[#f8fafc] px-6 py-14 text-slate-900 sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-4xl space-y-12">
            <section aria-labelledby="pp-what" className="scroll-mt-24">
              <h2 id="pp-what" className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Какие данные вы вводите
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                Форма обращения собирает минимально необходимое. Мы сознательно не запрашиваем
                данные, которые могут навредить вам при утечке.
              </p>
              <dl className="mt-6 space-y-4">
                {collectedFields.map((field) => (
                  <div key={field.term} className="rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-[0_14px_50px_rgba(8,15,35,0.06)]">
                    <dt className="font-semibold text-slate-950">{field.term}</dt>
                    <dd className="mt-2 text-base leading-7 text-slate-600">{field.description}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                Никогда не вводите на сайте и не присылайте в сообщении пароли, SMS-коды и коды
                подтверждения, резервные коды, сканы документов, платёжные реквизиты или доступ к почте.
                Для оценки ситуации эти данные не нужны. Форма не содержит полей для таких сведений.
              </p>
            </section>

            <section aria-labelledby="pp-why" className="scroll-mt-24">
              <h2 id="pp-why" className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Зачем нужны эти данные
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Единственная цель — составить понятный текст вашего обращения и ответить на него.
                Ответы диагностики используются только внутри страницы, чтобы показать рекомендацию
                и подходящий материал базы знаний.
              </p>
            </section>

            <section aria-labelledby="pp-transfer" className="scroll-mt-24">
              <h2 id="pp-transfer" className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Куда и когда передаются данные
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Сайт не передаёт введённые данные никуда и никому автоматически: ни при выборе ответов,
                ни при загрузке страницы, ни при формировании обращения. Обращение создаётся
                в вашем браузере и остаётся на вашем устройстве.
              </p>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Данные покидают устройство только тогда, когда вы сами отправляете подготовленный текст
                в выбранный вами канал связи — например, пишете сообщение в мессенджере. Дальше к ним
                применяются правила того сервиса, которым вы воспользовались.
              </p>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Переход по внешним ссылкам (мессенджеры, материалы) подчиняется политикам соответствующих
                сервисов. Рекомендуем ознакомиться с их условиями отдельно.
              </p>
            </section>

            <section aria-labelledby="pp-limits" className="scroll-mt-24">
              <h2 id="pp-limits" className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Важные ограничения
              </h2>
              <ul className="mt-4 space-y-3 text-base leading-7 text-slate-600">
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F80ED]" />
                  На сайте пока не настроен защищённый серверный канал приёма заявок, поэтому автоматическая
                  внешняя отправка данных не предусмотрена: сайт показывает подготовленное обращение
                  и оставляет отправку за вами.
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F80ED]" />
                  Мы не утверждаем, что введённые данные хранятся на наших серверах, шифруются,
                  удаляются по расписанию или никогда не попадают третьим лицам: соответствующей
                  инфраструктуры у сайта нет, а передача зависит от выбранного вами канала связи.
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2F80ED]" />
                  Черновик обращения и выбранные ответы диагностики сохраняются только в памяти вашего
                  браузера. Вы можете удалить их, закрыв страницу или очистив данные сайта.
                </li>
              </ul>
            </section>

            <section aria-labelledby="pp-consent" className="scroll-mt-24">
              <h2 id="pp-consent" className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Согласие и его отзыв
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Отмечая согласие в форме, вы разрешаете использовать введённые данные для подготовки
                и ответа на обращение. Согласие вступает в силу только после того, как вы сами отправили
                подготовленный текст. Если вы передумали — просто не отправляйте сообщение и очистите
                форму в браузере: никаких данных к этому моменту не передано.
              </p>
            </section>

            <section aria-labelledby="pp-contact" className="scroll-mt-24">
              <h2 id="pp-contact" className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Вопросы о приватности
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Если у вас есть вопрос об обработке данных, задайте его через любой канал связи,
                указанный в подвале сайта, — до того, как отправите своё обращение.
              </p>
              <Link
                href="/knowledge-base"
                className="mt-4 inline-flex items-center gap-2 rounded font-semibold text-[#2F80ED] hover:text-[#1f6ed0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F80ED] focus-visible:ring-offset-2"
              >
                Смежные вопросы в базе знаний <span aria-hidden="true">→</span>
              </Link>
            </section>
          </div>
        </div>
      </article>

      <JsonLd data={schema} />
    </SubpageFrame>
  );
}
