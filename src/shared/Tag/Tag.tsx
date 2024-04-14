import { forwardRef } from 'react';

import './Tag.scss';

interface ITagProps {
  href: string;
  text: string;
  etc?: Record<string, any>;
}

// eslint-disable-next-line react/display-name
const Tag = forwardRef((props: ITagProps, ref: any) =>
  props.href ? (
    <a href={props.href} ref={ref} {...(props.etc || {})}>
      <div className="tag">{props.text}</div>
    </a>
  ) : (
    <div className="tag" {...(props.etc || {})} ref={ref}>
      {props.text}
    </div>
  )
);

export default Tag;
