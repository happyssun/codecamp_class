import { FormEvent } from "react";

// event타입을 any가 아닌  좀 더 안전한 generic 타입을 이용하여 event: ChangeEvent<HTMLInput>, <HTMLButton>등 다양한곳에 사용
// 앞의 <E>는 내가 아무거나 이름을 붙여도 된다. <E>라는 것을 쓸꺼야.. 그렇게 선연하고(event: E)넣음  => 타입이 추론됨
// prettier-ignore
export const wrapAsync = <E>(asyncFunc:(event: E) => Promise<void>) => (event:E) => {
    void asyncFunc(event);
  };

export const wrapFormAsync =
  (asyncFunc: (event: FormEvent<HTMLFormElement>) => Promise<void>) =>
  (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void asyncFunc(event);
  };

/* 따로 formAsync를 만든 이유
 * HTML의 기본내장된 onclick의 이벤트는 기본적으로 페이지 이동을 하려고 한다.
  예로 form태그에서의 onSubmit을 보면 wrapAsync로 함수를 감싸서 실행시켜보면
  페이지 주소가 이상하게 변경이되는것을 볼수있다 그래서
  event.preventDefault()을 써서 이벤트가 기본적으로 행하려고 하는것을 막아줌

  preventDefault() - 원래 html태그가 가지고 있는 기본기능을 막는것

 */
