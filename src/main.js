import Vue from 'vue'
import App from './App.vue'
import Motion from '../package/Motion/index'
import router from './router'

Vue.config.productionTip = false

Vue.use(Motion)
// Vue.component('Motion', Motion)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
