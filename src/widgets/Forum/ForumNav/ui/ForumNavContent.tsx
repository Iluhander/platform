import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

interface IForumNavContentProps {
  content: any[];
}

const ForumNavContent: FC<IForumNavContentProps> = ({ content }) => {
  const params = useSearchParams();

  return (
    <>
      {content.map((forumData: any) => {
        const curLink = forumData.name === 'Главная' ? '/forum' : `/forum?id=${forumData.id}`;
        const isActual = forumData.id === params.get('id');

        return (
          <div className="forumNavItem" key={`fn${forumData.id}`}>
            <Link href={curLink} style={isActual ? { color: 'var(--brand-yellow)' } : {}}>
              <span className="forumNavItemArrow">→ </span>
              {forumData.name}
            </Link>
            {forumData.subForums ? <ForumNavContent content={forumData.subForums} /> : <div />}
          </div>
        );
      })}
    </>
  );
};

export default ForumNavContent;
