import React, { FC, Suspense, useContext } from 'react';

import { UserDataContext, EUserDataStatus } from '@/shared/common/lib/user/userData';

const CommentModMenu = React.lazy(() => import('./ui/CommentModMenu'));

const CommentModMenuLazy: FC<{ commentId: string }> = ({ commentId }) => {
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
      <CommentModMenu commentId={commentId} />
    </Suspense>
  );
};

export default CommentModMenuLazy;
