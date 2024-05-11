'use client'

import { refresher } from "../../api/http/auth";
import { ErrorEHandler, SavedEHandler } from "./handlers";
import { setToWindow, removeFromWindow } from "./setToWindow";

const engineHandles: Record<string, string> = {
  userId: 'getUserId',
  novelId: 'getNovelId',
  ownerId: 'getOwnerId'
};

interface IEngineBridge {
  saveNovel: () => void;
}

class EngineAPI {
  private static readonly __bridgeElemId = 'bridge';

  private static readonly __eventName = 'message';

  private __bridge?: IEngineBridge;

  private __events = {
    saved: new SavedEHandler(),
    error: new ErrorEHandler()
  };

  private constructor() {
    document.getElementById(EngineAPI.__bridgeElemId)?.addEventListener(
      EngineAPI.__eventName,
      // @ts-ignore
      (e) => this.__events[e.data.name].handle(e.data.payload),
      false,
    );

    setToWindow('refresh', refresher.refresh.bind(refresher));
    setToWindow('provideEngineAPI', this.__provideEngineAPI.bind(this));
  }

  public static instantiate() {
    let host = document.getElementById(EngineAPI.__bridgeElemId) as any;
    if (!host) {
      const bridgeElem = document.createElement('div');
      bridgeElem.id = EngineAPI.__bridgeElemId;
      document.querySelector('body')?.appendChild(bridgeElem);

      host = bridgeElem;
    }

    if (!host.finst) {
      host.finst = new EngineAPI();
    }

    return host.finst as EngineAPI;
  }

  public saveNovel() {
    return new Promise((resolve, reject) => {
      this.__events.saved.resolveFns.push(resolve);
      this.__events.saved.rejectFns.push(reject);
      this.__bridge?.saveNovel();
    });
  }

  private __provideEngineAPI(bridge: IEngineBridge) {
    this.__bridge = bridge;
    removeFromWindow('provideEngineAPI');
  }
  
  static add(data: Record<string, any>) {
    Object.keys(data).forEach((item) => {
      setToWindow(engineHandles[item] as string, () => data[item]);
    });

    if (data.novelId !== undefined) {
      setToWindow('getWebProjectData', () => {
        setToWindow('engineLoaded', true);
        return {
          S3BucketName: 'test-assets',
          S3Prefix: data.novelId
        };
      });
    }

    if (data.sendMessage) {
      setToWindow('sendMessage', (...args: any[]) => data.sendMessage(args[0], args[1], args[2]));
    }
  }

  static clear() {
    document.getElementById(EngineAPI.__bridgeElemId)?.remove();
    Object.keys(engineHandles).forEach((item) => {
      removeFromWindow(engineHandles[item]);
    });
    
    removeFromWindow('sendMessage');
    removeFromWindow('provideEngineAPI');
  }
}

export default EngineAPI;
