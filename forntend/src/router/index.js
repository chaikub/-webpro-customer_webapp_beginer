import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/:no/login',
    name: 'login',
    component: () => import('../views/customer/Login.vue')
  },
  {
    path: '/:no/home/:id',
    name: 'menu',
    component: () => import('../views/customer/Home.vue')
  },
  {
    path: '/:no/history/:id',
    name: 'menu',
    component: () => import('../views/customer/History.vue')
  },
  {
    path: '/:no/checkbill/:id',
    name: 'menu',
    component: () => import('../views/customer/Checkbill.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
