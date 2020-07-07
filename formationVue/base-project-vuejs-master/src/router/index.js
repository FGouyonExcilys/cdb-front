import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: function () {
      return import('../views/About.vue')
    }
  },
  {
    path: '/computers',
    name: 'ComputerList',
    component: function () {
      return import('../views/ComputerList.vue')
    }
  },
  {
    path: '/addComputer',
    name: 'AddComputer',
    component: function () {
      return import('../views/AddComputer.vue')
    }
  },
  {
    path: '/editComputer',
    name: 'EditComputer',
    component: function () {
      return import('../views/EditComputer.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
