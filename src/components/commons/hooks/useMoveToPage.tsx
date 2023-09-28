import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { visitedPageState } from "../../../commons/stores";
interface IUseMoveToPageReturn {
  visitedPage: string;
  onClickMoveToPage: (path: string) => () => void;
}

export const useMoveToPage = (): IUseMoveToPageReturn => {
  const router = useRouter();

  // 마지막에 들어갔던 페이지를 저장하기
  // 1. recoil에 저장 - 글로벌스테이트에 저장
  const [visitedPage, setVisitedPage] = useRecoilState(visitedPageState);

  const onClickMoveToPage = (path: string) => () => {
    setVisitedPage(path); // 조건문 추가 : 로그인페이지일때는 set하지 않도록

    // 2. 로컬스토리지에 저장
    // localStorage.setItem("visitedPage", path)
    router.push(path);
  };

  return {
    visitedPage,
    onClickMoveToPage,
    // onClickMoveToPage: onClickMoveToPage - 숏핸드프로퍼티로 간략히
  };
};
