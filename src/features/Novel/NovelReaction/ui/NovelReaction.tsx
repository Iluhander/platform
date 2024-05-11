'use client'

import { Reaction, Reactions } from "@/shared/Reactions";
import userSession from "@/shared/common/lib/user/userSession";
import getUserNovelReaction from "../api/getUserNovelReaction";
import updateNovelReaction from "../api/updateNovelReaction";
import { INovel } from "@/shared/common/model";

export default function NovelReaction({ data }: { data: INovel }) {
  return (
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
  );
}
