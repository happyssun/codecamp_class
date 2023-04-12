// 백엔드에서 받아온 데이터라고 가정(컴포넌트 위에 만든 이유:컴포넌트 리렌더링되도 다시 생성안되니까) - 상수같은것들
const FRUITS = [
  { number: 1, title: "레드향" },
  { number: 2, title: "샤인머스켓" },
  { number: 3, title: "산청딸기" },
  { number: 4, title: "한라봉" },
  { number: 5, title: "사과" },
  { number: 6, title: "애플망고" },
  { number: 7, title: "딸기" },
  { number: 8, title: "천혜향" },
  { number: 9, title: "과일선물세트" },
  { number: 10, title: "귤" },
];

export default function MapFruitsPage() {
  //1. 가장 기본 예제
  // const aaa = [<div>1 레드향 </div>,<div>2 샤인머스켓 </div>,<div>3 산청딸기 </div>];

  // 2. 실무 백엔드 예제 : 같은 결과 나옴
  const bbb = [
    { number: 1, title: "레드향" },
    { number: 2, title: "샤인머스켓" },
    { number: 3, title: "산청딸기" },
  ].map((el) => (
    <div>
      {el.number} {el.title}
    </div>
  ));

  //3. 실무 백엔드 예제 : 같은 결과 나옴
  const ccc = FRUITS.map((el) => (
    <div>
      {el.number} {el.title}
    </div>
  ));

  return (
    <>
      {bbb}
      {FRUITS.map((el) => (
        <div>
          {el.number} {el.title}
        </div>
      ))}
    </>
  );
}

// 위에 {bbb} 라고 하면 어떤것인지 잘 안보이기 때문에 아래처럼 presenter에서 바로 뿌려주는게 좋다
