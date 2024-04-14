'use client'

import Link from 'next/link';
import { FC } from 'react';

interface IForumNavContentProps {
  content: any[];
  selectedSubForumId: string;
}

const ForumNavContent: FC<IForumNavContentProps> = ({ content, selectedSubForumId }) => {
  return (
    <>
      {content.map((forumData: any) => {
        const curLink = forumData.name === 'Главная' ? '/forum' : `/forum/${forumData.id}`;
        const isActual = forumData.id === selectedSubForumId;

        return (
          <div className="forumNavItem" key={`fn${forumData.id}`}>
            <Link href={curLink} style={isActual ? { color: 'var(--brand-yellow)' } : {}}>
              <span className="forumNavItemArrow">→ </span>
              {forumData.name}
            </Link>
            {forumData.subForums ? <ForumNavContent content={forumData.subForums} selectedSubForumId={selectedSubForumId} /> : <div />}
          </div>
        );
      })}
    </>
  );
};

export default ForumNavContent;
