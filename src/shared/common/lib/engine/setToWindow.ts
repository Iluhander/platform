export function setToWindow(key: string, value: any) {
  if (!key) {
    return;
  }

  //@ts-ignore
  window[key] = value;
}

export function removeFromWindow(key: string) {
  // @ts-ignore
  delete window[key];
}
