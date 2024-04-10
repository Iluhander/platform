import { useContext, useState } from 'react';
import { useReq } from '@iluhander/uwu-react';
import { $api } from '../http';
import { useSearchParams } from 'next/navigation';
import { CommentContext } from '../../lib/comment/СommentContext';
import CreateCommentDto from './CreateCommentDto';

export default function useSendComment() {
  const params = useSearchParams();
  const parentCommentContext = useContext(CommentContext);
  const [available, setAvailable] = useState(true);

  const queryObj: Record<string, any> = {};
  if (parentCommentContext) {
    queryObj.commentId = parentCommentContext.id;
  }

  if (window.location.pathname.includes('novel')) {
    queryObj.novelId = params.get('id');
  }

  if (window.location.pathname.includes('post')) {
    queryObj.postId = params.get('id');
  }

  return {
    ...useReq<CreateCommentDto, any>(
      (comment?: CreateCommentDto) => {
        // 1. Blocking the form.
        setAvailable(false);

        // 2. Making a request.
        return (
          $api
            .post(
              '/comment',
              {
                ...comment,
                replyToComment: parentCommentContext?.id
              },
              {
                params: queryObj
              }
            )
            // 3. Unblocking the form.
            .then((res) => {
              setTimeout(() => setAvailable(true), 3800);
              return res;
            })
        );
      },
      { notInstantReq: true }
    ),
    available
  };
}
