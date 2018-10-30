import Vue from 'vue'
import App from './App.vue'
import Motion from '../package/Motion/index'

Vue.config.productionTip = false

console.log(Motion)
Vue.use(Motion)

new Vue({
  render: h => h(App)
}).$mount('#app')
