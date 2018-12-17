<template>
  <div class="demo2-outer">
    <div class="content">
      <div className="demo2">
        <Motion
          v-for="(item, key) in order"
          :key="key"
          :now-style="renderStyle(key)"
        >
          <template slot-scope="props">
            <div
              :style="{
                backgroundColor: allColors[key],
                WebkitTransform: `translate3d(${props.translateX}px, ${props.translateY}px, 0) scale(${props.scale})`,
                transform: `translate3d(${props.translateX}px, ${props.translateY}px, 0) scale(${props.scale})`,
                zIndex: key === lastPress ? 99 : order.indexOf(key),
                boxShadow: `${props.boxShadow}px 5px 5px rgba(0,0,0,0.5)`,
              }"
              class="demo2-ball"
              @mousedown="handleMouseDown(key, key === lastPress && isPressed ? mouseXY : layout[key], $event)"/>
          </template>
        </Motion>
      </div>
    </div>
  </div>
</template>

<script>
import { spring, Motion } from '../../package/index.js'
import range from 'lodash.range'
// @mousedown="handleMouseDown(key, key === lastPress && isPressed ? mouseXY : layout[key])"/>
const springSetting1 = {stiffness: 180, damping: 10}
const springSetting2 = {stiffness: 120, damping: 17}

function reinsert (arr, from, to) {
  const _arr = arr.slice(0)
  const val = _arr[from]
  _arr.splice(from, 1)
  _arr.splice(to, 0, val)
  return _arr
}

function clamp (n, min, max) {
  return Math.max(Math.min(n, max), min)
}

const [count, width, height] = [11, 70, 90]
// indexed by visual position

export default {
  components: {
    Motion
  },
  data () {
    return {
      mouseXY: [0, 0],
      mouseCircleDelta: [0, 0], // difference between mouse and circle pos for x + y coords, for dragging
      lastPress: null, // key of the last pressed component
      isPressed: false,
      order: range(count),
      springSetting1: {stiffness: 180, damping: 10},
      springSetting2: {stiffness: 120, damping: 17},
      layout: range(count).map(n => {
        const row = Math.floor(n / 3)
        const col = n % 3
        return [width * col, height * row]
      }),
      allColors: [
        '#EF767A', '#456990', '#49BEAA', '#49DCB1', '#EEB868', '#EF767A', '#456990',
        '#49BEAA', '#49DCB1', '#EEB868', '#EF767A',
      ]
    }
  },
  mounted () {
    window.addEventListener('touchmove', this.handleTouchMove)
    window.addEventListener('touchend', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  },
  methods: {
    spring,
    handleTouchMove (e) {
      e.preventDefault()
      this.handleMouseMove(e.touches[0])
    },
    handleMouseMove ({pageX, pageY}) {
      const {order, lastPress, isPressed, mouseCircleDelta: [dx, dy]} = this
      if (isPressed) {
        const mouseXY = [pageX - dx, pageY - dy]
        const col = clamp(Math.floor(mouseXY[0] / width), 0, 2)
        const row = clamp(Math.floor(mouseXY[1] / height), 0, Math.floor(count / 3))
        const index = row * 3 + col
        const newOrder = reinsert(order, order.indexOf(lastPress), index)
        this.mouseXY = mouseXY
        this.order = newOrder
      }
    },
    handleTouchStart (key, pressLocation, e) {
      this.handleMouseDown(key, pressLocation, e.touches[0])
    },
    handleMouseDown (key, [pressX, pressY], {pageX, pageY}) {
      this.lastPress = key
      this.isPressed = true
      this.mouseCircleDelta= [pageX - pressX, pageY - pressY]
      this.mouseXY= [pressX, pressY]
    },
    handleMouseUp () {
      this.isPressed = false
      this.mouseCircleDelta = [0, 0]
    },
    renderStyle (key) {
      const {lastPress, isPressed, mouseXY} = this
      let style
      let x
      let y
      const visualPosition = this.order.indexOf(key)
      if (key === lastPress && isPressed) {
        [x, y] = mouseXY
        style = {
          translateX: x,
          translateY: y,
          scale: spring(1.2, springSetting1),
          boxShadow: spring((x - (3 * width - 50) / 2) / 15, springSetting1),
        }
      } else {
        [x, y] = this.layout[visualPosition]
        style = {
          translateX: spring(x, springSetting2),
          translateY: spring(y, springSetting2),
          scale: spring(1, springSetting1),
          boxShadow: spring((x - (3 * width - 50) / 2) / 15, springSetting1),
        }
      }
      return style
    }
  },

}
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  .demo2-outer {
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: #EEE;
    display: flex;
    justify-content: center;
    align-items: center;
    display: -webkit-flex;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }

  .demo2 {
    width: 190px;
    height: 320px;
  }

  .demo2-ball {
    position: absolute;
    border: 1px solid black;
    border-radius: 99px;
    width: 50px;
    height: 50px;
  }
</style>

