<template>
  <div class="demo5">
    <div
      v-for="(item, index) in grid"
      :style="cellStyle"
      :key="index"
      class="demo5-cell">
      <input
        :min="0"
        :max="300"
        :value="stiffness"
        type="range"
        @onMouseDown="handleMouseDownInput.bind(null, 'stiffness', i)"
        @onChange="handleChange.bind(null,'stiffness', i)">
      <input
        :min="0"
        :max="40"
        :value="damping"
        type="range"
        @onMouseDown="handleMouseDownInput.bind(null,'damping', j)"
        @onChange="handleChange.bind(null,'damping', j)" >
      <Motion :now-style="motionStyle">
        <template slot-scope="props">
          <div/>
        </template>
      </Motion>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      delta: [0, 0],
      mouse: [0, 0],
      isPressed: false,
      firstConfig: [60, 5],
      slider: {dragged: null, num: 0},
      lastPressed: [0, 0],
    }
  },
  mounted () {
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('touchmove', this.handleTouchMove)
    window.addEventListener('mouseup', this.handleMouseUp)
    window.addEventListener('touchend', this.handleMouseUp)
  },
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
    if (this.state.isPressed) {
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
