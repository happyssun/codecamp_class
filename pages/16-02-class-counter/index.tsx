import { Component } from "react";
// 원래 class컴포넌트에서는 화면에 그릴수가 없는데 리액트안의 제공하는 Component 안의 render() 기능을 이용하여 html화면을 그려줄수있다
// 그래서 recat에서 import를 해서 사용할수있다

export default class ClassCounterPage extends Component {
  state = {
    count: 0,
  };

  onClickCountUp() {
    console.log(this.state.count);
    this.setState({
      count: 1,
    });
  }

  render() {
    return (
      <>
        <div>{this.state.count}</div>
        <button onClick={this.onClickCountUp.bind(this)}>Count Up</button>{" "}
        {/* this를 bind로 연결하여 or 화살표함수 이용  this.html참고 */}
      </>
    );
  }
}

// state, render 앞에는 전부 this. 이 생략되어있다

/*
extends는 상속 = BBB가(자식) AAA에(부모) 있는 내용들을 사용할 수 있음: 부모 하나만 가능

class AAA {
  power = 50
  attack() {

  }
}
class BBB  extend AAA{   => 상속
  run() {

  }
}

const mybbb = new BBB()
*/
