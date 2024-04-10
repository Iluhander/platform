import { NovelCardLazy } from './NovelCard/index';
import { Reactions } from '../Reactions/lib/types';
import { INovel } from '../common/model';

interface INovelCardsListAttrs {
  /**
   * list of novels, that are currently loaded
   */
  novelsList: INovel[];

  /**
   * map, containing 'novelId' -> 'reaction' relation
   */
  reactions: Map<string, Reactions>;
}

/**
 * Renders novels.
 */
export default function NovelCardsList({novelsList, reactions}: INovelCardsListAttrs) {
  return (
    <>
      {
        novelsList.map((novel, i) =>
          <NovelCardLazy key={`mnc${i}`} novel={novel} reaction={reactions?.get(novel.id) || Reactions.NEUTRAL} />
        )
      }
    </>
  );
}
