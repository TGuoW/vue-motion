<template>
  <div
    v-if="p = 'qwe'"
    class="i">{{ p }}</div>
</template>

<script>
import $ from 'jquery'
export default {
  props: {
    p: {
      type: String,
      default () {
        return 'a'
      }
    }
  },
  mounted () {
    console.log($('.i'))
  }
}
</script>