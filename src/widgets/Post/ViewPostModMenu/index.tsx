'use client'

import { FC, Suspense, useContext, lazy } from 'react';

import { UserDataContext, EUserDataStatus } from '@/shared/common/lib/user/userData';

const PostModHideMenu = lazy(() => import('./ui/PostModHideMenu'));
const PostModShowMenu = lazy(() => import('./ui/PostModShowMenu'));

interface IPostModMenuLazyProps {
  postId: string;
  hidden: boolean;
}

const PostModMenuLazy: FC<IPostModMenuLazyProps> = ({ postId, hidden }) => {
  const { userData } = useContext(UserDataContext);

  if (userData.status === EUserDataStatus.LOADING) {
    return <div />;
  }

  // Hiding the page from common users.
  if (userData.role !== 'mod') {
    return <div />;
  }

  return (
    <Suspense fallback={<div />}>
      {hidden ? <PostModShowMenu postId={postId} /> : <PostModHideMenu postId={postId} />}
    </Suspense>
  );
};

export default PostModMenuLazy;
