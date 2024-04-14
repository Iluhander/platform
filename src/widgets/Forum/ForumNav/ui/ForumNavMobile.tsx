'use client'

import { FC, ReactNode, useState } from 'react';

import './ForumNavMobile.scss';

interface IForumNavMobileProps {
  children: ReactNode;
}

const ForumNavMobile: FC<IForumNavMobileProps> = ({ children }) => {
  const [hidden, setHidden] = useState(true);

  if (hidden) {
    return (
      <div className="forumNavMobileMenu">
        <button type="button" onClick={() => setHidden(false)}>
          <div className="forumSearchMobileItem">
            <img src="/icons/searchActive.png" alt="Поиск" />
            <h2 style={{ opacity: 1, margin: 0 }}>Поиск</h2>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="forumNavMobileContainer">
      <button
        type="button"
        onClick={() => setHidden(true)}
        className="textButton forumNavMobileClose"
      >
        <p style={{ marginLeft: 0 }}>Скрыть ╳</p>
      </button>
      {children}
    </div>
  );
};

export default ForumNavMobile;
