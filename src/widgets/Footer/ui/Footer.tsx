import './Footer.scss';

// Utils.
import getFooterContents from '../api/getFooterContents';

// Components.
import MiniLogo from '@/shared/MiniLogo/MiniLogo';
import { IFooterColumn, IFooterRow } from '../lib/types';
import { usePathname } from 'next/navigation';

/**
 * Rendering a row.
 * @description Each element of a row has index in the format <i>cX_rY_eZ</i>.<br>
 * <i>cX_rY_eZ</i> means "column #X, row #Y, element #Z".
 * @returns A row in a footer column constructed with the contents given.
 */
function renderRow(rowObj: IFooterRow, objKey: string) {
  const row = rowObj.elements.map((elem, i) => {
    const elemKey = `${objKey}_e${i}`;

    if (elem.img) {
      return <img src={elem.img} key={elemKey} alt="" />;
    }

    return <p key={elemKey}>{elem.text}</p>;
  });

  // If a link is provided, than make a link.
  return (
    <div key={objKey}>
      <a href={rowObj.link}>
        <div className="row">{row}</div>
      </a>
    </div>
  );
}

/**
 * Rendering a column.
 * @returns A column in footer.
 */
function renderColumn(column: IFooterColumn, objKey: any) {
  const rows = column.rows.map((row, i) => renderRow(row, `${objKey}_r${i}`));

  if (column.header) {
    return (
      <div className="footerElement" key={objKey}>
        <div>
          <p>{column.header}</p>
        </div>
        {rows}
      </div>
    );
  }

  return (
    <div className="footerElement" key={objKey}>
      {rows}
    </div>
  );
}

export default function Footer() {
  const { leadRow, commonColumns } = getFooterContents();
  const path = usePathname();

  let footerStyle = {
    background: '#05060E',
    borderTop: ''
  };
  if (path === '/' || path === '/novel' || path === 'editnovel') {
    footerStyle = {
      background: '#05060E',
      borderTop: '1px solid #181818'
    };
  }

  return (
    <footer style={footerStyle}>
      <div id="footerMainContainer">
        <div className="footerElement">
          <div id="leadLabel">
            <a href={leadRow.link} className="leadLink">
              <h2>{leadRow.label}</h2>
            </a>
          </div>
          <div className="row">
            <p>©2021-2024 UwU Novels</p>
            <p>•</p>
            <a href="/team">А кто мы ?</a>
          </div>
          <div className="row">
            <p>•</p>
            <a href="/agreement">Пользовательское соглашение</a>
          </div>
        </div>
        {commonColumns.map(renderColumn)}
      </div>
      <div className="footerLogoElement">
        <MiniLogo />
      </div>
    </footer>
  );
}
