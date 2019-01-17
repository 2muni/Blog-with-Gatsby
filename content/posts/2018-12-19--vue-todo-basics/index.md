---
title: Part 1. CRUD & Component Communication
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
vue init webpack todo-vue
```
옵션 값은 전부다 n으로 진행하며, 패키지 모듈러는 npm입니다.

설치가 완료되었으면 `npm run dev` 명령을 수행하여 개발 서버를 열어주세요.

###기본 레이아웃

`http://localhost:8080/`를 통해 프로젝트에 진입할 수 있습니다. 우선 기본 레이아웃을 수정해 봅시다.

`src/App.vue`의 내용을 다음과 같이 수정해주세요.
```html
<template>
  <div id="app" class="container">
    <img src="./assets/logo.png" class="logo">
    <todo-list/>
  </div>
</template>

<script>
import TodoList from './components/TodoList'

export default {
  name: 'App',
  components: {
    TodoList,
  }
}
</script>

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

이제 Vue 컴포넌트를 작성할 차례입니다.

컴포넌트를 작성하기 전에, 개발 편의성을 위해 sass 모듈을 설치해주세요.
```bash
npm install sass-loader node-sass --save
```

설치가 완료되었으면 `src/components` 디렉토리 내의 `HelloWorld.vue`를 삭제하시고 `TodoList.vue` 파일을 생성해 주세요.

#<br>데이터 입력

TodoList 컴포넌트는 자식 컴포넌트를 포함하는 부모 컴포넌트입니다. Vue.js에서는 일반적으로 전역적인 데이터 관리 모듈이 없는 이상, [데이터는 부모 컴포넌트에서 자식 컴포넌트로 전달되도록 설계됩니다.](https://kr.vuejs.org/v2/guide/components.html#%EB%8B%A8%EB%B0%A9%ED%96%A5-%EB%8D%B0%EC%9D%B4%ED%84%B0-%ED%9D%90%EB%A6%84)

부모 컴포넌트에서 자식 컴포넌트로 보내는 데이터를 `props`라 하며, 자식 컴포넌트에서는 `$emit`을 통한 이벤트 호출로 [부모 컴포넌트에 간섭할 수 있습니다.](https://kr.vuejs.org/v2/guide/components.html#v-on%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A7%80%EC%A0%95-%EC%9D%B4%EB%B2%A4%ED%8A%B8)

## Todo-List 작성

`TodoList.vue`의 내용을 다음과 같이 작성해 주세요.

```html
<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data () {
    return {
      newTodo: '',
      idForTodo: 2,
      todos: [
        {
          'id': 0,
          'title': 'Finish Vue Study',
          'completed': false,
          'editing': false,
        },
        {
          'id': 1,
          'title': 'Take over world',
          'completed': false,
          'editing': false,
        },
      ]
    }
  },
  methods: {
    addTodo() {
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false,
      })
      this.newTodo = ''
      this.idForTodo++
    },
  },
}
</script>

<style lang="scss" scoped>
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
  &:focus {
    outline: 0;
  }
}
</style>
```

기본 템플릿 문법에 관해선 [여기](https://kr.vuejs.org/v2/guide/syntax.html)를 참고하세요

브라우저로 돌아가서 입력창이 추가 되었는지 확인해보세요.

또한, [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)을 통해 데이터 입력이 정상적으로 이뤄지는지도 확인해보세요.

잘 작동하나요?

##Todo-item 작성

다음은 할 일 목록을 나타내는 자식 컴포넌트입니다. 부모 컴포넌트인 `todo-list`에서 `todo`를 props로 가져와 표현합니다.

`src/components` 디렉토리 내에 `TodoItem.vue` 파일을 생성하고, 내용을 다음과 같이 작성해 주세요.

```html
<template>
  <div class="todo-item">{{ title }}</div>
</template>

<script>
export default {
  name: 'todo-item',
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
```

또한 `TodoList.vue`의 내용 역시 수정해 주세요
```html
<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">
    <todo-item v-for="todo in todos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script>
import TodoItem from './TodoItem'

export default {
  name: 'TodoList',
  components: {
    TodoItem,
  },
  ...
```

입력창에 내용을 작성하고 엔터키를 눌러보세요. 입력한 내용이 정상적으로 추가되나요?

이로써 우리는 props를 통해 `todo-list` 컴포넌트로 부터 `todo-item` 컴포넌트에 정상적으로 데이터를 전달하였습니다. 또한 데이터의 추가 역시 확인했습니다.


#<br>데이터 삭제

데이터의 삭제는 어떤 컴포넌트에서 발생되어야 할까요? 당연하게도, `todo-item` 컴포넌트에서 발생되어야 합니다.

그렇다면 자식 컴포넌트에서 발생된 이벤트가 부모 컴포넌트의 데이터에 간섭해야 됩니다. 이를 위해선 부모 컴포넌트인 `todo-list`가 자식 컴포넌트인 `todo-item`에서 발생되는 이벤트를 청취해야하며, 이는 자식 컴포넌트에서 `$emit`을 통해 호출한 이벤트를 감지함으로써 가능하게 됩니다.

우선 `TodoList.vue`의 내용을 다음과 같이 수정해 주세요.

```html
<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">
    <todo-item v-for="todo in todos" :key="todo.id" :todo="todo" @removeTodo="removeTodo" />
  </div>
</template>

...
<script>
  methods: {
    addTodo() {
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false,
      })
      this.newTodo = ''
      this.idForTodo++
    },
    removeTodo(id) {
      this.todos.splice(id, 1)
    }
  },
</script>
```

데이터의 삭제를 행하는 메소드인 `removeTodo()`를 추가하고, 이를 `todo-item`에 지정하였습니다.

다음으로, `TodoItem.vue`의 내용을 수정해 주세요

```html
<template>
  <div class="todo-item">
    <div class="todo-item-left">{{ title }}</div>
    <span class="remove-item" @click="removeTodo(todo.id)">&times;</span>
  </div>
</template>

<script>
export default {
  name: 'todo-item',
  props: {
    todo: {
      type: Object,
      required: true,
    },
    checkAll: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
    }
  },
  methods: {
    removeTodo(id) {
      this.$emit('removeTodo', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
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

부모 컴포넌트로부터 전달받은 `removeTodo()`를 동일한 이름의 함수에서 `$emit`를 통해 호출합니다. 또한 삭제를 희망하는 `todo`의 `id`를 같이 전달 함으로써, 부모 컴포넌트에서 해당 `todo`의 삭제가 발생하게 됩니다.

내용 우측의 X를 눌러 삭제가 정상적으로 이뤄지는지 확인해 보세요.

#<br>데이터 수정

우리는 수정을 원하는 내용을 더블클릭하여 입력창으로 전환해 볼겁니다.

수정 역시 `todo-item`에서 이뤄집니다. 따라서 `$emit`을 통해 부모 컴포넌트의 이벤트를 호출해야 겠죠?

우선 `TodoList.vue`의 메소드 영역에 `doneEdit()`을 추가해 주세요.

```html
<script>
  methods: {
    addTodo() {
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false,
      })
      this.newTodo = ''
      this.idForTodo++
    },
    doneEdit(todo) {
      this.todos.splice(todo.id, 1, todo)
    },
    removeTodo(id) {
      this.todos.splice(id, 1)
    }
  },
</script>
```

그런 다음, `TodoItem.vue`의 파일을 수정하겠습니다. 

##template & style

```html
<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <div v-if="!editing" class="todo-item-label" @dblclick="editTodo">{{ title }}</div>
      <input v-else class="todo-item-edit" type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>
    </div>
    <span class="remove-item" @click="removeTodo(todo.id)">&times;</span>
  </div>
</template>

...

<style lang="scss" scoped>
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}
.todo-item-left {
  display: flex;
  align-items: center;
}
.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  &:focus {
    outline: none;
  }
}
</style>
```

`v-if`를 통해 현 상태가 수정중일 때는 입력창을, 그게 아니라면 기존 내용을 출력합니다. 상태는 더블클릭 이벤트로 전환합니다.

수정중인 내용은 엔터 혹은 포커스가 밖으로 나오면 저장되며, esc키를 통해 수정을 취소할 수 있습니다.

##script

```html

<script>
export default {
  
  ...

  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: '',
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    removeTodo(id) {
      this.$emit('removeTodo', id)
    },
    editTodo() {
      this.beforeEditCache = this.title
      this.editing = true
    },
    doneEdit() {
      if (this.title.trim() == '') {
        this.title = this.beforeEditCache
      }
      this.editing = false
      this.$emit('doneEdit', {
        'id': this.id,
        'title': this.title,
        'completed': this.completed,
        'editing': this.editing,
      })
    },
    cancelEdit() {
      this.title = this.beforeEditCache
      this.editing = false
    },
  }
}
</script>
```

우선, 데이터 영역에 추가한 `beforeEditCache`를 통해 수정 전의 원본 내용을 저장합니다. 

또한 input 엘리먼트의 포커싱을 위해 [사용자 지정 디렉티브](https://kr.vuejs.org/v2/guide/custom-directive.html)를 선언하였습니다.

메소드 영역에서는 `editTodo()`로 입력 상태를 변경하고, `doneEdit()`을 통해 내용을 수정하며, `cancelEdit()`으로 수정을 취소하게 됩니다.

작성을 완료하셨으면 브라우저로 돌아가 해당 사항을 확인해 보세요.

또한 개발 도구로도 해당 변경 사항이 부모 컴포넌트인 `todo-list`에도 똑같이 반영 되는지도 확인해 보세요.


#<br>맺으며

본 포스팅에선 Vue.js에서 부모/자식 컴포넌트 간 통신에 대해서 알아보았으며, 기본적인 데이터의 CRUD를 다뤄보았습니다.

다음은 수행한 내용을 체크하고, 이를 바탕으로 한 필터링 기능과 Vue.js에서 제공하는 `Transition`을 사용하여 애니메이션을 적용해 보겠습니다.