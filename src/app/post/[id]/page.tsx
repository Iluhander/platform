import { $serverApi } from "@/shared/common/api/http";
import { IPost } from "@/shared/common/model";
import ViewPostWrapper from "@/views/Post/page";
import { getPostContent } from "@/widgets/Post/ViewPostContent";
import { checkSuccessStatus } from "@iluhander/uwu-react";
import { notFound } from "next/navigation";

interface IPostPageProps {
  params: { id: string };
}

export const revalidate = 100;

export async function generateMetadata(props: IPostPageProps) {
  let { data, status } = await $serverApi.get(`/forum/post/view/${props.params.id}`);
  if (!checkSuccessStatus(status)) {
    return {};
  }

  const title = `${(data.title || 'Публикация')} | UwU Novels`;
  const description = `Читайте публикацию из раздела "${data.subForum?.name}" от ${data.author?.username}`;

  return {
    title,
    description,
    keywords: ['Новелла', 'Визуальная новелла', 'Аниме', 'статья', 'article', 'Visual Novel', 'UwU Novels', data.subForum?.name || ''],
    authors: [{ name: data.author?.username }],
    creator: data.author?.username,
    publisher: 'UwU Novels',
    icons: {
      icon: '/favicon.png'
    },
    openGraph: {
      type: 'website',
      url: `https://uwunovels.com/post/${props.params.id}`,
      siteName: 'UwU Novels',
      locale: 'ru_RU',
      title,
      description,
      images: [{
        url: `${process.env.NEXT_PUBLIC_ASSETS}/static/post/cover/${data.id}?v=${data.coverVersion}`
      }],
    }
  };
} 

export default async function PostPage(props: IPostPageProps) {
  let postData: IPost | undefined;
  let content: string | null;

  const [dataRes, contentRes] = await Promise.all([
    $serverApi.get(`/forum/post/view/${props.params.id}`),
    getPostContent(props.params.id)
  ]);

  postData = dataRes.data;
  content = contentRes;

  if (!checkSuccessStatus(dataRes.status)) {
    if (dataRes.status === 404) {
      notFound();
    }

    throw new Error();
  }

  return <ViewPostWrapper data={postData as IPost} content={content} />;
}
