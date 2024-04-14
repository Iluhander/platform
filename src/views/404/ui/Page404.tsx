'use client'

import { FC, ReactNode } from 'react';
import Link from 'next/link';

import AppWrapper from '@/appWrapper';

import './Page404.css';

const Page404: FC<{ children: ReactNode }> = ({ children }) => {
  /*eslint-disable*/
  return (
    <AppWrapper>
      <article id="article404">
        <img src="/favicon.png" />
        {children}
        <Link href="javascript:history.back()">← Назад</Link>
      </article>
    </AppWrapper>
  );
};

export default Page404;
