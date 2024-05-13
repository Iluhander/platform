export const engineBasePathKey = '__xEngineS3BasePath';

export const defaultEngineBasePath = 'https://api.uwunovels.com/static/engine/origin/master/Build/';

export const getEngineBasePath = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(engineBasePathKey) ?? defaultEngineBasePath
  }

  return defaultEngineBasePath;
}

export const setEngineBasePath = (newBasePath: string) =>
  localStorage.setItem(engineBasePathKey, newBasePath);

export const removeEngineBasePath = () => localStorage.removeItem(engineBasePathKey);

export const defaultEngineEncoding = 'gz';
