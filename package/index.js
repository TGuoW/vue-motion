import Motion from './Motion/Motion'

const components = [
  Motion
];

const install = function(Vue) {
  if (install.installed) return;
  components.map(component => Vue.component(component.name, component));
};

export default {
  install,
  Motion
}
