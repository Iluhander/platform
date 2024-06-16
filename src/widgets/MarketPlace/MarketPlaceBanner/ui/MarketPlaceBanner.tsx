import { FC, HTMLProps, ReactNode } from "react"

interface IMarketPlaceBannerProps extends HTMLProps<HTMLDivElement> {
  imgSrc?: string;
  title?: string;
  link: string;
  children?: ReactNode;
}

import s from './marketPlaceBanner.module.scss';

const MarketPlaceBanner: FC<IMarketPlaceBannerProps> = ({ imgSrc, title, link, children, ...rest }) => {
  const background = imgSrc ? `url(${imgSrc})` : 'var(--background-contrast2)'

  return (
    <a href={link}>
      <div
        {...rest}
        className={`${s.marketPlaceBanner} ${rest.className}`}
        style={{ background, ...(rest.style || {}) }}
      >
        {title && <h3>{title}</h3>}
        {children}
      </div>
    </a>
  )
};

export default MarketPlaceBanner;
