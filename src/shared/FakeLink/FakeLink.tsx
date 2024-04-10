import { FC, MouseEventHandler } from 'react';
import './FakeLink.css';

interface IFakeLinkProps {
  text: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}

const FakeLink: FC<IFakeLinkProps> = ({ text, onClick = () => {}, className }) => {
  const clickHandler: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e?.preventDefault();
    onClick(e);
  };

  return (
    // A <button> tag will be used here instead of <a>.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <a className={`fakeLink ${className}`} type="button" onClick={clickHandler}>
      {text}
    </a>
  );
};

export default FakeLink;
