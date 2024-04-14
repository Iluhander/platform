import { INovel, INovelSearch, IPage } from "@/shared/common/model";
import MarketPlace from "@/views/Market/page";
import axios from "axios";
import { Metadata } from "next";

type IMarketPlaceDataWrapperProps = {
  searchParams: INovelSearch;
}

export const metadata: Metadata = {
  title: "Визуальные новеллы | UwU Novels",
  applicationName: 'UwU Novels',
  description: "Находите визуальные новеллы и играйте в них онлайн",
  keywords: ['Новелла', 'Визуальная новелла', 'Аниме', 'играть', 'форум', 'Visual Novel', 'UwU Novels'],
  icons: {
    icon: '/favicon.png'
  }
};

export default async function MarketPlaceDataWrapper(props: IMarketPlaceDataWrapperProps) {
  let initalData: IPage<INovel> = { index: 0, data: [], maxCount: 0 };
  
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/novel/novels-list`, props.searchParams); 

    initalData = data;
  } catch (e) {
    console.log(e);
  }

  return <MarketPlace initialData={initalData} />;
}
