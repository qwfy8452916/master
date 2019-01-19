import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/manager',
    component: Layout,
    redirect: '/manager/ad',
    name: 'manager',
    meta: { title: '运营管理' },
    children: [
      {
        path: 'ad',
        name: '广告位管理',
        component: () => import('@/views/manager/ad'),
        meta: { title: '广告位管理' }
      },
      {
        path: 'createAd',
        component: () => import('@/views/manager/components/createAd'),
        name: '创建广告',
        hidden: true,
        meta: { title: '创建广告' }
      },
      {
        path: 'createAd/:id',
        component: () => import('@/views/manager/components/createAd'),
        name: '编辑广告',
        hidden: true,
        meta: { title: '编辑广告', noCache: true }
      },
      {
        path: 'cover',
        name: '封面管理',
        component: () => import('@/views/manager/cover'),
        meta: { title: '封面管理' }
      },
      {
        path: 'createCover',
        component: () => import('@/views/manager/components/createCover'),
        name: '创建封面',
        hidden: true,
        meta: { title: '创建封面' }
      },
      {
        path: 'createCover/:id',
        component: () => import('@/views/manager/components/createCover'),
        name: '编辑封面',
        hidden: true,
        meta: { title: '编辑封面', noCache: true }
      }
    ]
  },

  {
    path: '/content',
    component: Layout,
    redirect: '/content/article/article',
    name: 'content',
    meta: { title: '内容管理' },
    children: [
      {
        path: 'article/article',
        name: '文章管理',
        component: () => import('@/views/content/article/article'),
        meta: { title: '文章管理' }
      },
      {
        path: 'article/backstage',
        name: '后台发布',
        hidden: true,
        component: () => import('@/views/content/article/backStage'),
        meta: { title: '后台发布' }
      },
      {
        path: 'article/garbage',
        name: '文章垃圾箱',
        hidden: true,
        component: () => import('@/views/content/article/garbage'),
        meta: { title: '文章垃圾箱' }
      },
      {
        path: 'article/create',
        name: '新建文章',
        hidden: true,
        component: () => import('@/views/content/article/create'),
        meta: { title: '新建文章' }
      },
      {
        path: 'article/create/:id',
        name: '',
        hidden: true,
        component: () => import('@/views/content/article/create'),
        meta: { title: '' }
      },
      {
        path: 'article/tag',
        name: '文章标签管理',
        hidden: true,
        component: () => import('@/views/content/article/tag'),
        meta: { title: '文章标签管理' }
      },
      {
        path: 'article/top',
        name: '文章置顶',
        hidden: true,
        component: () => import('@/views/content/article/top'),
        meta: { title: '文章置顶' }
      },
      {
        path: 'article/usersub',
        name: '文章用户投稿',
        hidden: true,
        component: () => import('@/views/content/article/userSub'),
        meta: { title: '文章用户投稿' }
      },

      // 文章管理路由结束

      {
        path: 'experience',
        name: '经验管理',
        component: () => import('@/views/content/experience/experience'),
        meta: { title: '经验管理' }
      },
      {
        path: 'experience/garbage',
        name: '经验管理垃圾箱',
        hidden: true,
        component: () => import('@/views/content/experience/garbage'),
        meta: { title: '经验管理垃圾箱' }
      },
      {
        path: 'experience/edit',
        name: '发布/编辑经验',
        hidden: true,
        component: () => import('@/views/content/experience/edit'),
        meta: { title: '发布/编辑经验' }
      },
      {
        path: 'experience/edit/:id',
        name: '',
        hidden: true,
        component: () => import('@/views/content/experience/edit'),
        meta: { title: '' }
      },
      {
        path: 'experience/cate',
        name: '经验分类管理',
        hidden: true,
        component: () => import('@/views/content/experience/cate'),
        meta: { title: '经验分类管理' }
      },
      // 经验管理结束

      // 话题管理
      {
        path: 'topic',
        name: 'topic',
        component: () => import('@/views/content/topic/topic'),
        meta: { title: '话题管理' },
      },
      {
        path: 'topic/grabage',
        name: 'topicGrabage',
        hidden:true,
        component: () => import('@/views/content/topic/garbage'),
        meta: { title: '垃圾箱' }
      },
      {
        path: 'topic/top',
        name: 'toppicTop',
        hidden:true,
        component: () => import('@/views/content/topic/top'),
        meta: { title: '置顶' }
      },
      {
        path: 'topic/editTopic',
        hidden:true,
        name: 'newTopic',
        component: () => import('@/views/content/topic/editTopic'),
        meta: { title: '新建话题' }
      },
      {
        path: 'topic/editTopic/:id',
        hidden:true,
        name: 'editTopic',
        component: () => import('@/views/content/topic/editTopic'),
        meta: { title: '编辑话题' }
      },


      // {
      //   path: 'contrast',
      //   name: '对比管理',
      //   component: () => import('@/views/content/contrast/index'),
      //   meta: { title: '对比管理' }
      // },

      // {
      //   path: 'createContrast',
      //   component: () => import('@/views/content/contrast/edit'),
      //   name: 'createContrast',
      //   hidden: true,
      //   meta: { title: '新建对比' }
      // },

      // {
      //   path: 'createContrast/:id',
      //   component: () => import('@/views/content/contrast/edit'),
      //   name: 'createContrastEdit',
      //   hidden: true,
      //   meta: { title: '新建对比', noCache: true }
      // },

      // 对比管理路由结束

      {
        path: 'material-bill',
        name: '材料品牌榜单管理',
        component: () => import('@/views/content/materialBill/materialBill'),
        meta: { title: '材料品牌榜单管理' }
      },
      {
        path: 'creatematerialBill',
        component: () => import('@/views/content/materialBill/materialBillNew'),
        name: 'creatematerialBill',
        hidden: true,
        meta: { title: '新建榜单' }
      },
      {
        path: 'creatematerialBill/:id',
        component: () => import('@/views/content/materialBill/materialBillNew'),
        name: 'creatematerialBillEdit',
        hidden: true,
        meta: { title: '新建榜单', noCache: true }
      },

      {
        path: 'brandClassify',
        component: () => import('@/views/content/materialBill/materialBrandClassify'),
        name: 'brandClassify',
        hidden: true,
        meta: { title: '分类管理' }
      },

      // 材料品牌榜单管理路由结束

      {
        path: 'material-classify',
        name: '材料分类榜单管理',
        component: () => import('@/views/content/materialClassify/materialClassify'),
        meta: { title: '材料分类榜单管理' }
      },
      {
        path: 'creatematerialClassify',
        component: () => import('@/views/content/materialClassify/classifyNew'),
        name: 'creatematerialClassify',
        hidden: true,
        meta: { title: '新建榜单' }
      },

      {
        path: 'creatematerialClassify/:id',
        component: () => import('@/views/content/materialClassify/classifyNew'),
        name: 'creatematerialClassifyEdit',
        hidden: true,
        meta: { title: '新建榜单', noCache: true }
      },

      {
        path: 'Classify',
        component: () => import('@/views/content/materialClassify/classify'),
        name: 'Classify',
        hidden: true,
        meta: { title: '分类管理' }
      },

      // 材料分类榜单管理路由结束

      {
        path: 'budget-classify',
        name: '预算类目管理',
        component: () => import('@/views/content/budget/budgetClassify'),
        meta: { title: '预算类目管理' }
      },
      {
        path: 'create-budget-version',
        name: '创建预算版本管理',
        hidden: true,
        component: () => import('@/views/content/budget/components/createVersion'),
        meta: { title: '创建预算版本管理' }
      },
      {
        path: 'create-budget-version/:id',
        name: '编辑预算版本管理',
        hidden: true,
        component: () => import('@/views/content/budget/components/createVersion'),
        meta: { title: '编辑预算版本管理' }
      },
      {
        path: 'budget-version',
        name: '预算版本管理',
        component: () => import('@/views/content/budget/budgetVersion'),
        meta: { title: '预算版本管理' }
      },
      // {
      //   path: 'tag',
      //   name: '标签管理',
      //   component: () => import('@/views/content/tag'),
      //   meta: { title: '标签管理' }
      // }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'user',
    meta: { title: '用户管理' },
    children: [
      {
        path: 'list',
        name: '用户管理',
        component: () => import('@/views/user/list'),
        meta: { title: '用户管理' }
      },
      {
        path: 'feedback',
        name: '用户反馈',
        component: () => import('@/views/user/feedback'),
        meta: { title: '用户反馈' }
      },
      {
        path: 'account',
        component: () => import('@/views/user/components/account'),
        name: '新建账号',
        hidden: true,
        meta: { title: '新建账号' }
      },
      {
        path: 'account-edit/:id',
        component: () => import('@/views/user/components/accountEdit'),
        name: '编辑账号',
        hidden: true,
        meta: { title: '编辑账号' }
      }
    ]
  },

/*  {
    path: '/examine',
    component: Layout,
    redirect: '/examine/index',
    name: 'examine',
    meta: { title: '审核管理' },
    children: [
      {
        path: 'article',
        component: () => import('@/views/examine/article'),
        meta: { title: '文章审核' }
      },
      {
        path: 'article',
        name: 'Article',
        hidden: true,
        component: () => import('@/views/examine/article'),
        meta: { title: '审核列表' }
      },
      {
        path: 'examinePass',
        name: 'ExaminePass',
        hidden: true,
        component: () => import('@/views/examine/examinePass'),
        meta: { title: '审核通过' }
      },
      {
        path: 'examineNo',
        name: 'ExamineNo',
        hidden: true,
        component: () => import('@/views/examine/examineNo'),
        meta: { title: '审核未通过' }
      },
      {
        path: 'checkArticle',
        name: 'CheckArticle',
        component: () => import('@/views/examine/checkArticle'),
        hidden: true,
        meta: { title: '查看文章' }
      }
    ]
  },*/

  // 升级管理
  {
    path: '/upgrade',
    component: Layout,
    redirect: '/upgrade/index',
    name: 'upgrade',
    meta: { title: '升级管理' },
    children: [
      {
        path: 'index',
        name: 'Update',
        component: () => import('@/views/upgrade/index'),
        meta: { title: '升级管理' }
      },
      {
        path: 'rubbish',
        name: 'Rubbish',
        hidden: true,
        component: () => import('@/views/upgrade/rubbish'),
        meta: { title: '垃圾箱' }
      },
      {
        path: 'editVer',
        name: 'CreaterVer',
        hidden: true,
        component: () => import('@/views/upgrade/editVer'),
        meta: { title: '新建版本' }
      },
      {
        path: 'editVer/:id',
        name: 'EditVer',
        hidden: true,
        component: () => import('@/views/upgrade/editVer'),
        meta: { title: '编辑版本' }
      }
    ]
  },

 /* {
    path: '/system',
    component: Layout,
    redirect: '/system/index',
    name: 'system',
    meta: { title: '系统设置' },
    children: []
  },*/

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
