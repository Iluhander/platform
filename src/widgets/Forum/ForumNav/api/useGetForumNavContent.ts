import { useEffect, useState } from 'react';

import { $api, defaultConfig } from '@/shared/common/api/http';

export default function useGetForumNavContent() {
  const [forumNavContent, setForumNavContent] = useState([]);

  useEffect(() => {
    $api.get('/forum/forums', defaultConfig).then(({ data }) => {
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

      setForumNavContent(forums);
    });
  }, []);

  return forumNavContent;
}
