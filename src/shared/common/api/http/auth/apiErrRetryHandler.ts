export default async function apiErrRetryHandler(error: Record<string, any>) {
  const originalReq = error.config;

  if (!originalReq.retryCount) {
    return false;
  }

  originalReq.retryCount = Math.max(0, originalReq.retryCount - 1);

  return !error.response || error.response.status >= 500;
}
