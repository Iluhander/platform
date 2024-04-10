import { FilterQuery, Model } from "mongoose";

export default function getPage<T>(model: Model<T>, sortObj: any, offset: number, limit: number, search: FilterQuery<T> = {}) {
  return [
    model.find(search).sort(sortObj).skip(offset).limit(limit),
    model.countDocuments(search)
  ];
}
