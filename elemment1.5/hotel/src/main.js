// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from '@/request/api'
import VueCookies from 'vue-cookies'
import Blob from './vendor/Blob.js'
import Export2Excel from './vendor/Export2Excel.js'
import './assets/icon/iconfont.css'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueCookies);

Vue.prototype.$api = api;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
