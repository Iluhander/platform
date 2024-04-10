"use client"

// Libraries
import { useEffect, useRef, useContext, FC } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Utils.
import useGetNovelData from './api/useGetNovelData';
import checkIsMobile from '@/shared/common/lib/checkIsMobile';
import { UserDataContext } from '@/shared/common/lib/user/userData';
import getUserNovelReaction from './api/reactions/getUserNovelReaction';
import updateNovelReaction from './api/reactions/updateNovelReaction';
import GetNovelDataState from './lib/GetNovelDataState';
import userSession from '@/shared/common/lib/user/userSession';
import { Reactions } from '@/shared/Reactions';
import { provideEngineAPI } from '@/shared/common/lib/engine/api';
import { INovel } from '@/shared/common/model';

// Components.
import { SpanList } from '@/shared/Animated';
import { Engine } from '@/widgets/Novel/Engine';
import { Reaction } from '@/shared/Reactions';
import NovelModMenuLazy from '../../features/Novel/NovelModMenu';
import Tag from '@/shared/Tag/Tag';
import { Comments } from '@/widgets/Comments';
import AppWrapper from '@/appWrapper';

// Styles.
import './ui/Novel.scss';

const NovelMetaData: FC<{ data: INovel }> = ({ data }) => {
  return (
    <>
      <img
        className="novelCover"
        src={`${process.env.REACT_APP_BACKEND}/static/cover/novel/${data.id}?v=${data.coverVersion}`}
        alt={data.title}
      />
      <p className="novelDescriptionView">{data.description}</p>
      <p className="novelDataText" title="Автор, дата публикации">
        <a
          href={`/viewprofile?id=${data.author?.id}`}
          className="novelDataLink"
          target="_blank"
          rel="noreferrer"
        >
          {data.author?.username}
        </a>
        , {data.publicationDate}
      </p>
      <p className="novelDataText">
        <Tag
          text={data.genre}
          href={`/?genre=${encodeURIComponent(data.genre)}`}
          etc={{
            title: 'Категория',
            target: '_blank',
            rel: 'noreferrer',
            className: 'novelDataLink'
          }}
        />
      </p>
      <div className="novelStatsDiv">
        <div className="novelThumbUpDiv">
          {userSession.getToken() ? (
            <Reaction
              getReaction={() => getUserNovelReaction(data.id)}
              callLike={() => updateNovelReaction(data.id, Reactions.LIKE)}
              callDislike={() => updateNovelReaction(data.id, Reactions.DISLIKE)}
              callNeutral={() => updateNovelReaction(data.id, Reactions.NEUTRAL)}
              likesCount={data.likesCount}
            />
          ) : (
            <Reaction
              getReaction={() => Promise.resolve({ type: Reactions.NEUTRAL })}
              likesCount={data.likesCount}
              unauthorized
            />
          )}
        </div>
        {data.commentsCount && data.commentsCount > 0 ? (
          <div>
            <button type="button" onClick={() => window.scrollTo(0, 500)}>
              <img src="/icons/replywhite.png" alt="replies" />
            </button>
            <p>{data.commentsCount}</p>
          </div>
        ) : (
          <div />
        )}
      </div>
      <NovelModMenuLazy novelId={data.id} hidden={data.hidden} />
    </>
  );
}

export default function Novel() {
  const { userData } = useContext(UserDataContext);
  const params = useSearchParams();

  // Extracting data from URL.
  const novelId = params.get('id');

  // Requesting for novel data.
  const { status, data: novelData } = useGetNovelData(String(novelId));

  if (status === GetNovelDataState.NOT_FOUND) {
    window.location.href = '/404?type=novel';
  } else if (status === GetNovelDataState.FORBIDDEN) {
    window.location.replace('/novelhidden');
  }

  provideEngineAPI(userData.id, novelId);

  // Showing loading screen while the novel is loading.
  const novelBlock = useRef<HTMLElement>(null);
  useEffect(() => {
    console.log(novelData);
    if (novelData) {
      (novelBlock.current as HTMLElement).style.display = 'flex';
    } else {
      (novelBlock.current as HTMLElement).style.display = 'none';
    }
  }, [novelData]);

  // Conditional rendering.
  let loadingElem = (
    <div id="novelLoadingDiv">
      <SpanList text="Новелла загружается" animationTime={0.4} reversed />
    </div>
  );
  let descriptionContents = <div />;
  let commentsElem = <div />;

  if (novelData) {
    loadingElem = <div />;

    // Rendering comments only when it is needed.
    commentsElem = <Comments count={novelData.commentsCount} />;

    const commonContents = <NovelMetaData data={novelData} />;

    if (novelData.author.id === userData.id) {
      descriptionContents = (
        <>
          {commonContents}
          <div id="novelButtons">
            <Link href={`/editnovel?id=${novelId}`}>
              <button className="niceButton" type="button">
                Редактировать →
              </button>
            </Link>
          </div>
        </>
      );
    } else {
      descriptionContents = commonContents;
    }
  }

  const fullScreenElems = [
    'nav',
    'footer',
    '.novelDescriptionBlock',
    '.novelTitle',
    '.novelComments',
    '.novelTopMargin'
  ];

  return (
    <AppWrapper>
      {loadingElem}
      <div className="novelTopMargin" />
      <main className={`novelBlock ${checkIsMobile() ? 'novelBlockMobile' : ''}`} ref={novelBlock}>
        <div className="novelColBlock">
          <h1 className="novelTitle">{novelData?.title || 'Безымянная новелла'}</h1>
          <Engine fullScreenElems={fullScreenElems} playMode />
        </div>
        <div className="novelDescriptionBlock novelDataView">{descriptionContents}</div>
      </main>
      {commentsElem}
    </AppWrapper>
  );
}
