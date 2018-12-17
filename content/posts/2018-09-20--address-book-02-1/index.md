---
title: 배열 다루기
subTitle: Address-book 02_1. 배열 다루기
category: "React.js"
cover: head.png
---

>본 섹션은 [Velopert님의 누구든지 하는 리액트](https://velopert.com/3613)를 바탕으로 작성되었습니다.

이번 시간에는 리액트에서 배열을 다루는 방법에 대해 알아보겠습니다.  
리액트에서 `state` 내부의 값을 직접적으로 수정해서는 안됩니다. 이를 불변성 유지라 하는데요, 우리는 `state`에 배열을 선언하기 때문에 배열을 직접 수정하는 `push`, `splice`, `unshift`, `pop`과 같은 함수는  사용해서는 안됩니다. 그 대신, 새로운 배열을 만드는 `concat`, `slice`, `map`, `filter`과 같은 함수를 사용해야 합니다.

리액트에서 불변성이 중요한 이유는 필요한 상황에 리렌더링 되도록 설계하고, 성능을 최적화하기 위함입니다.  
이에 관한 설명은 우선 프로젝트 구현이 끝나고 알려드리겠습니다.

##데이터 추가

애플리케이션의 전체 상태 데이터는 App 컴포넌트에서 관리하겠습니다. App 컴포넌트의 `state`에 info 라는 배열을 만들고, 그 안에 기본값으로 샘플 데이터 두 개를 추가하겠습니다.

데이터 형식은 다음과 같습니다.
```javascript
{
  id: 0,
  name: '2muni',
  phone: '010-0000-0000'
}
```
`id` 값은 각 데이터를 식별하기 위함이며, 이 값은 데이터가 추가 될 때마다 1씩 더해집니다.

`App.js`코드를 다음과 같이 작성해주세요.
```javascript
// path: src/App.js
import React, { Component } from 'react';
import InputForm from './components/InputForm';

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
    ]
  }
  handleCreate = (data) => {
    const { info } = this.state;
    this.setState({
      info: info.concat({ id: this.id++, ...data })
    })
  }

  render() {
    const { info } = this.state;
    return (
      <div className="App">
        <InputForm
          onCreate={this.handleCreate}
        />
        {JSON.stringify(info)}
      </div>
    );
  }
}

export default App;
```
`handleCreate`에서 사용된 `...data` 문법은 [전개연산자](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)입니다. 혹시 해당 문법이 생소하시다면 링크를 참조해주세요.

App 컴포넌트에선 info 값을 문자열로 변환한 json을 출력하고 있습니다. 데이터를 새로 입력해보시고 잘 나타나는지 확인해주세요.

##데이터 렌더링
배열을 컴포넌트로 변환할 때엔, 자바스크립트 배열의 내장함수인 `map`을 사용하면 간단하게 바꿔줄 수 있습니다. `map`에 관한 설명은 [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)을 참조하세요.

여기선 두 개의 컴포넌트가 필요합니다.
* **InfoItem**: 입력한 정보를 보여주는 컴포넌트입니다.
* **InfoList**: InfoItem 컴포넌트의 목록입니다.

우선, `InfoItem.js`부터 생성하겠습니다.
```javascript
// path: src/components/InfoItem.js
import React, { Component } from 'react';

class InfoItem extends Component {

  render() {
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const { name, phone, id } = this.props.info;

    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
      </div>
    );
  }
}

InfoItem.defaultProps = {
  info: {
    name: '이름',
    phone: '010-0000-0000',
    id: 0
  }
}

export default InfoItem;
```
해당 컴포넌트는 `InfoList`로 부터 `info`라는 이름의 `props`를 받아옵니다. `defaultProps`를 통해 info의 기본값을 설정하여 `props`가 `undefined`될 시, 값이 할당되지 않아 앱이 종료되는 것을 방지하였습니다.

다음은 InfoList 컴포넌트입니다.
```javascript
// path: src/components/InfoList.js
import React, { Component } from 'react';
import InfoItem from './InfoItem';

class InfoList extends Component {

  render() {
    const { data } = this.props;
    const list = data.map(
      info => (<InfoItem key={info.id} info={info} />)
    );

    return (
      <div>
        {list}
      </div>
    );
  }
}

InfoList.defaultProps = {
  data: []
}

export default InfoList;
```
해당 컴포넌트에서는 data라는 배열을 받아와서 `map`을 통해 JSX로 변환합니다. 이 과정에서 `key`값이 설정되었는데요, 리액트에선 `key`값을 통해 배열 내의 데이터를 조회합니다. 따라서 고정적인 `key`값 설정은 배열을 렌더링 할 때 꼭 필요한 값입니다.

이제 InfoList 컴포넌트를 App 컴포넌트에서 렌더링해주세요. data값을 `props`로 전달해야합니다.
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
    ]
  }
  handleCreate = (data) => {
    const { info } = this.state;
    this.setState({
      info: info.concat({ id: this.id++, ...data })
    })
  }
  render() {
    return (
      <div>
        <InputForm
          onCreate={this.handleCreate}
        />
        <InfoList data={this.state.info}/>
      </div>
    );
  }
}

export default App;
```
잘 작동하시나요?

## 데이터 제거
기존 베열 데이터를 유지하고 새로운 배열을 만들어 데이터를 제거하기 위해선, 다양한 방법이 있습니다. 여기서는 배열의 내장함수인 `filter`를 이용하여 새로운 배열을 생성할 겁니다. 자세한 내용은 [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)를 참고하세요.

`App.js`에 `handleRemove`함수를 생성하고, 해당 함수를 `InfoList`에 `onRemove`로 넘겨주세요.
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
    ]
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
  render() {
    return (
      <div>
        <InputForm
          onCreate={this.handleCreate}
        />
        <InfoList
          data={this.state.info}
          onRemove={this.handleRemove}  
        />
      </div>
    );
  }
}

export default App;
```

`InfoList`에선 `props`로 전달받은 `onRemove`를 그대로 `InfoItem`으로 전달하겠습니다. `defaultProps`또한 설정하는 것을 잊지마세요.
```javascript
// path: src/components/InfoList.js
import React, { Component } from 'react';
import InfoItem from './InfoItem';

class InfoList extends Component {

  render() {
    const { data, onRemove } = this.props;
    const list = data.map(
      info => (
      <InfoItem
        key={info.id}
        info={info} 
        onRemove={onRemove}  
      />)
    );

    return (
      <div>
        {list}
      </div>
    );
  }
}

InfoList.defaultProps = {
  data: [],
  onRemove: () => console.warn('onRemove not defined')
}

export default InfoList;
```
그 다음, `InfoItem`에서 삭제 기능을 구현하겠습니다. 삭제 버튼을 만들어서, 해당 버튼에 이벤트를 설정하겠습니다.
```javascript
// path: src/components/InfoItem.js
import React, { Component } from 'react';

class InfoItem extends Component {
  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }  
  render() {
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const { name, phone } = this.props.info;

    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleRemove}>삭제</button>
      </div>
    );
  }
}

InfoItem.defaultProps = {
  info: {
    name: '이름',
    phone: '010-0000-0000',
    id: 0
  }
}

export default InfoItem;
```
삭제 버튼을 눌러보세요. 데이터 삭제가 잘 되시나요?

다음은 데이터 수정을 해보도록 하겠습니다.