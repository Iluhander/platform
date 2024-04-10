import { removeEngineBasePath } from "../engine/engineContext";

class Session {
  tokenName = 'userToken';

  getToken() {
    return localStorage.getItem(this.tokenName);
  }

  setToken(newVal: string) {
    return localStorage.setItem(this.tokenName, newVal);
  }

  invalidateToken() {
    return localStorage.setItem(this.tokenName, Math.random().toString());
  }

  removeToken() {
    const prevTokenVal = this.getToken();
    localStorage.removeItem(this.tokenName);

    return prevTokenVal;
  }

  quit(to?: string) {
    const prevTokenVal = this.removeToken();
    removeEngineBasePath();

    if (!to) {
      if (prevTokenVal) {
        window.location.reload();
      }
    } else {
      window.location.replace(to);
    }
  }
}

const userSession = new Session();

export default userSession;
