import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import router from './router'
import 'font-awesome/css/font-awesome.min.css'
import './assets/common.css'
import * as util from './assets/util.js'
import api from '@/api/api'
import common from '../common/common'

Vue.use(ElementUI, { size: 'mini' })
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(common)
//api封装
Vue.prototype.$api = api

//NProgress.configure({ showSpinner: false });

// const router = new VueRouter({
//   routes
// })

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    util.delCookie('token')
  }
  let token = util.getCookie('token')
  if (!token && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')
