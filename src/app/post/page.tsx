"use client"

import GetPostDataStatus from './lib/GetPostDataStatus';
import useGetPostData from './api/useGetPostData';
import { useSearchParams } from 'next/navigation';

import { LoadingCircle } from '@/shared/Animated';

import ViewPost from './ui/ViewPost';
import AppWrapper from '@/appWrapper';

function ViewPostDataWrapper() {
  const params = useSearchParams();

  const { status, data } = useGetPostData(String(params.get('id')));

  switch (status) {
    case GetPostDataStatus.LOADED:
      return <ViewPost data={data} />;
    case GetPostDataStatus.LOADING:
      return (
        <div className="postPage">
          <LoadingCircle />
        </div>
      );
    case GetPostDataStatus.NOT_FOUND:
      return (
        <div className="postPage">
          <h1>Пост не найден :(</h1>
        </div>
      );
    case GetPostDataStatus.FORBIDDEN:
      window.location.replace('/posthidden');
      return <div />;
    default:
      return (
        <div className="postPage">
          <h1>Что-то пошло не так :( Попробуйте ещё раз.</h1>
        </div>
      );
  }
}

export default function ViewPostWrapper() {
  return (
    <AppWrapper>
      <ViewPostDataWrapper />
    </AppWrapper>
  );
};
