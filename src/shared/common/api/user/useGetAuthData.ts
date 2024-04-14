import { useReq } from '@iluhander/uwu-react';
import { $api } from '../http';
import defaultConfig from '../http/config';
import { LoadingUserData } from '../../lib/user/userData';
import extractUserData from '../../lib/user/extractUserData';

const useGetAuthData = () =>
  useReq(() => $api.get('/user/auth', defaultConfig), {
    notInstantReq: true,
    initialData: LoadingUserData,
    reducer: (_, newData) => extractUserData(newData),
    timeout: 5000,
    attempts: 3
  });

export default useGetAuthData;