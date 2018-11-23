<template>
  <div>
    <button
      @mousedown="handleMouseDown"
      @touchstart="handleMouseDown">
      Toggle
    </button>
    <Motion
      :now-style="{x: spring(open ? 400 : 0)}">
      <template slot-scope="props">
        <div class="demo0">
          <div
            :style="{
              transform: `translate3d(${props.data.x}px, 0, 0)`
            }"
            class="demo0-block"/>
        </div>
      </template>
    </Motion>
  </div>
</template>

<script>
import { TransitionMotion, spring, presets } from '../../package/index.js'
export default {
  components: {
    TransitionMotion
  },
  data () {
    return {
      todos: [
        // key is creation date
        {key: 't1', data: {text: 'Board the plane', isDone: false}},
        {key: 't2', data: {text: 'Sleep', isDone: false}},
        {key: 't3', data: {text: 'Try to finish conference slides', isDone: false}},
        {key: 't4', data: {text: 'Eat cheese and drink wine', isDone: false}},
        {key: 't5', data: {text: 'Go around in Uber', isDone: false}},
        {key: 't6', data: {text: 'Talk with conf attendees', isDone: false}},
        {key: 't7', data: {text: 'Show Demo 1', isDone: false}},
        {key: 't8', data: {text: 'Show Demo 2', isDone: false}},
        {key: 't9', data: {text: 'Lament about the state of animation', isDone: false}},
        {key: 't10', data: {text: 'Show Secret Demo', isDone: false}},
        {key: 't11', data: {text: 'Go home', isDone: false}},
      ],
      value: '',
      selected: 'all',
    }
  },
  methods: {
    spring,
    handleChange ({target: {value}}) {
      this.setState({value})
    },

    handleSubmit (e) {
      e.preventDefault()
      const newItem = {
        key: 't' + Date.now(),
        data: {text: this.state.value, isDone: false},
      }
      // append at head
      this.setState({todos: [newItem].concat(this.state.todos)})
    },

    handleDone (doneKey) {
      this.setState({
        todos: this.state.todos.map(todo => {
          const {key, data: {text, isDone}} = todo
          return key === doneKey
            ? {key: key, data: {text: text, isDone: !isDone}}
            : todo
        }),
      })
    },

    handleToggleAll () {
      const allNotDone = this.state.todos.every(({data}) => data.isDone)
      this.todos = this.todos.map(({key, data: {text}}) => (
        {key: key, data: {text: text, isDone: !allNotDone}}
      ))
    },

    handleSelect (selected) {
      this.selected = selected
    },

    handleClearCompleted () {
      this.todos = this.state.todos.filter(({data}) => !data.isDone)
    },

    handleDestroy (date) {
      this.todos = this.state.todos.filter(({key}) => key !== date)
    },

    // actual animation-related logic
    getDefaultStyles () {
      return this.todos.map(todo => ({...todo, style: {height: 0, opacity: 1}}))
    },

    getStyles () {
      const {todos, value, selected} = this
      return todos.filter(({data: {isDone, text}}) => {
        return text.toUpperCase().indexOf(value.toUpperCase()) >= 0 &&
        (selected === 'completed' && isDone ||
        selected === 'active' && !isDone ||
        selected === 'all')
      })
        .map((todo) => {
          return {
            ...todo,
            style: {
              height: spring(60, presets.gentle),
              opacity: spring(1, presets.gentle),
            }
          }
        })
    },

    willEnter () {
      return {
        height: 0,
        opacity: 1,
      }
    },

    willLeave () {
      return {
        height: spring(0),
        opacity: spring(0),
      }
    },
  }
}
</script>

<style scoped>
  .demo0 {
    border-radius: 4px;
    background-color: rgb(240, 240, 232);
    position: relative;
    margin: 5px 3px 10px;
    width: 450px;
    height: 50px;
  }
  .demo0-block {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 4px;
    background-color: rgb(130, 181, 198);
  }
</style>
