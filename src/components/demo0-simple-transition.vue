<template>
  <div>
    <button
      @mousedown="handleMouseDown"
      @touchstart="handleMouseDown">
      Toggle
    </button>
    <Motion
      :now-style="{x: spring(open ? 400 : 0)}">
      <template slot-scope="props">
        <div class="demo0">
          <div
            :style="{
              transform: `translate3d(${props.x}px, 0, 0)`
            }"
            class="demo0-block"/>
        </div>
      </template>
    </Motion>
  </div>
</template>

<script>
import { spring, Motion } from '../../package/index.js'
export default {
  components: {
    Motion
  },
  data () {
    return {
      open: false
    }
  },
  methods: {
    spring,
    handleMouseDown () {
      this.open = !this.open
    }
  }
}
</script>

<style scoped>
  .demo0 {
    border-radius: 4px;
    background-color: rgb(240, 240, 232);
    position: relative;
    margin: 5px 3px 10px;
    width: 450px;
    height: 50px;
  }
  .demo0-block {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 4px;
    background-color: rgb(130, 181, 198);
  }
</style>

