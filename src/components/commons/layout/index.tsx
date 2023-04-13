import { useRouter } from "next/router";
import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import LayoutHeader from "./header";
import LayoutNavigation from "./navigation";

// 특정페이지에서는 헤더가 안보이게 하고싶다 이럴때
const HIDDEN_HEADERS = [
  "/12-01-library-icon",
  // ... 여기에 페이지 주소를 적는다
  // ...
  // ...
];

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps) {
  const router = useRouter();
  console.log(router); // 모든 주소
  console.log(router.asPath); // 현재의 실제 주소를 그대로 가져옴 pathname은 폴더형태로 주소를 가져오는것

  // 모달창 만들때 처럼 조건부 렌더링 걸기
  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath);

  return (
    <>
      {!isHiddenHeader && <LayoutHeader></LayoutHeader>}
      <LayoutBanner></LayoutBanner>
      <LayoutNavigation></LayoutNavigation>
      <div style={{ height: "500px", display: "flex" }}>
        <div style={{ width: "30%", backgroundColor: "orange" }}>사이드바</div>
        <div style={{ width: "70%" }}>{props.children}</div>
      </div>
      <LayoutFooter></LayoutFooter>

      {/* <div>여기는 Header</div>
      <div>여기는 Banner</div>
      <div>여기는 Menu</div>
      <div>{props.children}</div>
      <div>여기는 Footer</div> 
      이 내용들을 LayoutBanner 이런 이름들의 컴포넌트로 변경한 것
      */}
    </>
  );
}

// 지금은 style로 스타일링했지만 emotion으로 통일시켜줘야함
// style={{}}이렇게 중괄호가 두개인 이유 :
// - 원래는 const qqq= {height: "500px"} 이런 객체로 해야하는데 간략히 표현한것
// 처음 중괄호는 자바스크립트를 표현하는 것, 두번쨰는 객체의 중괄호

/* 레이아웃은 보통 모든 페이지에 적용이 되지만 상황에 따라서 페이지 적용을 다르게 하고 싶을때가 있을것
   예를 들어 특정페이지에서 헤더를 안보이게 하고 싶을때 그 주소를 배열로 저장
   - 라우터에 모든 주소가 저장되어있으니 라우터에서 가져옴
*/
