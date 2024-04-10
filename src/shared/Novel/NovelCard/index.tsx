import { Suspense, lazy } from 'react';
import { INovelCardAttrs } from './NovelCard';

const NovelCard = lazy(() => import('./NovelCard'));

function NovelCardLazy(props: INovelCardAttrs) {
  return (
    <Suspense fallback={<div />}>
      <NovelCard {...props} />
    </Suspense>
  );
}

export { NovelCardLazy };
