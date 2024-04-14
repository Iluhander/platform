import { useContext, useState } from 'react';
import Link from 'next/link';
import { isMobile } from 'react-device-detect';

// Utilities.
import logOutApi from '@/shared/common/api/http/auth/logOutApi';
import { EUserDataStatus, UserDataContext } from '@/shared/common/lib/user/userData';
import SmoothHidingItemStatus from '@/shared/Animated/SmoothItem/SmoothHidingItemStatus';
import userSession from '@/shared/common/lib/user/userSession';
import { AuxiliaryDataContext } from '@/shared/common/lib/auxiliary/auxiliaryData';

// Components.
import { LoadingDots, SpanList, SmoothHidingItem } from '@/shared/Animated';

import './NavUserMenu.scss';

export default function NavUserMenu() {
  const { userData } = useContext(UserDataContext);
  const { auxData } = useContext(AuxiliaryDataContext);
  const [userListStatus, setUserListStatus] = useState(SmoothHidingItemStatus.HIDDEN);

  async function logOut(e: any) {
    e?.preventDefault();

    logOutApi().then(() => {
      userSession.quit('/');
    });
  }

  let authElem;
  let userElem;
  let devElem = <div />;
  let modElem = <div />;
  let navIcon = (
    <img
      src={`/icons/user.png`}
      className="navUserMenuIcon"
      alt="Моя страница"
    />
  );
  if (userData.status === EUserDataStatus.AUTHENTICATED) {
    navIcon = (
      <img
        alt=""
        className="navUserAvatar"
        src={`${process.env.NEXT_PUBLIC_BACKEND}/static/avatar/${userData.id}?v=${userData.avatarVersion}`}
        onError={(e: any) => {
          e.target.src = `${process.env.NEXT_PUBLIC_ORIGIN}/icons/user.png`;
          e.target.className = 'navUserMenuIcon';
        }}
      />
    );

    authElem = (
      <a href="" onClick={logOut}>
        ← Выйти
      </a>
    );

    userElem = (
      <Link href="/profile" className="userProfileData">
        <div>
          <p>{userData.username ? userData.username : userData.email}</p>
        </div>
      </Link>
    );

    if (userData.role === 'dev') {
      devElem = (
        <>
          <Link href="/console">⌘ Консоль</Link>
        </>
      );
    }

    if (userData.role === 'mod') {
      modElem = (
        <>
          <Link href="/modhiddennovels">❆ Скрытые новеллы</Link>
          <Link href="/modhiddenposts">❆ Скрытые посты</Link>
          <Link href="/modbanned">⌑ Заблокированные</Link>
        </>
      );
    }
  } else if (userData.status === EUserDataStatus.NOT_AUTHENTICATED) {
    authElem = <SpanList href="/login" text="Войти" className="navUserMenuSpanList" />;
  } else {
    authElem = <LoadingDots />;
  }

  let featureElem = <div />;
  if (auxData.data.features?.find((it) => Number(it) === 1)) {
    featureElem = <img src="/images/hselogo.png" className="navFeatureItem" alt="" />;
  }

  return (
    <div
      className="navUserMenu"
      onMouseEnter={() => {
        setUserListStatus(SmoothHidingItemStatus.APPEARING);
      }}
      onMouseLeave={() => {
        setUserListStatus(SmoothHidingItemStatus.DISAPPEARING);
      }}
    >
      {featureElem}
      {!isMobile ? <a href="/mynovels">{navIcon}</a> : <div>{navIcon}</div>}
      <SmoothHidingItem
        className="navUserList"
        status={userListStatus}
        setStatus={setUserListStatus}
        style={{ animationDuration: '0.3s' }}
      >
        {userData.status === EUserDataStatus.AUTHENTICATED && userElem}
        <Link href="/mynovels">· Мои новеллы</Link>
        <Link href="/profile">· Обо мне</Link>
        <Link href="/myposts">· Мои статьи</Link>
        {devElem}
        {modElem}
        {authElem}
      </SmoothHidingItem>
    </div>
  );
}
