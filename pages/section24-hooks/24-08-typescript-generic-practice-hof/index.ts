// generic을 사용하는 이유는 사용자가 뭘 넣을지 모르기 때문에 타입이름을 짓어놓으면 사용자가 넣는것에 따라 타입이 잡힘
// 1. HOF - 일반함수
function first<T>(arg1: T) {
  return function second<U>(arg2: U): [T, U] {
    return [arg1, arg2];
  };
}

const result = first("영희")(8);

//
//
// 1. HOF - 일반함수
// prettier-ignore
const first2 = <T>(arg1: T) => <U>(arg2: U): [T, U] => {
    return [arg1, arg2];
  };

const result = first2("영희")(8);

//
//
// 1. HOF - 일반함수
// prettier-ignore
const 로그인체크 = <C>(Component: C) => <P>(props: P): [C, P] => {
  return [Component, props];
};

const result = 로그인체크("영희")(8);
