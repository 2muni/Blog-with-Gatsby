---
title: 컴포넌트 최적화
subTitle: Address-book 03. 데이터 필터링 및 최적화
category: "React.js"
cover: head.png
---

데이터를 업데이틑 하는 과정에서 왜 불변성을 지켜야 할까요? 그간 강조했던 불변성 유지의 이유를 알아보겠습니다.

##데이터 필터링
데이터 필터링 기능을 구현하면서 불변성에 대해 알아보도록 하겠습니다.

먼저 App 컴포넌트에서 input 하나를 렌더링하고 해당 input의 값을 `keyword` 값에 담겠습니다. 이벤트 핸들러 또한 생성해주세요.
```javascript
// path: src/App.js
import React, { Component } from 'react';
import InputForm from './components/InputForm';
import InfoList from './components/InfoList';

class App extends Component {
  id = 2
  state = {
    info: [
      {
        id: 0,
        name: '이문희',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: '홍길동',
        phone: '010-1111-1111'
      }
    ],
    keyword: ''
  }
  handleChange = (e) => {
    this.setState({
      keyword: e.target.value
    })
  }
  handleCreate = (data) => {
    const { info } = this.state;
    this.setState({
      info: info.concat({ id: this.id++, ...data })
    })
  }
  handleRemove = (id) => {
    const { info } = this.state;
    this.setState({
      info: info.filter(info => info.id !== id)
    })
  }
  handleUpdate = (id, data) => {
    const {info} = this.state;
    this.setState({
      info: info.map(
        info => id === info.id
        ? { ...info, ...data }
        : info
      )
    })
  }
  render() {
    const { info, keyword } = this.state;

    return (
      <div>
        <InputForm
          onCreate={this.handleCreate}
        />
        <p>
          <input
            placeholder="검색 할 이름을 입력하세요"
            onChange={this.handleChange}
            value={keyword}
          />
        </p>
        <InfoList
          data={this.state.info}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
```
App 컴포넌트에서 업데이트가 필요한 것은 input의 상태 뿐입니다.

하지만, App 컴포넌트의 `state`가 업데이트 되면 컴포넌트의 리렌더링이 발생하는데, 이 때 자식 컴포넌트 또한 리렌더링 됩니다.

확인해볼까요? InfoList 컴포넌트에 `render`함수 상단에 다음 코드를 작성해주세요.
```javascript
// path: src/components/InfoList.js
...
render() {
  console.log('render InfoList');
  ...
}
...
```
검색 input을 수정하면서 콘솔을 확인해보세요. 물론 실제 변화가 없기 때문에 InfoList 컴포넌트의 리렌더링은 Virtual DOM에서 그치게 됩니다. 하지만 이런 불필요한 리렌더링에 소모되는 자원도 아낄수 있으면 아끼는게 좋겠죠?

LifeCycle API 중 `shouldComponentUpdate`을 사용하겠습니다. `InfoList.js`에 `shouldComponentUpdate`를 구현해주세요.
```javascript
// path: src/components/InfoList.js
...
class InfoList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data;
  }

  render() {
    ...
  }
  ...
}
```
마찬가지로 검색 input을 수정하면서 콘솔을 확인해보세요. 불필요한 리렌더링이 사라졌습니다.

어떻게 이런게 가능한 걸까요?

### 불변성, Immutability
이유는 우리가 불변성을 유지하면서 코딩을 했기 때문입니다.

간단한 자바스크립트 코드를 보면서 설명하겠습니다.
```javascript
let numOne = 1;
let numTwo = 1;

let strOne = 'A';
let strTwo = 'A';

let objOne = { a: 1, b: 2 };
let objTwo = { a: 1, b: 2 };

let arrOne = [ 1, 2 ];
let arrTwo = [ 1, 2 ];

console.log(numOne === numTwo); // true
console.log(strOne === strTwo); // true
console.log(objOne === objTwo); // false
console.log(arrOne === arrTwo); // false
```
`objOne`-`objTwo`과 `arrOne`-`arrTwo`의 값은 완전히 같습니다.  
따라서 `===`연산자로 비교하면 당연히 `true`가 반환되길 기대하지만, `false`가 반환됩니다.

왜일까요? 값은 같지만 서로 다른 객체이기 때문에, 이를 비교하면 `false`가 나옵니다.

아래와 같은 경우는 어떨까요.
```javascript
let objOne = { a: 1, b: 2 };
let objTwo = { a: 1, b: 2 };
let objThree = objOne;

console.log(objOne === objTwo); // false
console.log(objOne === objThree); // true
```
`objThree`는 `objOne`을 참조하므로 `objOne`과 `objThree`는 같은 객체를 참조합니다.  
따라서 `===`연산자로 값을 비교하면 `true`를 반환합니다.

두가지 예를 봤을 때, `===`연산자 비교는 객체의 원소를 비교하는 것이 아니라 단순히 참조만을 비교하는 `shallow compare`임을 알 수 있습니다. 이는 단순 참조값만 비교하기 때문에 성능면에서 뛰어납니다.

리액트에서는 컴포넌트의 `state`가 변할 때나, 상위 컴포넌트의 `props`가 달라질 때 마다 리렌더링을 결정해야 합니다. 이 역할은 LifeCycle API `shouldComponentUpdate`에서 수행합니다.

앞서 말씀 드렸듯이, `shouldComponentUpdate`는 컴포넌트가 업데이트 되기 전에 실행되며, `props`나 `state`의 변화에 따라 리렌더링을 결정합니다. 이는 **컴포넌트 최적화**에도 직결되는 문제입니다.

따라서, 객체나 배열의 변화를 `shallow compare`레벨에서 감지하기 위해서는 객체의 불변성을 유지하는 것이 필수입니다.

##기능 구현
다시 프로젝트로 돌아와서, 데이터 필터링을 마저 구현하겠습니다.

App 컴포넌트에서 keyword 값에 따라 info 배열을 필터링 해주는 로직을 작성하고, 필터링된 결과를 InfoList에 전달하겠습니다
```javascript
// path: src/App.js
import React, { Component } from 'react';
import InputForm from './components/InputForm';
import InfoList from './components/InfoList';

class App extends Component {
  id = 2
  state = {
    info: [
      {
        id: 0,
        name: '이문희',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: '홍길동',
        phone: '010-1111-1111'
      }
    ],
    keyword: ''
  }
  handleChange = (e) => {
    this.setState({
      keyword: e.target.value
    })
  }
  handleCreate = (data) => {
    const { info } = this.state;
    this.setState({
      info: info.concat({ id: this.id++, ...data })
    })
  }
  handleRemove = (id) => {
    const { info } = this.state;
    this.setState({
      info: info.filter(info => info.id !== id)
    })
  }
  handleUpdate = (id, data) => {
    const {info} = this.state;
    this.setState({
      info: info.map(
        info => id === info.id
        ? { ...info, ...data }
        : info
      )
    })
  }
  render() {
    const { info, keyword } = this.state;
    const filteredList = info.filter(
      info => info.name.indexOf(keyword) !== -1
    );

    return (
      <div>
        <InputForm
          onCreate={this.handleCreate}
        />
        <p>
          <input
            placeholder="검색 할 이름을 입력하세요"
            onChange={this.handleChange}
            value={keyword}
          />
        </p>
        <InfoList
          data={filteredList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
```
필터링이 잘 되나요? 현재는 바뀌는 keyword 값에 따라 InfoList가 전달받는 data가 다르므로, `shouldComponentUpdate`도 `true`를 반환하게 됩니다.

##최적화
계속해서 최적화를 진행하도록 하겠습니다.

이번엔 InfoItem입니다. 컴포넌트의 `render`함수 상단에 다음 코드를 넣어주세요
```javascript
// path: src/components/InfoItem.js
...
  render() {
    console.log('render PhoneInfo ' + this.props.info.id);
...
```
그 다음, 새로운 데이터를 등록하고 나서 콘솔을 확인해보세요.

데이터가 새로 추가될 때마다 기존에 렌더링 된 항목도 리렌더링되고 있는 것을 확인하실 수 있으실겁니다. 방금전과 마찬가지로 실제 DOM 변화는 일어나지 않지만, Virtual DOM에 렌더링하는 자원을 아껴주기 위해 최적화가 필요합니다.
```javascript
// path: src/components/InfoItem.js
...
  shouldComponentUpdate(nextProps, nextState) {
    // 수정 상태가 아니고, info 값이 같다면 리렌더링 안함
    if (!this.state.editing  
        && !nextState.editing
        && nextProps.info === this.props.info) {
      return false;
    }
    // 나머지 경우엔 리렌더링함
    return true;
  }
...
```
브라우저로 돌아가 확인해보세요.  
불필요한 렌더링이 사라졌죠?

이로써 우리는 리액트의 기본 사용법부터 활용법까지 배웠습니다. 단순 리액트만 활용해도 간단한 어플리케이션이라면 다양하게 만들 수 있습니다.

리액트를 사용하여 여러분만의 어플리케이션을 제작해보세요!