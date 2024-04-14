'use client'

import { UserDataContext } from '@/shared/common/lib/user/userData';
import { provideEngineAPI } from '@/shared/common/lib/engine/api';
import NovelMetaData from '@/widgets/Novel/NovelMetaData/ui/NovelMetaData';
import { useContext } from 'react';

export default function NovelEngineProvider({ novelId }: { novelId: string }) {
  const { userData } = useContext(UserDataContext);
  provideEngineAPI(userData.id, novelId);

  return <div />;
}
