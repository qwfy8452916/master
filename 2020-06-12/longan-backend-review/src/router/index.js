import Vue from 'vue'
import Router from 'vue-router'
import ProcessList from '../pages/ProcessList'
import ProcessDetails from '../pages/ProcessDetails'
import PendingClaimList from '../pages/PendingClaimList'
import PendingClaimDetails from '../pages/PendingClaimDetails'
import PendingReviewList from '../pages/PendingReviewList'
import PendingReviewDetails from '../pages/PendingReviewDetails'
import ReviewList from '../pages/ReviewList'
import ReviewDetails from '../pages/ReviewDetails'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ProcessList',
      name: 'ProcessList',
      component: ProcessList
    },
    {
      path: '/ProcessDetails',
      name: 'ProcessDetails',
      component: ProcessDetails
    },
    {
      path: '/PendingClaimList',
      name: 'PendingClaimList',
      component: PendingClaimList
    },
    {
      path: '/PendingClaimDetails',
      name: 'PendingClaimDetails',
      component: PendingClaimDetails
    },
    {
      path: '/PendingReviewList',
      name: 'PendingReviewList',
      component: PendingReviewList
    },
    {
      path: '/PendingReviewDetails',
      name: 'PendingReviewDetails',
      component: PendingReviewDetails
    },
    {
      path: '/ReviewList',
      name: 'ReviewList',
      component: ReviewList
    },
    {
      path: '/ReviewDetails',
      name: 'ReviewDetails',
      component: ReviewDetails
    },
  ]
})
