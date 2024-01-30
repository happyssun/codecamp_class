declare const window: typeof globalThis & {
  IMP: any;
};

export default function PaymentPage(): JSX.Element {
  const onClickPayment = (): void => {
    const IMP = window.IMP;
    IMP.init("imp37252233");

    IMP.request_pay(
      {
        // param
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: "ORD001-001", // 주문번호는 겹치면 안됨- 지금은 랜덤하게 하기위해서 주석처리
        name: "노르웨이 회전 의자",
        amount: 64000,
        buyer_email: "gildong@gmail.com",
        buyer_name: "홍길동",
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        m_redirect_url: "http://localhost:3000/section28-payment/28-01-payment", // 모바일에서는 결제시, 페이지 주소가 바뀜, 결제후 돌아갈 주소 입력
      },
      (rsp: any) => {
        // callback
        if (rsp.success === true) {
          // 결제 성공 시 로직,
          console.log(rsp);

          // 백엔드에 결제관련 데이터 넘겨주기 => 즉, 뮤테이션 실행
          // creatPointTransactionOfLoading 포인트
        } else {
          // 결제 실패 시 로직,
        }
      }
    );
  };

  return (
    <>
      <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
      <button onClick={onClickPayment}>결제하기</button>
    </>
  );
}
