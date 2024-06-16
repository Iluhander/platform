import { FC, HTMLProps, ReactNode } from "react";
import { MarketPlaceBanner } from "@/widgets/MarketPlace/MarketPlaceBanner";

interface IMarketPlaceBannersProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
}

import s from './marketPlaceBanners.module.scss';

const MarketPlaceBanners: FC<IMarketPlaceBannersProps> = ({ children, ...rest }) => {
  return (
    <div className={s.marketPlaceBanners} {...rest}>
      <MarketPlaceBanner
        imgSrc="images/random_tyans.jpg"
        link="/editnovel"
        style={{ backgroundSize: 'cover', backgroundPositionY: '-100px', padding: 0 }}
      >
        <div className={s.filedP} style={{ padding: '4px 16px' }}>  
          <h3>Наш движок для новелл →</h3>
          <p>Бесплатно и без кода создавайте на нём новеллы</p>
        </div>
      </MarketPlaceBanner>
      <MarketPlaceBanner
        imgSrc="images/codescreenshot.png"
        link="/editnovel"
        style={{ backgroundSize: 'cover' }}
      >
        <div>
          <h3>Работа с нами →</h3>
          <p style={{ fontSize: 16 }}>Ищем SMM и кодеров</p>
        </div>
      </MarketPlaceBanner>
      {children}
    </div>
  )
}

export default MarketPlaceBanners;
