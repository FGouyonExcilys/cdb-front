import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';



Vue.prototype.$http = axios
Vue.config.productionTip = false

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
