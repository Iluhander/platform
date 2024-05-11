import { useRef, useEffect, useContext, useMemo, useCallback, FC, Dispatch, SetStateAction, CSSProperties } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GetArrStatus } from '@iluhander/uwu-react';
import useGetCommentsPage from '@/shared/common/api/comment/useGetCommentsPage';
import { CommentContext } from '@/shared/common/lib/comment/СommentContext';
import { commentsPerPage } from '@/shared/common/model/constants';
import { CommentsContext } from '@/shared/common/lib/comment/CommentsContext';
import { IPage } from '@/shared/common/model';
import { IComment } from '@/shared/common/model/comment';

// Components.
import { CommentForm } from '@/features/Comments/CommentForm';
import { LoadingCircle } from '@/shared/Animated';
import { CommentReplyWrapper } from '@/features/Comments/CommentForm';

import './CommentReplies.scss';

interface ICommentsRepliesProps {
  setMaxCount: Dispatch<SetStateAction<number>>;
}

const CommentsReplies: FC<ICommentsRepliesProps> = ({ setMaxCount }) => {
  const comment = useContext(CommentContext);
  const { callReplyTo, currentlyReplyingTo } = useContext(CommentsContext);
  const { data: commentsData, setData, status, exec } = useGetCommentsPage();
  const { data, maxCount } = (commentsData as IPage<IComment>);

  const pageIdx = useRef(0);
  const loadMore = (newPageIdx: number) => {
    pageIdx.current = newPageIdx;
    exec(newPageIdx);
  };

  const refetch = () => {
    const targetPage = Math.floor(data.length / 8);

    setData((prevData) => ({
      index: targetPage * 7,
      data: prevData.data.slice(0, targetPage * 8),
      maxCount: prevData.maxCount + 1
    }));
    loadMore(targetPage);
    setMaxCount((maxCount) => maxCount + 1);
  };

  useEffect(() => {
    setMaxCount(maxCount);
  }, [maxCount]);

  const infiniteScrollProps = useMemo(
    () => ({
      style: {
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw'
      } as CSSProperties,
      loader: <LoadingCircle />
    }),
    []
  );

  const load = useCallback(() => loadMore(data?.length ? pageIdx.current + 1 : 0), [data?.length]);

  return (
    <div id={`cr${comment?.id}`} className="commentRepliesBlock">
      {currentlyReplyingTo === comment?.id && (
        <CommentForm
          key="crf"
          callReplyTo={callReplyTo}
          callCommentsRefetch={refetch}
          className="replyForm"
          style={{}}
        />
      )}
      <InfiniteScroll
        dataLength={data.length}
        next={load}
        style={infiniteScrollProps.style}
        hasMore={data.length < maxCount}
        loader={infiniteScrollProps.loader}
        scrollThreshold={0.5}
      >
        {data.map((comment, i) => (
          <CommentReplyWrapper
            key={`crw${comment.id}`}
            comment={comment}
            isOnLowerLevel
            callCommentsRefetch={refetch}
            index={i % commentsPerPage}
          />
        ))}
        {status === GetArrStatus.LOADING && !data.length && <LoadingCircle />}
      </InfiniteScroll>
    </div>
  );
};

export default CommentsReplies;
