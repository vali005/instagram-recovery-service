"use client";

import {
  useEffect,
  useId,
  useReducer,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Copy,
  MessageCircleMore,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { diagnosticPlatforms, diagnosticSituations } from "@/utils/catalog.mjs";
import {
  REQUEST_STATUS,
  composeRequestMessage,
  createRequestState,
  reduceRequestState,
  validateRequestDraft,
} from "@/utils/request-state.mjs";

const TELEGRAM_URL = "https://t.me/razblokirovka_instagram777";
const PHONE_HREF = process.env.NEXT_PUBLIC_RECOVERY_PHONE_HREF;
const PHONE_LABEL = process.env.NEXT_PUBLIC_RECOVERY_PHONE_LABEL;

type Diagnosis = { platform: string; situation: string };
type Draft = {
  platform: string;
  situation: string;
  description: string;
  contact: string;
  consent: boolean;
};

const EMPTY_DRAFT: Draft = {
  platform: "",
  situation: "",
  description: "",
  contact: "",
  consent: false,
};

export function RequestSection() {
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [state, dispatch] = useReducer(reduceRequestState, undefined, createRequestState);
  const [preparedMessage, setPreparedMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const successRef = useRef<HTMLDivElement | null>(null);

  const consentId = useId();
  const secretsWarningId = useId();
  const statusId = useId();

  useEffect(() => {
    function applyDiagnosis(value: Diagnosis) {
      setDraft((prev) => ({
        ...prev,
        platform: value.platform || prev.platform,
        situation: value.situation || prev.situation,
      }));
      dispatch({ type: "field-change" });
    }
    const saved = sessionStorage.getItem("recoveryDiagnosis");
    if (saved) {
      try {
        applyDiagnosis(JSON.parse(saved) as Diagnosis);
      } catch {
        /* ignore invalid local data */
      }
    }
    const onDiagnosis = (event: Event) =>
      applyDiagnosis((event as CustomEvent<Diagnosis>).detail);
    window.addEventListener("recovery:diagnosis", onDiagnosis);
    return () => window.removeEventListener("recovery:diagnosis", onDiagnosis);
  }, []);

  useEffect(() => {
    if (state.status === REQUEST_STATUS.success) {
      successRef.current?.focus();
    }
  }, [state.status]);

  function updateField<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
    dispatch({ type: "field-change" });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({ type: "submit" });
    const problems = validateRequestDraft(draft);
    if (problems.length > 0) {
      dispatch({ type: "validation-failed", message: problems.join(" ") });
      return;
    }
    setPreparedMessage(composeRequestMessage(draft));
    setCopied(false);
    dispatch({ type: "prepared" });
  }

  function resetToEditing() {
    dispatch({ type: "reset" });
    setPreparedMessage("");
    setCopied(false);
  }

  async function copyPreparedMessage() {
    try {
      await navigator.clipboard.writeText(preparedMessage);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const isSuccess = state.status === REQUEST_STATUS.success;
  const isError = state.status === REQUEST_STATUS.error;
  const isChecking = state.status === REQUEST_STATUS.checking;
  const submitDisabled = !draft.consent || isChecking || isSuccess;
  const telegramDraftUrl = preparedMessage
    ? `${TELEGRAM_URL}?text=${encodeURIComponent(preparedMessage)}`
    : TELEGRAM_URL;

  return (
    <section id="request" aria-labelledby="request-title" className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-[#071426] to-[#102443] text-white shadow-[0_30px_100px_rgba(3,7,18,0.25)]">
          <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
            <div className="border-b border-white/10 p-8 sm:p-12 lg:border-b-0 lg:border-r lg:p-14">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#8BC4FF]">Следующий шаг</p>
              <h2 id="request-title" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Подготовьте безопасное обращение за минуту.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Ответы диагностики уже подставятся в форму. Проверьте текст и одним явным действием
                откройте Telegram — сайт ничего не отправляет без вас.
              </p>
              <ol className="mt-8 space-y-3 text-sm leading-6 text-slate-200">
                <li className="flex gap-3"><span aria-hidden="true" className="font-semibold text-[#8BC4FF]">1.</span> Опишите ситуацию без паролей и кодов.</li>
                <li className="flex gap-3"><span aria-hidden="true" className="font-semibold text-[#8BC4FF]">2.</span> Проверьте готовый текст перед передачей.</li>
                <li className="flex gap-3"><span aria-hidden="true" className="font-semibold text-[#8BC4FF]">3.</span> Откройте Telegram с подготовленным черновиком и отправьте его сами.</li>
              </ol>
              <ul className="mt-8 space-y-4 text-sm leading-6 text-slate-200">
                <li className="flex gap-3"><ShieldCheck size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-300" /> Чувствительные действия выполняете только вы.</li>
                <li className="flex gap-3"><CheckCircle2 size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-emerald-300" /> Достаточно площадки и краткого описания.</li>
              </ul>
              {PHONE_HREF && PHONE_LABEL ? (
                <a href={PHONE_HREF} className="mt-8 inline-flex items-center gap-2 rounded text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                  Или позвоните: {PHONE_LABEL} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ) : null}
            </div>

            <div className="p-8 sm:p-12 lg:p-14">
              {isSuccess ? (
                <div ref={successRef} tabIndex={-1} data-testid="request-success" className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]" aria-live="polite">
                  <p className="flex items-center gap-2 text-lg font-semibold text-emerald-300">
                    <CheckCircle2 size={20} aria-hidden="true" /> Обращение подготовлено
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-200">
                    Ничего не отправлено автоматически. Ниже — точный состав ваших данных.
                    Он будет передан Telegram только после вашего нажатия на кнопку ниже.
                  </p>
                  <pre data-testid="request-preview" className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-950/75 p-4 text-sm leading-6 text-slate-100">{preparedMessage}</pre>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={telegramDraftUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1D63C9] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#164F9F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      <MessageCircleMore size={16} aria-hidden="true" /> Открыть Telegram с текстом
                    </a>
                    <button
                      type="button"
                      onClick={copyPreparedMessage}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      <Copy size={16} aria-hidden="true" /> {copied ? "Текст скопирован" : "Скопировать вместо этого"}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={resetToEditing}
                    data-testid="request-edit-again"
                    className="mt-5 inline-flex items-center gap-2 rounded text-sm font-semibold text-[#8BC4FF] underline decoration-white/30 underline-offset-4 hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]"
                  >
                    Изменить данные
                  </button>
                  <p className="mt-4 text-xs leading-5 text-slate-300">
                    Сообщение уходит только по вашему действию во внешнем мессенджере. Сайт не передаёт его сам.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-slate-200">
                      <span className="mb-2 block">Площадка</span>
                      <select
                        name="platform"
                        value={draft.platform}
                        onChange={(event) => updateField("platform", event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none transition focus-visible:border-[#8BC4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]"
                      >
                        <option value="">Выберите площадку</option>
                        {diagnosticPlatforms.map((item) => <option key={item}>{item}</option>)}
                      </select>
                    </label>
                    <label className="block text-sm text-slate-200">
                      <span className="mb-2 block">Что произошло</span>
                      <select
                        name="situation"
                        value={draft.situation}
                        onChange={(event) => updateField("situation", event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none transition focus-visible:border-[#8BC4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]"
                      >
                        <option value="">Выберите ситуацию</option>
                        {diagnosticSituations.map((item) => <option key={item}>{item}</option>)}
                      </select>
                    </label>
                  </div>

                  <label htmlFor="request-description" className="mt-4 block text-sm text-slate-200">
                    <span className="mb-2 block">Коротко опишите ситуацию (необязательно)</span>
                    <textarea
                      id="request-description"
                      name="description"
                      rows={4}
                      maxLength={800}
                      value={draft.description}
                      onChange={(event) => updateField("description", event.target.value)}
                      aria-describedby={secretsWarningId}
                      placeholder="Что произошло, когда пропал доступ, какие способы подтверждения остались."
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus-visible:border-[#8BC4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]"
                    />
                  </label>

                  <label htmlFor="request-contact" className="mt-4 block text-sm text-slate-200">
                    <span className="mb-2 block">Дополнительный контакт (необязательно)</span>
                    <input
                      id="request-contact"
                      name="contact"
                      type="text"
                      autoComplete="off"
                      value={draft.contact}
                      onChange={(event) => updateField("contact", event.target.value)}
                      placeholder="Только если ответ нужен не в Telegram"
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus-visible:border-[#8BC4FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]"
                    />
                  </label>

                  <div id={secretsWarningId} role="note" data-testid="secrets-warning" className="mt-5 flex gap-3 rounded-2xl border border-amber-300/40 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
                    <ShieldAlert size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-amber-300" />
                    <p>
                      <strong className="font-semibold text-amber-200">Не указывайте секретные данные:</strong>{" "}
                      пароли, SMS-коды и коды подтверждения, резервные коды, данные документов,
                      платёжные реквизиты и доступ к почте. Они не нужны для оценки ситуации,
                      а их передача опасна.
                    </p>
                  </div>

                  <div className="mt-5 flex items-start gap-3 text-sm leading-6 text-slate-200">
                    <input
                      id={consentId}
                      name="consent"
                      type="checkbox"
                      checked={draft.consent}
                      onChange={(event) => updateField("consent", event.target.checked)}
                      aria-describedby={statusId}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-white/30 accent-[#1D63C9]"
                    />
                    <label htmlFor={consentId}>
                      Я понимаю, что сайт только подготовит черновик, а данные будут переданы внешнему
                      сервису лишь после моего действия. Условия описаны в{" "}
                      <Link
                        href="/privacy-policy"
                        className="rounded font-semibold text-[#8BC4FF] underline decoration-white/30 underline-offset-4 hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF]"
                      >
                        политике конфиденциальности
                      </Link>
                      .
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={submitDisabled}
                    data-testid="request-submit"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1D63C9] px-6 py-3.5 font-semibold text-white shadow-[0_12px_40px_rgba(47,128,237,0.3)] transition hover:bg-[#164F9F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8BC4FF] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:shadow-none"
                  >
                    <MessageCircleMore size={19} aria-hidden="true" />
                    {isChecking ? "Проверяем данные…" : "Подготовить сообщение"}
                  </button>

                  <div aria-live="polite" id={statusId} className="sr-only">
                    {isChecking ? "Проверка введённых данных." : ""}
                    {isError ? `Ошибка проверки. ${state.error}` : ""}
                  </div>
                  {isError ? (
                    <p role="alert" data-testid="request-error" className="mt-4 rounded-2xl border border-red-400/40 bg-red-400/10 p-4 text-sm leading-6 text-red-100">
                      {state.error}
                    </p>
                  ) : null}

                  <p className="mt-4 text-center text-xs leading-5 text-slate-300">
                    Кнопка активна после подтверждения. Черновик формируется только в браузере;
                    отправку в Telegram подтверждаете вы сами.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
