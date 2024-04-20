import { useReq, GetArrStatus, ReqStatus } from '@iluhander/uwu-react';
import { $api } from '@/shared/common/api/http';
import { INovel, INovelSearch, IPage } from '@/shared/common/model';
import { MutableRefObject } from 'react';

/**
 * Hook for getting pages of novels.
 */
const useGetMarketContents = (searchRef: MutableRefObject<INovelSearch>, initialData: IPage<INovel>) =>
  useReq<number, IPage<INovel>>(
    (pageIndex) =>
    $api.post('/novel/page', {}, {
      params: { ...searchRef.current, pageIndex }
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
      getFailedStatus: () => GetArrStatus.ERROR,
      timeout: 5000,
      attempts: 2
    }
  );

export default useGetMarketContents;
