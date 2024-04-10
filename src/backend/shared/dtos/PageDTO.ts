export default class PageDTO<T> {
  size: number;

  constructor(public index: number, public data: T[], public maxCount?: number) {
    this.size = data.length;
  }
}
