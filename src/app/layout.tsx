import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import './globals.scss';

const mulish = Mulish({ subsets: ["latin", "cyrillic-ext"] });

export const metadata: Metadata = {
  title: "UwU Novels",
  description: "UwU Novels. Cutting-edge visual novel platform",
  keywords: "Visual novel, Novel, Anime, UwU",  
  icons: {
    icon: '/favicon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <link rel="icon" href="/img/favicon.ico" sizes="any" />
      <body className={mulish.className} style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
