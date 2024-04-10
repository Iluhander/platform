import axios from 'axios';
import userSession from '../../../lib/user/userSession';

export default function logOutApi() {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND}/user/auth/logout`,
    {},
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userSession.getToken()}`
      }
    }
  );
}
