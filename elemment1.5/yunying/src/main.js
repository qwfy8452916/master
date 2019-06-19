// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import api from '@/request/api'
// import VueAMap from 'vue-amap'
import Blob from './vendor/Blob.js'
import Export2Excel from './vendor/Export2Excel.js'
import './assets/icon/iconfont.css'

Vue.use(ElementUI)
Vue.use(VueCookies)
// Vue.use(VueAMap)
// //初始化vue-amap
// VueAMap.initAMapApiLoader({
//   //高德key
//   key: '0c9e455882ab8ad425b97f3ae709865b',
//   //插件集合
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   //高德sdk版本，默认 1.4.4
//   v: '1.4.4'
// });

Vue.prototype.$api = api;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
