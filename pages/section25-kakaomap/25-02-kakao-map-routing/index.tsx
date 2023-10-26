import Link from "next/link";
import { useRouter } from "next/router";

export default function KakaoMapPage(): JSX.Element {
  const router = useRouter();
  const onClickMove = (): void => {
    void router.push("/section25-kakaomap/25-02-kakao-map-routing-moved");
  };

  return (
    <>
      <button onClick={onClickMove}>SPA가 적용된 페이지 이동하기</button>
      <br />

      {/* 매 페이지를 새로 다운로드 받으므로 SPA를 활용못함 */}
      <a href="/section25-kakaomap/25-02-kakao-map-routing-moved">
        1. a태그 페이지 이동하기
      </a>
      <br />
      <Link href="/section25-kakaomap/25-02-kakao-map-routing-moved">
        2. Link태그 페이지 이동하기
      </Link>
      <br />

      {/* next에서 제공하는 Link안의 a태그임으로, SPA 활용가능 + <a>를 써서 검색엔진의 검색기능이 좋아짐 */}
      <Link href="/section25-kakaomap/25-02-kakao-map-routing-moved">
        <a>3. Link태그안에 a태그를 넣어 페이지 이동하기</a>
      </Link>
    </>
  );
}

/* SPA(single page application ) 와 MPA(multy page application)
  - 주소에 접속할때 한번에 요청하지 않은 페이지까지 한번에 다운받아온다.
    그래서 처음 접속은 최적화과정을 거지치 않았을때 느릴수있지만 그 이후에는 매우 빠르게 진행이된다
    SPA가 최신기능이며 리액트는 SPA

  // SPA가 문제
위의 코드를 실행시켜보면 페이지이동 버튼을 눌렀을때 처음엔 오류가 발생한다. 
그리고나서 새로고침을 하면 실행이 잘된다 - SPA문제

이때 리액트에서는 Link태그 or router를 사용(가급적 Link를 사용하고 사용불가일때 router 사용)
  : 클릭해서가 아니라 자동으로 페이지 이동이 되야할때는 Link가 안되서 router 사용
1. <a>태그를 사용하면 문제없이 진행은 되는데 리액트에서는 사용안함 - MPA
2. next의 <Link>태그를 사용 - 마찬가지로 오류 -SPA : load를 사용하면 가능하지만 느림 - 사용안함
3. <Link> 
      <a>   </a>
    </Link>
  위와 같이 <Link>안에 <a>태그를 넣어서 사용 
    - 개발자페이지 확인해보면<Link>가 무효화되고 <a>로 실행되는것을 볼수 있다
  *** 1번과 3번이 다른점은 1번은 MPA로 실행이되고 2번은 SPA로 실행된다

*/
