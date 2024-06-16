'use client'

import { FC, ReactNode, useEffect, useState } from "react";

interface IStrictClientProps<T> extends Record<string, any> {
  FC: FC<T>;
}

export default function StrictClient <T>({ FC, ...rest }: IStrictClientProps<T>) {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !canRender) {
      setTimeout(() => setCanRender(true), 0);
    }
  }, [typeof window]);

  if (canRender) {
    return <FC {...(rest as any)} />;
  }

  return <div />;
};
