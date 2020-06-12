import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import HomePage from '@/pages/HomePage'
import index from '@/components/index'
//公用文件
import MerchantPrivilegeUserList from '@/components/MerchantPrivilegeUserList'
import MerchantPrivilegeUserAdd from '@/components/MerchantPrivilegeUserAdd'
import MerchantPrivilegeUserModify from '@/components/MerchantPrivilegeUserModify'
import MerchantPrivilegeRoleList from '@/components/MerchantPrivilegeRoleList'
import MerchantPrivilegeRoleAdd from '@/components/MerchantPrivilegeRoleAdd'
import MerchantPrivilegeRoleModify from '@/components/MerchantPrivilegeRoleModify'
import MerchantPrivilegeUpdateUserInfo from '@/components/MerchantPrivilegeUpdateUserInfo'
import MerchantPrivilegeUpdatePWD from '@/components/MerchantPrivilegeUpdatePWD'

import MerchantOwnCommodityList from '@/components/MerchantOwnCommodityList'
import MerchantOwnCommodityAdd from '@/components/MerchantOwnCommodityAdd'
import MerchantOwnCommodityModify from '@/components/MerchantOwnCommodityModify'
import MerchantOwnCommodityDetail from '@/components/MerchantOwnCommodityDetail'
import MerchantHotelCommodityList from '@/components/MerchantHotelCommodityList'
import MerchantHotelCommodityAdd from '@/components/MerchantHotelCommodityAdd'
import MerchantHotelCommodityModify from '@/components/MerchantHotelCommodityModify'
import MerchantHotelCommodityDetail from '@/components/MerchantHotelCommodityDetail'
import MerchantOwnDeliveryList from '@/components/MerchantOwnDeliveryList'
import MerchantOwnDeliveryDetail from '@/components/MerchantOwnDeliveryDetail'
import MerchantServiceDeliveryList from '@/components/MerchantServiceDeliveryList'
import MerchantServiceDeliveryDetail from '@/components/MerchantServiceDeliveryDetail'
//Header
import MerchantInformation from '@/components/MerchantInformation'

//库存管理
import MerchantStockList from '@/components/MerchantStockList'
import MerchantGodownEntryList from '@/components/MerchantGodownEntryList'
import MerchantGodownEntryDetail from '@/components/MerchantGodownEntryDetail'
import MerchantStockOutList from '@/components/MerchantStockOutList'
import MerchantStockOutDetail from '@/components/MerchantStockOutDetail'
import selfaftersalelist from '@/components/selfaftersalelist'
import selfaftersaledetail from '@/components/selfaftersaledetail'

// 审核
import MerchantProcessList from '@/components/MerchantProcessList'
import MerchantProcessDetails from '@/components/MerchantProcessDetails'
import MerchantPendingClaimList from '@/components/MerchantPendingClaimList'
import MerchantPendingClaimDetails from '@/components/MerchantPendingClaimDetails'
import MerchantPendingReviewList from '@/components/MerchantPendingReviewList'
import MerchantPendingReviewDetails from '@/components/MerchantPendingReviewDetails'
import MerchantReviewList from '@/components/MerchantReviewList'
import MerchantReviewDetails from '@/components/MerchantReviewDetails'

//财务管理
import MerchantAccountgMan from '@/components/MerchantAccountgMan'
import MerchantAccountgInfo from '@/components/MerchantAccountgInfo'
import MerchantDividedetail from '@/components/MerchantDividedetail'
import Merchantgetcashdetail from '@/components/Merchantgetcashdetail'
import Merchantcheckgetcashdetail from '@/components/Merchantcheckgetcashdetail'
import MerchantWaiteEntryRecord from '@/components/MerchantWaiteEntryRecord'
import MerchantWaiteEntryRecordDetail from '@/components/MerchantWaiteEntryRecordDetail'
import MerchantEntryRecord from '@/components/MerchantEntryRecord'
import MerchantEntryRecordDetail from '@/components/MerchantEntryRecordDetail'
//快递费模板
import MerchantExpressAdd from '@/components/MerchantExpressAdd'
import MerchantExpressChange from '@/components/MerchantExpressChange'
import MerchantExpressTemplate from '@/components/MerchantExpressTemplate'

//开票管理
import MerchantAllInvoiceList from '@/components/MerchantAllInvoiceList'
import MerchantAllInvoiceDetail from '@/components/MerchantAllInvoiceDetail'
//优惠券
import MerchantProdCouponBatch from '@/components/MerchantProdCouponBatch'
import MerchantCoupondia from '@/components/MerchantCoupondia'
import MerchantProdCouponBatchAdd from '@/components/MerchantProdCouponBatchAdd'
import MerchantProdCouponBatchEdit from '@/components/MerchantProdCouponBatchEdit'
import MerchantProdCouponBatchCheck from '@/components/MerchantProdCouponBatchCheck'
import MerchantProdCouponGroup from '@/components/MerchantProdCouponGroup'
import MerchantProdCouponGroupAdd from '@/components/MerchantProdCouponGroupAdd'
import MerchantProdCouponGroupEdit from '@/components/MerchantProdCouponGroupEdit'
import MerchantCouponList from '@/components/MerchantCouponList'
import MerchantCouponDeliveryDetail from '@/components/MerchantCouponDeliveryDetail'

//规格管理
import MerchantProdSpecsList from '@/components/MerchantProdSpecsList'
import MerchantProdSpecsAdd from '@/components/MerchantProdSpecsAdd'
import MerchantProdSpecsModify from '@/components/MerchantProdSpecsModify'
import MerchantProdSpecsDetail from '@/components/MerchantProdSpecsDetail'
import MerchantHotelProdSpecsList from '@/components/MerchantHotelProdSpecsList'
import MerchantHotelProdSpecsAdd from '@/components/MerchantHotelProdSpecsAdd'
import MerchantHotelProdSpecsModify from '@/components/MerchantHotelProdSpecsModify'
import MerchantHotelProdSpecsDetail from '@/components/MerchantHotelProdSpecsDetail'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'   //设置默认指向路径
        },
        {
            path: '/login',
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
                path: '/MerchantPrivilegeUserList',
                name: 'MerchantPrivilegeUserList',
                component: MerchantPrivilegeUserList
            },{
                path: '/MerchantPrivilegeUserAdd',
                name: 'MerchantPrivilegeUserAdd',
                component: MerchantPrivilegeUserAdd
            },{
                path: '/MerchantPrivilegeUserModify',
                name: 'MerchantPrivilegeUserModify',
                component: MerchantPrivilegeUserModify
            },{
                path: '/MerchantPrivilegeRoleList',
                name: 'MerchantPrivilegeRoleList',
                component: MerchantPrivilegeRoleList
            },{
                path: '/MerchantPrivilegeRoleAdd',
                name: 'MerchantPrivilegeRoleAdd',
                component: MerchantPrivilegeRoleAdd
            },{
                path: '/MerchantPrivilegeRoleModify',
                name: 'MerchantPrivilegeRoleModify',
                component: MerchantPrivilegeRoleModify
            },{
                path: '/MerchantPrivilegeUpdateUserInfo',
                name: 'MerchantPrivilegeUpdateUserInfo',
                component: MerchantPrivilegeUpdateUserInfo
            },{
                path: '/MerchantPrivilegeUpdatePWD',
                name: 'MerchantPrivilegeUpdatePWD',
                component: MerchantPrivilegeUpdatePWD
            },{
                path: '/MerchantOwnCommodityList',
                name: 'MerchantOwnCommodityList',
                component: MerchantOwnCommodityList
            },{
                path: '/MerchantOwnCommodityAdd',
                name: 'MerchantOwnCommodityAdd',
                component: MerchantOwnCommodityAdd
            },{
                path: '/MerchantOwnCommodityModify',
                name: 'MerchantOwnCommodityModify',
                component: MerchantOwnCommodityModify
            },{
                path: '/MerchantOwnCommodityDetail',
                name: 'MerchantOwnCommodityDetail',
                component: MerchantOwnCommodityDetail
            },{
                path: '/MerchantHotelCommodityList',
                name: 'MerchantHotelCommodityList',
                component: MerchantHotelCommodityList
            },{
                path: '/MerchantHotelCommodityAdd',
                name: 'MerchantHotelCommodityAdd',
                component: MerchantHotelCommodityAdd
            },{
                path: '/MerchantHotelCommodityModify',
                name: 'MerchantHotelCommodityModify',
                component: MerchantHotelCommodityModify
            },{
                path: '/MerchantHotelCommodityDetail',
                name: 'MerchantHotelCommodityDetail',
                component: MerchantHotelCommodityDetail
            },{
                path: '/MerchantOwnDeliveryList',
                name: 'MerchantOwnDeliveryList',
                component: MerchantOwnDeliveryList
            },{
                path: '/MerchantOwnDeliveryDetail',
                name: 'MerchantOwnDeliveryDetail',
                component: MerchantOwnDeliveryDetail
            },{
                path: '/MerchantServiceDeliveryList',
                name: 'MerchantServiceDeliveryList',
                component: MerchantServiceDeliveryList
            },{
                path: '/MerchantServiceDeliveryDetail',
                name: 'MerchantServiceDeliveryDetail',
                component: MerchantServiceDeliveryDetail
            },{
                path: '/MerchantInformation',
                name: 'MerchantInformation',
                component: MerchantInformation
            },{
                path: '/MerchantStockList',
                name: 'MerchantStockList',
                component: MerchantStockList
            },{
                path: '/MerchantGodownEntryList',
                name: 'MerchantGodownEntryList',
                component: MerchantGodownEntryList
            },{
                path: '/MerchantGodownEntryDetail',
                name: 'MerchantGodownEntryDetail',
                component: MerchantGodownEntryDetail
            },{
                path: '/MerchantStockOutList',
                name: 'MerchantStockOutList',
                component: MerchantStockOutList
            },{
                path: '/MerchantStockOutDetail',
                name: 'MerchantStockOutDetail',
                component: MerchantStockOutDetail
            },{
              path: '/selfaftersalelist',
              name: 'selfaftersalelist',
              component: selfaftersalelist
          },{
            path: '/selfaftersaledetail',
            name: 'selfaftersaledetail',
            component: selfaftersaledetail
          },
          //审核
          {
            path: '/MerchantProcessList',
            name: 'MerchantProcessList',
            component: MerchantProcessList
          },{
            path: '/MerchantProcessDetails',
            name: 'MerchantProcessDetails',
            component: MerchantProcessDetails
          },{
            path: '/MerchantPendingClaimList',
            name: 'MerchantPendingClaimList',
            component: MerchantPendingClaimList
          },{
            path: '/MerchantPendingClaimDetails',
            name: 'MerchantPendingClaimDetails',
            component: MerchantPendingClaimDetails
          },{
            path: '/MerchantPendingReviewList',
            name: 'MerchantPendingReviewList',
            component: MerchantPendingReviewList
          },{
            path: '/MerchantPendingReviewDetails',
            name: 'MerchantPendingReviewDetails',
            component: MerchantPendingReviewDetails
          },{
            path: '/MerchantReviewList',
            name: 'MerchantReviewList',
            component: MerchantReviewList
          },{
            path: '/MerchantReviewDetails',
            name: 'MerchantReviewDetails',
            component: MerchantReviewDetails
          },{
            path: '/MerchantAccountgMan',
            name: 'MerchantAccountgMan',
            component: MerchantAccountgMan
          },{
            path: '/MerchantAccountgInfo',
            name: 'MerchantAccountgInfo',
            component: MerchantAccountgInfo
          },{
            path: '/MerchantDividedetail',
            name: 'MerchantDividedetail',
            component: MerchantDividedetail
          },{
            path: '/Merchantgetcashdetail',
            name: 'Merchantgetcashdetail',
            component: Merchantgetcashdetail
          },{
            path: '/Merchantcheckgetcashdetail',
            name: 'Merchantcheckgetcashdetail',
            component: Merchantcheckgetcashdetail
          },{
            path: '/MerchantAllInvoiceList',
            name: 'MerchantAllInvoiceList',
            component: MerchantAllInvoiceList
          },{
            path: '/MerchantAllInvoiceDetail',
            name: 'MerchantAllInvoiceDetail',
            component: MerchantAllInvoiceDetail
          },{
            path: '/MerchantExpressTemplate',
            name: 'MerchantExpressTemplate',
            component: MerchantExpressTemplate
          },{
            path: '/MerchantExpressAdd',
            name: 'MerchantExpressAdd',
            component: MerchantExpressAdd
          },{
            path: '/MerchantExpressChange',
            name: 'MerchantExpressChange',
            component: MerchantExpressChange
          },{
            path: '/MerchantProdCouponBatch',
            name: 'MerchantProdCouponBatch',
            component: MerchantProdCouponBatch
          },{
            path: '/MerchantCoupondia',
            name: 'MerchantCoupondia',
            component: MerchantCoupondia
          },{
            path: '/MerchantProdCouponBatchAdd',
            name: 'MerchantProdCouponBatchAdd',
            component: MerchantProdCouponBatchAdd
          },{
            path: '/MerchantProdCouponBatchEdit',
            name: 'MerchantProdCouponBatchEdit',
            component: MerchantProdCouponBatchEdit
          },{
            path: '/MerchantProdCouponBatchCheck',
            name: 'MerchantProdCouponBatchCheck',
            component: MerchantProdCouponBatchCheck
          },{
            path: '/MerchantProdCouponGroup',
            name: 'MerchantProdCouponGroup',
            component: MerchantProdCouponGroup
          },{
            path: '/MerchantProdCouponGroupAdd',
            name: 'MerchantProdCouponGroupAdd',
            component: MerchantProdCouponGroupAdd
          },{
            path: '/MerchantProdCouponGroupEdit',
            name: 'MerchantProdCouponGroupEdit',
            component: MerchantProdCouponGroupEdit
          },{
            path: '/MerchantCouponList',
            name: 'MerchantCouponList',
            component: MerchantCouponList
          },{
            path: '/MerchantCouponDeliveryDetail',
            name: 'MerchantCouponDeliveryDetail',
            component: MerchantCouponDeliveryDetail
          },{
            path: '/MerchantProdSpecsList',
            name: 'MerchantProdSpecsList',
            component: MerchantProdSpecsList
          },{
            path: '/MerchantProdSpecsAdd',
            name: 'MerchantProdSpecsAdd',
            component: MerchantProdSpecsAdd
          },{
            path: '/MerchantProdSpecsModify',
            name: 'MerchantProdSpecsModify',
            component: MerchantProdSpecsModify
          },{
            path: '/MerchantProdSpecsDetail',
            name: 'MerchantProdSpecsDetail',
            component: MerchantProdSpecsDetail
          },{
            path: '/MerchantHotelProdSpecsList',
            name: 'MerchantHotelProdSpecsList',
            component: MerchantHotelProdSpecsList
          },{
            path: '/MerchantHotelProdSpecsAdd',
            name: 'MerchantHotelProdSpecsAdd',
            component: MerchantHotelProdSpecsAdd
          },{
            path: '/MerchantHotelProdSpecsModify',
            name: 'MerchantHotelProdSpecsModify',
            component: MerchantHotelProdSpecsModify
          },{
            path: '/MerchantHotelProdSpecsDetail',
            name: 'MerchantHotelProdSpecsDetail',
            component: MerchantHotelProdSpecsDetail
          },{
            path: '/MerchantWaiteEntryRecord',
            name: 'MerchantWaiteEntryRecord',
            component: MerchantWaiteEntryRecord
          },{
            path: '/MerchantWaiteEntryRecordDetail',
            name: 'MerchantWaiteEntryRecordDetail',
            component: MerchantWaiteEntryRecordDetail
          },{
            path: '/MerchantEntryRecord',
            name: 'MerchantEntryRecord',
            component: MerchantEntryRecord
          },{
            path: '/MerchantEntryRecordDetail',
            name: 'MerchantEntryRecordDetail',
            component: MerchantEntryRecordDetail
          }]
        }
    ]
})
