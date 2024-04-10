import { FC } from 'react';
import useGetPostContent from '../api/useGetPostContent';
import { LoadingCircle } from '@/shared/Animated';

import './ViewPostContent.scss';

const ViewPostContent: FC<{ postId: string }> = ({ postId }) => {
  const data = useGetPostContent(postId);

  if (!data) {
    return <LoadingCircle />;
  }

  return <main dangerouslySetInnerHTML={{ __html: data }} className="viewPostContent" />;
};

export default ViewPostContent;
