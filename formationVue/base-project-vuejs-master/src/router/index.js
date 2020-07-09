import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

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
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
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
    path: '/companies',
    name: 'CompanyList',
    component: function () {
      return import('../views/CompanyList.vue')
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

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = sessionStorage.getItem('token');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
