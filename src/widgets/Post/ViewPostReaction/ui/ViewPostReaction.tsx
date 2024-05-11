'use client'

import { FC, ReactNode } from 'react';
import { Reaction, Reactions } from '@/shared/Reactions';
import { userSession } from '@/shared/common/lib/user';
import getUserPostReaction from '../api/getUserPostReaction';
import updatePostReaction from '../api/updatePostReaction';
import { IPost } from '@/shared/common/model/forum';

import './ViewPostReaction.scss';

interface IViewPostReactionProps {
  data: IPost;
  children: ReactNode;
}

const ViewPostReaction: FC<IViewPostReactionProps> = ({ data, children }) => {
  return (
    <div className="viewPostReaction">
      {userSession.getToken() ? (
        <Reaction
          getReaction={() => getUserPostReaction(data.id)}
          callLike={() => updatePostReaction(data.id, Reactions.LIKE)}
          callDislike={() => updatePostReaction(data.id, Reactions.DISLIKE)}
          callNeutral={() => updatePostReaction(data.id, Reactions.NEUTRAL)}
          likesCount={data.likesCount}
        />
      ) : (
        <Reaction
          getReaction={() => Promise.resolve({ type: Reactions.NEUTRAL})}
          likesCount={data.likesCount}
          unauthorized
        />
      )}
      {data.commentsCount && data.commentsCount > 0 ? (
        <div className="viewPostReplies">
          <button type="button" onClick={() => window.scrollTo(0, 300)}>
            <img src="/icons/replywhite.png" alt="replies" />
          </button>
          <p>{data.commentsCount}</p>
        </div>
      ) : (
        ''
      )}
      <div className="modMenuContainer">{children}</div>
    </div>
  );
};

export default ViewPostReaction;
