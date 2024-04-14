import { useReq } from '@iluhander/uwu-react';
import { $api, defaultConfig } from '@/shared/common/api/http';
import GetPostDataStatus from '../lib/GetPostDataStatus';

export default function useGetPostData(postId: string) {
  return useReq(() => $api.get(`/forum/post/view/${postId}`, defaultConfig), {
    StatusObj: GetPostDataStatus,
    getFailedStatus: (code) => {
      if (code === 404) {
        return GetPostDataStatus.NOT_FOUND;
      }

      if (code === 403) {
        return GetPostDataStatus.FORBIDDEN;
      }

      return GetPostDataStatus.ERROR;
    }
  });
}
