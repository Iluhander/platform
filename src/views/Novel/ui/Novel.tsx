// Libraries
import { FC } from 'react';
import { isMobile } from 'react-device-detect';

// Utils.
import { INovel } from '@/shared/common/model';

// Components.
import { Engine } from '@/widgets/Novel/Engine';
import { Comments } from '@/widgets/Comments';
import NovelMetaData from '@/widgets/Novel/NovelMetaData/ui/NovelMetaData';

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
      <main className={`novelBlock ${isMobile ? 'novelBlockMobile' : ''}`}>
        <div className="novelColBlock">
          <h1 className="novelTitle" itemProp="name">
            {novelData?.title || 'Безымянная новелла'}
          </h1>
          <Engine fullScreenElems={fullScreenElems} playMode />
        </div>
        <NovelMetaData data={novelData} />
      </main>
      <Comments count={novelData.commentsCount} />
    </div>
  );
};

export default Novel;
