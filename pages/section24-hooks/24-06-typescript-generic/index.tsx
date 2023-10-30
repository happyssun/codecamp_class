import { type } from "os";

// 1. 문자/숫자/불린(primitive)타입
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};

const result = getPrimitive("철수", 123, true);

//
//
// 2. any 타입 => 그냥 자바스크립트랑 같음 : 타입을 아무거나 넣을수 있어 좋지않음
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 * 100); // any타입에선 이게 에러가 나지않고 그냥 실행
  return [arg3, arg2, arg1];
};

const result = getAny("철수", 123, true);

//
//
// 3. unknown 타입
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  if (typeof arg1 === "number") console.log(arg1 * 100); // unknown에서는 에러가 뜸.. 그래서 if로 타입을 지정해줘야한다 - any보다 안전
  return [arg3, arg2, arg1];
};

const result = getUnknown("철수", 123, true);

//
//
// 3. generic타입 => getGeneric("철수", 123, true)이렇게 넣어놓으면 이제부터 타입이 지정된다
function getGeneric<Mytype1, Mytype2, Mytype3>(arg1: Mytype1, arg2: Mytype2, arg3: Mytype3): [Mytype3, Mytype2, Mytype1] {
  return [arg3, arg2, arg1];
}

const result = getGeneric("철수", 123, true);
// const result = getGeneric<string, string, number>("철수", "영희", 123); 이렇게 넣으면 강제로 지정해 명시 해놓는것


//
//
// 4. generic타입 - 타입이름은 마음대로 바꿀수 있어서 짧게 이름을 변경해서 사용
function getGeneric2<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
  return [arg3, arg2, arg1];
}

const result = getGeneric2("철수", 123, true);

//
//
// 5. generic타입 - 화살표 형식으로 변경
function getGeneric3 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
  return [arg3, arg2, arg1];
}

const result = getGeneric3("철수", 123, true);
