// 1. 함수를 리턴하는 함수
function aaa() {
  const apple = 10;

  return function bbb() {
    const banana = 20;
    console.log(banana);
    console.log(apple);
  };
}

// aaa();
aaa()();

/* 결과값 - 결국 aaa() 는 bbb() 가 되는 것.. 콘솔값은 찍히지 않음
ƒ bbb() {
    const banana = 20;
    console.log(banana);
    console.log(apple);
  }

  여기서 aaa()() 이렇게 해줬을때 
  bbb()값이 실행되면서 

  20
  10
  
  이 출력됨 

*/

// 2. 함수를 리턴하는 함수 - 인자를 받아서
function ccc(apple) {
  // const apple = 10;

  return function (banana) {
    // const banana = 20;
    console.log(banana);
    console.log(apple);
  };
}

ccc(10)(20);

// 3. 함수를 리턴하는 함수 - 화살표 함수
const ddd = (apple) => (banana) => {
  console.log(banana);
  console.log(apple);
};

ddd(10)(20);

// 4. 함수를 리턴하는 함수 - 인자가 여러개
const eee = (apple) => (banana) => (tomato) => {
  console.log(banana);
  console.log(apple);
  console.log(tomato);
};

eee(10)(20)(30);

// 결과적으로 closure 수 만큼 함수형태를 만들어 주면된다
