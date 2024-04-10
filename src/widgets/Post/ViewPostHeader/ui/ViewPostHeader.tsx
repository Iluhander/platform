import { FC } from 'react';
import Link from 'next/link';
import { IPost } from '@/shared/common/model/forum';

import './ViewPostHeader.scss';

const ViewPostHeader: FC<{ data: IPost }> = ({ data }) => {
  if (!data) {
    return <div />;
  }

  const subForumLink = data.subForum?.id ? (
    <Link href={`/forum?id=${data.subForum?.id}`}>
      <p>{data.subForum?.name}</p>
    </Link>
  ) : (
    <p>{data.subForum?.name}</p>
  );

  const authorLink = data.author?.username ? (
    <Link href={`/viewprofile?id=${data.author.id}`}>
      <p>{data.author?.username}</p>
    </Link>
  ) : (
    ''
  );

  return (
    <header className="viewPostHeader">
      <img
        src={`${process.env.REACT_APP_BACKEND}/static/post/cover/${data.id}?v=${data.coverVersion}`}
        alt=""
        className="postHeaderCover"
      />
      <div className="viewPostHeaderMeta">
        <h2>{data.title}</h2>
        <div className="viewPostHeaderMetaRow">
          {subForumLink}
          <p>•</p>
          {authorLink}
        </div>
      </div>
    </header>
  );
};

export default ViewPostHeader;
