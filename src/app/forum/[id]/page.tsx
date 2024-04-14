import $serverApi from "@/shared/common/api/http/serverApi";
import { IPost, IForumSearch, IPage } from "@/shared/common/model";
import Forum from "@/views/Forum/page";
import getForumNavContent from "@/widgets/Forum/ForumNav/api/getForumNavContent";

type IForumDataWrapperProps = {
  params: IForumSearch;
};

export async function generateMetadata(props: IForumDataWrapperProps) {
  let forumData: any;
  try {
    if (props.params.id) {
      const res = await $serverApi.get(`/forum/one/${props.params.id}`);
      forumData = res.data;
    }
  } catch (e) {}

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
      siteName: 'UwU Novels',
      locale: 'ru_RU',
      title,
      description: 'Пишите и читайте посты про визуальные новеллы',
      images: [{
        url: '/opengraph-image.png'
      }]
    }
  };
};

export default async function ForumDataWrapper(props: IForumDataWrapperProps) {
  let initalData: IPage<IPost> = { index: 0, data: [], maxCount: 0 };
  let navData: any[] = [];

  try {
    const [postsData, forumsData] = await Promise.all([
      $serverApi.post(`/forum/post/posts-page`, {
        subForum: props.params?.id || '',
        sort: {}
      }),
      getForumNavContent()
    ]);

    initalData = postsData.data;
    navData = forumsData;
  } catch (e) {
    console.log(e);
  }

  return <Forum initialData={initalData} navData={navData} selectedSubForumId={props.params?.id || ''} />;
}
