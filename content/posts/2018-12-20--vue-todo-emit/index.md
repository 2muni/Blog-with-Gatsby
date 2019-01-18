---
title: Part 1-2. Component Communication - emit
subTitle: Vue.js로 할 일 목록 만들기
category: "Vue.js"
cover: head.png
---

>본 게시글은 [Vue.js로 할 일 목록 만들기](https://blog.2muni.com/vue-todo-index/) 중 Part 1-2에 해당하는 게시글입니다.

저번 시간에 우리는 데이터를 추가하고 부모 컴포넌트의 데이터를 props를 통하여 자식 컴포넌트로 전달하였습니다.

이번엔 데이터를 삭제하고 변경해 보겠습니다.


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

본 포스팅에선 Vue.js에서 부모/자식 컴포넌트 간 통신에 대해서 알아보았으며, 기본적인 데이터의 추가와 삭제, 수정을 다뤄보았습니다.

다음은 수행한 내용을 체크하고, 이를 바탕으로 한 필터링 기능과 Vue.js에서 제공하는 `Transition`을 사용하여 애니메이션을 적용해 보겠습니다.