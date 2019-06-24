import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import HomePage from '@/components/HomePage'
import yinyong from '@/components/yinyong'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/yinyong',
      name: 'yinyong',
      component: yinyong
    }
  ]
})
