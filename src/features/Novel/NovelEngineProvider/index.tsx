'use client'

import { UserDataContext } from '@/shared/common/lib/user/userData';
import { provideEngineAPI } from '@/shared/common/lib/engine/api';
import { useContext } from 'react';
import { INovel } from '@/shared/common/model';

export default function NovelEngineProvider({ novelData }: { novelData: INovel }) {
  const { userData } = useContext(UserDataContext);
  provideEngineAPI(userData.id, novelData.id, novelData.author?.id);

  return <div />;
}
