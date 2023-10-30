// 제공자가 제공하는 방식 : any형식은 불안정하니 generic형식으로
export function useState<S>(초기값: S): [S, (변경값: S) => void] {
  const state = 초기값;

  const setState = (변경값: S): void => {
    console.log(`${state}에서 ${변경값}으로 값을 변경하겠습니다.`); // 1. state변경하기
    console.log(`변경된 ${변경값}을 사용해서 컴포넌트를 리렌더링 하겠습니다.`); // 2. 해당 컴포넌트 변경
  };
  return [state, setState];
}

// 사용자가 사용하는 방식
const [count, setCount] = useState(10);
