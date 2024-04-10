"use client"

import { useEffect, useState } from 'react';

// Components.
import AppWrapper from '@/appWrapper';
import { MarketPlaceSearch } from '@/widgets/MarketPlace/MarketPlaceSearch';
import MarketPlaceMainContent from '@/widgets/MarketPlace/MarketPlaceMainContent/ui/MarketPlaceMainContent';

// Utilities.
import checkIsMobile from '@/shared/common/lib/checkIsMobile';
import useURLState from '@/shared/common/lib/hooks/useURLState';

// Styles.
import './MarketPlaceNovels.scss';
import './MarketPlaceNovelsMobile.scss';

const defaultSearch = {
  title: '',
  genre: 'Любой жанр',
  author: 'Всех авторов',
  userID: '',
  sortBy: 'Новизне'
};

export default function MarketPlace() {
  const [search, setSearch] = useURLState(defaultSearch);

  // @ts-ignore
  const [searchHidden, setSearchHidden] = useState(checkIsMobile());

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
        className={`${checkIsMobile() ? 'marketNovelsMobile' : 'marketNovels'} ${
          searchHidden ? '' : 'resizedMarketNovels'
        }`}
      >
        <MarketPlaceMainContent search={search} />
      </main>
    </AppWrapper>
  );
}
