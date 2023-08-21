import BoardWrite from "../../../src/components/units/22-global-state/BoardWrite.container";
import { useRecoilState } from "recoil";
import { isEditState } from "../../../src/commons/stores";
import { useEffect } from "react";

export default function GlobalStateWithRecoilPage() {
  // const [isEdit, setIsEdit] = useState(true);

  const [, setIsEdit] = useRecoilState(isEditState);

  useEffect(() => {
    setIsEdit(false);
  }, []);

  return (
    // <BoardWrite isEdit={isEdit} />
    <BoardWrite />
  );
}

/* props drilling 없애기
기본적으로 isEdit 이 스테이트를 unit 폴더 안에있는 BoardWrite까지 보낸다고 했을때
index -> BoardWrite 콘테이너 -> 프레전터까지 props를 통해 전달해야 한다  : props drilling
그런데 여기서 recoil을 통해 공통 스테이트에 isEdit값을 저장하게 되면 드릴링 없이 바로 가져다 사용할수 있다

recoil사용
1. yarn add recoil 설치
2. global state로 사용할 파일 설정 - src/commons/stores
3. 그 파일에서 isEditState를 만들어주고
4. useState말고 useRecoilState(isEditState)로 값을 가져오고
5. 나머지 다른 두개의 파일의 props 사용대신 중간페이지 건너뛰고 바로 필요한곳에 useRecoilState사용
6. 이렇게 하기위해서는 app.tsx를 변경해야함
7. 내용전체를 <RecoilRoot>로 감싸줌 - 이 안에 있는애들은 전부 스테이트를 공유가능

// 그런데 리코일은 보통 다른것에 비해 많이 사용되진 않는다 - 참고하기

*/
