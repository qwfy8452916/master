import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import HomePage from '@/pages/HomePage'
import index from '@/pages/index'
//用户管理 - 用户管理
import MerchantPrivilegeUserList from '@/pages/MerchantPrivilegeUserManagement/MerchantPrivilegeUserList'
import MerchantPrivilegeUserAdd from '@/pages/MerchantPrivilegeUserManagement/MerchantPrivilegeUserAdd'
import MerchantPrivilegeUserModify from '@/pages/MerchantPrivilegeUserManagement/MerchantPrivilegeUserModify'
//用户管理 - 角色管理
import MerchantPrivilegeRoleList from '@/pages/MerchantPrivilegeUserManagement/MerchantPrivilegeRoleList'
import MerchantPrivilegeRoleAdd from '@/pages/MerchantPrivilegeUserManagement/MerchantPrivilegeRoleAdd'
import MerchantPrivilegeRoleModify from '@/pages/MerchantPrivilegeUserManagement/MerchantPrivilegeRoleModify'
//用户管理 - 个人信息修改
import MerchantPrivilegeUpdateUserInfo from '@/pages/MerchantPrivilegeUserManagement/MerchantPrivilegeUpdateUserInfo'
//用户管理 - 密码修改
import MerchantPrivilegeUpdatePWD from '@/pages/MerchantPrivilegeUserManagement/MerchantPrivilegeUpdatePWD'
//用户管理 - 企业信息修改
import MerchantInformation from '@/pages/MerchantPrivilegeUserManagement/MerchantInformation'

//用户管理 - 商品管理
import MerchantOwnCommodityList from '@/pages/MerchantOwnCommodityManagement/MerchantOwnCommodityList'
import MerchantOwnCommodityAdd from '@/pages/MerchantOwnCommodityManagement/MerchantOwnCommodityAdd'
import MerchantOwnCommodityModify from '@/pages/MerchantOwnCommodityManagement/MerchantOwnCommodityModify'
import MerchantOwnCommodityDetail from '@/pages/MerchantOwnCommodityManagement/MerchantOwnCommodityDetail'
//用户管理 - 酒店商品管理
import MerchantHotelCommodityList from '@/pages/MerchantHotelCommodityManagement/MerchantHotelCommodityList'
import MerchantHotelCommodityAdd from '@/pages/MerchantHotelCommodityManagement/MerchantHotelCommodityAdd'
import MerchantHotelCommodityModify from '@/pages/MerchantHotelCommodityManagement/MerchantHotelCommodityModify'
import MerchantHotelCommodityDetail from '@/pages/MerchantHotelCommodityManagement/MerchantHotelCommodityDetail'

// 配送管理 -  配送单管理
import MerchantOwnDeliveryList from '@/pages/MerchantDistributionManagement/MerchantOwnDeliveryList'
import MerchantOwnDeliveryDetail from '@/pages/MerchantDistributionManagement/MerchantOwnDeliveryDetail'
// 配送管理 -  现场配送单
import MerchantServiceDeliveryList from '@/pages/MerchantDistributionManagement/MerchantServiceDeliveryList'
import MerchantServiceDeliveryDetail from '@/pages/MerchantDistributionManagement/MerchantServiceDeliveryDetail'


//库存管理 - 库存管理
import MerchantStockList from '@/pages/MerchantStockManagement/MerchantStockList'
//库存管理 - 入库单管理
import MerchantGodownEntryList from '@/pages/MerchantStockManagement/MerchantGodownEntryList'
import MerchantGodownEntryDetail from '@/pages/MerchantStockManagement/MerchantGodownEntryDetail'
//库存管理 - 出库单管理
import MerchantStockOutList from '@/pages/MerchantStockManagement/MerchantStockOutList'
import MerchantStockOutDetail from '@/pages/MerchantStockManagement/MerchantStockOutDetail'

// 售后服务 - 售后申请
import selfaftersalelist from '@/pages/MerchantSelfAfterSaleManagement/selfaftersalelist'
import selfaftersaledetail from '@/pages/MerchantSelfAfterSaleManagement/selfaftersaledetail'

// 审核管理 - 我发起的流程
import MerchantProcessList from '@/pages/MerchantProcessManagement/MerchantProcessList'
import MerchantProcessDetails from '@/pages/MerchantProcessManagement/MerchantProcessDetails'
// 审核管理 - 待审核任务
import MerchantPendingReviewList from '@/pages/MerchantProcessManagement/MerchantPendingReviewList'
import MerchantPendingReviewDetails from '@/pages/MerchantProcessManagement/MerchantPendingReviewDetails'
// 审核管理 - 已审核任务
import MerchantReviewList from '@/pages/MerchantProcessManagement/MerchantReviewList'
import MerchantReviewDetails from '@/pages/MerchantProcessManagement/MerchantReviewDetails'

import MerchantPendingClaimList from '@/pages/MerchantProcessManagement/MerchantPendingClaimList'
import MerchantPendingClaimDetails from '@/pages/MerchantProcessManagement/MerchantPendingClaimDetails'



//财务管理 - 开票管理
import MerchantAllInvoiceList from '@/pages/MerchantFinancialManagement/MerchantAllInvoiceList'
import MerchantAllInvoiceDetail from '@/pages/MerchantFinancialManagement/MerchantAllInvoiceDetail'
//财务管理 - 账户信息
import MerchantAccountgInfo from '@/pages/MerchantFinancialManagement/MerchantAccountgInfo'
//财务管理 - 待入账记录
import MerchantWaiteEntryRecord from '@/pages/MerchantFinancialManagement/MerchantWaiteEntryRecord'
import MerchantWaiteEntryRecordDetail from '@/pages/MerchantFinancialManagement/MerchantWaiteEntryRecordDetail'
//财务管理 - 入账记录
import MerchantEntryRecord from '@/pages/MerchantFinancialManagement/MerchantEntryRecord'
import MerchantEntryRecordDetail from '@/pages/MerchantFinancialManagement/MerchantEntryRecordDetail'
//财务管理 - 提现记录
import Merchantgetcashdetail from '@/pages/MerchantFinancialManagement/Merchantgetcashdetail'
//财务管理 - 分成明细
import MerchantDividedetail from '@/pages/MerchantFinancialManagement/MerchantDividedetail'
//财务管理 - 提现记录 - 详情
import Merchantcheckgetcashdetail from '@/pages/MerchantFinancialManagement/Merchantcheckgetcashdetail'
//财务管理 - 个人账户
import MerchantAccountgMan from '@/pages/MerchantFinancialManagement/MerchantAccountgMan'


//快递费模板
import MerchantExpressAdd from '@/pages/MerchantExpressManagement/MerchantExpressAdd'
import MerchantExpressChange from '@/pages/MerchantExpressManagement/MerchantExpressChange'
import MerchantExpressTemplate from '@/pages/MerchantExpressManagement/MerchantExpressTemplate'


//优惠券管理 - 优惠券批次管理
import MerchantProdCouponBatch from '@/pages/MerchantCouponBatchManagement/MerchantProdCouponBatch'
import MerchantCoupondia from '@/pages/MerchantCouponBatchManagement/MerchantCoupondia'
import MerchantProdCouponBatchAdd from '@/pages/MerchantCouponBatchManagement/MerchantProdCouponBatchAdd'
import MerchantProdCouponBatchEdit from '@/pages/MerchantCouponBatchManagement/MerchantProdCouponBatchEdit'
import MerchantProdCouponBatchCheck from '@/pages/MerchantCouponBatchManagement/MerchantProdCouponBatchCheck'
//优惠券管理 - 优惠券分组管理
import MerchantProdCouponGroup from '@/pages/MerchantCouponGroupManagement/MerchantProdCouponGroup'
import MerchantProdCouponGroupAdd from '@/pages/MerchantCouponGroupManagement/MerchantProdCouponGroupAdd'
import MerchantProdCouponGroupEdit from '@/pages/MerchantCouponGroupManagement/MerchantProdCouponGroupEdit'
//优惠券管理 - 优惠券管理
import MerchantCouponList from '@/pages/MerchantCouponManagement/MerchantCouponList'
import MerchantCouponDeliveryDetail from '@/pages/MerchantCouponManagement/MerchantCouponDeliveryDetail'

//规格管理 - 商品规格管理
import MerchantProdSpecsList from '@/pages/MerchantProdSpecsManagement/MerchantProdSpecsList'
import MerchantProdSpecsAdd from '@/pages/MerchantProdSpecsManagement/MerchantProdSpecsAdd'
import MerchantProdSpecsModify from '@/pages/MerchantProdSpecsManagement/MerchantProdSpecsModify'
import MerchantProdSpecsDetail from '@/pages/MerchantProdSpecsManagement/MerchantProdSpecsDetail'
//规格管理 - 酒店商品规格管理
import MerchantHotelProdSpecsList from '@/pages/MerchantProdSpecsManagement/MerchantHotelProdSpecsList'
import MerchantHotelProdSpecsAdd from '@/pages/MerchantProdSpecsManagement/MerchantHotelProdSpecsAdd'
import MerchantHotelProdSpecsModify from '@/pages/MerchantProdSpecsManagement/MerchantHotelProdSpecsModify'
import MerchantHotelProdSpecsDetail from '@/pages/MerchantProdSpecsManagement/MerchantHotelProdSpecsDetail'

//活动管理
import MerchantActivityList from '@/pages/MerchantActivityManagement/MerchantActivityList'
import MerchantActivityAdd from '@/pages/MerchantActivityManagement/MerchantActivityAdd'
import MerchantActivityChange from '@/pages/MerchantActivityManagement/MerchantActivityChange'
import MerchantActivityDetail from '@/pages/MerchantActivityManagement/MerchantActivityDetail'
import MerchantActSecondHalf from '@/pages/MerchantActivityManagement/MerchantActSecondHalf'
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
          },{
            path: '/MerchantActivityAdd',
            name: 'MerchantActivityAdd',
            component: MerchantActivityAdd
          },{
            path: '/MerchantActivityChange',
            name: 'MerchantActivityChange',
            component: MerchantActivityChange
          },{
            path: '/MerchantActivityDetail',
            name: 'MerchantActivityDetail',
            component: MerchantActivityDetail
          },{
            path: '/MerchantActivityList',
            name: 'MerchantActivityList',
            component: MerchantActivityList
          },{
            path: '/MerchantActSecondHalf',
            name: 'MerchantActSecondHalf',
            component: MerchantActSecondHalf
          }
        ]
        }
    ]
})
