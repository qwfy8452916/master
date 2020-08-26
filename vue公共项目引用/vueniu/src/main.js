// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from '@/request/api'
import control from '@/request/jurisdiction'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './vuex/store'


Vue.config.productionTip = false

Vue.prototype.$api = api;
Vue.prototype.$control = control;
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
