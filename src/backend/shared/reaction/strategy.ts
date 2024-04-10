import { ObjectId } from "mongoose";
import { AvailableReactions } from "./reactions";
import { IEntityModel, IReactionModel } from "./types";

export async function setReaction(
  ReactionModel: IReactionModel,
  EntityModel: IEntityModel,
  user: ObjectId,
  entityKey: string,
  entityId: string,
  type: number
) {
  if (AvailableReactions.indexOf(type) < 0) {
    throw new TypeError('Unknown reaction');
  }

  const curReaction = await ReactionModel.findOne({
    user,
    [entityKey]: entityId
  });

  if (curReaction?.type === type) {
    return;
  }

  let reactionPromise;
  if (!curReaction) {
    reactionPromise = ReactionModel.create({
      user,
      [entityKey]: entityId,
      type
    })
  } else if (type === 0) {
    reactionPromise = ReactionModel.deleteOne({
      user,
      [entityKey]: entityId
    });
  } else {
    reactionPromise = ReactionModel.updateOne({
      user,
      [entityKey]: entityId
    }, { type })
  }

  let entityPromise;

  // TODO: mutex on this (?)
  if (type === 1) {
    entityPromise = EntityModel.updateOne({
      _id: entityId
    }, {
      $inc: {
        likesCount: 1
      }
    });
  } else {
    entityPromise = EntityModel.updateOne({
      _id: entityId
    }, {
      $inc: {
        likesCount: curReaction?.type === 1 ? -1 : 0
      }
    });
  }

  await entityPromise;
  await reactionPromise;
}