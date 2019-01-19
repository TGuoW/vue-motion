<template>
  <StaggeredMotion
    :default-styles="range(6).map(() => ({x: 0, y: 0}))"
    :styles="getStyles">
    <template slot-scope="props">
      <div
        ref="stage"
        class="demo1">
        <div
          v-for="(item, i) in props"
          :key="i"
          :class="`demo1-ball ball-${i}`"
          :style="{
            WebkitTransform: `translate3d(${props[i].x - 25}px, ${props[i].y - 25}px, 0)`,
            transform: `translate3d(${props[i].x - 25}px, ${props[i].y - 25}px, 0)`,
            zIndex: props.length - i,
        }"/>
      </div>
    </template>
  </StaggeredMotion>
</template>

<script>
import {StaggeredMotion, spring, presets} from '../../package/index.js'
import range from 'lodash.range'
export default {
  components: {
    StaggeredMotion
  },
  data () {
    return {
      x: 250,
      y: 300,
      offsetTop: 0,
      offsetLeft: 0
    }
  },
  mounted () {
    const {offsetLeft, offsetTop} = this.$refs.stage
    this.offsetLeft = offsetLeft
    this.offsetTop = offsetTop
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('touchmove', this.handleTouchMove)
  },
  methods: {
    range,
    handleTouchMove ({touches}) {
      this.handleMouseMove(touches[0])
    },
    handleMouseMove ({pageX: x, pageY: y}) {
      this.x = x - this.offsetLeft
      this.y = y - this.offsetTop
    },
    getStyles (prevStyles) {
    // `prevStyles` is the interpolated value of the last tick
      const endValue = prevStyles.map((_, i) => {
        return i === 0
          ? {
            x: this.x,
            y: this.y
          } : {
            x: spring(prevStyles[i - 1].x, presets.gentle),
            y: spring(prevStyles[i - 1].y, presets.gentle),
          }
      })
      return endValue
    }
  }
}
</script>

<style scoped>
  * {
    margin: 0;
  }

  .demo1 {
    width: 100%;
    height: 100%;
    position: absolute;
    background: #EEE;
  }

  .demo1-ball {
    border-radius: 99px;
    background-color: white;
    width: 50px;
    height: 50px;
    border: 3px solid white;
    position: absolute;
    background-size: 50px;
  }

  .ball-0 {
    background-image: url(../assets/images/demo1/0.jpg);
  }

  .ball-1 {
    background-image: url(../assets/images/demo1/1.jpg);
  }

  .ball-2 {
    background-image: url(../assets/images/demo1/2.jpg);
  }

  .ball-3 {
    background-image: url(../assets/images/demo1/3.jpg);
  }

  .ball-4 {
    background-image: url(../assets/images/demo1/4.jpg);
  }

  .ball-5 {
    background-image: url(../assets/images/demo1/5.jpg);
  }
</style>

