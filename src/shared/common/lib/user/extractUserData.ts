import { DefaultUserName, EUserDataStatus, IUserData } from './userData';

const extractUserData = (
  { id, email, isActivated, role, username, avatarVersion }: Record<string, any>,
  status = EUserDataStatus.AUTHENTICATED
): IUserData => ({
  id,
  email,
  isActivated,
  role,
  username: username ?? DefaultUserName,
  status,
  avatarVersion
});

export default extractUserData;
