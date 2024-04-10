import { Model, ObjectId } from "mongoose";

export interface IReactionModel {
  findOne: typeof Model.findOne;
  updateOne: typeof Model.updateOne;
  create: typeof Model.create;
  deleteOne: typeof Model.deleteOne;
}

export interface IEntityModel {
  updateOne: typeof Model.updateOne;
}
