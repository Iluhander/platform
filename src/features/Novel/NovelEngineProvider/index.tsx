'use client'

import { UserDataContext } from '@/shared/common/lib/user/userData';
import EngineAPI from '@/shared/common/lib/engine/api';
import { useContext } from 'react';
import { INovel } from '@/shared/common/model';

export default function NovelEngineProvider({ novelData }: { novelData: INovel }) {
  const { userData } = useContext(UserDataContext);
  EngineAPI.instantiate();
  EngineAPI.add({
    userId: userData.id,
    novelId: novelData.id,
    ownerId: novelData.author?.id
  });

  return <div />;
}
