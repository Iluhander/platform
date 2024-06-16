'use client'

import { EShowModalType } from "@/shared/Modal/lib";
import useShowModal from "@/shared/Modal/lib/useShowModal";
import { ChangeEvent, FC, useRef } from "react";

interface IMarketPlaceAuthorFilterProps {
  onFieldChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  authenticated: boolean;
}

const MarketPlaceAuthorFilter: FC<IMarketPlaceAuthorFilterProps> = ({ onFieldChange, authenticated }) => {
  const setShowModalData = useShowModal();

  const authorSelect = useRef<HTMLSelectElement>(null);

  return (
    <>
      <select
        name="author"
        // @ts-ignore
        placeholder="Автор"
        className="marketFilterSelector niceInput"
        onChange={(e) => {
          if (authenticated) {
            onFieldChange(e);
          } else {
            e?.preventDefault();
            (authorSelect.current as HTMLSelectElement).value = 'Всех авторов';

            setShowModalData(EShowModalType.NOT_AUTHENTICATED);
          }
        }}
        ref={authorSelect}
      >
        <option value="Всех авторов">Всех авторов</option>
        <option value="Мои новеллы">Мои новеллы</option>
        <option value="Других авторов">Других авторов</option>
      </select>
    </>
  );
}

export default MarketPlaceAuthorFilter;
