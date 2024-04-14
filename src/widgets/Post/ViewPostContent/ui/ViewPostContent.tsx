import { FC } from 'react';
import { LoadingCircle } from '@/shared/Animated';

import './ViewPostContent.scss';

const ViewPostContent: FC<{ content: string | null }> = ({ content }) => {
  if (!content) {
    return <LoadingCircle />;
  }

  return <main itemProp="articleBody" dangerouslySetInnerHTML={{ __html: content }} className="viewPostContent" />;
};

export default ViewPostContent;
