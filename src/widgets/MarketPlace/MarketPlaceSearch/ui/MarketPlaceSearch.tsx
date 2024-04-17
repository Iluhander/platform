/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint jsx-a11y/click-events-have-key-events:"off", jsx-a11y/no-noninteractive-element-interactions:"off" */
import { Dispatch, FC, SetStateAction, useContext, useRef } from 'react';

import extractByRef from '@/shared/common/lib/utils/extractByRef';
import { UserDataContext, EUserDataStatus } from '@/shared/common/lib/user/userData';
import { INovelSearch } from '@/shared/common/model';
import { isMobile } from 'react-device-detect';

import MarketPlaceAuthorFilter from '@/features/Market/MarketPlaceAuthorFilter';

import './MarketPlaceSearch.scss';

interface IMarketPlaceSearch {
  defaultSearch: INovelSearch;
  search: INovelSearch;
  setSearch: Dispatch<SetStateAction<INovelSearch>>;
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
}

const MarketPlaceSearch: FC<IMarketPlaceSearch> = ({ defaultSearch, search, setSearch, hidden, setHidden }) => {
  const { userData } = useContext(UserDataContext);
  const filtersForm = useRef<HTMLFormElement>(null);
  const curTimeout = useRef<NodeJS.Timeout | null>(null);

  const extractData = () => {
    const extracted = extractByRef(filtersForm) as INovelSearch;

    if (extracted.author && extracted.author !== defaultSearch.author) {
      extracted.userID = userData.id;
    }

    setSearch(extracted);
  };

  // This prevents form requests spamming.
  function handleNameChange() {
    if (isMobile) {
      return;
    }

    if (curTimeout.current) {
      clearTimeout(curTimeout.current);
    }

    curTimeout.current = setTimeout(extractData, 1000);
  }

  const onFieldChange = isMobile ? () => null : extractData;

  let searchLabel = <h3>Поиск</h3>;
  if (isMobile) {
    searchLabel = hidden ? (
      <div className="marketSearchMobileItem">
        <img src="/icons/searchActive.png" alt="Поиск" />
        <p style={{ opacity: 1, margin: 0 }} className="marketSearchMobileLabel">
          Поиск
        </p>
      </div>
    ) : (
      <p style={{ marginLeft: 0 }} className="marketSearchMobileLabel">
        Скрыть
      </p>
    );
  }

  return (
    <aside
      className={`marketPlaceDiv ${hidden ? 'hiddenFilters' : 'shownFilters'} ${
        isMobile ? 'marketFiltersMobile' : ''
      }`}
    >
      <button className="marketPlaceDivHeader" onClick={() => setHidden(!hidden)} type="button">
        {searchLabel}
        {isMobile && <p>⨉</p>}
        <div className="visibilityToggler">
          <img src="/icons/arrowleft.png" alt="" />
          <img src="/icons/arrowright.png" alt="Показать" />
        </div>
      </button>
      <form
        className="marketFilters"
        onSubmit={(e) => {
          e?.preventDefault();
          if (isMobile) {
            setHidden(true);
          }

          setSearch(extractByRef(filtersForm) as INovelSearch);
        }}
        ref={filtersForm}
      >
        <div className="marketFilterDiv filterDivInput marketSearchInput">
          <input
            type="text"
            inputMode="search"
            name="title"
            placeholder="🔍  Искать новеллы..."
            onChange={handleNameChange}
            defaultValue={search.title || ''}
          />
        </div>
        <div className="marketFilterDiv selectDivInput">
          <select
            name="genre"
            // @ts-ignore
            placeholder="Жанр..."
            className="marketFilterSelector"
            onChange={onFieldChange}
            defaultValue={search.genre}
          >
            <option value="Любой жанр">Любой жанр</option>
            <option value="Романтика">Романтика</option>
            <option value="Фантастика">Фантастика</option>
            <option value="Хорроры">Хорроры</option>
            <option value="Комедия">Комедия</option>
          </select>
        </div>
        <div className="marketFilterDiv selectDivInput">
          <MarketPlaceAuthorFilter
            onFieldChange={onFieldChange}
            authenticated={userData.status === EUserDataStatus.AUTHENTICATED}
          />
        </div>
        <div className="marketFilterDiv">
          <div className="marketFilterDivSortLabel">
            <p>Сотировать по</p>
            <img src="/icons/sort.png" alt="sort" />
          </div>
          <div className="marketFilterDiv selectDivInput">
            <select
              name="sortBy"
              // @ts-ignore
              placeholder="Сортировать..."
              className="marketFilterSelector"
              onChange={onFieldChange}
              defaultValue={search.sortBy}
            >
              <option value="Обсуждаемости">Обсуждаемости</option>
              <option value="Оценкам">Оценкам</option>
              <option value="Новизне">Новизне</option>
            </select>
          </div>
        </div>
        {/* <div className="marketFilterDiv selectDivInput">
          <select
            name="ready"
            placeholder="Готовность"
            className="marketFilterSelector"
            onChange={searchNovels}
          >
            <option value="no">Только готовые новеллы</option>
            <option value="yes">Включая в разработке</option>
          </select>
        </div> */}
        {isMobile ? (
          <button className="niceButton" type="submit">
            Найти
          </button>
        ) : (
          <div />
        )}
      </form>
    </aside>
  );
}

export default MarketPlaceSearch;
