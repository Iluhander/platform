import Main from "@/views/Main/page"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Визуальные новеллы | UwU Novels',
  applicationName: 'UwU Novels',
  description: "Находите и играйте в визуальные новеллы онлайн",
  keywords: ['Новелла', 'Визуальная новелла', 'Аниме', 'поиск', 'играть', 'search', 'play', 'Visual Novel', 'UwU Novels'],
  icons: {
    icon: '/favicon.png'
  },
  openGraph: {
    type: 'website',
    siteName: 'UwU Novels',
    locale: 'ru_RU',
    title: 'Визуальные новеллы | UwU Novels',
    description: 'Находите и играйте в визуальные новеллы онлайн',
    images: [{
      url: '/opengraph-image.png'
    }]
  }
};

export default function MainPage() {
  return <Main />;
};
