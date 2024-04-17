import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import './globals.scss';

const mulish = Mulish({ subsets: ["latin", "cyrillic-ext"] });

export const metadata: Metadata = {
  metadataBase: new URL(String(process.env.NEXT_PUBLIC_ORIGIN)),
  title: "UwU Novels",
  applicationName: 'UwU Novels',
  description: "UwU Novels | Платформа для создания и чтения визуальных новелл",
  keywords: "Visual novel, Novel, Anime, UwU, Визуальные новеллы, Аниме",
  icons: {
    icon: '/favicon.ico'
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    images: [{
      url: '/opengraph-image.png'
    }]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <link rel="prefetch" href="https://api.uwunovels.com/static/engine/origin/master/Build/Edit/Web_edit.wasm.gz" />
      <link rel="prefetch" href="https://api.uwunovels.com/static/engine/origin/master/Build/Edit/Web_edit.data.gz" />
      <link rel="prefetch" href="https://api.uwunovels.com/static/engine/origin/master/Build/Edit/Web_edit.framework.js.gz" />
      <link rel="prefetch" href="https://api.uwunovels.com/static/engine/origin/master/Build/Play/Web_game.wasm.gz" />
      <link rel="prefetch" href="https://api.uwunovels.com/static/engine/origin/master/Build/Play/Web_game.data.gz" />
      <link rel="prefetch" href="https://api.uwunovels.com/static/engine/origin/master/Build/Play/Web_game.framework.js.gz" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={mulish.className} style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
