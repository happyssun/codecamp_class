/* 프리로드 
  다음페이지의 이미지 => 다음페이지에서 보여질 이미지 미리 다운로드
  현재 페이지 => 현재페이지의 다운로드 순서를 조작, 용량이 큰 이미지 먼저 다운로드하여 전체 다운로드 시간 축소
*/



import React, { useEffect } from "react";
import { useMoveToPage } from "../../../src/components/commons/hooks/useMoveToPage";

// 전역변수 (함수 밖에 변수 만들기) 리렌더링이 안되는 부분
// 밑에서 img를 받은것을 전역변수에 저장 - 브라우저 자체에 저장
// 메모리가 유지되게 하기위해서
const qqq = [];

export default function ImagePreloadPage(): JSX.Element {
  const { onClickMoveToPage } = useMoveToPage();
  // const qqq = [] 여기에 놓으면 리렌더링이 되면 저장한 이미지가 사라진다 그래서 전역변수에 저장
  useEffect(() => {
    const img = new Image();
    img.src = "강아지.png"; // 예로 넣어놓은것

    img.onload = () => {
      qqq.push(img);
    };
  });
  return (
    <button
      onClick={onClickMoveToPage(
        "/section31-memoization/31-09-image-preload-moved"
      )}
    >
      페이지 이동하기
    </button>
  );
}

// 지금 image-preload 페이지랑 image-preload-moved의 이미지 주소가 같다
// 이 페이지에서 이미지를 함수안에서가 아니라 브라우저 자체에 저장(전역변수로)을 해두면
// image-preload-moved페이지에서 같은 이미지를 불러와야 했을때
// 그때 다운을 받는게 아니고 메모리에 캐싱해둔 이미지를 불러옴으로 빠르다
// 다만 여기의 큰 주의사항이 있는데 - 메모리 누수
// const qqq에 저장된 이미지파일은 지워지지 않고 계속 존재한다
// 브라우저 메모리가 계속 찬다는 의미
// 무조건 전페이지와 다음페이지에서 사용할것 같은 이미지를 해놓는것은 좋지만 메모리누수가 생김으로 지양한다
