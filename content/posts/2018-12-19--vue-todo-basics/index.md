---
title: Part 1. Basics
subTitle: Vue.js로 할 일 목록 만들기
category: "Vue.js"
cover: head.png
---

>본 게시글은 [Vue.js로 할 일 목록 만들기](https://blog.2muni.com/vue-todo-index/) 중 Part 1에 해당하는 게시글입니다.

지금부터 우리는 Vue.js를 이용하여 할 일 목록을 만들어 볼겁니다. 프로젝트 전체 소스코드는 [Git](https://github.com/2muni/laravel-vue.js-todo-list/tree/067486cfd7e65d1b06a68bad724ded29d5e4bbdf)에서 확인하실 수 있습니다.

#준비사항

* Node.js
* Vue.cli

##프로젝트 생성

다음 명령어를 입력하여 프로젝트를 생성해주세요
```bash
vue init wepack todo-vue
```
옵션 값은 전부다 n으로 진행하며, 패키지 모듈러는 npm입니다.

설치가 완료되었으면 `npm run dev` 명령을 수행하여 개발 서버를 열어주세요.

###기본 레이아웃

`http://localhost:8080/`를 통해 프로젝트에 진입할 수 있습니다. 우선 기본 레이아웃을 수정해 봅시다.

`src/App.vue` 내부의 템플릿 영역을 다음과 같이 수정해주세요.
```html
<template>
  <div id="app" class="container">
    <img src="./assets/logo.png" class="logo">
    <todo-list/>
  </div>
</template>
```

이후 `src/App.vue` 내부의 스타일 영역을 다음과 같이 수정해주세요.

```html
<style>
* {
  box-sizing: border-box;
}
.container {
  max-width: 600px;
  margin: 0 auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
}
.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}
</style>
```

#컴포넌트 생성

이제 Vue 컴포넌트를 추가할 차례입니다. 우선은 단일 컴포넌트로 서비스를 제작하겠습니다.

`src/App.vue` 내부의 스크립트 영역을 다음과 같이 수정해주세요.
```html
<script>
import TodoList from './components/TodoList'

export default {
  name: 'App',
  components: {
    TodoList,
  }
}
</script>
```
우리의 Vue 어플리케이션 최상단에 TodoList라는 컴포넌트를 추가하였습니다.

`src/components` 디렉토리 내의 `HelloWorld.vue`를 삭제하시고 `TodoList.vue` 파일을 생성해 주세요.

```html
<template>
  <div>
    Todo list goes here
  </div>
</template>

<script>
export default {
  name: 'todo-list',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>

</style>
```

브라우저로 돌아가서 수정된 내용을 확인해보세요.
![01](01.png)

위 화면과 동일한가요?

##데이터 생성 및 삭제

컴포넌트의 내용을 작성하겠습니다. 개발 편의성을 위해 sass 모듈을 설치해주세요.
```bash
npm install sass-loader node-sass --save
```

설치가 완료되면, `src/components/TodoList.vue` 을 다음과 같이 수정해주세요.

```html
<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">
    <div v-for="(todo, index) in todosFilterd" :key="todo.id" class="todo-item">
      <div>
        {{ todo.title }}
      </div>
      <div class="remove-item" @click="removeTodo(index)">
        &times;
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo-list',
  data () {
    return {
      newTodo: '',
      idForTodo: 3,
      todos: [
        {
          'id': 1,
          'title': 'Finish Vue Screencast',
          'completed': false,
          'editing': false,
        },
        {
          'id': 2,
          'title': 'Take over world',
          'completed': false,
          'editing': false,
        },
      ]
    }
  },
  methods: {
    addTodo() {
      if(this.newTodo.trim().length == 0) {
        return
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
      })
      this.newTodo = ''
      this.idForTodo++
    },
    removeTodo(index) {
      this.todos.splice(index, 1)
    },
  }
}
</script>

<style lang="scss">
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    &:focus {
      outline: 0;
    }
  }

  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: .3s;
  }

  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: black;
    }
  }
</style>
```



