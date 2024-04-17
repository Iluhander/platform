export interface INovel {
  id: string;
  author: any;
  title: string;
  genre: string;
  description: string;
  coverVersion: number;
  likesCount: number;
  commentsCount: number;
  publicationDate: number;
  isInDev: boolean;
  hidden: boolean;
}

export interface INovelSearch {
  title: string;
  genre: string;
  author: string;
  sortBy: string;
  userID: string;
}
