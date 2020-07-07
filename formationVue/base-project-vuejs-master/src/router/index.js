import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

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
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    // lazy-loaded
    component: () => import('../views/BoardAdmin.vue')
  },
  {
    path: '/user',
    name: 'user',
    // lazy-loaded
    component: () => import('../views/BoardUser.vue')
  }
  
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next();
  } else {
    next();
  }
});

export default router
