import { useReq, GetArrStatus } from '@iluhander/uwu-react';
import { $api, defaultConfig } from '@/shared/common/api/http';
import { INovel, INovelSearch, IPage } from '@/shared/common/model';

/**
 * Hook for getting pages of novels.
 */
const useGetMarketContents = (search: INovelSearch) =>
  useReq<number, IPage<INovel>>(
    (pageIndex) =>
      $api.post('/novel/novels-list', search, {
        ...defaultConfig,
        params: { pageIndex }
      }),
    {
      initialData: { data: [], maxCount: 0 },
      notInstantReq: true,
      reducer: (prevData, newData) => ({
        data: (prevData as any).data.concat(newData.data),
        maxCount: newData.maxCount
      }),
      getSuccessStatus: (data) => {
        if (!data?.data?.length) {
          return GetArrStatus.NO_CONTENT;
        }

        return GetArrStatus.LOADED;
      },
      getFailedStatus: () => GetArrStatus.ERROR
    }
  );

export default useGetMarketContents;
