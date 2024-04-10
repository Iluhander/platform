import { createContext } from 'react';
import { IComment } from '../../model/comment';

export const CommentContext = createContext<IComment | undefined>(undefined);
