/* eslint jsx-a11y/click-events-have-key-events: 0, jsx-a11y/no-static-element-interactions: 0 */
import { MouseEventHandler, useContext, useEffect, useState } from 'react';
import { ReqStatus } from '@iluhander/uwu-react';

import { createNovel } from '@/shared/common/api/novel/service';
import { UserDataContext, EUserDataStatus } from '@/shared/common/lib/user/userData';
import MakeStoryAvaliability from '../lib/MakeStoryAvaliability';
import useShowModal from '@/shared/Modal/lib/useShowModal';
import { AuxiliaryDataContext } from '@/shared/common/lib/auxiliary/auxiliaryData';

import { LoadingDots } from '@/shared/Animated';
import FakeLink from '@/shared/FakeLink/FakeLink';
import { EShowModalType } from '@/shared/Modal/lib';

export default function NavMakeStory() {
  const { userData } = useContext(UserDataContext);
  const { auxData } = useContext(AuxiliaryDataContext);

  const [availability, setAvailability] = useState(MakeStoryAvaliability.UNAVAILABLE);
  const setShowModalData = useShowModal();

  const createStory: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setAvailability(MakeStoryAvaliability.LOADING);

    createNovel().then((res) => {
      window.location.replace(`/editnovel?id=${res.id}`);
    });
  }

  useEffect(() => {
    if (userData.status === EUserDataStatus.AUTHENTICATED && auxData.status === ReqStatus.LOADED) {
      if (userData.isActivated) {
        if (auxData.data.novels.length < Number(process.env.NEXT_PUBLIC_MAX_NOVELS_COUNT)) {
          setAvailability(MakeStoryAvaliability.AVAILABLE);
        } else {
          setAvailability(MakeStoryAvaliability.UNAVAILABLE);
        }
      } else {
        setAvailability(MakeStoryAvaliability.NOT_ACTIVATED);
      }
    }
  }, [userData, auxData]);

  switch (availability) {
    case MakeStoryAvaliability.LOADING:
      return <LoadingDots />;
    case MakeStoryAvaliability.AVAILABLE:
      return (
        <a onClick={createStory} href="/editnovel">
          Создать историю
        </a>
      );
    case MakeStoryAvaliability.NOT_ACTIVATED:
      return (
        <FakeLink
          text="Создать историю"
          onClick={() => setShowModalData(EShowModalType.NOT_ACTIVATED)}
        />
      );
    default:
      return <a href="/mynovels">Создать историю</a>;
  }
}
