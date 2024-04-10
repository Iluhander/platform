import useGetForumNavContent from '../api/useGetForumNavContent';
import ForumNavContent from './ForumNavContent';

import './ForumNav.scss';

export default function ForumNav() {
  const content = useGetForumNavContent();

  return (
    <nav className="forumNav">
      <ForumNavContent content={content} />
    </nav>
  );
}
