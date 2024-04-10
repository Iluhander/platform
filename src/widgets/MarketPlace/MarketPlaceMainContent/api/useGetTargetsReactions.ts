import { useEffect, useRef, useState } from 'react';
import { ReqStatus } from '@iluhander/uwu-react';
import { Reactions } from '@/shared/Reactions/lib/types';
import userSession from '@/shared/common/lib/user/userSession';

let timeout: NodeJS.Timeout | undefined = undefined;
const useGetTargetsReactions = (
  targetsIds: string[],
  getReactions: (targetsIds: string[]) => Promise<{ data: Reactions[] }>
) => {
  const reactions = useRef(new Map());
  const [status, setStatus] = useState(ReqStatus.INITIALIZED);

  useEffect(() => {
    if (!userSession.getToken()) {
      return;
    }

    if (!targetsIds?.length) {
      return;
    }

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      setStatus(ReqStatus.LOADING);
      getReactions(targetsIds)
        .then(({ data }) => {
          for (let i = 0; i < targetsIds.length; i += 1) {
            if (data[i] > 0) {
              reactions.current.set(targetsIds[i], Reactions.LIKE);
            } else if (data[i] < 0) {
              reactions.current.set(targetsIds[i], Reactions.DISLIKE);
            } else {
              reactions.current.set(targetsIds[i], Reactions.NEUTRAL);
            }
          }

          setStatus(ReqStatus.LOADED);
          clearTimeout(timeout);
        })
        .catch(() => {
          setStatus(ReqStatus.LOADED);
          clearTimeout(timeout);
        });
    }, 1500);
  }, [targetsIds[0]]);

  return { reactions: reactions.current, status };
};

export default useGetTargetsReactions;
