'use client'

import { UserDataContext } from "@/shared/common/lib/user/userData";
import { INovel } from "@/shared/common/model";
import Link from "next/link";
import { FC, useContext } from "react";

const NovelAuthorElem: FC<{ novelData: INovel }> = ({ novelData }) => {
  const { userData } = useContext(UserDataContext);
  if (novelData.author.id === userData.id) {
    return (
      <div id="novelButtons">
        <Link href={`/editnovel?id=${novelData.id}`}>
          <button className="niceButton" type="button">
            Редактировать →
          </button>
        </Link>
      </div>
    );
  } else {
    return <div />;
  }
}

export default NovelAuthorElem;
