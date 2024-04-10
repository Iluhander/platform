import { FC, useMemo } from "react";
import { EModalStatus, IDefaultModalOption } from "../../lib";
import NonBlockingModal from "./NonBlockingModal";

interface IErrModalProps {
  text: string;
  status: EModalStatus;
}

const ErrModal: FC<IErrModalProps> = ({
  text,
  status
}) => {
  const modalOptions = useMemo<IDefaultModalOption[]>(() => [
    {
      text: 'Хорошо',
      className: 'niceButton',
      action: () => {}
    }
  ], []);

  return (
    <NonBlockingModal
      heading={{ text: 'Ошибка' }}
      text={text}
      options={modalOptions}
      status={status}
    />
  );
};

export default ErrModal;
