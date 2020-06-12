import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import HomePage from '@/pages/HomePage'
import index from '@/components/index'
//共用文件
import HotelPrivilegeUserList from '@/components/HotelPrivilegeUserList'
import HotelPrivilegeUserAdd from '@/components/HotelPrivilegeUserAdd'
import HotelPrivilegeUserModify from '@/components/HotelPrivilegeUserModify'
import HotelPrivilegeRoleList from '@/components/HotelPrivilegeRoleList'
import HotelPrivilegeRoleAdd from '@/components/HotelPrivilegeRoleAdd'
import HotelPrivilegeRoleModify from '@/components/HotelPrivilegeRoleModify'
import HotelPrivilegeUpdateUserInfo from '@/components/HotelPrivilegeUpdateUserInfo'
import HotelPrivilegeUpdatePWD from '@/components/HotelPrivilegeUpdatePWD'

import HotelInventoryList from '@/components/HotelInventoryList'
import HotelInventoryWarehousing from '@/components/HotelInventoryWarehousing'
import HotelInventorySales from '@/components/HotelInventorySales'
import HotelGodownEntryList from '@/components/HotelGodownEntryList'
import HotelGodownEntryAdd from '@/components/HotelGodownEntryAdd'
import HotelGodownEntryDetail from '@/components/HotelGodownEntryDetail'
import HotelGodownEntryModify from '@/components/HotelGodownEntryModify'
import HotelReplenishList from '@/components/HotelReplenishList'
import HotelClaimGoodsList from '@/components/HotelClaimGoodsList'
import HotelGridList from '@/components/HotelGridList'
import HotelCommodityMarketList from '@/components/HotelCommodityMarketList'
import HotelCommodityMarketAdd from '@/components/HotelCommodityMarketAdd'
import HotelCommodityMarketModify from '@/components/HotelCommodityMarketModify'
import HotelOwnCommodityList from '@/components/HotelOwnCommodityList'
import HotelOwnCommodityAdd from '@/components/HotelOwnCommodityAdd'
import HotelOwnCommodityModify from '@/components/HotelOwnCommodityModify'
import HotelOwnCommodityDetail from '@/components/HotelOwnCommodityDetail'
import HotelAllCommodityManage from '@/components/HotelAllCommodityManage'
import HotelFeatureType from '@/components/HotelFeatureType'
import HotelFeatureTypeAdd from '@/components/HotelFeatureTypeAdd'
import HotelFeatureTypeDetail from '@/components/HotelFeatureTypeDetail'
import HotelFeatureTypeDetailAdd from '@/components/HotelFeatureTypeDetailAdd'
import HotelFeatureTypeDetailModify from '@/components/HotelFeatureTypeDetailModify'
//活动管理
import HotelActivityAdd from '@/components/HotelActivityAdd'
import HotelActivityChange from '@/components/HotelActivityChange'
import HotelActivityDef from '@/components/HotelActivityDef'
import HotelActivityDetail from '@/components/HotelActivityDetail'
import HotelActivityList from '@/components/HotelActivityList'
import HotelActivityRecord from '@/components/HotelActivityRecord'
import HotelActRedpackDef from '@/components/HotelActRedpackDef'
import HotelActShareDef from '@/components/HotelActShareDef'
//Header
import HotelInformationModify from '@/components/HotelInformationModify'

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
import hotelrecorddetail from '@/components/hotelrecorddetail'
import Cabinetgl from '@/components/Cabinetgl'
import Cabinetchange from '@/components/Cabinetchange'
import Cabinetlook from '@/components/Cabinetlook'
import replacecabinet from '@/components/replacecabinet'
import invoicerecord from '@/components/invoicerecord'
// 审核
import HotelProcessList from '@/components/HotelProcessList'
import HotelProcessDetails from '@/components/HotelProcessDetails'
import HotelPendingClaimList from '@/components/HotelPendingClaimList'
import HotelPendingClaimDetails from '@/components/HotelPendingClaimDetails'
import HotelPendingReviewList from '@/components/HotelPendingReviewList'
import HotelPendingReviewDetails from '@/components/HotelPendingReviewDetails'
import HotelReviewList from '@/components/HotelReviewList'
import HotelReviewDetails from '@/components/HotelReviewDetails'
// 配送
import HotelOwnDeliveryList from '@/components/HotelOwnDeliveryList'
import HotelOwnDeliveryDetail from '@/components/HotelOwnDeliveryDetail'
import HotelServiceDeliveryList from '@/components/HotelServiceDeliveryList'
import HotelServiceDeliveryDetail from '@/components/HotelServiceDeliveryDetail'
//订单管理
import HotelOrderList from '@/components/HotelOrderList'
import HotelOrderDetails from '@/components/HotelOrderDetails'
import HotelOrderCouponDetails from '@/components/HotelOrderCouponDetails'
//库存管理
import Hotelownprodstock from '@/components/Hotelownprodstock'
import Hotelallprodstock from '@/components/Hotelallprodstock'
import Hotelwarehouseadd from '@/components/Hotelwarehouseadd'
import Hotelouthouselist from '@/components/Hotelouthouselist'
import Hotelouthouseadd from '@/components/Hotelouthouseadd'
import Hotelouthouseedit from '@/components/Hotelouthouseedit'
import Hotelouthousedetail from '@/components/Hotelouthousedetail'
import HotelownprodWarehousing from '@/components/HotelownprodWarehousing'
import HotelownprodWarehousingcheck from '@/components/HotelownprodWarehousingcheck'
import HotelownprodWarehousingexamine from '@/components/HotelownprodWarehousingexamine'
import HotelownprodWarehousingadd from '@/components/HotelownprodWarehousingadd'
import Hotelownprodoutlist from '@/components/Hotelownprodoutlist'
import Hotelownprodoutcheck from '@/components/Hotelownprodoutcheck'
import Hotelownprodouttrial from '@/components/Hotelownprodouttrial'
import Hotelownprodoutadd from '@/components/Hotelownprodoutadd'
import allsaleapply from '@/components/allsaleapply'
import allsaleapplydetail from '@/components/allsaleapplydetail'
import selfaftersalelist from '@/components/selfaftersalelist'
import selfaftersaledetail from '@/components/selfaftersaledetail'
//账户管理
import HotelAccountgMan from '@/components/HotelAccountgMan'
import HotelAccountInfo from '@/components/HotelAccountInfo'
import HotelDividedetail from '@/components/HotelDividedetail'
import Hotelgetcashdetail from '@/components/Hotelgetcashdetail'
import Hotelcheckgetcashdetail from '@/components/Hotelcheckgetcashdetail'
import HotelWaiteEntryRecord from '@/components/HotelWaiteEntryRecord'
import HotelWaiteEntryRecordDetail from '@/components/HotelWaiteEntryRecordDetail'
import HotelEntryRecord from '@/components/HotelEntryRecord'
import HotelEntryRecordDetail from '@/components/HotelEntryRecordDetail'
//客房预订
import HotelBookTypeList from '@/components/HotelBookTypeList'
import HotelBookTypeAdd from '@/components/HotelBookTypeAdd'
import HotelBookTypeModify from '@/components/HotelBookTypeModify'
import HotelBookTypeDetail from '@/components/HotelBookTypeDetail'
import HotelBookResourceList from '@/components/HotelBookResourceList'
import HotelBookResourceAdd from '@/components/HotelBookResourceAdd'
import HotelBookResourceModify from '@/components/HotelBookResourceModify'
import HotelBookPriceManage from '@/components/HotelBookPriceManage'
import HotelBookStatusManage from '@/components/HotelBookStatusManage'
import HotelBookOrderList from '@/components/HotelBookOrderList'
import HotelBookOrderDetail from '@/components/HotelBookOrderDetail'
//配送
import HotelWaitDealOrder from '@/components/HotelWaitDealOrder'
import HotelWaitOrderdetail from '@/components/HotelWaitOrderdetail'
import HotelAllOrderList from '@/components/HotelAllOrderList'
import HotelAllOrderDetail from '@/components/HotelAllOrderDetail'
//酒店文化
import HotelCultureList from '@/components/HotelCultureList'
import HotelCultureAdd from '@/components/HotelCultureAdd'
import HotelCultureModify from '@/components/HotelCultureModify'
import HotelCultureDetail from '@/components/HotelCultureDetail'
import HotelCultureDetailAdd from '@/components/HotelCultureDetailAdd'
import HotelCultureDetailModify from '@/components/HotelCultureDetailModify'
//开票管理
import HotelAllInvoiceList from '@/components/HotelAllInvoiceList'
import HotelAllInvoiceDetail from '@/components/HotelAllInvoiceDetail'
//迷你吧商品管理
import HotelMinibarProdList from '@/components/HotelMinibarProdList'
import HotelMinibarProdAdd from '@/components/HotelMinibarProdAdd'
import HotelMinibarProdModify from '@/components/HotelMinibarProdModify'
import HotelCabCommodityManage from '@/components/HotelCabCommodityManage'
import HotelCabCommodityModify from '@/components/HotelCabCommodityModify'
//酒店功能区
import HotelFunctionList from '@/components/HotelFunctionList'
import HotelFunctionAdd from '@/components/HotelFunctionAdd'
import HotelFunctionModify from '@/components/HotelFunctionModify'
import HotelFunctionDetail from '@/components/HotelFunctionDetail'
import HotelFunctionClassify from '@/components/HotelFunctionClassify'
//功能区商品管理
import HotelFunctionProdList from '@/components/HotelFunctionProdList'
import HotelFunctionProdAdd from '@/components/HotelFunctionProdAdd'
import HotelFunctionProdModify from '@/components/HotelFunctionProdModify'
import HotelFunctionProdDetail from '@/components/HotelFunctionProdDetail'
//虚拟柜配置
import VirtualCabinetConfiguration from '@/components/VirtualCabinetConfiguration'
import VirtualCabinetAdd from '@/components/VirtualCabinetAdd'
import VirtualCabinetChange from '@/components/VirtualCabinetChange'
//快递费模板
import HotelExpressAdd from '@/components/HotelExpressAdd'
import HotelExpressChange from '@/components/HotelExpressChange'
import HotelExpressTemplate from '@/components/HotelExpressTemplate'
//客房服务
import HotelServiceList from '@/components/HotelServiceList'
import HotelServiceAdd from '@/components/HotelServiceAdd'
import HotelServiceModify from '@/components/HotelServiceModify'
import HotelServiceDetail from '@/components/HotelServiceDetail'
import HotelServiceCatalogueList from '@/components/HotelServiceCatalogueList'
import HotelServiceCatalogueAdd from '@/components/HotelServiceCatalogueAdd'
import HotelServiceCatalogueModify from '@/components/HotelServiceCatalogueModify'
import HotelServicePicture from '@/components/HotelServicePicture'
import HotelServiceSelectList from '@/components/HotelServiceSelectList'
import HotelServiceSelectAdd from '@/components/HotelServiceSelectAdd'
import HotelServiceSelectModify from '@/components/HotelServiceSelectModify'
import HotelServiceIconList from '@/components/HotelServiceIconList'
import HotelServiceIconAdd from '@/components/HotelServiceIconAdd'
import HotelServiceIconModify from '@/components/HotelServiceIconModify'
import HotelServiceBannerList from '@/components/HotelServiceBannerList'
import HotelServiceBannerAdd from '@/components/HotelServiceBannerAdd'
import HotelServiceBannerModify from '@/components/HotelServiceBannerModify'
import HotelServiceFormList from '@/components/HotelServiceFormList'
import HotelServiceFormAdd from '@/components/HotelServiceFormAdd'
import HotelServiceFormModify from '@/components/HotelServiceFormModify'
import HotelServiceFormIntroduce from '@/components/HotelServiceFormIntroduce'
import checkhotelrecord from '@/components/checkhotelrecord'
import HotelServiceOrderDetail from '@/components/HotelServiceOrderDetail'

//优惠券
import HotelProdCouponBatch from '@/components/HotelProdCouponBatch'
import HotelProdCouponBatchAdd from '@/components/HotelProdCouponBatchAdd'
import HotelCoupondia from '@/components/HotelCoupondia'
import HotelProdCouponBatchEdit from '@/components/HotelProdCouponBatchEdit'
import HotelProdCouponBatchCheck from '@/components/HotelProdCouponBatchCheck'
import HotelProdCouponGroup from '@/components/HotelProdCouponGroup'
import HotelAllCouponGroupAdd from '@/components/HotelAllCouponGroupAdd'
import HotelProdCouponGroupEdit from '@/components/HotelProdCouponGroupEdit'
import HotelCouponList from '@/components/HotelCouponList'

//统计报表
import HotelReportOverdueProd from '@/components/HotelReportOverdueProd'

//规格管理
import HotelOwnProdSpecsList from '@/components/HotelOwnProdSpecsList'
import HotelOwnProdSpecsAdd from '@/components/HotelOwnProdSpecsAdd'
import HotelOwnProdSpecsModify from '@/components/HotelOwnProdSpecsModify'
import HotelOwnProdSpecsDetail from '@/components/HotelOwnProdSpecsDetail'
import HotelFunctionSpecsList from '@/components/HotelFunctionSpecsList'
import HotelFunctionSpecsAdd from '@/components/HotelFunctionSpecsAdd'
import HotelFunctionSpecsModify from '@/components/HotelFunctionSpecsModify'
import HotelFunctionSpecsDetail from '@/components/HotelFunctionSpecsDetail'

//卡券
import HotelCardticketList from '@/components/HotelCardticketList'
import HotelCardticketAdd from '@/components/HotelCardticketAdd'
import HotelCardticketEdit from '@/components/HotelCardticketEdit'
import HotelCardticketDetail from '@/components/HotelCardticketDetail'
import HotelCardCouponList from '@/components/HotelCardCouponList'
import HotelCardCouponDetail from '@/components/HotelCardCouponDetail'
import HotelCardCouponRecord from '@/components/HotelCardCouponRecord'
//自提点
import HotelselfTakingList from '@/components/HotelselfTakingList'
import HotelselfTakingAdd from '@/components/HotelselfTakingAdd'
import HotelselfTakingEdit from '@/components/HotelselfTakingEdit'
import HotelselfTakingDetail from '@/components/HotelselfTakingDetail'
import VirtualCabinetDetail from '@/components/VirtualCabinetDetail'
//酒店广告页管理
import HotelADList from "@/components/HotelADList"
import HotelADAdd from "@/components/HotelADAdd"
import HotelADModify from "@/components/HotelADModify"
import HotelADDetail from "@/components/HotelADDetail"
import HotelADQuoteDetail from "@/components/HotelADQuoteDetail"
//
import HotelCustomerList from "@/components/HotelCustomerList"
import HotelEmployeeList from "@/components/HotelEmployeeList"
import HotelEmpRetailRecord from "@/components/HotelEmpRetailRecord"
import HotelOrderRecord from "@/components/HotelOrderRecord"
import HotelRetailRecord from "@/components/HotelRetailRecord"
import HotelShareRecord from "@/components/HotelShareRecord"
import HotelVisitRecord from "@/components/HotelVisitRecord"

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
          path: '/HotelPrivilegeUpdateUserInfo',
          name: 'HotelPrivilegeUpdateUserInfo',
          component: HotelPrivilegeUpdateUserInfo
        },{
          path: '/HotelPrivilegeUpdatePWD',
          name: 'HotelPrivilegeUpdatePWD',
          component: HotelPrivilegeUpdatePWD
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
          path: '/HotelClaimGoodsList',
          name: 'HotelClaimGoodsList',
          component: HotelClaimGoodsList
        },{
          path: '/HotelInformationModify',
          name: 'HotelInformationModify',
          component: HotelInformationModify
        },{
          path: '/HotelGridList',
          name: 'HotelGridList',
          component: HotelGridList
        },{
          path: '/HotelCommodityMarketList',
          name: 'HotelCommodityMarketList',
          component: HotelCommodityMarketList
        },{
          path: '/HotelCommodityMarketAdd',
          name: 'HotelCommodityMarketAdd',
          component: HotelCommodityMarketAdd
        },{
          path: '/HotelCommodityMarketModify',
          name: 'HotelCommodityMarketModify',
          component: HotelCommodityMarketModify
        },{
          path: '/HotelOwnCommodityList',
          name: 'HotelOwnCommodityList',
          component: HotelOwnCommodityList
        },{
          path: '/HotelOwnCommodityAdd',
          name: 'HotelOwnCommodityAdd',
          component: HotelOwnCommodityAdd
        },{
          path: '/HotelOwnCommodityModify',
          name: 'HotelOwnCommodityModify',
          component: HotelOwnCommodityModify
        },{
          path: '/HotelOwnCommodityDetail',
          name: 'HotelOwnCommodityDetail',
          component: HotelOwnCommodityDetail
        },{
          path: '/HotelAllCommodityManage',
          name: 'HotelAllCommodityManage',
          component: HotelAllCommodityManage
        },{
          path: '/HotelFeatureType',
          name: 'HotelFeatureType',
          component: HotelFeatureType
        },{
          path: '/HotelFeatureTypeAdd',
          name: 'HotelFeatureTypeAdd',
          component: HotelFeatureTypeAdd
        },{
          path: '/HotelFeatureTypeDetail',
          name: 'HotelFeatureTypeDetail',
          component: HotelFeatureTypeDetail
        },{
          path: '/HotelFeatureTypeDetailAdd',
          name: 'HotelFeatureTypeDetailAdd',
          component: HotelFeatureTypeDetailAdd
        },{
          path: '/HotelFeatureTypeDetailModify',
          name: 'HotelFeatureTypeDetailModify',
          component: HotelFeatureTypeDetailModify
        },{
          path: '/HotelServiceList',
          name: 'HotelServiceList',
          component: HotelServiceList
        },{
          path: '/HotelServiceAdd',
          name: 'HotelServiceAdd',
          component: HotelServiceAdd
        },{
          path: '/HotelServiceModify',
          name: 'HotelServiceModify',
          component: HotelServiceModify
        },{
          path: '/HotelServiceDetail',
          name: 'HotelServiceDetail',
          component: HotelServiceDetail
        },{
          path: '/HotelServiceCatalogueList',
          name: 'HotelServiceCatalogueList',
          component: HotelServiceCatalogueList
        },{
          path: '/HotelServiceCatalogueAdd',
          name: 'HotelServiceCatalogueAdd',
          component: HotelServiceCatalogueAdd
        },{
          path: '/HotelServiceCatalogueModify',
          name: 'HotelServiceCatalogueModify',
          component: HotelServiceCatalogueModify
        },{
          path: '/HotelServicePicture',
          name: 'HotelServicePicture',
          component: HotelServicePicture
        },{
          path: '/HotelServiceSelectList',
          name: 'HotelServiceSelectList',
          component: HotelServiceSelectList
        },{
          path: '/HotelServiceSelectAdd',
          name: 'HotelServiceSelectAdd',
          component: HotelServiceSelectAdd
        },{
          path: '/HotelServiceSelectModify',
          name: 'HotelServiceSelectModify',
          component: HotelServiceSelectModify
        },{
          path: '/HotelServiceIconList',
          name: 'HotelServiceIconList',
          component: HotelServiceIconList
        },{
          path: '/HotelServiceIconAdd',
          name: 'HotelServiceIconAdd',
          component: HotelServiceIconAdd
        },{
          path: '/HotelServiceIconModify',
          name: 'HotelServiceIconModify',
          component: HotelServiceIconModify
        },{
          path: '/HotelServiceBannerList',
          name: 'HotelServiceBannerList',
          component: HotelServiceBannerList
        },{
          path: '/HotelServiceBannerAdd',
          name: 'HotelServiceBannerAdd',
          component: HotelServiceBannerAdd
        },{
          path: '/HotelServiceBannerModify',
          name: 'HotelServiceBannerModify',
          component: HotelServiceBannerModify
        },{
          path: '/HotelServiceFormList',
          name: 'HotelServiceFormList',
          component: HotelServiceFormList
        },{
          path: '/HotelServiceFormAdd',
          name: 'HotelServiceFormAdd',
          component: HotelServiceFormAdd
        },{
          path: '/HotelServiceFormModify',
          name: 'HotelServiceFormModify',
          component: HotelServiceFormModify
        },{
          path: '/HotelServiceFormIntroduce',
          name: 'HotelServiceFormIntroduce',
          component: HotelServiceFormIntroduce
        },{
          path: '/HotelServiceOrderDetail',
          name: 'HotelServiceOrderDetail',
          component: HotelServiceOrderDetail
        },{
          path: '/HotelOwnDeliveryList',
          name: 'HotelOwnDeliveryList',
          component: HotelOwnDeliveryList
        },{
          path: '/HotelOwnDeliveryDetail',
          name: 'HotelOwnDeliveryDetail',
          component: HotelOwnDeliveryDetail
        },{
          path: '/HotelServiceDeliveryList',
          name: 'HotelServiceDeliveryList',
          component: HotelServiceDeliveryList
        },{
          path: '/HotelServiceDeliveryDetail',
          name: 'HotelServiceDeliveryDetail',
          component: HotelServiceDeliveryDetail
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
        },{
          path: '/replacecabinet',
          name: 'replacecabinet',
          component: replacecabinet,
        },{
          path: '/invoicerecord',
          name: 'invoicerecord',
          component: invoicerecord,
        },
        //审核
        {
          path: '/HotelProcessList',
          name: 'HotelProcessList',
          component: HotelProcessList
        },{
          path: '/HotelProcessDetails',
          name: 'HotelProcessDetails',
          component: HotelProcessDetails
        },{
          path: '/HotelPendingClaimList',
          name: 'HotelPendingClaimList',
          component: HotelPendingClaimList
        },{
          path: '/HotelPendingClaimDetails',
          name: 'HotelPendingClaimDetails',
          component: HotelPendingClaimDetails
        },{
          path: '/HotelPendingReviewList',
          name: 'HotelPendingReviewList',
          component: HotelPendingReviewList
        },{
          path: '/HotelPendingReviewDetails',
          name: 'HotelPendingReviewDetails',
          component: HotelPendingReviewDetails
        },{
          path: '/HotelReviewList',
          name: 'HotelReviewList',
          component: HotelReviewList
        },{
          path: '/HotelReviewDetails',
          name: 'HotelReviewDetails',
          component: HotelReviewDetails
        },{
          path: '/HotelOrderList',
          name: 'HotelOrderList',
          component: HotelOrderList
        },{
          path: '/HotelOrderDetails',
          name: 'HotelOrderDetails',
          component: HotelOrderDetails
        },{
          path: '/HotelOrderCouponDetails',
          name: 'HotelOrderCouponDetails',
          component: HotelOrderCouponDetails
        },{
          path: '/Hotelownprodstock',
          name: 'Hotelownprodstock',
          component: Hotelownprodstock
        },{
          path: '/Hotelallprodstock',
          name: 'Hotelallprodstock',
          component: Hotelallprodstock
        },{
          path: '/Hotelwarehouseadd',
          name: 'Hotelwarehouseadd',
          component: Hotelwarehouseadd
        },{
          path: '/Hotelouthouselist',
          name: 'Hotelouthouselist',
          component: Hotelouthouselist
        },{
          path: '/Hotelouthouseadd',
          name: 'Hotelouthouseadd',
          component: Hotelouthouseadd
        },{
          path: '/Hotelouthouseedit',
          name: 'Hotelouthouseedit',
          component: Hotelouthouseedit
        },{
          path: '/Hotelouthousedetail',
          name: 'Hotelouthousedetail',
          component: Hotelouthousedetail
        },{
          path: '/HotelownprodWarehousing',
          name: 'HotelownprodWarehousing',
          component: HotelownprodWarehousing
        },{
          path: '/HotelownprodWarehousingcheck',
          name: 'HotelownprodWarehousingcheck',
          component: HotelownprodWarehousingcheck
        },{
          path: '/HotelownprodWarehousingexamine',
          name: 'HotelownprodWarehousingexamine',
          component: HotelownprodWarehousingexamine
        },{
          path: '/HotelownprodWarehousingadd',
          name: 'HotelownprodWarehousingadd',
          component: HotelownprodWarehousingadd
        },{
          path: '/Hotelownprodoutlist',
          name: 'Hotelownprodoutlist',
          component: Hotelownprodoutlist
        },{
          path: '/Hotelownprodoutcheck',
          name: 'Hotelownprodoutcheck',
          component: Hotelownprodoutcheck
        },{
          path: '/Hotelownprodouttrial',
          name: 'Hotelownprodouttrial',
          component: Hotelownprodouttrial
        },{
          path: '/Hotelownprodoutadd',
          name: 'Hotelownprodoutadd',
          component: Hotelownprodoutadd
        },{
          path: '/allsaleapply',
          name: 'allsaleapply',
          component: allsaleapply
        },{
          path: '/allsaleapplydetail',
          name: 'allsaleapplydetail',
          component: allsaleapplydetail
        },{
          path: '/selfaftersalelist',
          name: 'selfaftersalelist',
          component: selfaftersalelist
        },{
          path: '/selfaftersaledetail',
          name: 'selfaftersaledetail',
          component: selfaftersaledetail
        },{
          path: '/HotelAccountgMan',
          name: 'HotelAccountgMan',
          component: HotelAccountgMan
        },{
          path: '/HotelAccountInfo',
          name: 'HotelAccountInfo',
          component: HotelAccountInfo
        },{
          path: '/HotelDividedetail',
          name: 'HotelDividedetail',
          component: HotelDividedetail
        },{
          path: '/Hotelgetcashdetail',
          name: 'Hotelgetcashdetail',
          component: Hotelgetcashdetail
        },{
          path: '/Hotelcheckgetcashdetail',
          name: 'Hotelcheckgetcashdetail',
          component: Hotelcheckgetcashdetail
        },
        //客房预订
        {
          path: '/HotelBookTypeList',
          name: 'HotelBookTypeList',
          component: HotelBookTypeList
        },{
          path: '/HotelBookTypeAdd',
          name: 'HotelBookTypeAdd',
          component: HotelBookTypeAdd
        },{
          path: '/HotelBookTypeModify',
          name: 'HotelBookTypeModify',
          component: HotelBookTypeModify
        },{
          path: '/HotelBookTypeDetail',
          name: 'HotelBookTypeDetail',
          component: HotelBookTypeDetail
        },{
          path: '/HotelBookResourceList',
          name: 'HotelBookResourceList',
          component: HotelBookResourceList
        },{
          path: '/HotelBookResourceAdd',
          name: 'HotelBookResourceAdd',
          component: HotelBookResourceAdd
        },{
          path: '/HotelBookResourceModify',
          name: 'HotelBookResourceModify',
          component: HotelBookResourceModify
        },{
          path: '/HotelBookPriceManage',
          name: 'HotelBookPriceManage',
          component: HotelBookPriceManage
        },{
          path: '/HotelBookStatusManage',
          name: 'HotelBookStatusManage',
          component: HotelBookStatusManage
        },{
          path: '/HotelBookOrderList',
          name: 'HotelBookOrderList',
          component: HotelBookOrderList
        },{
          path: '/HotelBookOrderDetail',
          name: 'HotelBookOrderDetail',
          component: HotelBookOrderDetail
        },{
          path: '/HotelWaitDealOrder',
          name: 'HotelWaitDealOrder',
          component: HotelWaitDealOrder
        },{
          path: '/HotelWaitOrderdetail',
          name: 'HotelWaitOrderdetail',
          component: HotelWaitOrderdetail
        },{
          path: '/HotelAllOrderList',
          name: 'HotelAllOrderList',
          component: HotelAllOrderList
        },{
          path: '/HotelAllOrderDetail',
          name: 'HotelAllOrderDetail',
          component: HotelAllOrderDetail
        },
        //酒店文化
        {
          path: '/HotelCultureList',
          name: 'HotelCultureList',
          component: HotelCultureList
        },{
          path: '/HotelCultureAdd',
          name: 'HotelCultureAdd',
          component: HotelCultureAdd
        },{
          path: '/HotelCultureModify',
          name: 'HotelCultureModify',
          component: HotelCultureModify
        },{
          path: '/HotelCultureDetail',
          name: 'HotelCultureDetail',
          component: HotelCultureDetail
        },{
          path: '/HotelCultureDetailAdd',
          name: 'HotelCultureDetailAdd',
          component: HotelCultureDetailAdd
        },{
          path: '/HotelCultureDetailModify',
          name: 'HotelCultureDetailModify',
          component: HotelCultureDetailModify
        },{
          path: '/HotelAllInvoiceList',
          name: 'HotelAllInvoiceList',
          component: HotelAllInvoiceList
        },{
          path: '/HotelAllInvoiceDetail',
          name: 'HotelAllInvoiceDetail',
          component: HotelAllInvoiceDetail
        },{
          path: '/HotelMinibarProdList',
          name: 'HotelMinibarProdList',
          component: HotelMinibarProdList
        },{
          path: '/HotelMinibarProdAdd',
          name: 'HotelMinibarProdAdd',
          component: HotelMinibarProdAdd
        },{
          path: '/HotelMinibarProdModify',
          name: 'HotelMinibarProdModify',
          component: HotelMinibarProdModify
        },{
          path: '/HotelCabCommodityManage',
          name: 'HotelCabCommodityManage',
          component: HotelCabCommodityManage
        },{
          path: '/HotelCabCommodityModify',
          name: 'HotelCabCommodityModify',
          component: HotelCabCommodityModify
        },{
          path: '/HotelFunctionList',
          name: 'HotelFunctionList',
          component: HotelFunctionList
        },{
          path: '/HotelFunctionAdd',
          name: 'HotelFunctionAdd',
          component: HotelFunctionAdd
        },{
          path: '/HotelFunctionModify',
          name: 'HotelFunctionModify',
          component: HotelFunctionModify
        },{
          path: '/HotelFunctionDetail',
          name: 'HotelFunctionDetail',
          component: HotelFunctionDetail
        },{
          path: '/HotelFunctionClassify',
          name: 'HotelFunctionClassify',
          component: HotelFunctionClassify
        },{
          path: '/HotelFunctionProdList',
          name: 'HotelFunctionProdList',
          component: HotelFunctionProdList
        },{
          path: '/HotelFunctionProdAdd',
          name: 'HotelFunctionProdAdd',
          component: HotelFunctionProdAdd
        },{
          path: '/HotelFunctionProdModify',
          name: 'HotelFunctionProdModify',
          component: HotelFunctionProdModify
        },{
          path: '/HotelFunctionProdDetail',
          name: 'HotelFunctionProdDetail',
          component: HotelFunctionProdDetail
        },{
          path: '/VirtualCabinetAdd',
          name: 'VirtualCabinetAdd',
          component: VirtualCabinetAdd
        },{
          path: '/VirtualCabinetChange',
          name: 'VirtualCabinetChange',
          component: VirtualCabinetChange
        },{
          path: '/VirtualCabinetConfiguration',
          name: 'VirtualCabinetConfiguration',
          component: VirtualCabinetConfiguration
        },{
          path: '/HotelExpressTemplate',
          name: 'HotelExpressTemplate',
          component: HotelExpressTemplate
        },{
          path: '/HotelExpressAdd',
          name: 'HotelExpressAdd',
          component: HotelExpressAdd
        },{
          path: '/HotelExpressChange',
          name: 'HotelExpressChange',
          component: HotelExpressChange
        },{
          path: '/HotelProdCouponBatch',
          name: 'HotelProdCouponBatch',
          component: HotelProdCouponBatch
        },{
          path: '/HotelProdCouponBatchAdd',
          name: 'HotelProdCouponBatchAdd',
          component: HotelProdCouponBatchAdd
        },{
          path: '/HotelCoupondia',
          name: 'HotelCoupondia',
          component: HotelCoupondia
        },{
          path: '/HotelProdCouponBatchEdit',
          name: 'HotelProdCouponBatchEdit',
          component: HotelProdCouponBatchEdit
        },{
          path: '/HotelProdCouponBatchCheck',
          name: 'HotelProdCouponBatchCheck',
          component: HotelProdCouponBatchCheck
        },{
          path: '/HotelProdCouponGroup',
          name: 'HotelProdCouponGroup',
          component: HotelProdCouponGroup
        },{
          path: '/HotelAllCouponGroupAdd',
          name: 'HotelAllCouponGroupAdd',
          component: HotelAllCouponGroupAdd
        },{
          path: '/HotelProdCouponGroupEdit',
          name: 'HotelProdCouponGroupEdit',
          component: HotelProdCouponGroupEdit
        },{
          path: '/HotelCouponList',
          name: 'HotelCouponList',
          component: HotelCouponList
        },{
          path: '/HotelReportOverdueProd',
          name: 'HotelReportOverdueProd',
          component: HotelReportOverdueProd
        },{
          path: '/HotelOwnProdSpecsList',
          name: 'HotelOwnProdSpecsList',
          component: HotelOwnProdSpecsList
        },{
          path: '/HotelOwnProdSpecsAdd',
          name: 'HotelOwnProdSpecsAdd',
          component: HotelOwnProdSpecsAdd
        },{
          path: '/HotelOwnProdSpecsModify',
          name: 'HotelOwnProdSpecsModify',
          component: HotelOwnProdSpecsModify
        },{
          path: '/HotelOwnProdSpecsDetail',
          name: 'HotelOwnProdSpecsDetail',
          component: HotelOwnProdSpecsDetail
        },{
          path: '/HotelFunctionSpecsList',
          name: 'HotelFunctionSpecsList',
          component: HotelFunctionSpecsList
        },{
          path: '/HotelFunctionSpecsAdd',
          name: 'HotelFunctionSpecsAdd',
          component: HotelFunctionSpecsAdd
        },{
          path: '/HotelFunctionSpecsModify',
          name: 'HotelFunctionSpecsModify',
          component: HotelFunctionSpecsModify
        },{
          path: '/HotelFunctionSpecsDetail',
          name: 'HotelFunctionSpecsDetail',
          component: HotelFunctionSpecsDetail
        },{
          path: '/HotelCardticketList',
          name: 'HotelCardticketList',
          component: HotelCardticketList
        },{
          path: '/HotelCardticketAdd',
          name: 'HotelCardticketAdd',
          component: HotelCardticketAdd
        },{
          path: '/HotelselfTakingList',
          name: 'HotelselfTakingList',
          component: HotelselfTakingList
        },{
          path: '/HotelselfTakingAdd',
          name: 'HotelselfTakingAdd',
          component: HotelselfTakingAdd
        },{
          path: '/HotelselfTakingEdit',
          name: 'HotelselfTakingEdit',
          component: HotelselfTakingEdit
        },{
          path: '/HotelselfTakingDetail',
          name: 'HotelselfTakingDetail',
          component: HotelselfTakingDetail
        },{
          path: '/HotelCardticketEdit',
          name: 'HotelCardticketEdit',
          component: HotelCardticketEdit
        },{
          path: '/HotelCardticketDetail',
          name: 'HotelCardticketDetail',
          component: HotelCardticketDetail
        },{
          path: '/HotelCardCouponList',
          name: 'HotelCardCouponList',
          component: HotelCardCouponList
        },{
          path: '/HotelCardCouponDetail',
          name: 'HotelCardCouponDetail',
          component: HotelCardCouponDetail
        },{
          path: '/HotelCardCouponRecord',
          name: 'HotelCardCouponRecord',
          component: HotelCardCouponRecord
        },{
          path: '/VirtualCabinetDetail',
          name: 'VirtualCabinetDetail',
          component: VirtualCabinetDetail
        },{
          path: '/HotelWaiteEntryRecord',
          name: 'HotelWaiteEntryRecord',
          component: HotelWaiteEntryRecord
        },{
          path: '/HotelWaiteEntryRecordDetail',
          name: 'HotelWaiteEntryRecordDetail',
          component: HotelWaiteEntryRecordDetail
        },{
          path: '/HotelEntryRecord',
          name: 'HotelEntryRecord',
          component: HotelEntryRecord
        },{
          path: '/HotelEntryRecordDetail',
          name: 'HotelEntryRecordDetail',
          component: HotelEntryRecordDetail
        },{
          path: '/HotelADList',
          name: 'HotelADList',
          component: HotelADList
        },{
          path: '/HotelADAdd',
          name: 'HotelADAdd',
          component: HotelADAdd
        },{
          path: '/HotelADModify',
          name: 'HotelADModify',
          component: HotelADModify
        },{
          path: '/HotelADDetail',
          name: 'HotelADDetail',
          component: HotelADDetail
        },{
          path: '/HotelADQuoteDetail',
          name: 'HotelADQuoteDetail',
          component: HotelADQuoteDetail

        },{
          path: '/HotelCustomerList',
          name: 'HotelCustomerList',
          component: HotelCustomerList
        },{
          path: '/HotelEmployeeList',
          name: 'HotelEmployeeList',
          component: HotelEmployeeList
        },{
          path: '/HotelEmpRetailRecord',
          name: 'HotelEmpRetailRecord',
          component: HotelEmpRetailRecord
        },{
          path: '/HotelOrderRecord',
          name: 'HotelOrderRecord',
          component: HotelOrderRecord
        },{
          path: '/HotelRetailRecord',
          name: 'HotelRetailRecord',
          component: HotelRetailRecord
        },{
          path: '/HotelShareRecord',
          name: 'HotelShareRecord',
          component: HotelShareRecord
        },{
          path: '/HotelVisitRecord',
          name: 'HotelVisitRecord',
          component: HotelVisitRecord
        },{
          path: '/HotelActivityAdd',
          name: 'HotelActivityAdd',
          component: HotelActivityAdd
        },{
          path: '/HotelActivityChange',
          name: 'HotelActivityChange',
          component: HotelActivityChange
        },{
          path: '/HotelActivityDef',
          name: 'HotelActivityDef',
          component: HotelActivityDef
        },{
          path: '/HotelActivityDetail',
          name: 'HotelActivityDetail',
          component: HotelActivityDetail
        },{
          path: '/HotelActivityList',
          name: 'HotelActivityList',
          component: HotelActivityList
        },{
          path: '/HotelActivityRecord',
          name: 'HotelActivityRecord',
          component: HotelActivityRecord
        },{
          path: '/HotelActRedpackDef',
          name: 'HotelActRedpackDef',
          component: HotelActRedpackDef
        },{
          path: '/HotelActShareDef',
          name: 'HotelActShareDef',
          component: HotelActShareDef
        },
      ]
    }
  ]
})
