export function provideEngineAPI(
  userId: string | null,
  novelId: string | null,
  sendMessage?: (arg0: any, arg1: any, arg2: any) => void
) {
  // @ts-ignore
  if (novelId && !window.getWebProjectData) {
    // @ts-ignore
    window.getWebProjectData = () => {
      // @ts-ignore
      window.engineLoaded = true;
      return {
        S3BucketName: 'test-assets',
        S3Prefix: novelId
      };
    };
  }

  // @ts-ignore
  if (userId && !window.getUserId) {
    // @ts-ignore
    window.getUserId = () => userId;
  }

  // @ts-ignore
  if (novelId && !window.getNovelId) {
    // @ts-ignore
    window.getNovelId = () => novelId;
  }

  if (sendMessage) {
    // @ts-ignore
    window.sendMessage = (...args) => sendMessage(args[0], args[1], args[2]);
  }
}

export function removeEngineAPI() {
  // @ts-ignore
  delete window.getUserId;
  // @ts-ignore
  delete window.getNovelId;
  // @ts-ignore
  delete window.sendMessage;
}
