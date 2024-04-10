import { Reactions } from '../lib/types';
import './Reaction.scss';

interface IViewReationAttrs {
  likesCount: number;
  reaction: Reactions
}

export default function ViewReaction({ likesCount, reaction }: IViewReationAttrs) {
  const likesCountText = likesCount && likesCount > 0 ? likesCount : '';

  return (
    <>
      {likesCount && likesCount > 0 ? (
        <>
          {reaction === Reactions.LIKE ? (
            <img
              src="/icons/thumbupactive.png"
              style={{ filter: 'brightness(1.3)' }}
              className="reactionImg"
              alt="likesCount"
            />
          ) : (
            <img src="/icons/thumbup.png" className="reactionImg" alt="likesCount" />
          )}
          <p>{likesCountText}</p>
        </>
      ) : (
        <div />
      )}
    </>
  );
}
