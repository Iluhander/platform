import getSearchStr from "@/shared/common/lib/utils/getSearchStr";
import { LoadingCircle, SpanList } from "@/shared/Animated";
import { INovelSearch } from "@/shared/common/model";
import { GetArrStatus, ReqStatus } from "@iluhander/uwu-react";
import { FC, useEffect, useMemo, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetMarketContents from "../api/useGetMarketContents";
import useGetTargetsReactions from "../api/useGetTargetsReactions";
import { INovel, IPage } from "@/shared/common/model";
import { novelsPerPage } from "@/backend/shared/utilities/constants";
import getNovelsReactions from "../api/getNovelsReactions";
import NovelCardsList from "@/shared/Novel/NovelCardsList";

const MarketPlaceMainContent: FC<{ search: INovelSearch }> = ({ search }) => {
  const { data: reqData, status, exec, setData } = useGetMarketContents(search);
  const { data, maxCount } = reqData as IPage<INovel>;
  const { reactions } = useGetTargetsReactions(
    data.slice(-1 * novelsPerPage).map(({ id }) => id),
    getNovelsReactions
  );

  const pageIdx = useRef(0);

  const loadMore = (newPageIdx: number) => {
    pageIdx.current = newPageIdx;
    exec(newPageIdx);
  };

  useEffect(() => {
    if (status !== ReqStatus.INITIALIZED) {
      setData({ data: [], maxCount: Infinity });
    }

    loadMore(0);
    window.scrollTo(0, 0);
  }, Object.values(search));

  const infiniteScrollProps = useMemo(
    () => ({
      load: () => loadMore(pageIdx.current + 1),
      style: { overflow: 'visible' },
      loader: <LoadingCircle />
    }),
    [getSearchStr(search)]
  );

  switch (status) {
    case GetArrStatus.NO_CONTENT:
      return (
        <div className="marketInfoBlock">
          <p>Таких новелл пока ещё нет</p>
          <SpanList text="Попробуйте сделать их →" href="/mynovels" />
        </div>
      );
    case GetArrStatus.INITIALIZED:
      return (
        <div className="marketInfoBlock">
          <LoadingCircle />
        </div>
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
          <div className="marketScrollableNovels">
            <NovelCardsList novelsList={data} reactions={reactions} />
          </div>
          {status === GetArrStatus.LOADING && !data.length && <LoadingCircle />}
          {status === GetArrStatus.ERROR && (
            <div className="marketInfoBlock">
              <p>Что-то пошло не так :&lt;</p>
              <SpanList text="Попробуйте сделать всё так →" href="/mynovels" />
            </div>
          )}
        </InfiniteScroll>
      );
  }
};

export default MarketPlaceMainContent;
