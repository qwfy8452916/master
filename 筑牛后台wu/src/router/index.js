import Vue from 'vue';
import Router from 'vue-router';
//首页
const Home = (resolve) => { import('../pages/Home').then((module) => { resolve(module) }) }
// 登录注册
const Login = (resolve) => { import('../pages/Login').then((module) => { resolve(module) }) }
// 404页面
const NotFound = (resolve) => { import('../pages/404').then((module) => { resolve(module) }) }

let baseRoute = [
  { path: '/login', component: Login, name: '登录', hidden: true },
  { path: '/404', component: NotFound, name: '404', hidden: true },
  { path: '/home', component: Home, name: '首页', hidden: true }
];

Vue.use(Router);

let router = new Router({
  routes: baseRoute
});

router.beforeEach((to, from, next) => {
  let routeName = to.meta.name || to.name;
  window.document.title = routeName;
  next();
});

export default router;