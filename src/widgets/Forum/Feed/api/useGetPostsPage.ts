import { GetArrStatus, ReqStatus, useReq } from '@iluhander/uwu-react';
import { $api } from '@/shared/common/api/http';
import { IPage, IPost } from '@/shared/common/model';

const useGetPostsPage = (subForum: string | null, initialData: IPage<IPost>) =>
  useReq(
    (pageIndex) => {
      const reqBody: Record<string, any> = { sort: {} };
      if (subForum) {
        reqBody.subForum = subForum;
      }

      return $api.post(`/forum/post/posts-page`, reqBody, {
        params: { pageIndex }
      });
    },
    {
      initialStatus: initialData.data.length > 0 ? ReqStatus.INITIALIZED : ReqStatus.LOADING,
      initialData,
      reducer: (prevData, newData) => ({
        ...newData,
        data: prevData? prevData.data.concat(newData.data) : newData.data,
      }),
      getSuccessStatus: (data) => {
        if (!data?.data?.length) {
          return GetArrStatus.NO_CONTENT;
        }

        return GetArrStatus.LOADED;
      },
      timeout: 5000,
      attempts: 2
    }
  );

export default useGetPostsPage;
