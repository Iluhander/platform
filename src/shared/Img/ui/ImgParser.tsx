'use client'

import { EModalStatus, EModalVariant, ModalContext } from "@/shared/Modal/lib";
import { FC, useContext, useEffect } from "react";
import ZoomedImg from "./ZoomedImg";

const ImgParser: FC<{ targetId: string }> = ({ targetId }) => {
  const { setModalData, removeModal } = useContext(ModalContext);

  useEffect(() => {
    const imgs = document.getElementById(targetId)?.getElementsByTagName('img');

    if (!imgs) {
      return;
    }

    for (let i = 0; i < imgs.length; ++i) {
      imgs[i].addEventListener('click', () => {
        setModalData({
          variant: EModalVariant.CUSTOM,
          status: EModalStatus.VISIBLE,
          propsData: {
            Component: ({ status }: any) => <ZoomedImg src={imgs[i].src} close={removeModal} status={status} />
          }
        });
      });

      imgs[i].style.cursor = 'zoom-in';
    }
  }, [targetId]);

  return <div />
}

export default ImgParser;
