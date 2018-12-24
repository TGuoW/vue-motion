<template>
  <div class="about">
    <h1>This is an about page{{ time }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      time: 0
    }
  },
  mounted () {
    setInterval(() => {
      this.time++
    }, 1000)
  }
}
</script>
