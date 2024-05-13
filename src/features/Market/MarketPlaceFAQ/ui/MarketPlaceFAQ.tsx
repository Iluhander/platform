'use client'

import { FC } from "react";
import { isMobile } from "react-device-detect";

import s from './MarketPlaceFAQ.module.scss';

const faqLink = "/post/66400bcea28251d145187f07";

const MarketPlaceFAQ: FC<any> = (props) => {
  if (isMobile) {
    return (
      <a href={faqLink}>
        <div className={s.marketFAQMobile} {...props}>
          <img src="/icons/question.png"  alt="" title="Про нашу площадку" />
          <p style={{ opacity: 1, marginLeft: 0, marginTop: 6 }}>О сайте</p>
        </div>
      </a>
    );
  }

  return (
    <div className={s.marketFAQ} {...props}>
      <a href={faqLink}>О сайте</a>
    </div>
  );
}

export default MarketPlaceFAQ;
