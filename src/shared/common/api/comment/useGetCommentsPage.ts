import { useContext } from 'react';
import { useReq } from '@iluhander/uwu-react';
import { CommentContext } from '@/shared/common/lib/comment/СommentContext';
import { $api } from '@/shared/common/api/http';
import { useSearchParams } from 'next/navigation';
import { IPage } from '../../model';
import { IComment } from '../../model/comment';

export default function useGetCommentsPage() {
  const parentCommentContext = useContext(CommentContext);
  const params = useSearchParams();

  let queryObj: Record<string, any> = {};
  if (parentCommentContext) {
    queryObj = { commentId: parentCommentContext.id };
  } else if (window.location.pathname.includes('novel')) {
    queryObj = { novelId: params.get('id') };
  } else {
    queryObj = { postId: params.get('id') };
  }

  return {
    hasSublist: !!parentCommentContext,
    ...useReq<number, IPage<IComment>>(
      (pageIndex) =>
        $api.get(`${process.env.NEXT_PUBLIC_BACKEND}/comment/list`, {
          params: { ...queryObj, pageIndex }
        }),
      {
        initialData: { data: [], maxCount: Infinity },
        reducer: (prevData, newData) => ({
          data: prevData? prevData.data.concat(newData.data) : newData.data,
          maxCount: newData.maxCount
        }),
        timeout: 4000,
        attempts: 2
      }
    )
  };
}
