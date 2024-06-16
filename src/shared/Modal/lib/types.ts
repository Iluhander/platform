import { CSSProperties } from "react";

export enum EShowModalType {
  NOTHING,
  HIDE_WARN,
  NOT_AUTHENTICATED,
  NOT_ACTIVATED,
  ERR_MODAL,
  CUSTOM
}

export type IDefaultModalOption = {
  text: string;
  action: () => void;
  className?: string;
  style?: CSSProperties;
  key?: string;
};

export interface IDefaultModalProps {
  heading: {
    className?: string;
    text: string;
  };
  text: string;
  options: IDefaultModalOption[];
  status: EModalStatus;
}

export enum EModalVariant {
  NON_BLOCKING,
  ACTIVATE_GLOBAL,
  AUTH_GLOBAL,
  GLOBAL,
  ERR_MODAL,
  CUSTOM
}

export enum EModalStatus {
  NO_MODAL,
  VISIBLE,
  HIDING
}

export interface IModalData {
  variant: EModalVariant;
  status: EModalStatus;
  propsData: any;
}
