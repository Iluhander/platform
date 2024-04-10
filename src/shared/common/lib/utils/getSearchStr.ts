/**
 * @param {Record<string, any>} search
 */
const getSearchStr = (search: Record<string, any>) =>
  Object.keys(search).reduce((curStr, key) => `${curStr}${key}:${search[key]},`, '');

export default getSearchStr;
