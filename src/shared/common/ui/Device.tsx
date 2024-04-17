import { ReactNode } from "react";
import * as rdd from 'react-device-detect';

interface IDeviceProps {
  children: (props: typeof rdd) => ReactNode;
}

export default function Device(props: IDeviceProps) {
  return (
    <>
      {props.children(rdd)}
    </>
  );
}
