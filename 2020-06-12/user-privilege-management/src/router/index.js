import Vue from 'vue'
import Router from 'vue-router'
import PrivilegeUserList from '../pages/PrivilegeUserList'
import PrivilegeUserAdd from '../pages/PrivilegeUserAdd'
import PrivilegeUserModify from '../pages/PrivilegeUserModify'
import PrivilegeRoleList from '../pages/PrivilegeRoleList'
import PrivilegeRoleAdd from '../pages/PrivilegeRoleAdd'
import PrivilegeRoleModify from '../pages/PrivilegeRoleModify'
import PrivilegeUpdateUserInfo from '../pages/PrivilegeUpdateUserInfo'
import PrivilegeUpdatePWD from '../pages/PrivilegeUpdatePWD'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PrivilegeUserList',
      component: PrivilegeUserList,
    },{
      path: '/PrivilegeUserAdd',
      name: 'PrivilegeUserAdd',
      component: PrivilegeUserAdd,
    },{
      path: '/PrivilegeUserModify',
      name: 'PrivilegeUserModify',
      component: PrivilegeUserModify,
    },{
      path: '/PrivilegeRoleList',
      name: 'PrivilegeRoleList',
      component: PrivilegeRoleList,
    },{
      path: '/PrivilegeRoleAdd',
      name: 'PrivilegeRoleAdd',
      component: PrivilegeRoleAdd,
    },{
      path: '/PrivilegeRoleModify',
      name: 'PrivilegeRoleModify',
      component: PrivilegeRoleModify,
    },{
      path: '/PrivilegeUpdateUserInfo',
      name: 'PrivilegeUpdateUserInfo',
      component: PrivilegeUpdateUserInfo
    },{
      path: '/PrivilegeUpdatePWD',
      name: 'PrivilegeUpdatePWD',
      component: PrivilegeUpdatePWD
    }]
})
