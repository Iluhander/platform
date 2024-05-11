import InfiniteScroll from 'react-infinite-scroll-component';
import { GetArrStatus } from '@iluhander/uwu-react';
import { CSSProperties, FC, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import useGetCommentsPage from '@/shared/common/api/comment/useGetCommentsPage';
import { LoadingCircle } from '@/shared/Animated';
import { CommentsContext } from '@/shared/common/lib/comment/CommentsContext';
import { UserDataContext, EUserDataStatus } from '@/shared/common/lib/user/userData';

// Components.
import { SpanList } from '@/shared/Animated';
import { IPage } from '@/shared/common/model';
import { IComment } from '@/shared/common/model/comment';
import { commentsPerPage } from '@/shared/common/model/constants';

interface ICommentsListProps {
  CommentBlock: FC<any>;
  CommentForm: FC<any>;
  CommentReplies: FC<any>;
}

const CommentsList: FC<ICommentsListProps> = ({ CommentBlock, CommentForm, CommentReplies }) => {
  const { userData } = useContext(UserDataContext);
  const { currentlyReplyingTo, callReplyTo, setMaxCount } = useContext(CommentsContext);
  const { data: commentsData, status, setData, exec } = useGetCommentsPage();
  const { data, maxCount } = (commentsData as IPage<IComment>);

  const pageIdx = useRef(0);
  const loadMore = (newPageIdx: number) => {
    pageIdx.current = newPageIdx;
    exec(newPageIdx);
  };

  const { refetch, increaseCommentsCount } = useMemo(
    () => ({
      refetch: () => {
        setData((prevData) => {
          const targetPage = Math.floor((prevData.data?.length || 0) / 8);
          setTimeout(() => loadMore(targetPage), 0);

          return {
            index: targetPage * 7,
            data: prevData.data.slice(0, targetPage * 8),
            maxCount: prevData.maxCount + 1
          };
        });

        setMaxCount((maxCount) => maxCount + 1);
      },
      increaseCommentsCount: (commentId: string) => {
        setData((prevData) => {
          const prevList = prevData.data;

          let i = 0;
          while (i < prevList.length && prevList[i].id !== commentId) i += 1;

          return {
            ...prevData,
            maxCount: prevData.maxCount,
            data: [
              ...prevList.slice(0, i),
              { ...prevList[i], repliesCount: (prevList[i]?.repliesCount || 0) + 1 },
              ...prevList.slice(i + 1)
            ]
          };
        });
      }
    }),
    []
  );

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

  let mainForm;
  if (userData.status === EUserDataStatus.LOADING) {
    mainForm = <LoadingCircle />;
  } else if (userData.status === EUserDataStatus.AUTHENTICATED && userData.isActivated) {
    mainForm = (
      <CommentForm
        currentlyReplyingTo={currentlyReplyingTo}
        callReplyTo={callReplyTo}
        key="cl_cf0"
        callCommentsRefetch={refetch}
        style={{
          margin: '20px 0'
        }}
      />
    );
  } else if (userData.status === EUserDataStatus.NOT_AUTHENTICATED) {
    mainForm = (
      <div
        className="unauthorizedFormMock commentSized"
      >
        <SpanList text="Войдите, чтобы оставить комментарий" href="/login" />
      </div>
    );
  } else {
    mainForm = (
      <div
        className="unauthorizedFormMock commentSized"
      >
        <SpanList text="Активируйте аккаунт, чтобы оставить комментарий" tag="h3" />
      </div>
    );
  }

  return (
    <>
      {mainForm}
      <InfiniteScroll
        dataLength={data.length}
        next={load}
        style={infiniteScrollProps.style}
        hasMore={data.length < maxCount}
        loader={infiniteScrollProps.loader}
      >
        {data.map((comment, i) => (
          <CommentBlock
            comment={comment}
            index={i % commentsPerPage}
            increaseCommentsCount={increaseCommentsCount}
            key={`cb${comment.id}`}
            CommentReplies={CommentReplies}
          />
        ))}
        {status === GetArrStatus.LOADING && !data.length && <LoadingCircle />}
      </InfiniteScroll>
    </>
  );
}

export default CommentsList;
