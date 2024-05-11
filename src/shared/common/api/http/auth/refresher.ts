'use client'

import axios, { AxiosResponse } from 'axios';

import { userSession } from '@/shared/common/lib/user';

class Refresher {
  __lastCallTime?: number;
  __refreshPromise?: Promise<AxiosResponse<{ accessToken: string }, any>>;

  private shouldCallApi(): boolean {
    if (!this.__lastCallTime) {
      return true;
    }

    return new Date().getTime() - this.__lastCallTime >= 1000 * 60 * 10;
  }

  private async tryRefresh(attemptsCount = 2): Promise<AxiosResponse<{ accessToken: string }, any>> {
    try {
      const res = await axios.get<{ accessToken: string }>(`${process.env.NEXT_PUBLIC_BACKEND}/user/auth/refresh`, {
        withCredentials: true
      });

      userSession.setToken(res.data.accessToken);

      return res;
    } catch (err) {
      if (attemptsCount === 1) {
        throw err;
      }

      return await this.tryRefresh(attemptsCount - 1);
    }
  }

  refresh() {
    if (this.shouldCallApi()) {
      this.__lastCallTime = new Date().getTime();
      this.__refreshPromise = this.tryRefresh();
    }

    return this.__refreshPromise;
  }
}

const refresher = new Refresher();

export default refresher;
