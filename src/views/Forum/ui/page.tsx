'use client'

import { FC } from 'react';
import { isMobile } from 'react-device-detect';
import { Feed } from '@/widgets/Forum/Feed';
import AppWrapper from '@/appWrapper';
import { IPage, IPost } from '@/shared/common/model';
import { ForumNav } from '@/entities/Forum/ForumNav/ForumNav';
import { ForumNavMobile } from '@/entities/Forum/ForumNav/ForumNavMobile';

import './Forum.css';

interface IForumProps {
  initialData: IPage<IPost>;
  navData: any[];
  selectedSubForumId: string;
}

const Forum: FC<IForumProps> = ({ initialData, navData, selectedSubForumId }) => {
  const content = isMobile ?  (
      <>
        <div style={{ height: 'var(--nav-height)' }} />
        <div className="forumMobile">
          <ForumNavMobile>
            <ForumNav content={navData} selectedSubForumId={selectedSubForumId} />
          </ForumNavMobile>
          <Feed initialData={initialData} />
        </div>
      </>
    ) : (
      <div className="forum">
        <ForumNav content={navData} selectedSubForumId={selectedSubForumId} />
        <Feed initialData={initialData} />
      </div>
    );

  return (
    <AppWrapper>
      {content}
    </AppWrapper>
  );
};

export default Forum;
