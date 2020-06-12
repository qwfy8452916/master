// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookies from 'vue-cookies'
import api from '@/request/api'
import control from '@/request/jurisdiction'
import './assets/icon/iconfont.css'
import store from './vuex/store'

Vue.use(ElementUI)
Vue.use(VueCookies)

Vue.prototype.$api = api;
Vue.prototype.$control = control;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
