<template>
  <div id="app">
    <!-- <img
      alt="Vue logo"
      src="./assets/logo.png"> -->
    <he/>
    <!-- <Motion
      :default-style="{x: 10}"
      :now-style="{x: spring(30)}">
      <template slot-scope="props">
        <div :style="{'width': props.data.x + 'px'}">{{ props }}</div>
      </template>

    </Motion> -->
  </div>
</template>

<script>
// import he from './components/demo7-water-ripples'
// import he from './components/demo0-simple-transition'
// import he from './components/demo2-draggable-balls'
// import he from './components/demo3-todomvc-list-transition'
import he from './components/demo4-photo-gallery'
import { Motion, spring } from '../package/index.js'
export default {
  name: 'App',
  components: {
    he,
    Motion
  },
  methods: {
    spring: spring
  }
}
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  margin: 0 auto;
  min-width: 230px;
  max-width: 550px;
  color: #2c3e50;
}
</style>
