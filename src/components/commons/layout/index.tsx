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
  console.log(router);
  console.log(router.asPath); // 현재의 실제 주소

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
      <div>여기는 Footer</div> */}
    </>
  );
}
