import { add } from "../../pages/section33-test/33-01-jest";

it("더하기 잘 되는지 테스트", () => {
  const result = add(3, 5);
  expect(result).toBe(8);
});

// 그룹으로 한번에 테스트 하는 방법
// describe("나만의 테스트그룹 만들기", () => {
//   it("더하기 테스트", () => {

//   });
//   it("빼기 테스트", () => {

//   });
//   it("곱하기 테스트", () => {

//   });
// });
