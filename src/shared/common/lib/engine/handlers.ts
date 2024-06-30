import { IEngineMessage } from "../../model/engine";

type TFunc = (...args: any[]) => any; 

function callAll(fns: TFunc[]) {
  fns.forEach((fn) => fn());
}

export class SavedEHandler {
  timeout?: NodeJS.Timeout;

  resolveFns: TFunc[] = [];
  rejectFns: TFunc[] = [];

  setDeadline(time = 8000) {
    if (this.timeout) {
      return;
    }

    this.timeout = setTimeout(() => {
      callAll(this.rejectFns);
      this.rejectFns = [];
      this.resolveFns = [];
      this.timeout = undefined;
    }, time);
  }

  resolve() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }

    callAll(this.resolveFns);
    this.rejectFns = [];
    this.resolveFns = [];
  }

  handle(msg: IEngineMessage) {
    switch (msg.name) {
      case 'saved':
        return this.resolve();
      case 'error':
        return this.setDeadline();
      default:
        return;
    }
  }
}

export class PongEHandler {
  timeout?: NodeJS.Timeout;

  resolveFns: TFunc[] = [];
  rejectFns: TFunc[] = [];

  setDeadline(time = 4000) {
    if (this.timeout) {
      return;
    }

    this.timeout = setTimeout(() => {
      callAll(this.rejectFns);
      this.rejectFns = [];
      this.resolveFns = [];
      this.timeout = undefined;
    }, time);
  }

  resolve() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }

    callAll(this.resolveFns);
    this.rejectFns = [];
    this.resolveFns = [];
  }

  handle(msg: IEngineMessage) {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }

    this.resolve();
  }
}

export class ErrorEHandler {
  handle(msg: IEngineMessage) {
    console.log('Engine error:');
    console.log(msg);
  }
}