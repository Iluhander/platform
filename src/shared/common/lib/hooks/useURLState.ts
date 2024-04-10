import { useEffect, useState } from 'react';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import getObjsDiff from '../utils/getObjsDiff';

const regex = new RegExp(/^[\p{L}\d ,]+$/u);

const getParamsState = (curParams: ReadonlyURLSearchParams, defaultState: any) => {
  const paramsState = {
    ...defaultState
  };

  // eslint-disable-next-line no-restricted-syntax
  Object.entries(defaultState).forEach(([ key, val ]) => {
    if (curParams.has(key)) {
      const decoded = decodeURIComponent(curParams.get(key) as string);

      if (regex.test(decoded) && defaultState[key]?.trim() !== decoded) {
        paramsState[key] = decoded;
      }
    }
  });

  return paramsState;
};

/**
 * Perfomant hook for linking state to the url params.
 * @param {Record<string, any>} defaultState.
 */
export default function useURLState<T extends Record<any, any>>(defaultState: T) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [state, setState] = useState(getParamsState(params, defaultState));

  const setNewState = (newState: any) => {
    const diff = getObjsDiff(defaultState, newState);

    const paramsStr = (new URLSearchParams(diff)).toString();
    router.push(`${pathname}?${paramsStr}`);
  };

  useEffect(() => {
    setState(getParamsState(params, defaultState));
  }, [router.push, params]);

  return [state, setNewState];
}
