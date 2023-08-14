export default function MapElPage(): JSX.Element {
  // 1. 기본방법
  ["철수", "영희", "훈이"].forEach((el, index) => {
    console.log("el", el);
    console.log("index", index);
  });

  // 2. 매개변수 변경
  ["철수", "영희", "훈이"].forEach((asdf, zxcv) => {
    console.log("el", asdf);
    console.log("index", zxcv);
  });

  // 3. 함수 선언식 방법
  ["철수", "영희", "훈이"].forEach(function (asdf, zxcv) {
    console.log("el", asdf);
    console.log("index", zxcv);
  });

  // 4. el과 index 바꾸기 : 자리가 중요한것이지 이름이 중요하지 않음
  ["철수", "영희", "훈이"].forEach((index, el) => {
    console.log("el", el);
    console.log("index", index);
  });

  return <></>;
}

// map과 같은 방식으로 동작하는 forEach
// map은 리턴이 있어야 해서 지금은 forEach를 사용한것
