/**
 * @param {Record<any, any> =} obj1
 * @param {Record<any, any> =} obj2
 */
export default function getObjsDiff<T1 extends Record<any, any>, T2 extends Record<any, any>>(
  obj1: T1,
  obj2: T2
): T1 {
  if (!obj1) {
    // @ts-ignore
    obj1 = {};
  }

  if (!obj2) {
    // @ts-ignore
    obj2 = {};
  }

  return Object.keys(obj1).reduce((curObj, key) => {
    if (obj2[key] && obj2[key] !== obj1[key]) {
      return {
        ...curObj,
        [key]: obj2[key]
      };
    }

    return curObj;
  }, {} as T1);
}
