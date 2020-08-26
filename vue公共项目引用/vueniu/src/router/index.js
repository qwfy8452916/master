import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '@/pages/login'
import HomePage from '@/pages/HomePage'
// import HomePage from '@/components/HomePage'
import yinyong from '@/components/yinyong'
import fatherZujian from '@/components/fatherZujian'
import sonZujian from '@/components/sonZujian'
import HotelCardticketList from '@/components/HotelCardticketList'
import index from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },

    {
      path:'/login',
      name:login,
      component:login
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage,
      children: [{
        path: '/index',
        name: 'index',
        component: index
      },

     {
      path: '/HotelCardticketList',
      name: 'HotelCardticketList',
      component: HotelCardticketList
    },
    {
      path: '/yinyong',
      name: 'yinyong',
      component: yinyong
    },
    {
      path: '/fatherZujian',
      name: 'fatherZujian',
      component: fatherZujian
    },
    {
      path:'/sonZujian',
      name:'sonZujian',
      component:sonZujian
    },
    // {
    //   path: '/HomePage',
    //   name: 'HomePage',
    //   component: HomePage
    // },
     // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }


   ]
    },
  ]
})
