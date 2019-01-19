import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/components/index/index')
    },
    {
      path: '/luckday',
      name: 'luckyDay',
      component: () => import('@/components/luckyDay/luckyDay')
    },
    {
      path: '/disclaimer',
      name: 'disclaimer',
      component: () => import('@/components/disclaimer/disclaimer')
    },
    {
      path: '/share',
      name: 'share',
      component: () => import('@/components/share/share')
    },
    {
      path: '/experience',
      name: 'experience',
      component: () => import('@/components/experience/experience')
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('@/components/feedback/feedback')
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: () => import('@/components/agreement/agreement')
    }
  ]
})
export default router
