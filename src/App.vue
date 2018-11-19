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
import he from './components/demo7-water-ripples'
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
