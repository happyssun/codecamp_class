// import { Observable } from '@apollo/client'
import React from "react";
import { from } from "zen-observable";

export default function ObservableFlatmapPage(): JSX.Element {
  const onClickBtn = (): void => {
    // new Promise((resolve, reject) => { })
    // new Observable((observer)=> {})

    // 옵저버블을 만들어 주는것 from
    from(["1번 useQuery", "2번 useQuery", "3번 useQuery"]) // fromPromise
      .flatMap((el) =>
        from([`${el} 결과에 qqq 적용`, `${el} 결과에 ㅋㅋㅋ 적용`])
      )
      .subscribe((el) => {
        console.log(el);
      });
  };
  return <button onClick={onClickBtn}></button>;
}

/**
* ### promise(프로미스)?
**비동기 작업을 도와주는 도구

## observable(옵저버블) 이란?

**연속적인 비동기 작업 도와주는 도구

fromPromise : Promise를 observable로 변경해 주는것

- 연속적인 비동기 작업이란?
    - 요청을 빠르게 여러번 보내는 것 입니다.

> 📚 **observable 사용예제
→ 연속적인 페이지 클릭 혹은 연속적인 검색어 변경**

게시글 목록페이지에서 페이지 요청을 여러번 빠르게 했을경우,
백엔드에서 누른 순서대로 응답을 보내지 않습니다.

**예를 들어,**
3번페이지를 요청했다가 빠르게 5번 페이지를 요청했을 경우 **3번 페이지 요청을 취소 후 5번 페이지를 보내줘야 하는데** , 백엔드에서는 3번페이지를 보여주게 됩니다.
이런경우에는 3번 페이지 요청을 취소해야 합니다.
그렇지 않으면 사용자의 불편한 경험을 초해 할 수 있기 때문입니다.

하지만, 이런경우는 promise로 처리 하는게 쉽지 않습니다. **이럴 때 observable을 사용하게 됩니다.**
>
 */
