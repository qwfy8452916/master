import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import HomePage from '@/pages/HomePage'
import index from '@/components/index'
import HotelPrivilegeUserList from '@/components/HotelPrivilegeUserList'
import HotelPrivilegeUserAdd from '@/components/HotelPrivilegeUserAdd'
import HotelPrivilegeUserModify from '@/components/HotelPrivilegeUserModify'
import HotelPrivilegeRoleList from '@/components/HotelPrivilegeRoleList'
import HotelPrivilegeRoleAdd from '@/components/HotelPrivilegeRoleAdd'
import HotelPrivilegeRoleModify from '@/components/HotelPrivilegeRoleModify'
import HotelInventoryList from '@/components/HotelInventoryList'
import HotelInventoryWarehousing from '@/components/HotelInventoryWarehousing'
import HotelInventorySales from '@/components/HotelInventorySales'
import HotelGodownEntryList from '@/components/HotelGodownEntryList'
import HotelGodownEntryAdd from '@/components/HotelGodownEntryAdd'
import HotelGodownEntryDetail from '@/components/HotelGodownEntryDetail'
import HotelGodownEntryModify from '@/components/HotelGodownEntryModify'
import HotelReplenishList from '@/components/HotelReplenishList'
import HotelInformationModify from '@/components/HotelInformationModify'
import HotelServiceList from '@/components/HotelServiceList'
import HotelServiceAdd from '@/components/HotelServiceAdd'
import HotelServiceDetail from '@/components/HotelServiceDetail'

import HotelRevenueStatistics from '@/components/HotelRevenueStatistics'
import HotelRevenueDetail from '@/components/HotelRevenueDetail'
import HotelFaultManagement from '@/components/HotelFaultManagement'
import HotelPurchaseOrderlist from '@/components/HotelPurchaseOrderlist'
import HotelSeepurchaseOrder from '@/components/HotelSeepurchaseOrder'
import HotelPurchaseOrderedit from '@/components/HotelPurchaseOrderedit'
import HotelDivideInto from '@/components/HotelDivideInto'
import HotelWithdrawalsRecord from '@/components/HotelWithdrawalsRecord'
import HotelWithdrawalsRecordDetail from '@/components/HotelWithdrawalsRecordDetail'
import HotelReplenishmentFeeList from '@/components/HotelReplenishmentFeeList'
import HotelReplenishmentFeeRecordList from '@/components/HotelReplenishmentFeeRecordList'
import checkhotelrecord from '@/components/checkhotelrecord'
import hotelrecorddetail from '@/components/hotelrecorddetail'
import Cabinetgl from '@/components/Cabinetgl'
import Cabinetchange from '@/components/Cabinetchange'
import Cabinetlook from '@/components/Cabinetlook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login/:orgId',
      name: 'login',
      component: login
    },{
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage,
      children: [{
          path: '/index',
          name: 'index',
          component: index
        },{
          path: '/HotelPrivilegeUserList',
          name: 'HotelPrivilegeUserList',
          component: HotelPrivilegeUserList
        },{
          path: '/HotelPrivilegeUserAdd',
          name: 'HotelPrivilegeUserAdd',
          component: HotelPrivilegeUserAdd
        },{
          path: '/HotelPrivilegeUserModify',
          name: 'HotelPrivilegeUserModify',
          component: HotelPrivilegeUserModify
        },{
          path: '/HotelPrivilegeRoleList',
          name: 'HotelPrivilegeRoleList',
          component: HotelPrivilegeRoleList
        },{
          path: '/HotelPrivilegeRoleAdd',
          name: 'HotelPrivilegeRoleAdd',
          component: HotelPrivilegeRoleAdd
        },{
          path: '/HotelPrivilegeRoleModify',
          name: 'HotelPrivilegeRoleModify',
          component: HotelPrivilegeRoleModify
        },{
          path: '/HotelInventoryList',
          name: 'HotelInventoryList',
          component: HotelInventoryList
        },{
          path: '/HotelInventoryWarehousing',
          name: 'HotelInventoryWarehousing',
          component: HotelInventoryWarehousing
        },{
          path: '/HotelInventorySales',
          name: 'HotelInventorySales',
          component: HotelInventorySales
        },{
          path: '/HotelGodownEntryList',
          name: 'HotelGodownEntryList',
          component: HotelGodownEntryList
        },{
          path: '/HotelGodownEntryAdd',
          name: 'HotelGodownEntryAdd',
          component: HotelGodownEntryAdd
        },{
          path: '/HotelGodownEntryDetail',
          name: 'HotelGodownEntryDetail',
          component: HotelGodownEntryDetail
        },{
          path: '/HotelGodownEntryModify',
          name: 'HotelGodownEntryModify',
          component: HotelGodownEntryModify
        },{
          path: '/HotelReplenishList',
          name: 'HotelReplenishList',
          component: HotelReplenishList
        },{
          path: '/HotelInformationModify',
          name: 'HotelInformationModify',
          component: HotelInformationModify
        },{
          path: '/HotelServiceList',
          name: 'HotelServiceList',
          component: HotelServiceList
        },{
          path: '/HotelServiceAdd',
          name: 'HotelServiceAdd',
          component: HotelServiceAdd
        },{
          path: '/HotelServiceDetail',
          name: 'HotelServiceDetail',
          component: HotelServiceDetail
        },
        
        {
          path: '/HotelRevenueStatistics',
          name: 'HotelRevenueStatistics',
          component: HotelRevenueStatistics
        },{
          path: '/HotelRevenueDetail',
          name: 'HotelRevenueDetail',
          component: HotelRevenueDetail
        },{
          path: '/HotelFaultManagement',
          name: 'HotelFaultManagement',
          component: HotelFaultManagement
        },{
          path: '/HotelPurchaseOrderlist',
          name: 'HotelPurchaseOrderlist',
          component: HotelPurchaseOrderlist
          },{
          path: '/HotelSeepurchaseOrder',
          name: 'HotelSeepurchaseOrder',
          component: HotelSeepurchaseOrder
        },{
          path: '/HotelPurchaseOrderedit',
          name: 'HotelPurchaseOrderedit',
          component: HotelPurchaseOrderedit
        },{
          path: '/HotelDivideInto',
          name: 'HotelDivideInto',
          component: HotelDivideInto
        },{
          path: '/HotelWithdrawalsRecord',
          name: 'HotelWithdrawalsRecord',
          component: HotelWithdrawalsRecord
        },{
          path: '/HotelWithdrawalsRecordDetail',
          name: 'HotelWithdrawalsRecordDetail',
          component: HotelWithdrawalsRecordDetail
        },{
          path: '/HotelReplenishmentFeeList',
          name: 'HotelReplenishmentFeeList',
          component: HotelReplenishmentFeeList
        },{
          path: '/HotelReplenishmentFeeRecordList',
          name: 'HotelReplenishmentFeeRecordList',
          component: HotelReplenishmentFeeRecordList
        },{
          path: '/checkhotelrecord',
          name: 'checkhotelrecord',
          component: checkhotelrecord
          },{
          path: '/hotelrecorddetail',
          name: 'hotelrecorddetail',
          component: hotelrecorddetail,
          },{
          path: '/Cabinetgl',
          name: 'Cabinetgl',
          component: Cabinetgl,
          },{
          path: '/Cabinetchange',
          name: 'Cabinetchange',
          component: Cabinetchange,
        },{
          path: '/Cabinetlook',
          name: 'Cabinetlook',
          component: Cabinetlook,
        }
      ]
    }
  ]
})
