<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

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
</style>
