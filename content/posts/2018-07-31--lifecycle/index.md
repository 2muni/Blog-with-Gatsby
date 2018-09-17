---
title: LifeCycle
subTitle: 컴포넌트의 생성에서 소멸까지
category: "React.js"
cover: head.png
---

>본 포스트는 React v16.3.0을 기준으로 작성하였습니다. deprecated된 API는 unsafe라는 prefix를 붙여서 사용해야하며, 이하 기술하는 API 또한 동일하게 명시하였습니다.  
>패치로그: https://reactjs.org/blog/2018/03/29/react-v-16-3.html#component-lifecycle-changes

LifeCycle API는 브라우저 상에서 컴포넌트가 생성 및 삭제, 업데이트될 때 호출되는 API입니다. 해당 API들을 작성한 컴포넌트 내부에 작성하여, 우리는 보다 효율적으로 리액트 어플리케이션을 최적화 할 수 있습니다.  

그러한 점에서, LifeCycle API는 무척 중요하다고도 할 수 있습니다!
<br><br>

##1. 컴포넌트 초기 생성

```
constructor(props) {
 super(props)
}  
```
컴포넌트 생성자 메소드입니다.  
컴포넌트가 새로 만들어질 때마다 이 함수가 호출됩니다.
<br><br>

```
UNSAFE_componentWillMount(){
}
```
컴포넌트 렌더링 직전에 호출됩니다.  
주로 서버사이드에서 데이터를 호출하는 용도로 썼다가 용도폐기로 deprecated 됐습니다.  
v17 전까지는 deprecated된 메소드들을 unsafe를 생략하고 사용할 수 있습니다.
<br><br>

```
componentDidMount(){
}
```
컴포넌트 렌더링 시에 호출 됩니다.  
주로 외부 라이브러리 연동시, 컴포넌트에 필요한 데이터 ajax 요청시, DOM 관련 작업에 사용합니다.

예시를 들자면 DOM을 직접 사용하는 차트 라이브러리를 사용할 때, 컴포넌트에 필요한 데이터 GET,POST 등의 요청을 해서 받아올 때, 크로스 브라우징을 위해서 DOM 정보를 읽어올 때, 브라우저 스크롤 위치 등을 읽어올 때 사용할 수 있습니다.

##2. 컴포넌트 업데이트

```
UNSAFE_componentWillReveiveProps(nextProps){
 if(this.props.myValue !== nextProps.myValue){
 // 원하는 function blah blah!
 }
}
```
컴포넌트가 새로운 props를 받을 때 호출됩니다.  
state가 props에 따라서 변해야되는 로직을 쓸 때 주로 사용합니다.  
this.props는 아직 변하지 않았고, nextProp가 새로 받게 될 props 이며, 둘을 비교해서 값이 다르면 호출되도록 로직을 짜야 합니다.

매우 자주 쓰이는 API이지만 deprecated 됐으며, getDerivedStateFromProps로 대체 되었습니다.
<br><br>

```
static getDerivedStateFromProps(nextProps,prevProps){
} 
```
componentWillReceiveProps와의 차이점은, 정적 메소드로 사용하는 점입니다.  
정적 메소드는 클래스 내에만 존재하고 인스턴스에는 존재하지 않는 함수인데, 특정 props가 바뀔 때 설정하려는 state를 객체형태로 리턴하는 방식로 사용하면 됩니다.
<br><br>

```
shouldComponentUpdate(nextProps,nextState){
 // true를 리턴하면 getSnapshotBeforeUpdate 메소드가 실행. 
 // props나 state를 업데이트하는 조건에 대한 로직을 작성하고 이를 true/false로 리턴. 
} 
```
props, state 값이 변하기 직전에 호출 됩니다.  
next가 들어간 파라미터를 받는 메소드들은 전부 값 변화 직전에 호출된다고 보면 되는데, 반면에 prev가 들어간 파라미터를 받는다면 바뀐 값을 받는 거니까 값 변화 이후에 호출되는 거구나! 라고 이해하면 쉽습니다.  

리액트는 virtual DOM과 DOM을 비교해서 변화가 일어나는 부분만 업데이트 해줍니다. 따라서 DOM 업데이트 전에 필연적으로 virtual DOM에 한번 렌더링 한 뒤에 업데이트 되는데, virtual DOM 마저 불필요하게 렌더링되는 것을 막아 성능 최적화를 돕는 API입니다. 

예를 들자면, 이 메소드에 return this.props.value !== nextProps.value 라는 한 줄이 들어가 있을 때 nextProps.value의 값이 달라져서 true를 리턴하게 되면 props를 업데이트 하고 리턴 값은 다시 false가 되므로 업데이트가 되지 않습니다.
<br><br>

```
UNSAFE_componentWillUpdate(nextProps, nextState) {
}
```
shouldComponentUpdate가 true를 리턴할 때 호출됩니다.
이 API가 값을 리턴한 직후에 render()가 호출되며, 주로 컴포넌트 CSS 애니메이션 효과를 초기화하거나 이벤트 리스너를 없앨 때 사용합니다.  

이번 16.3 패치로 deprecated 되었고 getSnapshotBeforeUpdate()로 대체할 수 있습니다.
<br><br>

```
getSnapshotBeforeUpdate(prevProps, prevState){
}
```
render() 직후에 호출됩니다.  
이 메소드도 prev 파라미터를 받습니다. 즉 DOM 변화 직전의 실제 DOM 정보를 가져오게 되며, 이 메소드의 리턴값은 componentDidUpdate에서 3번째 parameter로 받아오게 됩니다.
<br><br>

```
componentDidUpdate(prevProps, prevState, snapshot){
}
```
prop와 state가 변화한 이후, 즉 업데이트가 올바르게 수행되고 호출되는 API입니다.  
snapshot 파라미터를 이용해서 이전 prevProps와 prevState 값을 받아와 이용할 수 있습니다.

##3. 컴포넌트 제거

```
componentWillUnmount(){
}
```
컴포넌트에 등록되있는 이벤트를 제거하는 로직이 들어갑니다.  
그 외에도 외부 라이브러리를 이용해서 컴포넌트가 실시간으로 값을 받아오고 있다면 여기서 인스턴스를 제거해주는 로직을 작성합니다.

##4. 에러 발생 시 호출되는 API

```
componentDidCatch(error, info){
}
```
development 모드에서 render()함수의 오류가 발생하면 빨간 오류창이 뜨지만, production 모드에서는 아예 하얀 창만 떠버립니다.  
이를 막기 위해서 따로 오류 발생 시 state를 오류모드로 바꾸는 로직을 만들면 오류 state에서 렌더링되는 컴퓨넌트를 보여주는 식으로 로직을 짤 수 있습니다.  

props 타입 관련 오류 실수를 막아줄 수 있을 것 같지만 proptypes과 함께 타입스크립트를 사용하면 자주 사용하지 않는 API입니다.

예시 : https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html