import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// 함수형 컴포넌트에서는 훅을 사용
export default function ClassCounterPage() {
  const [count, setCount] = useState(0);
  const router = useRouter();

  /*
 class형의 라이프사이클을 대체해주는 훅은 useEffect

  // componentDidUpdate()의 기능과 같은데 조건을 달수가 있다 - 의존성 배열(dependencey array)
  // 얘는 componentDidMount() + componentDidUpdate()  - 처음부터 실행이 됨
  // 처음에 무조건 실행 :  뒤에 []자리를 빈칸
  // 의존성 배열[]안에 조건이 있으면 [count] 변경후 재실행이 됨

  1) 아래 내용을 하나로 합치기 가능
    useEffect(() => {
      console.log("그려지고 나서 실행!!");
      return () => {
        console.log("사라질때 실행");
      };
    });

    useEffect(() => {
      console.log("변경되고 나서 실행!!");
    }, [count]);

  2) useEffect의 잘못된 사용예제 
  - useEffect안에 setState를 사용하게 되면 불필요하게 2번 렌더링 된다
  - 그런데 유지보수때문에 사용할때도 있긴 하지만 가급적 이런 코드는 쓰지않는것이 좋다
    useEffect(()=>{
    setCount((prev)=>prev+1)
    },[count]) - 지금 이코드는 [count]가 변경될때마다 재렌더링 되서 무한루프가 된다... 주의!!!!!!!!
   */

  // componentDidMount()
  useEffect(() => {
    console.log("그려지고 나서 실행!!");
  }, []);

  // componentDidUpdate()
  useEffect(() => {
    console.log("변경되고 나서 실행!!");
  });

  // componentWillUnmount()
  useEffect(() => {
    return () => {
      console.log("사라질때 실행");
    };
  }, []);

  const onClickMove = () => {
    router.push("/");
  };

  const onClickCountUp = () => {
    console.log(count);
    setCount((prev) => prev + 1);
  };

  // 위의 useEffect는 그려지고 나서 실행되니까 밑의 메세지 다음에 실행됨
  console.log("여기가 제일 먼저 실행");

  return (
    <>
      <div>{count}</div>
      <button onClick={onClickCountUp}>Count Up</button>
      <button onClick={onClickMove}>Main Page</button>
    </>
  );
}
