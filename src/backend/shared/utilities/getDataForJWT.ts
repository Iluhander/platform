import { IUser } from "../auth/models/User";

export default function getDataForJWT(user: IUser) {
  return {
    email: user.email,
    id: user.id,
    isActivated: user.isActivated,
    avatarVersion: user.avatarVersion,
    role: user.role,
    username: user.username
  };
}
