'use client'

import { FC, Suspense, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

// Components.
import AppWrapper from '@/appWrapper';
import { MarketPlaceSearch } from '@/widgets/MarketPlace/MarketPlaceSearch';
import { MarketPlaceMainContent } from '@/widgets/MarketPlace/MarketPlaceMainContent';

// Utilities.
import { useURLState } from '@/shared/common/lib/hooks';
import { INovel, IPage } from '@/shared/common/model';

// Styles.
import './MarketPlaceNovels.scss';
import './MarketPlaceNovelsMobile.scss';

const defaultSearch = {
  title: '',
  genre: 'Любой жанр',
  author: 'Всех авторов',
  userId: '',
  sortBy: 'Новизне'
};

interface IMarketPlaceProps {
  initialData: IPage<INovel>;
}

const MarketPlacePage: FC<IMarketPlaceProps> = ({ initialData }) => {
  const [search, setSearch] = useURLState(defaultSearch);

  // @ts-ignore
  const [searchHidden, setSearchHidden] = useState(isMobile);

  useEffect(() => {
    if (window && window.innerWidth < 600) {
      setSearchHidden(true);
    }
  }, []);

  return (
    <AppWrapper>
      <MarketPlaceSearch
        defaultSearch={defaultSearch}
        search={search}
        setSearch={setSearch}
        hidden={searchHidden}
        setHidden={setSearchHidden}
      />
      <main
        className={`${isMobile ? 'marketNovelsMobile' : 'marketNovels'} ${
          searchHidden ? '' : 'resizedMarketNovels'
        }`}
      >
        <MarketPlaceMainContent search={search} initialData={initialData} />
      </main>
    </AppWrapper>
  );
};

const MarketPlace: typeof MarketPlacePage = (props) => (
  <Suspense>
    <MarketPlacePage {...props} />
  </Suspense>
);

export default MarketPlace;
