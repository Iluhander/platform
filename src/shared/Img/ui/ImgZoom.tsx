'use client'

import { EModalStatus, EModalVariant, ModalContext } from "@/shared/Modal/lib";
import { FC, useContext } from "react";
import ZoomedImg from "./ZoomedImg";

const ImgZoom: FC<{ src: string }> = ({ src }) => {
  const { setModalData, removeModal } = useContext(ModalContext);

  const zoom = () => {
    setModalData({
      variant: EModalVariant.CUSTOM,
      status: EModalStatus.VISIBLE,
      propsData: {
        Component: ({ status }: any) => <ZoomedImg src={src} close={removeModal} status={status} />
      }
    });
  };

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        cursor: 'zoom-in'
      }}
      onClick={zoom}
    />
  );
};

export default ImgZoom;
