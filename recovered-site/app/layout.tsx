import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://recovered-social-recovery.ppnt2qf6z9.chatgpt.site"),
  title: {
    default: "Recovery — восстановление доступа к аккаунтам",
    template: "%s | Recovery",
  },
  description:
    "Безопасная помощь при блокировке, взломе и потере доступа к Instagram, Telegram, VK и другим аккаунтам. Диагностика ситуации и понятный план действий — без паролей и SMS-кодов.",
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
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Recovery — безопасная помощь в восстановлении доступа к аккаунтам",
      },
    ],
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
};

export const viewport: Viewport = {
  themeColor: "#050b18",
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
