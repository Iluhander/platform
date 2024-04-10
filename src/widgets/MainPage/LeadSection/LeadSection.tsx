import { CSSProperties, FC, ReactNode } from 'react';
import { SpanList } from '@/shared/Animated';

import './LeadSection.scss';

interface ILeadSectionProps {
  leadElement: ReactNode;
  header: ReactNode;
  mainP: ReactNode;
  link: {
    text: string;
    href: string;
  };
  forward: boolean;
  className: string;
}

const LeadSection: FC<ILeadSectionProps> = ({ leadElement, header, mainP, link, forward, className }) => {
  // This is style object, allowing to configure the component.
  const sectionStyle: CSSProperties = forward
    ? {
        flexDirection: 'row'
      }
    : {
        flexDirection: 'row-reverse'
      };

  return (
    <section className={`leadSection ${className}`} style={sectionStyle}>
      <div>{leadElement}</div>
      <div>
        <h1>{header}</h1>
        {mainP}
        <SpanList text={link.text} href={link.href} />
      </div>
    </section>
  );
};

export default LeadSection;
