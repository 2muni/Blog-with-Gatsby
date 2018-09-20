---
title: input 상태 관리
subTitle: Address-book 01. input 상태 관리
category: "React.js"
cover: head.png
---

지금까지 알아본 것들을 요약하면 다음과 같습니다.

* **Component**
* **props & state**
* **LifeCycle API**

앞으로 우리는 간단하게 전화번호 주소록을 관리하는 리액트 어플리케이션을 만들어 볼겁니다. 지금까지 배운 것들을 활용하는 것에 더불어, input 상태를 관리하는 방법과 리액트에서 배열을 다루는 방법을 알아보겠습니다.

##프로젝트 생성
기존에 만들었던 프로젝트는 그대로 두고, CRA를 통해 새 프로젝트를 생성해주세요.
```
create-react-app address-book
```

##Input 데이터 다루기

우리가 가장 먼저 만들 컴포넌트는 사용자가 데이터를 입력하는 컴포넌트입니다. 해당 컴포넌트에서 input에 입력된 데이터를 state에 담아 데이터를 관리하고자 합니다. 우선 본 프로젝트의 `src`디렉토리 내에 `components`폴더를 생성하고, `InputForm.js`파일을 생성하여 코드를 다음과 같이 작성하세요.
```javascript
// path: src/components/InputForm.js
import React, {Component} from 'react'

class InputForm extends Component {
  state = {
    name: ''
  }
  handleChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }
  render() {
    return (
      <div>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <div>{this.state.name}</div>
      </div>
    );
  }
}

export default InputForm;
```
`input`의 `onChange`는 해당 DOM객체의 value값이 변화할때마다 불리는 이벤트입니다. 이벤트에 할당된 `handleChange`함수는 해당 이벤트가 불린 타겟 DOM객체의 `value`값을 읽어오는 역할을 수행하는데, `input`의 `value`값을 클래스의 `state.name`에 할당하면 사용자가 입력한 값을 해당 클래스의 `state`로 읽어올 수 있습니다.

하단에는 `state.name`값이 사용자가 입력한 값으로 잘 바뀌고 있는지 확인하기 위해 값을 렌더링했습니다.

그럼 이제 해당 컴포넌트를 `App.js`에 보여주도록 하겠습니다.
```javascript
// path: src/App.js
import React, {Component} from 'react';
import InputForm from './components/InputForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <InputForm />
      </div>
    );
  }
}

export default App;
```
`yarn start`를 통해 서버를 시작하시고 input에 값을 입력해보세요. 아래에 입력한 값이 출력되나요?

주소록이라면 여러개의 데이터를 받아와야겠죠? input을 하나 더 추가하겠습니다. `InputForm.js`의 코드를 다음과 같이 수정해주세요.
```javascript
// path: src/components/InputForm.js
import React, {Component} from 'react'

class InputForm extends Component {
  state = {
    name: '',
    phone: ``
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <div>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="전화번호"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        />
        <div>{this.state.name}{this.state.phone}</div>
      </div>
    );
  }
}

export default InputForm;
```
`input`을 주목해주세요. `name`프로퍼티가 추가되었는데, `handleChange`함수에서 타겟 DOM객체의 `name` 값을 key 값으로 하여 state에 데이터를 갱신합니다. 단순히 핸들러 함수를 추가하는 것보다 `input`에 프로퍼티를 추가하여 구분하는게 더 효과적입니다.

`handleChange`함수의 `setState` 내부에서 사용된 문법은 [Computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)입니다. 생소하다면 해당 링크를 참조해주세요.

이제 결과물을 확인해보세요. 두 input의 입력값이 제대로 출력되나요?

##부모 컴포넌트로 데이터 전달

`InputForm.js`의 `state`를 `App.js`컴포넌트로 전달해주겠습니다.

우선 `App.js`의 코드를 다음과 같이 수정해주세요.

```javascript
// path: src/App.js
import React, {Component} from 'react';
import InputForm from './components/InputForm';

class App extends Component {
  handleCreate = (data) => {
    console.log(data);
  }

  render() {
    return (
      <div className="App">
        <InputForm
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default App;
```
`handleSubmit`함수를 추가하고, `InputForm`에 `onCreate`라는 이름의 `props`로 넘겨주었습니다.

다음은 `InputForm.js`입니다.

```javascript
// path: src/components/InputForm.js
import React, {Component} from 'react'

class InputForm extends Component {
  state = {
    name: '',
    phone: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    this.props.onCreate(this.state);
    this.setState ({
      name: '',
      phone: ''
    })
  }
  render() {
    return (
      <div>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="전화번호"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        />
        <button onClick={this.handleSubmit}>등록</button>
      </div>
    );
  }
}

export default InputForm;
```
변경된 사항은 다음과 같습니다.  
`props`의 `onCreate` 값을 받아오고 `state`의 값을 초기화하는 `handleSubmit`함수를 생성하고, `state`의 값을 출력하던 영역에 `button`을 만들어 `onClick`이벤트로 할당하였습니다.

수정을 마치셨으면 브라우저로 돌아가 console란을 확인해보세요. 등록 버튼을 누르면 input값이 출력되나요?

다음은 App 컴포넌트의 state에 배열을 선언하고, InputForm에서 읽어온 데이터를 배열로 관리하여 렌더링해보겠습니다.

