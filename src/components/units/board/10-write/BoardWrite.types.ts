import { ChangeEvent } from "react";
import { Query } from "../../../../commons/types/generated/types";

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: Pick<Query, "fetchBoard">;
}

// 타입지정 void는 return이 없는 경우를 뜻한다.
export interface IBoardWriteUIProps {
  onClickSubmit: () => void;
  onClickUpdate: () => void;
  onChangeWriter: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeContents: (e: ChangeEvent<HTMLInputElement>) => void;
  mycolor: boolean;
  isEdit: boolean;
  data: Pick<Query, "fetchBoard">;
}

export interface IBlueButtonIProps {
  rrr: string;
  qqq: string;
  zzz: boolean;
}

export interface IMyvariables {
  number: number;
  writer?: string;
  title?: string;
  contents?: string;
}
