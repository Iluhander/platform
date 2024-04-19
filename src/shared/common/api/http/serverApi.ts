import NodeCache from "node-cache";
import { hasher } from "node-object-hash";

const req = (p: Promise<Response>): Promise<IRes> => p
  .then(async (p) => ({ data: await p.json(), status: p.status }));

interface IRes {
  data: any;
  status: number;
}

/**
 * Replacement for default broken cache.
 */
// const hashSortCoerce = hasher({ sort: true, coerce: true }); 

// const cache = new NodeCache();

const defaultNextReqConfig: NextFetchRequestConfig = { revalidate: 100 };

class ServerAPI {
  constructor(private basePath: string) {}

  get(uri: string, next = defaultNextReqConfig): Promise<IRes> {
    if (!next.revalidate) {
      return req(fetch(`${this.basePath}${uri}` , {
        method: 'GET',
        cache: 'no-store'
      }));
    }
   
    return req(fetch(`${this.basePath}${uri}` , {
      method: 'GET',
      next
    }));
  }

  post(uri: string, data: Record<string, any>, next = defaultNextReqConfig): Promise<IRes> {
    if (!next.revalidate) {
      return req(fetch(`${this.basePath}${uri}` , {
        method: 'POST',
        body: JSON.stringify(data),
        cache: 'no-store'
      }));
    }

    return req(fetch(`${this.basePath}${uri}` , {
      method: 'POST',
      body: JSON.stringify(data),
      next
    }));
  }
}

const $serverApi = new ServerAPI(String(process.env.NEXT_PUBLIC_BACKEND));

if (!process.env.NEXT_PUBLIC_BACKEND) {
  console.warn(`The "NEXT_PUBLIC_BACKEND" is not set up`);
}

export default $serverApi;
