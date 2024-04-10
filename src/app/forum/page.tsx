"use client"

import checkIsMobile from '@/shared/common/lib/checkIsMobile';
import { Feed } from '@/widgets/Forum/Feed';
import { ForumNav, ForumNavMobile } from '@/widgets/Forum/ForumNav';
import AppWrapper from '@/appWrapper';

import './Forum.css';

export default function Forum() {
  if (checkIsMobile()) {
    return (
      <>
        <div style={{ height: 'var(--nav-height)' }} />
        <div className="forumMobile">
          <ForumNavMobile>
            <ForumNav />
          </ForumNavMobile>
          <Feed />
        </div>
      </>
    );
  }

  return (
    <AppWrapper>
      <div className="forum">
        <ForumNav />
        <Feed />
      </div>
    </AppWrapper>
  );
}
