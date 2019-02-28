import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        title: '装修说'
      },
      component: () => import('@/components/index/index')
    },
    {
      path: '/luckday',
      name: 'luckyDay',
      meta: {
        title: '开工吉日'
      },
      component: () => import('@/components/luckyDay/luckyDay')
    },
    {
      path: '/disclaimer',
      name: 'disclaimer',
      meta: {
        title: '免责申明'
      },
      component: () => import('@/components/disclaimer/disclaimer')
    },
    {
      path: '/share',
      name: 'share',
      meta: {
        title: '装修说'
      },
      component: () => import('@/components/share/share')
    },
    {
      path: '/experience',
      name: 'experience',
      meta: {
        title: '避坑指南'
      },
      component: () => import('@/components/experience/experience')
    },
    {
      path: '/feedback',
      name: 'feedback',
      meta: {
        title: '意见反馈'
      },
      component: () => import('@/components/feedback/feedback')
    },
    {
      path: '/agreement',
      name: 'agreement',
      meta: {
        title: '用户协议'
      },
      component: () => import('@/components/agreement/agreement')
    },
    {
      path: '/share-banner',
      name: 'shareBanner',
      meta: {
        title: '装修说'
      },
      component: () => import('@/components/shareBanner/shareBanner')
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
export default router
