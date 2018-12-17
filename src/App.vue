<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
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
    position: relative;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    margin: 0 auto;
    /* min-width: 230px;
    max-width: 550px; */
    color: #2c3e50;
  }
  .test {
    height: 100px;
    width: 100px;
    background: #000;
  }
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
