import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import './globals.scss';

const mulish = Mulish({ subsets: ["latin", "cyrillic-ext"] });

export const metadata: Metadata = {
  metadataBase: new URL(String(process.env.NEXT_PUBLIC_ORIGIN)),
  title: "UwU Novels",
  applicationName: 'UwU Novels',
  description: "UwU Novels. Cutting-edge visual novel platform",
  keywords: "Visual novel, Novel, Anime, UwU",  
  icons: {
    icon: '/favicon.ico'
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
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
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={mulish.className} style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
