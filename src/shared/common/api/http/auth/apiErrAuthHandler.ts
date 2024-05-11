import { userSession } from '@/shared/common/lib/user';
import refresher from './refresher';

export default async function apiErrAuthHandler(error: Record<string, any>) {
  if (error?.response?.status !== 401) {
    return false;
  }

  try {
    await refresher.refresh();

    return true;
  } catch (err) {
    userSession.quit();

    return false;
  }
}
