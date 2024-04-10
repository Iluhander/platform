export interface IComment {
  id: string;
  text: string;
  author: any;
  replyToComment: any;
  img: string;
  date: number;
  repliesCount: number;
}