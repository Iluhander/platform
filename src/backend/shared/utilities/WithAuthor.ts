import { ObjectId } from "mongoose";
import fixId from "./fixId";
import { WithId } from "./WithId";

export class WithAuthor extends WithId {
  author?: ObjectId | Object;

  constructor(source: { author?: ObjectId | Object }) {
    super(source);

    fixId(source.author);
    
    this.author = source.author;
  }
}