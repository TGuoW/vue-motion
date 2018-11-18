<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png">
      <!-- <he/> -->
    <Motion
      :default-style="{x: 10}"
      :nowStyle="{x: spring(30)}">
      <template slot-scope="props">
        <div :style="{'width': props.data.x + 'px'}">{{ props }}</div>
      </template>

    </Motion>
  </div>
</template>

<script>
import he from './components/HelloWorld'
import { Motion } from '../package/index.js'
import spring from '../package/spring'
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
