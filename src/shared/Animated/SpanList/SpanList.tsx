import { FC } from 'react';
import './SpanList.css';
import Link from 'next/link';

interface ISpanListProps {
  text: string;
  href?: string;
  animationTime?: number;
  className?: string;
  withFontWeightAnimation?: boolean;
  reversed?: boolean;
  tag?: string;
  itemProp?: string;
}

const SpanList: FC<ISpanListProps> = ({
  text,
  href,
  animationTime = 0.3,
  className = '',
  withFontWeightAnimation = true,
  reversed = false,
  tag = 'h1',
  itemProp = ''
}) => {
  if (!text || !text.length) {
    return <h1> </h1>;
  }

  // Adding spans for further animations.
  // This is where span elements will be stored.
  const linkTextElement = [];

  // This is difference between animations of different letters.
  const delayDiff = Math.round((animationTime / text.length) * 1000) / 1000;

  for (let i = 0; i < text.length; i += 1) {
    let j = i;
    if (reversed) {
      j = text.length - i - 1;
    }

    linkTextElement.push(
      <span
        style={{ transitionDelay: `${delayDiff * j}s`, animationDelay: `${delayDiff * j}s` }}
        key={`spanl${i}`}
      >
        {text[i]}
      </span>
    );
  }

  if (withFontWeightAnimation) {
    className += ' fontWeightAnimated';
  }

  if (href) {
    return (
      <Link href={href} className={`spanList ${className}`}>
        <p>{linkTextElement}</p>
      </Link>
    );
  }

  if (tag === 'h1') {
    return <h1 className={`spanList ${className}`}>{linkTextElement}</h1>;
  }

  if (tag === 'h2') {
    return <h2 className={`spanList ${className}`}>{linkTextElement}</h2>;
  }

  if (tag === 'h3') {
    return <h3 className={`spanList ${className}`}>{linkTextElement}</h3>;
  }

  return (
    <p className={`spanList ${className}`} itemProp={itemProp}>
      {linkTextElement}
    </p>
  );
}

export default SpanList;
