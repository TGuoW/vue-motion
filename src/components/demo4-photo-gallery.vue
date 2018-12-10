<template>
  <div>
    <div>Scroll Me</div>
    <button @click="clickHandler('')">Previous</button>
    <input
      type="range"
      :min="0"
      :max="photos.length - 1"
      :value="currPhoto"
      @change="handleChange" />
    <button @click="clickHandler('show-next')">Next</button>
    <div className="demo4">
      <Motion :nowStyle="{height: spring(photos[currPhoto][1]), width: spring(photos[currPhoto][0])}">
        <template slot-scope="props">
          <div className="demo4-inner" :style="{height: props.data.height + 'px', width: props.data.width + 'px'}">
            <Motion v-for="(item, i) in configs" :key="i" :nowStyle="item.style">
              <template slot-scope="p">
                {{p.data}}
                <img className="demo4-photo" :src="require(`../../src/assets/images/${i}.jpg`)" :style="p.data" />
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
  mounted () {
    const {photos, currPhoto} = this
    const [currWidth, currHeight] = photos[currPhoto]

    const widths = photos.map(([origW, origH]) => currHeight / origH * origW)

    const leftStartCoords = widths
      .slice(0, currPhoto)
      .reduce((sum, width) => sum - width, 0)

    photos.reduce((prevLeft, [origW, origH], i) => {
      this.configs.push({
        left: spring(prevLeft, springSettings),
        height: spring(currHeight, springSettings),
        width: spring(widths[i], springSettings),
      });
      return prevLeft + widths[i];
    }, leftStartCoords);
  },
  methods: {
    spring,
    clickHandler (btn) {
      let photoIndex = btn === NEXT ? this.currPhoto+1 : this.currPhoto-1;

      photoIndex = photoIndex >= 0 ? photoIndex : this.photos.length - 1;
      photoIndex = photoIndex >= this.photos.length ? 0 : photoIndex;
      this.currPhoto = photoIndex
    },
    handleChange (e) {
      this.currPhoto = e.target.value
    }
  }
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

