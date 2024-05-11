// Extrernal.
import { GetArrStatus } from "@iluhander/uwu-react";
import { FC, useEffect, useMemo, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// Utilities.
import getSearchStr from "@/shared/common/lib/utils/getSearchStr";
import { INovelSearch } from "@/shared/common/model";
import useGetMarketContents from "../api/useGetMarketContents";
import useGetTargetsReactions from "../../../../shared/common/api/useGetTargetsReactions";
import { INovel, IPage } from "@/shared/common/model";
import { novelsPerPage } from "@/shared/common/model/constants";
import getNovelsReactions from "../api/getNovelsReactions";

// Components.
import { LoadingCircle, SpanList } from "@/shared/Animated";
import NovelCardsList from "@/shared/Novel/NovelCard/ui/NovelCardsList";

interface IMarketPlaceMainContentProps {
  search: INovelSearch;
  initialData: IPage<INovel>;
}

const MarketPlaceMainContent: FC<IMarketPlaceMainContentProps> = ({ search, initialData }) => {
  const initialized = useRef(false);
  const searchRef = useRef<INovelSearch>(search);
  const { data: reqData, status, exec, setData } = useGetMarketContents(searchRef, initialData);
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
    window.scrollTo(0, 0);
    
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    
    const searchValues = Object.values(search);
    if (Object.values(searchRef.current).find((val, i) => searchValues[i] !== val) !== undefined) {
      searchRef.current = search;
      setData({ index: 0, data: [], maxCount: Infinity });
      loadMore(0);
    }
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
