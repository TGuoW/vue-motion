import Motion from './Motion/Motion'
import StaggeredMotion from './StaggeredMotion/StaggeredMotion'
import TransitionMotion from './TransitionMotion/TransitionMotion'
import spring from './spring'
import presets from './presets'

const components = [
  Motion,
  StaggeredMotion,
  TransitionMotion
]

const install = function (Vue) {
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

export {
  install,
  spring,
  presets,
  Motion,
  StaggeredMotion,
  TransitionMotion
}
