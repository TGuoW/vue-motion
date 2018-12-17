<template>
  <div
    v-if="p = 'qwe'"
    class="i">{{ p }}</div>
</template>

<script>
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
  }
}
</script>