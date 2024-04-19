import $serverApi from "@/shared/common/api/http/serverApi";
import { IPost, IForumSearch, IPage } from "@/shared/common/model";
import Forum from "@/views/Forum/page";
import getForumNavContent from "@/widgets/Forum/ForumNav/api/getForumNavContent";
import { checkSuccessStatus } from "@iluhander/uwu-react";

type IForumDataWrapperProps = {
  params: IForumSearch;
};

export const revalidate = 90;

export async function generateMetadata(props: IForumDataWrapperProps) {
  let forumData: any;
  if (props.params.id) {
    const { data, status } = await $serverApi.get(`/forum/one/${props.params.id}`);

    if (checkSuccessStatus(status)) {
      forumData = data;
    }
  }

  const title = forumData ? `${forumData.name} | Форум | UwU Novels` : 'Форум | UwU Novels';
  
  return {
    title,
    applicationName: 'UwU Novels',
    description: "Публикации о мире визуальных новелл на UwU Novels",
    keywords: ['Новелла', 'Визуальная новелла', 'Аниме', 'обсуждение', 'форум', 'discussion', 'forum', 'Visual Novel', 'UwU Novels'],
    icons: {
      icon: '/favicon.png'
    },
    openGraph: {
      type: 'website',
      url: `https://uwunovels.com/forum${props.params.id ? '/' + props.params.id : ''}` ,
      siteName: 'UwU Novels',
      locale: 'ru_RU',
      title,
      description: 'Пишите и читайте посты про визуальные новеллы',
      images: [{
        url: '/opengraph-image.png'
      }]
    },
    twitter: {
      title,
      description: 'Пишите и читайте посты про визуальные новеллы'
    }
  };
};

export default async function ForumDataWrapper(props: IForumDataWrapperProps) {
  let initalData: IPage<IPost> = { index: 0, data: [], maxCount: 0 };
  let navData: any[] = [];

  const [postsData, forumsData] = await Promise.all([
    $serverApi.post(`/forum/post/posts-page`, {
      subForum: props.params?.id || '',
      sort: { target: '' }
    }),
    getForumNavContent()
  ]);

  if (checkSuccessStatus(postsData.data)) {
    initalData = postsData.data;
  }

  if (forumsData) {
    navData = forumsData;
  }

  return <Forum initialData={initalData} navData={navData} selectedSubForumId={props.params?.id || ''} />;
}
