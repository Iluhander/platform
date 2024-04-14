export interface IPost {
  id: string;
  coverVersion: number;
  title: string;
  subForum: any;
  author: any;
  likesCount: number;
  commentsCount: number;
  hidden: boolean;
}

export interface IForumSearch {
  id: string;
}
