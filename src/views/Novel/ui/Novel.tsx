// Libraries
import { FC } from 'react';

// Utils.
import { INovel } from '@/shared/common/model';

// Components.
import { Engine } from '@/features/Novel/Engine';
import { Comments } from '@/widgets/Comments';
import { NovelMetaData } from '@/widgets/Novel/NovelMetaData';
import { EngineContainer } from '@/entities/Engine/EngineContainer';

// Styles.
import './Novel.scss';

const Novel: FC<{ novelData: INovel }> = ({ novelData }) => {
  const fullScreenElems = [
    'nav',
    'footer',
    '.novelDescriptionBlock',
    '.novelTitle',
    '.novelComments',
    '.novelTopMargin'
  ];

  return (
    <div itemScope itemType="https://schema.org/Game">
      <div className="novelTopMargin" />
      <main className="novelBlock">
        <div className="novelColBlock">
          <h1 className="novelTitle" itemProp="name">
            {novelData?.title || 'Безымянная новелла'}
          </h1>
          <EngineContainer Engine={Engine} fullScreenElems={fullScreenElems} playMode />
        </div>
        <NovelMetaData data={novelData} />
      </main>
      <Comments count={novelData.commentsCount || Infinity} />
    </div>
  );
};

export default Novel;
