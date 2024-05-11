import ForumNavContent from '@/features/Forum/ForumNav/ui/ForumNavContent';

import './ForumNav.scss';

const ForumNav: typeof ForumNavContent = (props) => {
  return (
    <nav className="forumNav">
      <ForumNavContent {...props} />
    </nav>
  );
};

export default ForumNav;
