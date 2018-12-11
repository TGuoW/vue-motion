<template>
  <div class="demo8-outer">
    <div id="content">
      <div class="demo8">
        <Motion
          v-for="(item, i) in range(4)"
          :now-style="style(i)"
          :key="i">
          <template slot-scope="props">
            <div
              :style="{
                boxShadow: `rgba(0, 0, 0, 0.2) 0px ${props.data.shadow}px ${2 * props.data.shadow}px 0px`,
                transform: `translate3d(0, ${props.data.y}px, 0) scale(${props.data.scale})`,
                WebkitTransform: `translate3d(0, ${props.data.y}px, 0) scale(${props.data.scale})`,
                zIndex: i === originalPosOfLastPressed ? 99 : i,
              }"
              class="demo8-item"
              @mousedown="handleMouseDown(i, props.data.y, $event)"
              @touchstart="handleTouchStart(i, props.data.y, $event)">
              {{ order.indexOf(i) + 1 }}
            </div>
          </template>
        </Motion>
      </div>
    </div>
  </div>
</template>

<script>
import { spring, Motion } from '../../package/index.js'
import range from 'lodash.range'

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

const springConfig = {stiffness: 300, damping: 50}
const itemsCount = 4
export default {
  components: {
    Motion
  },
  data () {
    return {
      topDeltaY: 0,
      mouseY: 0,
      isPressed: false,
      originalPosOfLastPressed: 0,
      order: range(itemsCount),
    }
  },
  mounted () {
    window.addEventListener('touchmove', this.handleTouchMove)
    window.addEventListener('touchend', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  },
  methods: {
    range,
    spring,
    style (i) {
      const {mouseY, isPressed, originalPosOfLastPressed, order} = this
      return originalPosOfLastPressed === i && isPressed
        ? {
          scale: spring(1.1, springConfig),
          shadow: spring(16, springConfig),
          y: mouseY,
        }
        : {
          scale: spring(1, springConfig),
          shadow: spring(1, springConfig),
          y: spring(order.indexOf(i) * 100, springConfig),
        }
    },
    handleTouchStart (key, pressLocation, e) {
      this.handleMouseDown(key, pressLocation, e.touches[0])
    },
    handleTouchMove (e) {
      e.preventDefault()
      this.handleMouseMove(e.touches[0])
    },
    handleMouseDown (pos, pressY, {pageY}) {
      this.topDeltaY = pageY - pressY
      this.mouseY = pressY
      this.isPressed = true
      this.originalPosOfLastPressed = pos
    },
    handleMouseMove ({pageY}) {
      const {isPressed, topDeltaY, order, originalPosOfLastPressed} = this

      if (isPressed) {
        const mouseY = pageY - topDeltaY
        const currentRow = clamp(Math.round(mouseY / 100), 0, itemsCount - 1)
        let newOrder = order

        if (currentRow !== order.indexOf(originalPosOfLastPressed)) {
          newOrder = reinsert(order, order.indexOf(originalPosOfLastPressed), currentRow)
        }

        this.mouseY = mouseY
        this.order = newOrder
      }
    },
    handleMouseUp () {
      this.isPressed = false
      this.topDeltaY = 0
    }
  }
}
</script>

<style scoped>
  .demo8-outer {
    background-color: #EEE;
    color: #FFF;
    position: absolute;
    width: 100%;
    height: 100%;
    font: 28px/1em "Helvetica";
    display: flex;
    justify-content: center;
    align-items: center;
    display: -webkit-flex;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }

  .demo8 {
    width: 320px;
    height: 400px;
  }

  .demo8-item {
    position: absolute;
    width: 320px;
    height: 90px;
    overflow: visible;
    pointer-events: auto;
    transform-origin: 50% 50% 0px;
    border-radius: 4px;
    color: rgb(153, 153, 153);
    line-height: 96px;
    padding-left: 32px;
    font-size: 24px;
    font-weight: 400;
    background-color: rgb(255, 255, 255);
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  .link {
    position: absolute;
    color: rgb(76, 76, 76);
    text-decoration: none;
    font: 14px/1em "Helvetica";
    padding: 10px;
    top: 0;
    left: 0;
  }
</style>

