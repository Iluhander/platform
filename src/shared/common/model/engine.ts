export type IEngineMessageName = "saved" | "error";

export interface IEngineMessage<T = any> {
  name: IEngineMessageName;
  payload: T;
}