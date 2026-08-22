import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://recovered-social-recovery.ppnt2qf6z9.chatgpt.site"),
  title: "Recovery — восстановление доступа",
  description:
    "Безопасная помощь при блокировке, взломе и потере доступа к Instagram, Telegram, VK и другим аккаунтам. Диагностика ситуации и понятный план действий.",
  keywords: [
    "разблокировка аккаунтов",
    "восстановление аккаунтов",
    "взлом аккаунта",
    "восстановление Telegram",
    "восстановление Instagram",
    "восстановление VK",
    "восстановление Facebook",
    "восстановление TikTok",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Разблокировка и восстановление аккаунтов социальных сетей",
    description:
      "Помощь при блокировке, взломе и потере доступа. Без паролей, SMS-кодов и сомнительных методов.",
    url: "https://recovered-social-recovery.ppnt2qf6z9.chatgpt.site",
    siteName: "Recovery",
    images: ["/og-image.svg"],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Разблокировка и восстановление аккаунтов",
    description:
      "Безопасная диагностика и помощь с восстановлением доступа к аккаунтам.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { url: "/favicon.svg", rel: "shortcut icon" },
    ],
    apple: [{ url: "/favicon.svg" }],
  },
  other: {
    "theme-color": "#050b18",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#030712] text-slate-50">{children}</body>
    </html>
  );
}
