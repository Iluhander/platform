import { EUserDataStatus } from "../lib/user/userData";

export interface IUser {
  id: string;
  email: string;
  password: string;
  username: string;
  contact: string;
  description: string;
  isActivated: boolean;
  activationLink: string;
  role: string;
  banned: boolean;
  avatarVersion: number;
}

export interface IUserDataDTO {
  id: string;
  email: string;
  isActivated: boolean;
  status: EUserDataStatus;
  role: string;
  username: string;
}
