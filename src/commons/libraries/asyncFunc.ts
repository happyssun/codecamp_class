import { FormEvent } from "react";

export const wrapAsync = (asyncFunc: () => Promise<void>) => () => {
  void asyncFunc();
};

export const wrapFormAsync =
  (asyncFunc: () => Promise<void>) => (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void asyncFunc();
  };

/*
 * HTML의 기본내장된 onclick의 이벤트는 기본적으로 페이지 이동을 하려고 한다.
  예로 form태그에서의 onSubmit을 보면 wrapAsync로 함수를 감싸서 실행시켜보면
  페이지 주소가 이상하게 변경이되는것을 볼수있다 그래서
  event.preventDefault()을 써서 이벤트가 기본적으로 행하려고 하는것을 막아줌
 
 preventDefault() - 원래 html태그가 가지고 있는 기본기능을 막는것
 
 */
