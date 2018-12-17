<template>
  <div class="home">
    <router-link to="/demo8">demo8</router-link>
    <router-link to="/demo0">demo0</router-link>
    <router-link to="/demo1">demo1</router-link>
    <router-link to="/demo2">demo2</router-link>
    <router-link to="/demo3">demo3</router-link>
    <router-link to="/demo4">demo4</router-link>
    <router-link to="/demo7">demo7</router-link>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  }
}
</script>
