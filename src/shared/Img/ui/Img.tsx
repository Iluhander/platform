import { FC, HTMLProps } from "react";
import ImgZoom from "./ImgZoom";

interface IImgProps extends HTMLProps<HTMLImageElement> {
  fullscreenable?: boolean
}

const Img: FC<IImgProps> = ({ fullscreenable = true, ...rest }) => {
  return (
    <div style={{ position: 'relative' }}>
      {rest.src && <ImgZoom src={rest.src} />}
      <img {...rest} />
    </div>
  );
}

export default Img;
