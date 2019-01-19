import Vue from 'vue'
import axios from 'axios'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import VueQuillEditor from 'vue-quill-editor'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n


import '@/styles/index.scss' // global css

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import App from './App'
import router from './router'
import store from './store'


import '@/icons' // icon
import '@/permission' // permission control
// import './mock' // simulation data
import seeImage from '@/components/seeImage'

Vue.use(ElementUI)

Vue.use(VueQuillEditor)  // 富文本编辑器

Vue.use(seeImage)

const upload = axios.create({
  baseURL: 'http://zxs.api.qizuang.com/admin',
  time: 5000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

Vue.prototype.$upload = upload

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
