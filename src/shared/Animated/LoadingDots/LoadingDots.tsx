import { FC } from 'react';
import './LoadingDots.css';

interface ILoadingDotsProps {
  count?: number;
  key?: string;
}

const LoadingDots: FC<ILoadingDotsProps> = ({ count = 3, key = 'ld' }) => {
  const dots = Array(count);
  for (let i = 0; i < count; i += 1) {
    dots[i] = (
      <span key={`${key}${i}`} style={{ animationDelay: `${i * 0.4}s` }}>
        ■
      </span>
    );
  }

  return <div className="loading-dots">{dots}</div>;
}

export default LoadingDots;
