<template>
  <div class="hello">
    <TransitionMotion
      :will-leave="willLeave"
      :styles="styles">
      <template slot-scope="props">
        <div
          class="demo7"
          @mousemove="handleMouseMove">
          <!-- {{ props.data }} -->
          <div
            v-for="(item) in props.data"
            :key="item.key"
            :style="{
              opacity: item.style.opacity,
              scale: item.style.scale,
              transform: `translate3d(${item.style.x}px, ${item.style.y}px, 0) scale(${item.style.scale})`,
              WebkitTransform: `translate3d(${item.style.x}px, ${item.style.y}px, 0) scale(${item.style.scale})`,
            }"
            class="demo7-ball"
          />
        </div>
      </template>
    </TransitionMotion>
  </div>
</template>

<script>
import { TransitionMotion, spring } from '../../package/index.js'
const leavingSpringConfig = {stiffness: 60, damping: 15}
export default {
  name: 'HelloWorld',
  components: {
    TransitionMotion
  },
  props: {
    msg: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      mouse: [],
      now: 't' + 0
    }
  },
  computed: {
    styles () {
      const [mouseX, mouseY] = this.mouse
      const now = this.now
      return mouseX == null ? [] : [{
        key: now,
        style: {
          opacity: spring(1),
          scale: spring(0),
          x: spring(mouseX),
          y: spring(mouseY),
        }
      }]
    }
  },
  methods: {
    spring,
    handleMouseMove ({pageX, pageY}) {
      this.mouse = [pageX - 25, pageY - 25]
      this.now = 't' + Date.now()
    },
    handleTouchMove (e) {
      /* eslint-disable */
      console.log(e)
      this.handleMouseMove(e.touches[0])
    },
    willLeave (styleCell) {
      return {
        ...styleCell.style,
        opacity: spring(0, leavingSpringConfig),
        scale: spring(2, leavingSpringConfig)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}


  .demo7 {
    color: #fff;
    background-color: #1B1B1B;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .demo7-ball {
    width: 50px;
    height: 50px;
    border-radius: 99px;
    position: absolute;
    border: 1px solid lightblue;
  }
</style>
