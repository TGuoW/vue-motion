<template>
  <div class="demo5">
    <template
      v-for="(item, i) in grid">
      <div
        v-for="(ele, j) in item"
        :key="j + 100 * i"
        :style="cellStyle(i, j)"
        class="demo5-cell">
        <input
          :min="0"
          :max="300"
          :value="stiffness(i)"
          type="range"
          @mousedown="handleMouseDownInput('stiffness', i)"
          @change="handleChange('stiffness', i, $event)">
        <input
          :min="0"
          :max="40"
          :value="damping(j)"
          type="range"
          @mousedown="handleMouseDownInput('damping', j)"
          @change="handleChange('damping', j, $event)" >
        <Motion :now-style="motionStyle(i, j)">
          <template slot-scope="props">
            <div
              :style="{
                transform: `translate3d(${props.x}px, ${props.y}px, 0)`,
                WebkitTransform: `translate3d(${props.x}px, ${props.y}px, 0)`,
              }"
              :class="'demo5-ball ' + (lastPressed[0] === i && lastPressed[1] === j ? 'demo5-ball-active' : '')"
              @mousedown="handleMouseDown([i, j], [props.x, props.y], $event)"
              @touchstart="handleTouchStart([i, j], [props.x, props.y])">
              <div class="demo5-preset">
                {{ stiffness(i) }}
                <template v-if="slider.dragged === 'stiffness'">
                  <div
                    v-if="i < slider.num"
                    class="demo5-minus">
                    -{{ (slider.num - i) * 30 }}
                  </div>
                  <div
                    v-else-if="i > slider.num"
                    class="demo5-plus">
                    +{{ (i - slider.num) * 30 }}
                  </div>
                  <div
                    v-else
                    class="demo5-plus">
                    0
                  </div>
                </template>
              </div>
              <div class="demo5-preset">
                {{ damping(j) }}
                <template v-if="slider.dragged !== 'stiffness'">
                  <div
                    v-if="j < slider.num"
                    class="demo5-minus">
                    -{{ (slider.num - j) * 2 }}
                  </div>
                  <div
                    v-else-if="j > slider.num"
                    class="demo5-plus">
                    +{{ (j - slider.num) * 2 }}
                  </div>
                  <div
                    v-else
                    class="demo5-plus">
                    0
                  </div>
                </template>
              </div>
            </div>
          </template>
        </Motion>
      </div>
    </template>
  </div>
</template>


<script>
import { spring, Motion } from '../../package/index.js'
import range from 'lodash.range'
const gridWidth = 150
const gridHeight = 150
const grid = range(4).map(() => range(6))
export default {
  components: {
    Motion
  },
  data () {
    return {
      delta: [0, 0],
      mouse: [0, 0],
      isPressed: false,
      firstConfig: [60, 5],
      slider: {dragged: null, num: 0},
      lastPressed: [0, 0],
      grid: grid
    }
  },
  computed: {

  },
  mounted () {
    console.log(this.$route.query)
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('touchmove', this.handleTouchMove)
    window.addEventListener('mouseup', this.handleMouseUp)
    window.addEventListener('touchend', this.handleMouseUp)
  },
  methods: {
    handleTouchStart (pos, press, e) {
      this.handleMouseDown(pos, press, e.touches[0])
    },
    handleMouseDown (pos, [pressX, pressY], {pageX, pageY}) {
      this.delta = [pageX - pressX, pageY - pressY]
      this.mouse = [pressX, pressY]
      this.isPressed = true
      this.lastPressed = pos
    },
    handleTouchMove (e) {
      if (this.isPressed) {
        e.preventDefault()
      }
      this.handleMouseMove(e.touches[0])
    },
    handleMouseMove ({pageX, pageY}) {
      const {isPressed, delta: [dx, dy]} = this
      if (isPressed) {
        this.mouse = [pageX - dx, pageY - dy]
      }
    },
    handleMouseUp () {
      this.isPressed= false
      this.delta = [0, 0]
      this.slider = {dragged: null, num: 0}
    },
    handleChange (constant, num, {target}) {
      const {firstConfig: [s, d]} = this
      if (constant === 'stiffness') {
        this.firstConfig = [target.value - num * 30, d]
      } else {
        this.firstConfig = [s, target.value - num * 2]
      }
    },
    handleMouseDownInput (constant, num) {
      this.slider = {dragged: constant, num: num}
    },
    cellStyle (i, j) {
      return {
        top: gridHeight * i + 'px',
        left: gridWidth * j + 'px',
        width: gridWidth + 'px',
        height: gridHeight + 'px',
      }
    },
    stiffness (i) {
      return this.firstConfig[0] + i * 30
    },
    damping (j) {
      return this.firstConfig[1] + j * 2
    },
    motionStyle (i, j) {
      return this.isPressed
        ? {x: this.mouse[0], y: this.mouse[1]}
        : {
          x: spring(gridWidth / 2 - 25, {stiffness:this.stiffness(i), damping: this.damping(j)}),
          y: spring(gridHeight / 2 - 25, {stiffness:this.stiffness(i), damping: this.damping(j)}),
        }
    }
  }
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

  body {
    background-color: #FFFFFF;
    font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
    font-weight: 300;
  }

  h3 {
    margin: 5px 0 16px;
    font-size: 13px;
  }

  .demo5-outer {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    display: -webkit-flex;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }

  .demo5 {
    width: 900px;
    height: 600px;
    position: relative;
  }

  .demo5-cell {
    position: absolute;
    border: 1px solid #E4E4E4;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    display: -webkit-flex;
    -webkit-flex-wrap: wrap;
    -webkit-align-content: flex-start;
    -webkit-justify-content: center;
    padding: 6px;
    box-sizing: border-box;
  }

  .demo5-cell input {
    visibility: hidden;
    cursor: ew-resize;
  }

  .demo5-cell:hover input {
    visibility: visible;
  }

  .demo5-ball {
    width: 50px;
    height: 50px;
    border-radius: 99px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: -webkit-flex;
    -webkit-justify-content: center;
    -webkit-align-items: center;
    -webkit-flex-direction: column;
    top: 0;
    left: 0;
    cursor: pointer;
    font-size: 12px;
    background-color: #FDC3C3;
    z-index: 1;
  }

  .demo5-ball-active {
    background-color: #FF8585;
  }

  .demo5-minus {
    padding-left: 4px;
    color: #CC2E2E;
  }

  .demo5-plus {
    padding-left: 4px;
    color: #39A11E;
  }

  .demo5-preset {
    display: flex;
    justify-content: space-around;
    display: -webkit-flex;
    -webkit-justify-content: space-around;
    padding: 0 2px 0 2px;
  }
</style>
