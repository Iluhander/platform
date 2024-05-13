export function setToWindow(key: string, value: any) {
  if (!key || (typeof window === "undefined")) {
    return;
  }

  //@ts-ignore
  window[key] = value;
}

export function removeFromWindow(key: string) {
  // @ts-ignore
  delete window[key];
}
