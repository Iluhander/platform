import { FC, useMemo, useRef } from 'react';
import GlobalModal from './GlobalModal';
import { EModalStatus, IDefaultModalOption } from '../../lib';

interface IActivateGlobalModalProps {
  action?: () => void;
  text: string;
  status: EModalStatus;
}

const ActivateGlobalModal: FC<IActivateGlobalModalProps> = ({ action, text, status }) => {
  let modalOptions = useMemo<IDefaultModalOption[]>(() => action ? [
    {
      text: 'Хорошо',
      action,
      className: 'niceButton'
    },
    {
      text: 'Отправить ещё раз',
      action: () => window.location.replace('/resend'),
    }
  ]: [], []);

  text ??=
    'Чтобы создавать истории, активируйте аккаунт. Для этого перейдите по ссылке в письме на почте.';

  return (
    <GlobalModal
      heading={{ text: 'Активация' }}
      text={text}
      options={modalOptions}
      status={status}
    />
  );
}

export default ActivateGlobalModal;
