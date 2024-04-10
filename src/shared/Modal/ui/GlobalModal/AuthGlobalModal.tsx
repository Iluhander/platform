import { FC, useMemo } from 'react';
import { EModalStatus, IDefaultModalOption } from '../../lib';
import GlobalModal from './GlobalModal';

interface IAuthGlobalModalProps {
  removeWarning: () => void;
  status: EModalStatus;
}

const AuthGlobalModal: FC<IAuthGlobalModalProps> = ({ removeWarning, status }) => {
  const modalOptions: IDefaultModalOption[] = useMemo(() => [
    {
      text: 'Присоединиться',
      action: () => window.location.replace('/register'),
      className: 'niceButton'
    },
    {
      text: 'Отмена',
      action: () => removeWarning(),
      style: { background: 'var(--third-color)', color: 'white' }
    }
  ], []);

  return (
    <GlobalModal
      heading={{ text: 'Авторизуйтесь' }}
      text="Присоединяйтесь к UwU Novels, чтобы делиться своими взглядами !"
      options={modalOptions}
      status={status}
    />
  );
}

export default AuthGlobalModal;
