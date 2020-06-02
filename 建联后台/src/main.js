// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//样式模板
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
//基础样式
import './assets/css/base.css'
//缓存存储
import VueCookies from 'vue-cookies'

//请求封装
import api from '@/request/api'
import auth from '@/request/authority'
import stepBar from '@/request/stepBar'
import settleStep from '@/request/settleStep'
//全局存储仓库
import store from './vuex/store'
//全局公共的方法
import common from '../common/common'
import echarts from 'echarts'
Vue.use(ElementUi)
Vue.use(VueCookies)
Vue.use(common)
//api封装
Vue.prototype.$api = api
Vue.prototype.$auth = auth
Vue.prototype.$stepBar = stepBar
Vue.prototype.$settleStep = settleStep
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
