import { $api } from '..';
import defaultConfig from '../config';

/**
 * This make a request to check, if the user is logged in.
 * @returns Boolean value (is user authorized).
 */
export default async function getAuthData() {
  const { data } = await $api.get(`/user/auth/`, defaultConfig);

  return data;
}
