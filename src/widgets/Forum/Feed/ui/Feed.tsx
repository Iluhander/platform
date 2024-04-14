'use client'

import Link from 'next/link';
import { FC, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'next/navigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GetArrStatus } from '@iluhander/uwu-react';
import { IPage } from '@/shared/common/model';
import { IPost } from '@/shared/common/model/forum';
import useGetPostsPage from '../api/useGetPostsPage';
import useGetTargetsReactions from '@/widgets/MarketPlace/MarketPlaceMainContent/api/useGetTargetsReactions';
import getPostsReactions from '../api/getPostsReactions';
import { postsPageDefaultSize } from '@/shared/common/model/constants';

import { LoadingCircle } from '@/shared/Animated';
import { PostCard } from '@/features/Post/PostCard';

import './Feed.scss';
import { D } from '@/shared/common/lib/dev/log';

interface IFeedProps {
  initialData: IPage<IPost>;
}

const Feed: FC<IFeedProps> = ({ initialData }) => {
  const params = useParams();
  const subForumId = params.id as string || '';
  const prevSubForumId = useRef<string>();

  const { data: pagesData, status, exec, setData } = useGetPostsPage(subForumId, initialData);
  const { data, maxCount } = pagesData as IPage<IPost>;
  const { reactions } = useGetTargetsReactions(
    data.slice(-1 * postsPageDefaultSize).map(({ id }) => id),
    getPostsReactions
  );

  const pageIdx = useRef(0);
  const loadMore = (newPageIdx: number) => {
    pageIdx.current = newPageIdx;
    exec(newPageIdx);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!prevSubForumId.current) {
      prevSubForumId.current = subForumId;
      return;
    }
    
    if (prevSubForumId.current !== subForumId) {
      prevSubForumId.current = subForumId;
      setData({ index: 0, data: [], maxCount: Infinity });
      loadMore(0);
    }
  }, [subForumId]);

  const infiniteScrollProps = useMemo(
    () => ({
      load: () => loadMore(pageIdx.current + 1),
      style: { overflow: 'visible' },
      loader: <LoadingCircle />
    }),
    []
  );

  switch (status) {
    case GetArrStatus.NO_CONTENT:
      return (
        <main className="feedMain">
          <p>
            Пока что никто не написал здесь постов. <Link href="/myposts">Станете первым ?</Link>
          </p>
        </main>
      );
    default:
      return (
        <InfiniteScroll
          dataLength={data.length}
          next={infiniteScrollProps.load}
          style={infiniteScrollProps.style}
          hasMore={data.length < maxCount}
          loader={infiniteScrollProps.loader}
        >
          <main className="feedMain" style={data.length < 3 ? { marginLeft: 20 } : {}}>
            {data.map((post) => (
              <PostCard data={post} key={`p${post.id}`} reaction={reactions.get(post.id)} />
            ))}
            {status === GetArrStatus.ERROR && <h1>Что-то пошло не так :(</h1>}
          </main>
        </InfiniteScroll>
      );
  }
};

export default Feed;
