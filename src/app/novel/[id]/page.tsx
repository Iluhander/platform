import $serverApi from "@/shared/common/api/http/serverApi";
import { INovel } from "@/shared/common/model";
import NovelPage from "@/views/Novel";
import { AxiosResponse } from "axios";
import { notFound } from "next/navigation";

interface INovelPageProps {
  params: { id: string };
}

export async function generateMetadata(props: INovelPageProps) {
  let res: AxiosResponse;
  try {
    res = await $serverApi.get(`/novel/${props.params.id}`);
  } catch (e) {
    return {};
  }
  
  const data = res.data;

  const title = `${(data.title || 'Визуальная новелла')} | UwU Novels`;
  const description = `Играйте онлайн в визуальную новеллу новеллу от ${data.author?.username}`;

  return {
    title,
    description,
    keywords: ['Новелла', 'Визуальная новелла', 'Аниме', 'игра', 'онлайн', 'play', 'Visual Novel', 'UwU Novels'],
    authors: [{ name: data.author?.username }],
    creator: data.author?.username,
    publisher: 'UwU Novels',
    openGraph: {
      type: 'website',
      siteName: 'UwU Novels',
      locale: 'ru_RU',
      title,
      description,
      images: [{
        url: `${process.env.NEXT_PUBLIC_BACKEND}/static/post/cover/${data.id}?v=${data.coverVersion}`
      }],
    }
  };
} 

export default async function Page(props: INovelPageProps) {
  let novelData: INovel | undefined;
  try {
    const { data } = await $serverApi.get(`/novel/${props.params.id}`);
    novelData = data;
  } catch (e: any) {
    if (e.response.status === 404) {
      notFound();
    } else {
      throw e;
    }
  }
  
  return (
    <NovelPage novelData={novelData as INovel} />
  );
}
