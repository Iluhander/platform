export interface IFooterRow {
  elements: {
    text?: string;
    img?: string;
  }[];

  link: string;
}

export interface IFooterColumn {
  header: string;
  rows: IFooterRow[];
}
