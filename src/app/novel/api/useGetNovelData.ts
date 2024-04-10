import { useGetReq } from '@iluhander/uwu-react';
import { $api, defaultConfig } from '@/shared/common/api/http';
import GetNovelDataState from '../lib/GetNovelDataState';

const useGetNovelData = (id: string) =>
  useGetReq(() => $api.get(`/novel/${id}`, defaultConfig), {
    StatusObj: GetNovelDataState,
    getFailedStatus: (code) => {
      if (code === 404) {
        return GetNovelDataState.NOT_FOUND;
      }

      if (code === 403) {
        return GetNovelDataState.FORBIDDEN;
      }

      return GetNovelDataState.ERROR;
    }
  });

export default useGetNovelData;
