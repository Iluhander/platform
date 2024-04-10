import { GetArrStatus, useReq } from '@iluhander/uwu-react';
import { $api, defaultConfig } from '@/shared/common/api/http';

const useGetPostsPage = (subForum: string | null) =>
  useReq(
    (pageIndex) => {
      const reqBody: Record<string, any> = { sort: {} };
      if (subForum) {
        reqBody.subForum = subForum;
      }

      return $api.post(`/forum/post/posts-page`, reqBody, {
        ...defaultConfig,
        params: { pageIndex }
      });
    },
    {
      notInstantReq: true,
      initialData: { data: [], maxCount: 0 },
      reducer: (prevData, newData) => ({
        data: prevData? prevData.data.concat(newData.data) : newData.data,
        maxCount: newData.maxCount
      }),
      getSuccessStatus: (data) => {
        if (!data?.data?.length) {
          return GetArrStatus.NO_CONTENT;
        }

        return GetArrStatus.LOADED;
      }
    }
  );

export default useGetPostsPage;
