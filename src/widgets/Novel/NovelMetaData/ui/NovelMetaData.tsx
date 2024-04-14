import { FC } from "react";
import { INovel } from "@/shared/common/model";

// Components.
import Tag from "@/shared/Tag/Tag";
import NovelModMenuLazy from "@/features/Novel/NovelModMenu";
import NovelAuthorElem from "@/features/Novel/NovelAuthorElem/ui/NovelAuthorElem";
import NovelEngineProvider from "@/features/Novel/NovelEngineProvider";
import NovelReaction from "@/features/Novel/NovelReaction";

const NovelMetaData: FC<{ data: INovel }> = ({ data }) => {
  return (
    <section className="novelDescriptionBlock novelDataView">
      <img
        className="novelCover"
        src={`${process.env.NEXT_PUBLIC_BACKEND}/static/cover/novel/${data.id}?v=${data.coverVersion}`}
        alt={data.title}
      />
      <p itemProp="about" className="novelDescriptionView">{data.description}</p>
      <p className="novelDataText" title="Автор, дата публикации">
        <a
          href={`/viewprofile?id=${data.author?.id}`}
          itemProp="author"
          className="novelDataLink"
          target="_blank"
          rel="noreferrer"
        >
          {data.author?.username}
        </a>
        , <span itemProp="datePublished">{data.publicationDate}</span>
      </p>
      <p className="novelDataText">
        <Tag
          text={data.genre}
          href={`/?genre=${encodeURIComponent(data.genre)}`}
          etc={{
            title: 'Категория',
            target: '_blank',
            rel: 'noreferrer',
            className: 'novelDataLink',
            itemProp: 'genre'
          }}
        />
      </p>
      <div className="novelStatsDiv">
        <NovelReaction data={data} />
        {data.commentsCount && data.commentsCount > 0 ? (
          <div>
            <button type="button">
              <img src="/icons/replywhite.png" alt="replies" />
            </button>
            <p itemProp="reviewCount">{data.commentsCount}</p>
          </div>
        ) : (
          <div />
        )}
      </div>
      <NovelModMenuLazy novelId={data.id} hidden={data.hidden} />
      <NovelAuthorElem novelData={data} />
      <NovelEngineProvider novelId={data.id} />
    </section>
  );
}

export default NovelMetaData;