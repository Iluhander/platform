import { ObjectId } from "mongoose";
import fixId from "./fixId";

export class WithId {
  id: ObjectId;

  constructor(source: any) {
    fixId(source);
    this.id = source.id;
  }
}