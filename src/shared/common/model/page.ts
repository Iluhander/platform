export interface IPage<T> {
  index: number;
  data: T[];
  maxCount: number;
}