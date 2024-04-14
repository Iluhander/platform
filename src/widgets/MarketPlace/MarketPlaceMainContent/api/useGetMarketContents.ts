import { useReq, GetArrStatus, ReqStatus } from '@iluhander/uwu-react';
import { $api, defaultConfig } from '@/shared/common/api/http';
import { INovel, INovelSearch, IPage } from '@/shared/common/model';

/**
 * Hook for getting pages of novels.
 */
const useGetMarketContents = (search: INovelSearch, initialData: IPage<INovel>) =>
  useReq<number, IPage<INovel>>(
    (pageIndex) =>
      $api.post('/novel/novels-list', search, {
        ...defaultConfig,
        params: { pageIndex }
      }),
    {
      initialData,
      initialStatus: initialData.data.length > 0 ? ReqStatus.INITIALIZED : ReqStatus.LOADING,
      reducer: (prevData, newData) => ({
        ...newData,
        data: (prevData as any).data.concat(newData.data),
      }),
      getSuccessStatus: (data) => {
        if (!data?.index && !data?.data?.length) {
          return GetArrStatus.NO_CONTENT;
        }

        return GetArrStatus.LOADED;
      },
      getFailedStatus: () => GetArrStatus.ERROR
    }
  );

export default useGetMarketContents;
