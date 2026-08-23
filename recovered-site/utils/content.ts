import { Eye, Fingerprint, KeyRound, Lock, MessageCircle, Phone, SearchCheck, Send, Shield, Smartphone, Sparkles, Trash2, UserRoundCheck } from "lucide-react";
import type { BenefitItem, FaqItem, ServiceItem } from "@/types/content";

export const services: ServiceItem[] = [
  {
    title: "Аккаунт заблокирован",
    description: "Разбор причины ограничения, проверка доступных апелляций и подготовка последовательности действий.",
    icon: Lock,
    href: "/account-blocked",
  },
  {
    title: "Аккаунт взломали",
    description: "Помощь при смене почты, номера или пароля посторонним человеком и защита после возврата доступа.",
    icon: Shield,
    href: "/account-hacked",
  },
  {
    title: "Нет доступа к почте или номеру",
    description: "Поиск подходящего официального сценария подтверждения личности и восстановления контактов.",
    icon: KeyRound,
    href: "/no-phone-email-access",
  },
  {
    title: "Не приходит код входа",
    description: "Проверка причин, из-за которых код задерживается или не принимается, без хаотичных повторных запросов.",
    icon: SearchCheck,
    href: "/login-code-not-arriving",
  },
  {
    title: "Удаление старого профиля",
    description: "Помощь с обращением по забытому, дублирующему или недоступному аккаунту.",
    icon: Trash2,
  },
  {
    title: "Защита после восстановления",
    description: "Настройка двухфакторной защиты, резервных контактов и понятного плана на случай повторной проблемы.",
    icon: Shield,
    href: "/account-protection-guide",
  },
];

export { diagnosticPlatforms, diagnosticSituations } from "./catalog.mjs";

export const platforms = [
  "Instagram",
  "Telegram",
  "VK",
  "OK",
  "Facebook",
  "TikTok",
  "X",
  "WhatsApp",
];

export const benefits: BenefitItem[] = [
  {
    title: "Конфиденциальность",
    description: "Никто не узнает о вашей ситуации: все действия проходят с соблюдением приватности.",
    icon: Eye,
  },
  {
    title: "Честная оценка",
    description: "Сначала объясняю, какие варианты действительно доступны и от чего зависит результат.",
    icon: SearchCheck,
  },
  {
    title: "Без лишних действий",
    description: "Помогаю не усугубить ситуацию повторными входами, кодами и несогласованными обращениями.",
    icon: Fingerprint,
  },
  {
    title: "Безопасная работа",
    description: "Не запрашиваю пароль, SMS-коды и резервные коды. Используются официальные процедуры площадок.",
    icon: Shield,
  },
  {
    title: "Индивидуальный подход",
    description: "Каждая ситуация рассматривается персонально, без шаблонных решений.",
    icon: UserRoundCheck,
  },
  {
    title: "Поддержка после восстановления",
    description: "Помогаю закрепить доступ и настроить защиту, чтобы избежать повторных проблем.",
    icon: Sparkles,
  },
];

export const steps = [
  "Вы описываете ситуацию",
  "Проверяем доступные варианты",
  "Проходим официальный путь",
  "Закрепляем доступ и защиту",
];

export const faqs: FaqItem[] = [
  {
    question: "Сколько времени занимает восстановление?",
    answer: "Срок зависит от площадки, типа ограничения и доступных способов подтверждения. После первичной оценки я объясню реалистичный порядок действий без обещаний точного срока.",
  },
  {
    question: "Насколько это безопасно?",
    answer: "Работа строится на официальных процедурах площадок. Я не прошу пароль, SMS-код или резервные коды и заранее объясняю каждый шаг.",
  },
  {
    question: "Что если аккаунт уже взломан?",
    answer: "Зафиксируйте доступные устройства и письма от платформы, не передавайте никому коды и не выполняйте десятки попыток входа подряд. Затем опишите, какие данные уже изменились.",
  },
  {
    question: "Работаете ли вы с Telegram?",
    answer: "Да, можно разобрать потерю доступа, смену номера, компрометацию сессии и базовые настройки безопасности.",
  },
  {
    question: "Можно ли помочь без потери данных?",
    answer: "Сохранность данных зависит от состояния аккаунта и решений самой площадки. До начала действий я отмечу риски и помогу выбрать наиболее бережный сценарий.",
  },
  {
    question: "Нужно ли предоставлять пароли?",
    answer: "Нет. Пароли, SMS-коды и резервные коды должны оставаться только у владельца. Для диагностики достаточно описания ситуации и общедоступной ссылки на профиль.",
  },
  {
    question: "Что делать, если аккаунт заблокирован навсегда?",
    answer: "Сначала проверяем причину и доступность официальной апелляции. Если реального пути нет, я скажу об этом прямо и не буду обещать невозможного.",
  },
  {
    question: "Есть ли поддержка после восстановления?",
    answer: "Да, после восстановления вы получаете рекомендации по защите и при необходимости продолжаем сопровождать.",
  },
  {
    question: "Работаете ли вы с несколькими аккаунтами?",
    answer: "Да, можно восстановить и защитить несколько профилей в рамках одного обращения.",
  },
  {
    question: "Как оставить заявку?",
    answer: "Пройдите короткую диагностику на сайте, затем отправьте сформированное описание в Telegram или свяжитесь по телефону.",
  },
];

const publicPhoneHref = process.env.NEXT_PUBLIC_RECOVERY_PHONE_HREF;
const publicEmailHref = process.env.NEXT_PUBLIC_RECOVERY_EMAIL_HREF;

export const contactChannels = [
  { label: "Telegram", href: "https://t.me/razblokirovka_instagram777", icon: MessageCircle },
  { label: "Instagram", href: "https://instagram.com/ziyava_unlocking", icon: Smartphone },
  ...(publicPhoneHref ? [{ label: "Телефон", href: publicPhoneHref, icon: Phone }] : []),
  ...(publicEmailHref ? [{ label: "Email", href: publicEmailHref, icon: Send }] : []),
];

