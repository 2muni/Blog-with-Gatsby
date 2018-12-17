---
title: 배열 다루기
subTitle: Address-book 02_2. 배열 다루기
category: "React.js"
cover: head.png
---

>본 섹션은 [Velopert님의 누구든지 하는 리액트](https://velopert.com/3613)를 바탕으로 작성되었습니다.

##데이터 수정
수정의 경우에도 불변성을 지켜주는 것은 당연합니다. 기존의 배열 객체를 직접적으로 수정해선 안됩니다.

`App.js`에 `handleUpdate`라는 함수를 만들고, `InfoList`에 할당해주세요.
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
다음은 `InfoList`입니다.
```javascript
// path: src/components/InfoList.js
import React, { Component } from 'react';
import InfoItem from './InfoItem';

class InfoList extends Component {

  render() {
    const { data, onRemove, onUpdate } = this.props;
    const list = data.map(
      info => (
      <InfoItem
        key={info.id}
        info={info} 
        onRemove={onRemove}
        onUpdate={onUpdate}
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
  onRemove: () => console.warn('onRemove not defined'),
  onUpdate: () => console.warn('onUpdate not defined')
}

export default InfoList;
```
마찬가지로 `props`로 전달받은 `onUpdate`를 그대로 전달해주었습니다.

다음은 `InfoItem`인데요, 수정할 코드가 많으니 주석을 읽어 나가면서 코드를 작성해주세요
```javascript
// path: src/components/InfoItem.js
import React, { Component } from 'react';

class InfoItem extends Component {
  state = {
    // 수정 버튼을 눌렀을 시, editing 상태를 true로 전환합니다.
    // editing 값이 true일 경우, 텍스트 형태로 보여주던 데이터를
    // input 형태로 부여주게 됩니다.
    editing: false,
    // input 값의 상태입니다.
    name: '',
    phone: ''
  }

  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }

  // editing 값을 전환하는 함수입니다.
  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }

  // input의 onChange 이벤트 핸들러입니다.
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  componentDidUpdate(prevProps, prevState) {
    // editing 값이 변화될 때 마다 처리되는 로직입니다.
    // 수정을 눌렀을 땐 기존 값이 input에 나타나고,
    // 수적을 적용할 땐 input의 값들이 부모에게 전달됩니다.

    const { info, onUpdate } = this.props;
    if(!prevState.editing && this.state.editing) {
      // editing: false -> true
      this.setState({
        name: info.name,
        phone: info.phone
      })
    } else if(prevState.editing && !this.state.editing) {
      // editing: true -> false
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      })
    }
  }

  render() {
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const { name, phone } = this.props.info;
    const { editing } = this.state;

    // 수정 모드
    if(editing) {
      return (
        <div style={style}>
          <div>
            <input
              value={this.state.name}
              name="name"
              placeholder="이름"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              value={this.state.phone}
              name="phone"
              placeholder="전화번호"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>적용</button>
          <button onClick={this.handleRemove}>삭제</button>
        </div>
      );
    }

    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleToggleEdit}>수정</button>
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
수정이 잘 되시나요?

이로써 우리는 리액트 state의 배열 내부 데이터를 생성 및 수정, 삭제하고 해당 데이터를 렌더링하는 방법을 배워보았습니다.

다음은 데이터 검색 기능을 구현할 예정입니다. 기능을 구현하면서, 리액트가 왜 불변성을 유지하면서 데이터를 관리해야 하는지 알아보겠습니다.