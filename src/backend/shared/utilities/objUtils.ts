export function objWithoutUndefs(obj: Record<string, any>) {
  const res: Record<string, any> = {};
  
  for (let key in obj) {
    if (obj[key] !== undefined) {
      res[key] = obj[key];
    }
  }

  return res;
}
