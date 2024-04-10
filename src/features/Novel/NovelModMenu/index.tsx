import React, { FC, Suspense, useContext } from 'react';

import { UserDataContext, EUserDataStatus } from '@/shared/common/lib/user/userData';

const NovelModHideMenu = React.lazy(() => import('./ui/NovelModHideMenu'));
const NovelModShowMenu = React.lazy(() => import('./ui/NovelModShowMenu'));

interface INovelModMenuLazyProps {
  novelId: string;
  hidden: boolean;
}

const NovelModMenuLazy: FC<INovelModMenuLazyProps> = ({ novelId, hidden }) => {
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
      {hidden ? <NovelModShowMenu novelId={novelId} /> : <NovelModHideMenu novelId={novelId} />}
    </Suspense>
  );
};

export default NovelModMenuLazy;
