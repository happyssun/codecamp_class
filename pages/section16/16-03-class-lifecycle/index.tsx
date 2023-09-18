import { Component } from "react";
// 원래 class컴포넌트에서는 화면에 그릴수가 없는데 리액트안의 제공하는 Component 안의 render() 기능을 이용하여 html화면을 그려줄수있다
// 그래서 recat에서 import를 해서 사용할수있다
import Router from "next/router";

export default class ClassCounterPage extends Component {
  // 클래스형 컴포넌트에서는 state는 객체
  state = {
    count: 0,
  };

  // 화면이 그려지고 나서 그 다음에 이 함수를 실행하라
  componentDidMount() {
    console.log("그려지고 나서 실행!!");
  }

  // 바뀐 state가 re-rendering 되어있을때 실행해라
  componentDidUpdate() {
    console.log("변경되고 나서 실행!!");
  }

  // 다른 페이지 이동할때 가기전 이 함수를 실행하고 사라져라
  componentWillUnmount() {
    console.log("사라질떄 실행!!");
    // 예로 채팅방 나가기 api 같은 것들 - 버튼을 눌러 나가든 화면을 꺼서 나가든 어떤식으로 나가든 상관없이 다 가능하게 하는 법
  }

  onClickMove() {
    void Router.push("/");
  }

  onClickCountUp = () => {
    console.log(this.state.count);
    this.setState((prev: { count: number }) => ({
      // :을 기준으로 prev는 변수, {count:number}는 타입 - 이것대신 interface로 따로 만들어도 됨   // 여기서 prev는 state이다.
      count: prev.count + 1,
    }));
  };

  render() {
    return (
      <>
        <div>{this.state.count}</div>
        <button onClick={this.onClickCountUp}>Count Up</button>
        <button onClick={this.onClickMove}>Main Page</button>
      </>
    );
  }
}
