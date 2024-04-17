import $serverApi from "@/shared/common/api/http/serverApi";
import NovelPage from "@/views/Novel";
import { checkSuccessStatus } from "@iluhander/uwu-react";
import { notFound } from "next/navigation";

interface INovelPageProps {
  params: { id: string };
}

export async function generateMetadata(props: INovelPageProps) {
  let { data, status } = await $serverApi.get(`/novel/${props.params.id}`);
  if (!checkSuccessStatus(status)) {
    return {};
  }

  const title = `${(data.title || 'Визуальная новелла')} | UwU Novels`;
  const description = `Играйте онлайн в визуальную новеллу ${(data.title || '')} ${data.author?.username ? 'от ' + data.author.username : '' }`;

  return {
    title,
    description,
    keywords: ['Новелла', 'Визуальная новелла', 'Аниме', 'игра', 'онлайн', 'play', 'Visual Novel', 'UwU Novels'],
    authors: [{ name: data.author?.username }],
    creator: data.author?.username,
    publisher: 'UwU Novels',
    openGraph: {
      type: 'website',
      url: `https://uwunovels.com/novel/${props.params.id}`,
      siteName: 'UwU Novels',
      locale: 'ru_RU',
      title,
      description,
      images: [{
        url: `${process.env.NEXT_PUBLIC_ASSETS}/static/cover/novel/${data.id}?v=${data.coverVersion}`
      }],
    },
    twitter: {
      title,
      description
    }
  };
} 

export default async function Page(props: INovelPageProps) {
  const { data, status } = await $serverApi.get(`/novel/${props.params.id}`);

  if (!checkSuccessStatus(status)) {
    if (status === 404) {
      notFound();
    }

    throw new Error();
  }
  
  return (
    <NovelPage novelData={data} />
  );
}
