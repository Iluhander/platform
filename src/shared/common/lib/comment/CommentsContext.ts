import { Dispatch, SetStateAction, createContext } from 'react';

interface ICommentsContext {
  commentsPerPage: number;
  currentlyReplyingTo: string | null;
  setMaxCount: Dispatch<SetStateAction<number>>
  callReplyTo: (to: string | null) => void;
}

export const CommentsContext = createContext<ICommentsContext>({
  commentsPerPage: NaN,
  currentlyReplyingTo: null,
  setMaxCount: (newMaxCount) => {},
  callReplyTo: (to) => {}
});
