// @ts-nocheck

import refresher from "../../api/http/auth/refresher";

export function provideEngineAPI(
  userId: string | undefined,
  novelId: string | undefined,
  sendMessage?: (arg0: any, arg1: any, arg2: any) => void
) {
  if (!window.refresh) {
    window.refresh = () => refresher.refresh();
  }

  if (userId !== undefined) {
    window.getUserId = () => userId;
  }

  if (novelId !== undefined) {
    window.getNovelId = () => novelId;
    window.getWebProjectData = () => {
      window.engineLoaded = true;
      return {
        S3BucketName: 'test-assets',
        S3Prefix: novelId
      };
    };
  }

  if (sendMessage) {
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
