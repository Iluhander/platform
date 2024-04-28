// Libraries
import { FC } from 'react';

// Utils.
import { INovel } from '@/shared/common/model';

// Components.
import { Engine } from '@/widgets/Novel/Engine';
import { Comments } from '@/widgets/Comments';
import NovelMetaData from '@/widgets/Novel/NovelMetaData/ui/NovelMetaData';

// Styles.
import './Novel.scss';

const Novel: FC<{ novelData: INovel }> = ({ novelData }) => {
  return (
    <div itemScope itemType="https://schema.org/Game">
      <div className="novelTopMargin" />
      <main className="novelBlock">
        <div className="novelColBlock">
          <h1 className="novelTitle" itemProp="name">
            {novelData?.title || 'Безымянная новелла'}
          </h1>
          <Engine playMode />
        </div>
        <NovelMetaData data={novelData} />
      </main>
      <Comments count={novelData.commentsCount || Infinity} />
    </div>
  );
};

export default Novel;
