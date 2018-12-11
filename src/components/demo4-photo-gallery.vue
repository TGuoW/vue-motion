<template>
  <div>
    <div>Scroll Me</div>
    <button @click="clickHandler('')">Previous</button>
    <input
      :min="0"
      :max="photos.length - 1"
      :value="currPhoto"
      type="range"
      @change="handleChange" >
    <button @click="clickHandler('show-next')">Next</button>
    <div class="demo4">
      <Motion :now-style="{height: spring(photos[currPhoto][1]), width: spring(photos[currPhoto][0])}">
        <template slot-scope="props">
          <div
            :style="{height: props.data.height + 'px', width: props.data.width + 'px'}"
            class="demo4-inner">
            <Motion
              v-for="(item, i) in configs"
              :key="i"
              :now-style="item">
              <template slot-scope="p">
                <img
                  :src="require(`../../src/assets/images/demo4/${i}.jpg`)"
                  :style="{
                    left: p.data.left + 'px',
                    height: p.data.height + 'px',
                    width: p.data.width + 'px'
                  }"
                  class="demo4-photo" >
              </template>
            </Motion>
          </div>
        </template>
      </Motion>
    </div>
  </div>
</template>

<script>
import { spring, Motion } from '../../package/index.js'
const springSettings = {stiffness: 170, damping: 26}
const NEXT = 'show-next'
export default {
  components: {
    Motion
  },
  data () {
    return {
      photos: [[500, 350], [800, 600], [800, 400], [700, 500], [200, 650], [600, 600]],
      currPhoto: 0,
      configs: []
    }
  },
  watch: {
    currPhoto () {
      this.changePhoto()
    }
  },
  mounted () {
    this.changePhoto()
  },
  methods: {
    spring,
    clickHandler (btn) {
      let photoIndex = btn === NEXT ? this.currPhoto+1 : this.currPhoto-1

      photoIndex = photoIndex >= 0 ? photoIndex : this.photos.length - 1
      photoIndex = photoIndex >= this.photos.length ? 0 : photoIndex
      this.currPhoto = photoIndex
    },
    handleChange (e) {
      this.currPhoto = e.target.value
    },
    changePhoto () {
      const {photos, currPhoto} = this
      const currHeight = photos[currPhoto][1]

      const widths = photos.map(([origW, origH]) => currHeight / origH * origW)

      const leftStartCoords = widths
        .slice(0, currPhoto)
        .reduce((sum, width) => sum - width, 0)
      this.configs = []
      // eslint-disable-next-line
      photos.reduce((prevLeft, [origW, origH], i) => {
        this.configs.push({
          left: spring(prevLeft, springSettings),
          height: spring(currHeight, springSettings),
          width: spring(widths[i], springSettings),
        })
        return prevLeft + widths[i]
      }, leftStartCoords)
    }
  },
}
</script>

<style scoped>
  .demo4 {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    height: 700px;
    position: relative;
  }

  .demo4-inner {
    overflow: hidden;
    position: relative;
    margin: auto;
  }

  .demo4-photo {
    position: absolute;
    background-color: lightgray;
  }
</style>

