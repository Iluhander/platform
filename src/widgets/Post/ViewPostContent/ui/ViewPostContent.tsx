import { FC } from 'react';
import { LoadingCircle } from '@/shared/Animated';
import { ImgParser } from '@/shared/Img';

import './ViewPostContent.scss';

const ViewPostContent: FC<{ content: string | null, id: string }> = ({ content, id }) => {
  if (!content) {
    return <LoadingCircle />;
  }

  return (
    <>
      <main
        itemProp="articleBody"
        dangerouslySetInnerHTML={{ __html: content }}
        className="viewPostContent"
        id={`vpc${id}`}
      />
      <ImgParser targetId={`vpc${id}`} />
    </>
  );
};

export default ViewPostContent;
