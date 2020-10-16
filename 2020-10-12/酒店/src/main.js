// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from '@/request/api'
import control from '@/request/jurisdiction'
import VueCookies from 'vue-cookies'
import Blob from './vendor/Blob.js'
import Export2Excel from './vendor/Export2Excel.js'
import './assets/icon/iconfont.css'
import store from './vuex/store'
import axios from 'axios'
import vuescroll from 'vuescroll';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueCookies);
Vue.use(vuescroll);

Vue.prototype.$vuescrollConfig = {
  vuescroll: {
    mode: 'native',//选择一个模式, native 或者 slide(pc&app)
    sizeStrategy: 'percent',//如果父容器不是固定高度，请设置为 number , 否则保持默认的percent即可
    detectResize: true//是否检测内容尺寸发生变化
  },
  scrollPanel: {
    initialScrollY: false,//只要组件mounted之后自动滚动的距离。 例如 100 or 10%
    initialScrollX: false,
    scrollingX: true,//是否启用 x 或者 y 方向上的滚动
    scrollingY: true,
    speed: 300,//多长时间内完成一次滚动。 数值越小滚动的速度越快
    easing: undefined,//滚动动画 参数通animation
    verticalNativeBarPos: 'right'//原生滚动条的位置
  },
  rail: {//轨道
    background: '#c3c3c3',//轨道的背景色
    opacity: .4,
    size: '6px',
    specifyBorderRadius: false,//是否指定轨道的 borderRadius， 如果不那么将会自动设置
    gutterOfEnds: null,
    gutterOfSide: '4px',//轨道距 x 和 y 轴两端的距离
    keepShow: false //是否即使 bar 不存在的情况下也保持显示
  },
  bar: {
    showDelay: 500,//在鼠标离开容器后多长时间隐藏滚动条
    onlyShowBarOnScroll: false,//当页面滚动时显示
    keepShow: true,//是否一直显示
    background: '#c3c3c3',
    opacity: 1,
    hoverStyle: false,
    specifyBorderRadius: false,
    minSize: false,
    size: '6px',
    disable: false,//是否禁用滚动条
  },// 在这里设置全局默认配置
  name: 'vuescroll' // 在这里自定义组件名字，默认是vueScroll
};

Vue.prototype.$api = api;
Vue.prototype.$control = control;
Vue.prototype.$axios = axios;

let openurl = "";
Vue.prototype.notify = new Notify({
  // message: "有消息了。", // 标题
  effect: "scroll", // flash | scroll 闪烁还是滚动
  openurl: openurl, // 点击弹窗打开连接地址
  dir: "ltr", //它的值可以是 auto（自动）, ltr（从左到右）, or rtl（从右到左）。
  // 可选播放声音
  // audio: {
  // 可以使用数组传多种格式的声音文件
  // file: ["msg.mp4", "msg.mp3", "msg.wav"],
  // 下面也是可以的哦
  // file: tipsVoice,
  // },
  // 标题闪烁，或者滚动速度
  interval: 1000,
  // 可选，默认绿底白字的  Favicon
  updateFavicon: {
    // favicon 字体颜色
    textColor: "#fff",
    // 背景颜色，设置背景颜色透明，将值设置为“transparent”
    backgroundColor: "#2F9A00",
  },
  // 可选chrome浏览器通知，默认不填写就是下面的内容
  notification: {
    title: "通知！", // 设置标题
    icon: "", // 设置图标 icon 默认为 Favicon
    body: "您来了一条新消息!", // 设置消息内容
  },
});

if (window.CefSharp !== undefined) {
  window.CefSharp.BindObjectAsync("longanJsObject");
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
