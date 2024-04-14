import $serverApi from "@/shared/common/api/http/serverApi";

export default async function getForumNavContent() {
  const { data } = await $serverApi.get(`/forum/forums`);

  const { forums } = data;
  forums.forEach((forum: any) => {
    forum.subForums = [];
  });
  const forumIdMapping = new Map(forums.map((it: any) => [it.id, it]));

  data.subForums.forEach((subForum: any) => {
    const parentForum = forumIdMapping.get(subForum.parentForum) as any;
    if (!parentForum) {
      return;
    }

    parentForum.subForums.push(subForum);
  });

  return forums;
}
