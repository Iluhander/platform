import { ReqStatus } from '@iluhander/uwu-react';
import { FC, useContext, useEffect, useState } from 'react';

import { Reactions } from '../lib/types';
import { ModalContext, EModalStatus, EModalVariant, EShowModalType } from '../../Modal/lib';
import useShowModal from '../../Modal/lib/useShowModal';

import LoadingDots from '../../Animated/LoadingDots/LoadingDots';

import './Reaction.scss';

interface IReactionAttrs {
  likesCount: number;
  getReaction: () => Promise<{ type: Reactions }>;
  callLike?: () => Promise<any>;
  callDislike?: () => Promise<any>;
  callNeutral?: () => Promise<any>;
  unauthorized?: boolean;
}

const Reaction: FC<IReactionAttrs> = ({
  likesCount,
  getReaction,
  callLike,
  callDislike,
  callNeutral,
  unauthorized
}) => {
  const { setModalData, removeModal } = useContext(ModalContext);
  const [reaction, setReaction] = useState(Reactions.NEUTRAL);
  const [reactionState, setReactionState] = useState(ReqStatus.LOADING);
  const setShowModalData = useShowModal();

  useEffect(() => {
    if (reaction) {
      setReactionState(ReqStatus.LOADED);
    } else {
      getReaction()
        .then(({ type }) => {
          setReaction(type);
          setReactionState(ReqStatus.LOADED);
        })
        .catch(() => {
          setReactionState(ReqStatus.ERROR);
        });
    }
  }, [reaction]);

  const likesCountText = likesCount && likesCount > 0 ? likesCount : '';

  const showErrModal = () => {
    setModalData({
      status: EModalStatus.VISIBLE,
      variant: EModalVariant.NON_BLOCKING,
      propsData: {
        heading: { text: 'Ошибка :(' },
        text: 'Не получилось оценить. Попробуем ещё раз ?',
        options: [
          {
            text: 'Ок',
            className: 'niceButton',
            style: { padding: '10px 20px' },
            action: () => removeModal()
          }
        ]
      }
    });
  };

  const handleLikeCall = () => {
    if (unauthorized) {
      setShowModalData(EShowModalType.NOT_AUTHENTICATED);
    } else if (reaction === Reactions.LIKE) {
      callNeutral?.()
        .then(() => setReaction(Reactions.NEUTRAL))
        .catch(showErrModal);
    } else {
      callLike?.()
        .then(() => setReaction(Reactions.LIKE))
        .catch(showErrModal);
    }
  };

  const handleDislikeCall = () => {
    if (unauthorized) {
      setShowModalData(EShowModalType.NOT_AUTHENTICATED);
    } else if (reaction === Reactions.DISLIKE) {
      callNeutral?.()
        .then(() => setReaction(Reactions.NEUTRAL))
        .catch(showErrModal);
    } else if (callDislike) {
      callDislike()
        .then(() => setReaction(Reactions.DISLIKE))
        .catch(showErrModal);
    }
  };

  switch (reactionState) {
    case ReqStatus.ERROR:
      return <div />;
    case ReqStatus.LOADED:
      return (
        <>
          <button type="button" className="thumbUpButton" onClick={handleLikeCall}>
            {reaction === Reactions.LIKE ? (
              <img
                src="/icons/thumbupactive.png"
                style={{ filter: 'brightness(1.3)' }}
                className="reactionImg"
                alt="likesCount"
              />
            ) : (
              <img src="/icons/thumbup.png" className="reactionImg" alt="likesCount" />
            )}
          </button>
          <p>{likesCountText}</p>
          {callDislike || unauthorized ? (
            <button
              type="button"
              onClick={handleDislikeCall}
              style={{ position: 'relative', margin: '2px 0 0 12px' }}
            >
              <img
                src={
                  reaction === Reactions.DISLIKE
                    ? '/icons/thumbdownactive.png'
                    : '/icons/thumbdown.png'
                }
                className="reactionImg"
                alt="dislikesCount"
              />
            </button>
          ) : (
            ''
          )}
        </>
      );
    default:
      return <LoadingDots />;
  }
}

export default Reaction;
