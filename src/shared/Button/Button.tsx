import { ButtonHTMLAttributes, CSSProperties, FC, MouseEventHandler, ReactNode } from 'react';
import { LoadingCircle } from '../Animated';
import ButtonState from './ButtonState';
import EButtonState from './ButtonState';

interface IButtonProps extends ButtonHTMLAttributes<any> {
  status?: EButtonState;
  children?: ReactNode;
}

const Button: FC<IButtonProps> = ({
  status = ButtonState.AVAILABLE,
  type = 'button',
  className = '',
  children,
  ...rest
}) => {
  switch (status) {
    case ButtonState.AVAILABLE:
      return (
        <button className={`highlighted ${className}`} {...rest}>
          {children}
        </button>
      );
    case ButtonState.LOADING:
      return (
        <button className={className} {...rest}>
          <LoadingCircle size={30} />
        </button>
      );
    default:
      return (
        <button className={className} {...rest}>
          {children}
        </button>
      );
  }
};

export default Button;
