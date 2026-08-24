export const SITE_URL = "https://recovered-social-recovery.ppnt2qf6z9.chatgpt.site";

export const knowledgeBaseHref = "/knowledge-base";

export const defaultOgImage = {
  url: "/og-image.svg",
  width: 1200,
  height: 630,
  alt: "Recovery — безопасная помощь в восстановлении доступа к аккаунтам",
};

export function openGraphMetadata(input: { title: string; description: string; url: string }) {
  return {
    title: input.title,
    description: input.description,
    url: input.url,
    siteName: "Recovery",
    locale: "ru_RU",
    images: [defaultOgImage],
    type: "article" as const,
  };
}
