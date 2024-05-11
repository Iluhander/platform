import { $serverApi } from "@/shared/common/api/http";
import { INovel, INovelSearch, IPage } from "@/shared/common/model";
import { MarketPlace } from "@/views/Market";
import { checkSuccessStatus } from "@iluhander/uwu-react";
import { Metadata } from "next";

type IMarketPlaceDataWrapperProps = {
  searchParams: INovelSearch;
}

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Визуальные новеллы | UwU Novels",
  applicationName: 'UwU Novels',
  description: "Находите визуальные новеллы и играйте в них онлайн",
  keywords: ['Новелла', 'Визуальная новелла', 'Аниме', 'играть', 'форум', 'Visual Novel', 'UwU Novels'],
  icons: {
    icon: '/favicon.png'
  },
  openGraph: {
    url: 'https://uwunovels.com',
  }
};

export default async function MarketPlaceDataWrapper(props: IMarketPlaceDataWrapperProps) {
  let initalData: IPage<INovel> = { index: 0, data: [], maxCount: 0 };

  const params = new URLSearchParams(props.searchParams as any).toString();
  const { data, status } = await $serverApi.post(`/novel/page?${params}`, {});
  if (checkSuccessStatus(status)) {
    initalData = data;
  }

  return <MarketPlace initialData={initalData} />;
}
