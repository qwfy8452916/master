import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import BranchRouter from './branch'
import GroupRouter from './group'
import BasicRouter from './basic'
import user from '@/pages/index'
import department from '@/pages/user/department'
import departmentAdd from '@/pages/user/departmentAdd'
import departmentModify from '@/pages/user/departmentModify'
import changePwd from '@/pages/user/changePwd'

import userManager from '@/pages/user/userManager'
import userManagerAdd from '@/pages/user/userManagerAdd'
import userManagerModify from '@/pages/user/userManagerModify'

import userRole from '@/pages/user/userRole'
import userRoleAdd from '@/pages/user/userRoleAdd'
import userRoleModify from '@/pages/user/userRoleModify'
Vue.use(Router)

const router =  new Router({
    routes: [
        {
            path: '/',
            redirect:'/login'
        },
    
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {    
            path:'/user',
            name:'user',
            component:user,
            children:[
                {
                    path:'department',
                    name:'department',
                    component:department
                },
                {
                    path:'departmentAdd',
                    name:'departmentAdd',
                    component:departmentAdd,
                    
                },
                {
                    path: 'departmentModify/:id',
                    name: 'departmentModify',
                    component: departmentModify
                },
                {
                    path: 'changePwd',
                    name: 'changePwd',
                    component: changePwd
                },
                {
                    path:'userManager',
                    name:'userManager',
                    component:userManager,
                    
                },
                {
                    path: 'userManagerAdd',
                    name: 'userManagerAdd',
                    component: userManagerAdd
                },{
                    path: 'userManagerModify',
                    name: 'userManagerModify',
                    component: userManagerModify
                },
                {
                    path:'userRole',
                    name:'userRole',
                    component:userRole,
                    
                },
                {
                    path: 'userRoleAdd',
                    name: 'userRoleAdd',
                    component: userRoleAdd,
                },
                {
                    path: 'userRoleModify',
                    name: 'userRoleModify',
                    component: userRoleModify,
                },
            ]
        },   
        ...BranchRouter,
        ...GroupRouter,
        ...BasicRouter,
    ]
})

export default router
