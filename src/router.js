import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'demo0',
          name: 'demo0',
          component: () => import(/* webpackChunkName: "demo0" */ './components/demo0-simple-transition.vue')
        },
        {
          path: 'demo1',
          name: 'demo1',
          component: () => import(/* webpackChunkName: "demo1" */ './components/demo1-chat-heads.vue')
        },
        {
          path: 'demo2',
          name: 'demo2',
          component: () => import(/* webpackChunkName: "demo2" */ './components/demo2-draggable-balls.vue')
        },
        {
          path: 'demo3',
          name: 'demo3',
          component: () => import(/* webpackChunkName: "demo3" */ './components/demo3-todomvc-list-transition.vue')
        },
        {
          path: 'demo4',
          name: 'demo4',
          component: () => import(/* webpackChunkName: "demo4" */ './components/demo4-photo-gallery.vue')
        },
        {
          path: 'demo7',
          name: 'demo7',
          component: () => import(/* webpackChunkName: "demo7" */ './components/demo7-water-ripples.vue')
        },
        {
          path: 'demo8',
          name: 'demo8',
          component: () => import(/* webpackChunkName: "demo8" */ './components/demo8-draggable-list.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
