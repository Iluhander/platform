import { IEngineMessage } from "../../model/engine";

type TFunc = (...args: any[]) => any; 

function callAll(fns: TFunc[]) {
  fns.forEach((fn) => fn());
}

export class SavedEHandler {
  timeout?: NodeJS.Timeout;

  resolveFns: TFunc[] = [];
  rejectFns: TFunc[] = [];

  handle(msg: IEngineMessage) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    switch (msg.name) {
      case 'saved':
        callAll(this.resolveFns);
        this.rejectFns = [];
        this.resolveFns = [];
        break;
      case 'error':
        this.timeout = setTimeout(() => {
          callAll(this.rejectFns);
          this.rejectFns = [];
          this.resolveFns = [];
        }, 8000);
        break;
      default:
        return;
    }
  }
}

export class ErrorEHandler {
  handle(msg: IEngineMessage) {
    console.log('Engine error:');
    console.log(msg);
  }
}