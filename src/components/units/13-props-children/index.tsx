interface IProps {
  school: string;
  children: JSX.Element;
}

export default function Layout(props: IProps) {
  return (
    <>
      {/* <div>여기가 header!! 배너나 이런것을 넣고</div> */}
      <div>{props.school}</div>
      <div>{props.children}</div>
      {/* <div>여기가 footer!! 회사전화번호나 머 그런것들</div> */}
    </>
  );
}

/* 
여기에 들어가있는 props가 _app.tsx파일에서의
<Component {...pageProps}/> 이렇게 들어가서 결국엔 이 페이지가 보여지게 됨

<Layout>
<Component {...pageProps}/>
</Layout>

결론적으로 모든 componet들은 Layout에 들어가서 보여지게 되는것

*/
