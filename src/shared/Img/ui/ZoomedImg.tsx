import { FC } from "react";

import Button from "@/shared/Button/Button";
import { EModalStatus } from "@/shared/Modal/lib";

import s from './ZoomedImg.module.scss';

interface IZoomedImgProps {
  src: string;
  close: () => void;
  status: EModalStatus;
}

const ZoomedImg: FC<IZoomedImgProps> = ({ src, close, status }) => {
  return (
    <div className={`opacityAppear ${s.zoomedImgContainer} ${status === EModalStatus.HIDING ? 'hiding' : ''}`} onClick={close}>
      <img className={s.zoomedImgContainer__main} src={src} />
      <Button className={`${s.zoomedImgContainer__close}`} onClick={close}>
        Закрыть
      </Button>
    </div>
  );
}

export default ZoomedImg;
