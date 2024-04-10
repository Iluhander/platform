import ViewPostHeader from '@/widgets/Post/ViewPostHeader/ui/ViewPostHeader';
import ViewPostContent from '@/widgets/Post/ViewPostContent/ui/ViewPostContent';
import { Comments } from '@/widgets/Comments';
import { ViewPostReaction } from '@/widgets/Post/ViewPostReaction';
import PostModMenuLazy from '@/widgets/Post/ViewPostModMenu';
import { FC } from 'react';
import { IPost } from '@/shared/common/model/forum';

import './ViewPost.scss';

interface IViewPostProps {
  data: IPost;
}

const ViewPost: FC<IViewPostProps> = ({ data }) => {
  return (
    <div className="postPage">
      <ViewPostHeader data={data} />
      <ViewPostContent postId={data.id} />
      <ViewPostReaction data={data}>
        <PostModMenuLazy postId={data.id} hidden={data.hidden} />
      </ViewPostReaction>
      <Comments />
    </div>
  );
};

export default ViewPost;
