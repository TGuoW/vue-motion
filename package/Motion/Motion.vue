<template>
  <div>
    <slot :data="currentStyle"/>
  </div>
</template>

<script>
import mapToZero from '../mapToZero';
import stripStyle from '../stripStyle';
import stepper from '../stepper';
import defaultNow from 'performance-now';
import defaultRaf from 'raf';
import shouldStopAnimation from '../shouldStopAnimation';

const msPerFrame = 1000 / 60;

export default {
  name: 'Motion',
  props: {
    defaultStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    nowStyle: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    const { defaultStyle, nowStyle } = this
    const currentStyle = defaultStyle || stripStyle(nowStyle);
    const currentVelocity = mapToZero(currentStyle);
    return {
      currentStyle,
      currentVelocity,
      lastIdealStyle: currentStyle,
      lastIdealVelocity: currentVelocity,
      unmounting: false,
      wasAnimating: false,
      animationID: null,
      prevTime: 0,
      accumulatedTime: 0,
      unreadPropStyle: null,
    }
  },
  watch: {
    nowStyle (val) {
      if (this.unreadPropStyle != null) {
        // previous props haven't had the chance to be set yet; set them here
        this.clearUnreadPropStyle(this.unreadPropStyle);
      }
      this.unreadPropStyle = val
      if (this.animationID == null) {
        this.prevTime = defaultNow();
        this.startAnimationIfNecessary();
      }
    }
  },

  mounted () {
    this.prevTime = defaultNow();
    this.startAnimationIfNecessary();
  },

  beforeDestroy () {
    this.unmounting = true;
    if (this.animationID != null) {
      defaultRaf.cancel(this.animationID);
      this.animationID = null;
    }
  },
  // render: function (h) {
  //   return h('div', [this.$scopedSlots.default({
  //     text: 'sad'
  //   })])
  // },
  methods: {
    clearUnreadPropStyle (destStyle) {
      let dirty = false;
      let {
        currentStyle,
        currentVelocity,
        lastIdealStyle,
        lastIdealVelocity,
      } = this;

      for (let key in destStyle) {
        if (!Object.prototype.hasOwnProperty.call(destStyle, key)) {
          continue;
        }

        const styleValue = destStyle[key];
        if (typeof styleValue === 'number') {
          if (!dirty) {
            dirty = true;
            currentStyle = { ...currentStyle };
            currentVelocity = { ...currentVelocity };
            lastIdealStyle = { ...lastIdealStyle };
            lastIdealVelocity = { ...lastIdealVelocity };
          }

          currentStyle[key] = styleValue;
          currentVelocity[key] = 0;
          lastIdealStyle[key] = styleValue;
          lastIdealVelocity[key] = 0;
        }
      }

      if (dirty) {
        this.currentStyle = currentStyle
        this.currentVelocity = currentVelocity
        this.lastIdealStyle = lastIdealStyle
        this.lastIdealVelocity = lastIdealVelocity
      }
    },

    startAnimationIfNecessary () {
      // /* eslint-disable */
      // debugger
      if (this.unmounting || this.animationID != null) {
        return;
      }
      // TODO: when config is {a: 10} and dest is {a: 10} do we raf once and
      // call cb? No, otherwise accidental parent rerender causes cb trigger
      this.animationID = defaultRaf(timestamp => {
        // https://github.com/chenglou/react-motion/pull/420
        // > if execution passes the conditional if (this.unmounting), then
        // executes async defaultRaf and after that component unmounts and after
        // that the callback of defaultRaf is called, then setState will be called
        // on unmounted component.
        if (this.unmounting) {
          return;
        }

        // check if we need to animate in the first place
        const propsStyle = this.nowStyle
        if (
          shouldStopAnimation(
            this.currentStyle,
            propsStyle,
            this.currentVelocity,
          )
        ) {
          // if (this.wasAnimating && this.props.onRest) {
          //   this.props.onRest();
          // }

          // no need to cancel animationID here; shouldn't have any in flight
          this.animationID = null;
          this.wasAnimating = false;
          this.accumulatedTime = 0;
          return;
        }

        this.wasAnimating = true;

        const currentTime = timestamp || defaultNow();
        const timeDelta = currentTime - this.prevTime;
        this.prevTime = currentTime;
        this.accumulatedTime = this.accumulatedTime + timeDelta;
        // more than 10 frames? prolly switched browser tab. Restart
        if (this.accumulatedTime > msPerFrame * 10) {
          this.accumulatedTime = 0;
        }

        if (this.accumulatedTime === 0) {
          // no need to cancel animationID here; shouldn't have any in flight
          this.animationID = null;
          this.startAnimationIfNecessary();
          return;
        }

        let currentFrameCompletion =
          (this.accumulatedTime -
            Math.floor(this.accumulatedTime / msPerFrame) * msPerFrame) /
          msPerFrame;
        const framesToCatchUp = Math.floor(this.accumulatedTime / msPerFrame);

        let newLastIdealStyle = {};
        let newLastIdealVelocity = {};
        let newCurrentStyle = {};
        let newCurrentVelocity = {};
        for (let key in propsStyle) {
          if (!Object.prototype.hasOwnProperty.call(propsStyle, key)) {
            continue;
          }

          const styleValue = propsStyle[key];
          if (typeof styleValue === 'number') {
            newCurrentStyle[key] = styleValue;
            newCurrentVelocity[key] = 0;
            newLastIdealStyle[key] = styleValue;
            newLastIdealVelocity[key] = 0;
          } else {
            let newLastIdealStyleValue = this.lastIdealStyle[key];
            let newLastIdealVelocityValue = this.lastIdealVelocity[key];
            for (let i = 0; i < framesToCatchUp; i++) {
              [newLastIdealStyleValue, newLastIdealVelocityValue] = stepper(
                msPerFrame / 1000,
                newLastIdealStyleValue,
                newLastIdealVelocityValue,
                styleValue.val,
                styleValue.stiffness,
                styleValue.damping,
                styleValue.precision,
              );
            }
            const [nextIdealX, nextIdealV] = stepper(
              msPerFrame / 1000,
              newLastIdealStyleValue,
              newLastIdealVelocityValue,
              styleValue.val,
              styleValue.stiffness,
              styleValue.damping,
              styleValue.precision,
            );
            console.log(nextIdealX, nextIdealV)

            newCurrentStyle[key] =
              newLastIdealStyleValue +
              (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
            newCurrentVelocity[key] =
              newLastIdealVelocityValue +
              (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
            newLastIdealStyle[key] = newLastIdealStyleValue;
            newLastIdealVelocity[key] = newLastIdealVelocityValue;
          }
        }

        this.animationID = null;
        // the amount we're looped over above
        this.accumulatedTime -= framesToCatchUp * msPerFrame;

        this.currentStyle = newCurrentStyle
        this.currentVelocity = newCurrentVelocity
        this.lastIdealStyle = newLastIdealStyle
        this.lastIdealVelocity = newLastIdealVelocity
        this.unreadPropStyle = null;
        this.startAnimationIfNecessary()
      })
    }
  },
}
</script>

