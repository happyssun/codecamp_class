export default function Ex() {
  // 타입추론 : 바로 타입을 적지않아도 알아서 추론을 함
  let aaa = "안녕하세요";
  aaa = 3;

  // 타입명시
  let bbb: string = "반갑습니다";

  // 문자타입 (선언과 할당 분리)
  let ccc: string;
  ccc = "반가워요!!";
  ccc = 3;

  // 숫자타입
  let ddd: number = 10;
  ddd = "철수";

  // 불린타입
  let eee: boolean = true;
  eee = "false"; // js에서 이렇게 하면 "false"가 문자열이 때문에 빈문자열이 아님으로 true 이다 :::: 주의하자

  // 배열타입
  let fff: number[] = [1, 2, 3, 4, 5, "안녕하세요"];
  let ggg: string[] = ["a", "b", "c", 10];
  let hhh = ["a", "b", "c", 10]; // 타입을 추론해서 어떤 타입을 사용하는지 알아보기
  let iii: (string | number)[] = ["a", "b", "c", 10];

  // 객체타입
  interface Iprofile {
    name: string;
    age: number | string;
    school: string;
  }

  const profile: Iprofile = {
    name: "철수",
    age: 8,
    school: "다람쥐초등학교",
  };
  profile.age = "8살";

  // 함수타입 : 어디서든 호출이 가능함으로 타입추론 불가능 반드시 타입 명시 해야함
  //string => 요 부분은 return에 대한 타입명시
  const add = (num1: number, num2: number, unit: string): string => {
    return num1 + num2 + unit;
  };

  const result = add(1000, 2000, "원"); // 결과의 리턴 타입도 추론 가능!

  // any타입
  let qqq: any = "철수"; // 자바 스크립트와 동일
  qqq = 123;
  111 = true;

  return <div></div>;
}

// 빨간줄 뜨는것들 확인 - 타입이 달라서 - 마우스 올려보면 확인가능
