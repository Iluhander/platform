import { CSSProperties, FC } from 'react';
import './LoadingCircle.css';

interface ILoadingCircleProps {
  style?: CSSProperties;
  size?: number;
  className?: string;
}

const LoadingCircle: FC<ILoadingCircleProps> = ({ style, size = 60, className }) => {
  return (
    <div className={`loadingCircle ${className}`} style={style}>
      <img src="/icons/loading.gif" alt="Loading..." width={size} height={size} />
    </div>
  );
};

export default LoadingCircle;
