/* 메모이제이션 - memo, useMemo, useCallback 등 */
import { useCallback, useMemo, useState } from "react";

export default function MemeizationPage(): JSX.Element {
  console.log("컴포넌트가 렌더링 되었습니디");

  let countLet = 0; // 리렌더링이 되지 않아 숫자가 증가는 되지만 화면에 숫자가 올라간것이 보이지 않음
  const [countState, setCountState] = useState(0); // 리렌더링이 됨

  // 리렌더링 되면서 모두 초기화가 되는것을 확인하기 위해 넣어둔 코드
  // 버튼 누를때마다 랜덤숫자가 나올것이고 그 의미가 렌더링될때마다 초기화된다는
  // 콘솔을 보면 매번 랜덤숫자 발생
  // const aaa = Math.random()
  // console.log(aaa)

  // 1. useMemo()로 변수 기억하기
  /**
    버튼누를때마다 위에처럼 계속 리렌더링이 된다면 비효울적이라 useMemo()를 사용
    useEffect()와 사용방법 같음 useEffect(()=>{},[])
    useMemo(()=> {
        return 기억하고싶은값   --> 화살표함서 {}와 return 사이에 아무값이 없으면 ()로 바꿔치기 가능, ()에 의미없으면 생략가능
      }, [의존성 배열])        --> 의존성배열의 값이 바뀔경우 리렌더링
    기억하고 싶은 것을 useMeme()에 넣어놓음
   */

  const aaa = useMemo(() => Math.random(), []);
  console.log(aaa);

  // 2. useCallbak()으로 함수 기억하기
  const onClickCountLet = useCallback((): void => {
    console.log(countLet + 1);
    countLet += 1; // countLet = countLet + 1,[])
  }, []);

  // 3. useCallback() 주의사항 ==> state 사용 주의
  // countState는 증가가 되어야하는데 그 값까지 기억이 됨으로 기존값을 기억하게 prev 사용
  const onClickCountState = useCallback((): void => {
    // setCountState(countState + 1); 이값이 아니고
    setCountState((prev) => prev + 1); // 이렇게 기존값 불러와서
  }, []);

  // 4. useMemo()로 나의 useCallback() 만들어보기
  /* useMemo()에 useCallbac()을 저장할수 있다는 보기로 만들어둔 예시 - 오류지만 그냥 예시문
  const onClickCountState2 = useMemo(() => {
    return (): void => {
     setCountState((prev) => prev + 1);
    }
  }, []);
  */

  return (
    <>
      <div>카운트(let) : {countLet} </div>
      <button onClick={onClickCountLet}> +1 올리기</button>
      <div>카운트(state) : {countState} </div>
      <button onClick={onClickCountState}>+1 올리기</button>
      <div>카운트(state) : {countState} </div>
      {/* 바로 이렇게 바인딩해서도 가능, 그런데 너무 복잡하고 유지보수 힘듬 이렇게 사용하지말기 */}
      {/* <button
        onClick={useCallback((): void => {
          setCountState((prev) => prev + 1);
        }, [])}
      >
        카운트(state) +1 올리기
      </button> */}
    </>
  );
}

/**
 // 리렌더링이 되지않음 : 버튼클릭시 숫자는 증가해서 콘솔창에 찍히기는 하나 화면에 보이지 않음
 * let countLet = 0; 
 *  const onClickCountLet = (): void => {
    console.log(countLet + 1);
    countLet += 1; // countLet = countLet + 1
  };

 // state에 값을 저장한 상태로 리렌더링이 됨 : 그러면서 위의 위의 let도 여기 state도 전부 리렌더링
 그래서 useState()는 값을 저장한채로 리렌더링이 되니 버튼 누를떄 값이 변화하지만
 let은 리렌더링이 되지않기에 밑에서 onClickCountState() 버튼을 누르면 다시 초기화가 되어 0이다



 */
