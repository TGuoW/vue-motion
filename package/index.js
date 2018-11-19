import Motion from './Motion/Motion'
import TransitionMotion from './TransitionMotion/TransitionMotion'
import spring from './spring'

const components = [
  Motion,
  TransitionMotion
];

const install = function(Vue) {
  if (install.installed) return;
  components.map(component => Vue.component(component.name, component));
};

export {
  install,
  spring,
  Motion,
  TransitionMotion
}
