<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png">
    <Motion
      :default-style='{x: 10}'
      :stylee='{x: 30}'>
      <template slot-scope="props">
        <div :style="{'width': props.data.x + 'px'}">{{ props }}</div>
      </template>

    </Motion>
  </div>
</template>

<script>

export default {
  name: 'App',
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
