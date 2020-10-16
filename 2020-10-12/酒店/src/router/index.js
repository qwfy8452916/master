import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import HomePage from '@/pages/HomePage'
import index from '@/pages/index'

//共用文件 - 用户管理
import HotelPrivilegeUserList from '@/pages/HotelPrivilegeUserManagement/HotelPrivilegeUserList'
import HotelPrivilegeUserAdd from '@/pages/HotelPrivilegeUserManagement/HotelPrivilegeUserAdd'
import HotelPrivilegeUserModify from '@/pages/HotelPrivilegeUserManagement/HotelPrivilegeUserModify'
//共用文件 - 角色管理
import HotelPrivilegeRoleList from '@/pages/HotelPrivilegeRoleManagement/HotelPrivilegeRoleList'
import HotelPrivilegeRoleAdd from '@/pages/HotelPrivilegeRoleManagement/HotelPrivilegeRoleAdd'
import HotelPrivilegeRoleModify from '@/pages/HotelPrivilegeRoleManagement/HotelPrivilegeRoleModify'
//共用文件 - 用户信息管理
import HotelPrivilegeUpdateUserInfo from '@/pages/HotelInformationManagement/HotelPrivilegeUpdateUserInfo'
import HotelPrivilegeUpdatePWD from '@/pages/HotelInformationManagement/HotelPrivilegeUpdatePWD'
//酒店信息修改
import HotelInformationModify from '@/pages/HotelInformationManagement/HotelInformationModify'

import HotelInventoryList from '@/components/HotelInventoryList'
import HotelInventoryWarehousing from '@/components/HotelInventoryWarehousing'
import HotelInventorySales from '@/components/HotelInventorySales'

import HotelClaimGoodsList from '@/components/HotelClaimGoodsList'
import HotelCommodityMarketList from '@/components/HotelCommodityMarketList'
import HotelCommodityMarketAdd from '@/components/HotelCommodityMarketAdd'
import HotelCommodityMarketModify from '@/components/HotelCommodityMarketModify'

// 自营商品管理 
import HotelOwnCommodityList from '@/pages/HotelOwnCommodityManagement/HotelOwnCommodityList'
import HotelOwnCommodityAdd from '@/pages/HotelOwnCommodityManagement/HotelOwnCommodityAdd'
import HotelOwnCommodityModify from '@/pages/HotelOwnCommodityManagement/HotelOwnCommodityModify'
import HotelOwnCommodityDetail from '@/pages/HotelOwnCommodityManagement/HotelOwnCommodityDetail'

// 酒店商品管理 
import HotelAllCommodityManage from '@/pages/HotelAllCommodityManagement/HotelAllCommodityManage'
import HotelAllCommodityDetail from '@/pages/HotelAllCommodityManagement/HotelAllCommodityDetail'

// 客房设置
import HotelFeatureType from '@/pages/HotelFeatureTypeManagement/HotelFeatureType'
import HotelFeatureTypeAdd from '@/pages/HotelFeatureTypeManagement/HotelFeatureTypeAdd'
// 客房设置 - 设施明细
import HotelFeatureTypeDetail from '@/pages/HotelFeatureTypeManagement/HotelFeatureTypeDetail'
// 客房设置 - 设施明细添加
import HotelFeatureTypeDetailAdd from '@/pages/HotelFeatureTypeManagement/HotelFeatureTypeDetailAdd'
// 客房设置 - 设施明细修改
import HotelFeatureTypeDetailModify from '@/pages/HotelFeatureTypeManagement/HotelFeatureTypeDetailModify'

//活动管理 - 活动管理
import HotelActivityList from '@/pages/HotelActivityManagement/HotelActivityList'
import HotelActivityAdd from '@/pages/HotelActivityManagement/HotelActivityAdd'
import HotelActivityChange from '@/pages/HotelActivityManagement/HotelActivityChange'
import HotelActivityDetail from '@/pages/HotelActivityManagement/HotelActivityDetail'
//活动管理 - 查看活动明细
import HotelActivityScanCode from "@/pages/HotelActivityManagement/HotelActivityScanCode"
//活动管理 - 扫码领券活动参与记录
import HotelActivityScanRecord from "@/pages/HotelActivityManagement/HotelActivityScanRecord"
//活动管理 - 会议参与记录
import HotelActivityMeetingRecords from '@/pages/HotelActivityManagement/HotelActivityMeetingRecords'
//活动管理 - 会议参与记录详情
import HotelActivityMeetingDetail from '@/pages/HotelActivityManagement/HotelActivityMeetingDetail'

import HotelActivityDef from '@/components/HotelActivityDef'
import HotelActivityRecord from '@/components/HotelActivityRecord'
import HotelActRedpackDef from '@/components/HotelActRedpackDef'
import HotelActShareDef from '@/components/HotelActShareDef'

import HotelActivityMeeting from '@/components/HotelActivityMeeting'


//红包管理
import HotelRedPackList from '@/pages/HotelRedPackManagement/HotelRedPackList'
import HotelRedpackDetail from '@/pages/HotelRedPackManagement/HotelRedpackDetail'
//红包管理 - 分享记录
import HotelRedPackShareRE from '@/pages/HotelRedPackManagement/HotelRedPackShareRE'
//红包管理 - 领取记录
import HotelRedPackGetRecord from '@/pages/HotelRedPackManagement/HotelRedPackGetRecord'
//红包管理 - 分享红包汇总统计
import HotelRedPackTotal from '@/pages/HotelRedPackManagement/HotelRedPackTotal'

import HotelActSecondHalf from '@/components/HotelActSecondHalf'

import HotelRevenueStatistics from '@/components/HotelRevenueStatistics'
import HotelRevenueDetail from '@/components/HotelRevenueDetail'
import HotelFaultManagement from '@/components/HotelFaultManagement'


import HotelDivideInto from '@/components/HotelDivideInto'
import HotelWithdrawalsRecord from '@/components/HotelWithdrawalsRecord'
import HotelWithdrawalsRecordDetail from '@/components/HotelWithdrawalsRecordDetail'
import HotelReplenishmentFeeList from '@/components/HotelReplenishmentFeeList'
import HotelReplenishmentFeeRecordList from '@/components/HotelReplenishmentFeeRecordList'
import hotelrecorddetail from '@/components/hotelrecorddetail'

//二维码管理 - 二维码管理
import Cabinetgl from '@/pages/CabinetglManagement/Cabinetgl'
//二维码管理 - 二维码修改
import Cabinetchange from '@/pages/CabinetglManagement/Cabinetchange'
//二维码管理 - 二维码新增
import CabinetAdd from '@/pages/CabinetglManagement/CabinetAdd'
//二维码管理 - 二维码详情
import CabinetDetail from '@/pages/CabinetglManagement/CabinetDetail'
//二维码管理 - 二维码查看商品信息
import Cabinetlook from '@/pages/CabinetglManagement/Cabinetlook'

//迷你吧管理 - 更换记录
import replacecabinet from '@/pages/HotelMiniBarManagement/replacecabinet'
//迷你吧管理 - 未更换的格子
import HotelGridList from '@/pages/HotelMiniBarManagement/HotelGridList'
//迷你吧管理 - 补货管理
import HotelReplenishList from '@/pages/HotelMiniBarManagement/HotelReplenishList'


import invoicerecord from '@/components/invoicerecord'

// 审核管理 - 我发起的审核流程
import HotelProcessList from '@/pages/HotelProcessManagement/HotelProcessList'
import HotelProcessDetails from '@/pages/HotelProcessManagement/HotelProcessDetails'
// 审核管理 - 待审核任务
import HotelPendingReviewList from '@/pages/HotelProcessManagement/HotelPendingReviewList'
import HotelPendingReviewDetails from '@/pages/HotelProcessManagement/HotelPendingReviewDetails'
// 审核管理 - 已审核任务
import HotelReviewList from '@/pages/HotelProcessManagement/HotelReviewList'
import HotelReviewDetails from '@/pages/HotelProcessManagement/HotelReviewDetails'

import HotelPendingClaimList from '@/pages/HotelProcessManagement/HotelPendingClaimList'
import HotelPendingClaimDetails from '@/pages/HotelProcessManagement/HotelPendingClaimDetails'

//订单配送 - 订单管理
import HotelOrderList from '@/pages/HotelOrderDistribution/HotelOrderList'
//订单配送 - 订单管理 - 商品详情
import HotelOrderDetails from '@/pages/HotelOrderDistribution/HotelOrderDetails'
//订单配送 - 订单管理 - 卡券详情
import HotelOrderCouponDetails from '@/pages/HotelOrderDistribution/HotelOrderCouponDetails'
//订单配送 - 食堂订单
import HotelEatinOrderList from '@/pages/HotelOrderDistribution/HotelEatinOrderList'

//订单配送 - 自营商品配送单
import HotelOwnDeliveryList from '@/pages/HotelOrderDistribution/HotelOwnDeliveryList'
//订单配送 - 自营商品配送单 - 自营商品配送单详情
import HotelOwnDeliveryDetail from '@/pages/HotelOrderDistribution/HotelOwnDeliveryDetail'
//订单配送 - 现场配送单
import HotelServiceDeliveryList from '@/pages/HotelOrderDistribution/HotelServiceDeliveryList'
//订单配送 - 现场配送单 - 现场配送单详情
import HotelServiceDeliveryDetail from '@/pages/HotelOrderDistribution/HotelServiceDeliveryDetail'
//订单配送 - 待处理现场配送单
import HotelWaitDealOrder from '@/pages/HotelOrderDistribution/HotelWaitDealOrder'
import HotelWaitOrderdetail from '@/pages/HotelOrderDistribution/HotelWaitOrderdetail'

//库存管理 - 采购管理
import HotelPurchaseOrderlist from '@/pages/HotelInventoryManagement/PurchaseOrderManagement/HotelPurchaseOrderlist'
//库存管理 - 采购管理 - 查看详情
import HotelSeepurchaseOrder from '@/pages/HotelInventoryManagement/PurchaseOrderManagement/HotelSeepurchaseOrder'
//库存管理 - 采购管理 - 修改采购单
import HotelPurchaseOrderedit from '@/pages/HotelInventoryManagement/PurchaseOrderManagement/HotelPurchaseOrderedit'
//库存管理 - 自营商品库存
import Hotelownprodstock from '@/pages/HotelInventoryManagement/Hotelownprodstock'
//库存管理 - 全部商品库存
import Hotelallprodstock from '@/pages/HotelInventoryManagement/Hotelallprodstock'
//库存管理 - 入库单管理
import HotelGodownEntryList from '@/pages/HotelInventoryManagement/GodownEntryManagement/HotelGodownEntryList'
import HotelGodownEntryAdd from '@/pages/HotelInventoryManagement/GodownEntryManagement/HotelGodownEntryAdd'
import HotelGodownEntryDetail from '@/pages/HotelInventoryManagement/GodownEntryManagement/HotelGodownEntryDetail'
import HotelGodownEntryModify from '@/pages/HotelInventoryManagement/GodownEntryManagement/HotelGodownEntryModify'
//库存管理 - 出库单管理
import Hotelouthouselist from '@/pages/HotelInventoryManagement/OuthouseManagement/Hotelouthouselist'
import Hotelouthouseadd from '@/pages/HotelInventoryManagement/OuthouseManagement/Hotelouthouseadd'
import Hotelouthouseedit from '@/pages/HotelInventoryManagement/OuthouseManagement/Hotelouthouseedit'
import Hotelouthousedetail from '@/pages/HotelInventoryManagement/OuthouseManagement/Hotelouthousedetail'
//库存管理 - 自营商品入库单
import HotelownprodWarehousing from '@/pages/HotelInventoryManagement/OwnprodWarehousingManagement/HotelownprodWarehousing'
import HotelownprodWarehousingcheck from '@/pages/HotelInventoryManagement/OwnprodWarehousingManagement/HotelownprodWarehousingcheck'
import HotelownprodWarehousingexamine from '@/pages/HotelInventoryManagement/OwnprodWarehousingManagement/HotelownprodWarehousingexamine'
import HotelownprodWarehousingadd from '@/pages/HotelInventoryManagement/OwnprodWarehousingManagement/HotelownprodWarehousingadd'
//库存管理 - 自营商品出库单
import Hotelownprodoutlist from '@/pages/HotelInventoryManagement/OwnprodoutManagement/Hotelownprodoutlist'
import Hotelownprodoutcheck from '@/pages/HotelInventoryManagement/OwnprodoutManagement/Hotelownprodoutcheck'
import Hotelownprodouttrial from '@/pages/HotelInventoryManagement/OwnprodoutManagement/Hotelownprodouttrial'
import Hotelownprodoutadd from '@/pages/HotelInventoryManagement/OwnprodoutManagement/Hotelownprodoutadd'


import Hotelwarehouseadd from '@/components/Hotelwarehouseadd'

// 售后服务 - 全部商品售后
import allsaleapply from '@/pages/HotelAftersaleManagement/allsaleapply'
import allsaleapplydetail from '@/pages/HotelAftersaleManagement/allsaleapplydetail'
// 售后服务 - 自营商品售后
import selfaftersalelist from '@/pages/HotelAftersaleManagement/selfaftersalelist'
import selfaftersaledetail from '@/pages/HotelAftersaleManagement/selfaftersaledetail'

//客房预订 - 房型管理
import HotelBookTypeList from '@/pages/HotelBookTypeManagement/HotelBookTypeList'
import HotelBookTypeAdd from '@/pages/HotelBookTypeManagement/HotelBookTypeAdd'
import HotelBookTypeModify from '@/pages/HotelBookTypeManagement/HotelBookTypeModify'
import HotelBookTypeDetail from '@/pages/HotelBookTypeManagement/HotelBookTypeDetail'
//客房预订 - 房源管理
import HotelBookResourceList from '@/pages/HotelBookResourceManagement/HotelBookResourceList'
import HotelBookResourceAdd from '@/pages/HotelBookResourceManagement/HotelBookResourceAdd'
import HotelBookResourceModify from '@/pages/HotelBookResourceManagement/HotelBookResourceModify'
import HotelBookResourceDetail from '@/pages/HotelBookResourceManagement/HotelBookResourceDetail'
//客房预订 - 房价管理
import HotelBookPriceManage from '@/pages/HotelBookPriceManagement/HotelBookPriceManage'
import HotelBookPriceManageList from '@/pages/HotelBookPriceManagement/HotelBookPriceManageList'
//客房预订 - 房态管理
import HotelBookStatusManage from '@/pages/HotelBookStatusManagement/HotelBookStatusManage'
import HotelBookStatusHandleList from '@/pages/HotelBookStatusManagement/HotelBookStatusHandleList'
//客房预订 - 订单管理
import HotelBookOrderList from '@/pages/HotelBookOrderMnagement/HotelBookOrderList'
import HotelBookOrderDetail from '@/pages/HotelBookOrderMnagement/HotelBookOrderDetail'
//配送
import HotelAllOrderList from '@/components/HotelAllOrderList'
import HotelAllOrderDetail from '@/components/HotelAllOrderDetail'

//酒店文化
import HotelCultureList from '@/pages/HotelCultureManagement/HotelCultureList'
import HotelCultureAdd from '@/pages/HotelCultureManagement/HotelCultureAdd'
import HotelCultureModify from '@/pages/HotelCultureManagement/HotelCultureModify'
import HotelCultureDetail from '@/pages/HotelCultureManagement/HotelCultureDetail'
//酒店文化 - 详情新增
import HotelCultureDetailAdd from '@/pages/HotelCultureManagement/HotelCultureDetailAdd'
//酒店文化 - 详情修改
import HotelCultureDetailModify from '@/pages/HotelCultureManagement/HotelCultureDetailModify'

//财务管理 - 开票管理
import HotelAllInvoiceList from '@/pages/HotelFinancialManagement/HotelAllInvoiceList'
import HotelAllInvoiceDetail from '@/pages/HotelFinancialManagement/HotelAllInvoiceDetail'
//财务管理 - 酒店账户信息
import HotelAccountInfo from '@/pages/HotelFinancialManagement/HotelAccountInfo'
//财务管理 - 酒店账户信息 - 待入账记录
import HotelWaiteEntryRecord from '@/pages/HotelFinancialManagement/HotelWaiteEntryRecord'
//财务管理 - 酒店账户信息 - 待入账记录详情
import HotelWaiteEntryRecordDetail from '@/pages/HotelFinancialManagement/HotelWaiteEntryRecordDetail'
//财务管理 - 酒店账户信息 - 入账记录
import HotelEntryRecord from '@/pages/HotelFinancialManagement/HotelEntryRecord'
//财务管理 - 酒店账户信息 - 入账记录详情
import HotelEntryRecordDetail from '@/pages/HotelFinancialManagement/HotelEntryRecordDetail'
//财务管理 - 酒店账户信息 - 提现记录
import Hotelgetcashdetail from '@/pages/HotelFinancialManagement/Hotelgetcashdetail'
//财务管理 - 酒店账户信息 - 提现记录详情
import Hotelcheckgetcashdetail from '@/pages/HotelFinancialManagement/Hotelcheckgetcashdetail'
//财务管理 - 分成明细
import HotelDividedetail from '@/pages/HotelFinancialManagement/HotelDividedetail'
import HotelAccountgMan from '@/pages/HotelFinancialManagement/HotelAccountgMan'


//迷你吧商品管理
import HotelMinibarProdList from '@/pages/HotelMinibarProdManagement/HotelMinibarProdList'
import HotelMinibarProdAdd from '@/pages/HotelMinibarProdManagement/HotelMinibarProdAdd'
import HotelMinibarProdModify from '@/pages/HotelMinibarProdManagement/HotelMinibarProdModify'
//迷你吧商品管理 - 柜子商品管理
import HotelCabCommodityManage from '@/pages/HotelMinibarProdManagement/HotelCabCommodityManage'
//迷你吧商品管理 - 柜子商品修改
import HotelCabCommodityModify from '@/pages/HotelMinibarProdManagement/HotelCabCommodityModify'

//酒店功能区
import HotelFunctionList from '@/pages/HotelFunctionManagement/HotelFunctionList'
import HotelFunctionModify from '@/pages/HotelFunctionManagement/HotelFunctionModify'
import HotelFunctionDetail from '@/pages/HotelFunctionManagement/HotelFunctionDetail'
import HotelFunctionClassify from '@/pages/HotelFunctionManagement/HotelFunctionClassify'

//功能区商品管理
import HotelFunctionProdList from '@/pages/HotelFunctionProdManagement/HotelFunctionProdList'
import HotelFunctionProdAdd from '@/pages/HotelFunctionProdManagement/HotelFunctionProdAdd'
import HotelFunctionProdModify from '@/pages/HotelFunctionProdManagement/HotelFunctionProdModify'
import HotelFunctionProdDetail from '@/pages/HotelFunctionProdManagement/HotelFunctionProdDetail'

//虚拟柜配置
import VirtualCabinetConfiguration from '@/pages/VirtualCabinetConfigurationManagement/VirtualCabinetConfiguration'
import VirtualCabinetAdd from '@/pages/VirtualCabinetConfigurationManagement/VirtualCabinetAdd'
import VirtualCabinetChange from '@/pages/VirtualCabinetConfigurationManagement/VirtualCabinetChange'
import VirtualCabinetDetail from '@/pages/VirtualCabinetConfigurationManagement/VirtualCabinetDetail'

//快递费模板
import HotelExpressAdd from '@/pages/HotelExpressTemplateManagement/HotelExpressAdd'
import HotelExpressChange from '@/pages/HotelExpressTemplateManagement/HotelExpressChange'
import HotelExpressTemplate from '@/pages/HotelExpressTemplateManagement/HotelExpressTemplate'

//客房服务
import HotelServiceList from '@/pages/HotelServiceManagement/HotelServiceList'
import HotelServiceAdd from '@/pages/HotelServiceManagement/HotelServiceAdd'
import HotelServiceModify from '@/pages/HotelServiceManagement/HotelServiceModify'
import HotelServiceDetail from '@/pages/HotelServiceManagement/HotelServiceDetail'
//客房服务 - 管理明细
import HotelServicePicture from '@/pages/HotelServiceManagement/HotelServicePicture'
//客房服务 - 管理目录
import HotelServiceCatalogueList from '@/pages/HotelServiceManagement/HotelServiceCatalogueList'
import HotelServiceCatalogueAdd from '@/pages/HotelServiceManagement/HotelServiceCatalogueAdd'
import HotelServiceCatalogueModify from '@/pages/HotelServiceManagement/HotelServiceCatalogueModify'

//客房服务 - 客房服务订单
import checkhotelrecord from '@/pages/HotelServiceOrderManagement/checkhotelrecord'
import HotelServiceOrderDetail from '@/pages/HotelServiceOrderManagement/HotelServiceOrderDetail'




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



//优惠券管理 - 优惠券批次管理
import HotelProdCouponBatch from '@/pages/HotelProdCouponManagement/HotelProdCouponBatch'
import HotelProdCouponBatchAdd from '@/pages/HotelProdCouponManagement/HotelProdCouponBatchAdd'
import HotelProdCouponBatchEdit from '@/pages/HotelProdCouponManagement/HotelProdCouponBatchEdit'
import HotelProdCouponBatchCheck from '@/pages/HotelProdCouponManagement/HotelProdCouponBatchCheck'
//优惠券管理 - 优惠券批次管理 - 优惠券批次管理新增 - 板块组件
import HotelCoupondia from '@/pages/HotelProdCouponManagement/HotelCoupondia'
//优惠券管理 - 优惠券分组管理
import HotelProdCouponGroup from '@/pages/HotelProdCouponManagement/HotelProdCouponGroup'
import HotelAllCouponGroupAdd from '@/pages/HotelProdCouponManagement/HotelAllCouponGroupAdd'
import HotelProdCouponGroupEdit from '@/pages/HotelProdCouponManagement/HotelProdCouponGroupEdit'
//优惠券管理 - 优惠券管理
import HotelCouponList from '@/pages/HotelProdCouponManagement/HotelCouponList'
//优惠券管理 - 优惠券发送记录
import HotelCouponSendRecord from '@/pages/HotelProdCouponManagement/HotelCouponSendRecord'

//统计报表 - 过期商品
import HotelReportOverdueProd from '@/pages/HotelStatisticalFormManagement/HotelReportOverdueProd'
//统计报表 - 订单数据整合表
import HotelReportOrderAll from '@/pages/HotelStatisticalFormManagement/HotelReportOrderAll'

//酒店商品规格管理
import HotelOwnProdSpecsList from '@/pages/HotelOwnProdSpecsManagement/HotelOwnProdSpecsList'
import HotelOwnProdSpecsAdd from '@/pages/HotelOwnProdSpecsManagement/HotelOwnProdSpecsAdd'
import HotelOwnProdSpecsModify from '@/pages/HotelOwnProdSpecsManagement/HotelOwnProdSpecsModify'
import HotelOwnProdSpecsDetail from '@/pages/HotelOwnProdSpecsManagement/HotelOwnProdSpecsDetail'

//功能区规格管理
import HotelFunctionSpecsList from '@/pages/HotelFunctionSpecsManagement/HotelFunctionSpecsList'
import HotelFunctionSpecsAdd from '@/pages/HotelFunctionSpecsManagement/HotelFunctionSpecsAdd'
import HotelFunctionSpecsModify from '@/pages/HotelFunctionSpecsManagement/HotelFunctionSpecsModify'
import HotelFunctionSpecsDetail from '@/pages/HotelFunctionSpecsManagement/HotelFunctionSpecsDetail'

//卡券管理 - 卡券管理
import HotelCardticketList from '@/pages/HotelCardCouponManagement/HotelCardticketList'
import HotelCardticketAdd from '@/pages/HotelCardCouponManagement/HotelCardticketAdd'
import HotelCardticketEdit from '@/pages/HotelCardCouponManagement/HotelCardticketEdit'
import HotelCardticketDetail from '@/pages/HotelCardCouponManagement/HotelCardticketDetail'
//卡券管理 - 用户卡券管理
import HotelCardCouponList from '@/pages/HotelCardCouponManagement/HotelCardCouponList'
import HotelCardCouponDetail from '@/pages/HotelCardCouponManagement/HotelCardCouponDetail'
import HotelCardCouponRecord from '@/pages/HotelCardCouponManagement/HotelCardCouponRecord'

//自提点
import HotelselfTakingList from '@/pages/HotelselfTakingManagement/HotelselfTakingList'
import HotelselfTakingAdd from '@/pages/HotelselfTakingManagement/HotelselfTakingAdd'
import HotelselfTakingEdit from '@/pages/HotelselfTakingManagement/HotelselfTakingEdit'
import HotelselfTakingDetail from '@/pages/HotelselfTakingManagement/HotelselfTakingDetail'

//酒店广告页管理
import HotelADList from "@/pages/HotelADManagement/HotelADList"
import HotelADAdd from "@/pages/HotelADManagement/HotelADAdd"
import HotelADModify from "@/pages/HotelADManagement/HotelADModify"
import HotelADDetail from "@/pages/HotelADManagement/HotelADDetail"
//酒店广告页管理 - 引用详情
import HotelADQuoteDetail from "@/pages/HotelADManagement/HotelADQuoteDetail"

//员工管理 - 员工管理
import HotelStaffManage from "@/pages/HotelStaffManagement/HotelStaffManage"
//员工管理 - 员工管理详情
import HotelStaffManageDetail from "@/pages/HotelStaffManagement/HotelStaffManageDetail"
//员工管理 - 下级员工管理
import HotelEmployeeList from "@/pages/HotelStaffManagement/HotelEmployeeList"

//酒店分享记录管理 - 酒店分享记录
import HotelShareRecord from "@/pages/HotelShareRecordManagement/HotelShareRecord"
//酒店分享记录管理 - 酒店分享访问记录
import HotelVisitRecord from "@/pages/HotelShareRecordManagement/HotelVisitRecord"
//酒店分享记录管理 - 酒店分享订单记录
import HotelOrderRecord from "@/pages/HotelShareRecordManagement/HotelOrderRecord"

//顾客管理 - 顾客管理
import HotelCustomerManage from '@/pages/HotelCustomerManagement/HotelCustomerManage'
//顾客管理 - 顾客详情
import HotelCustomerManageDetail from '@/pages/HotelCustomerManagement/HotelCustomerManageDetail'
//顾客管理 - 顾客下级
import HotelCustomerList from "@/pages/HotelCustomerManagement/HotelCustomerList"
//顾客管理 - 酒店顾客访问记录
import HotelCustomerAccess from "@/pages/HotelCustomerManagement/HotelCustomerAccess"
//顾客管理 - 酒店顾客访问记录详情
import HotelCustomerAccessDetail from "@/pages/HotelCustomerManagement/HotelCustomerAccessDetail"
//顾客管理 - 酒店顾客订单记录
import HotelCustomerOrder from "@/pages/HotelCustomerManagement/HotelCustomerOrder"

//酒店分销统计 - 酒店分销统计
import HotelRetailRecord from "@/pages/HotelRetailRecordManagement/HotelRetailRecord"
//酒店分销统计 - 员工分销统计
import HotelEmpRetailRecord from "@/pages/HotelRetailRecordManagement/HotelEmpRetailRecord"

//功能区导航管理
import HotelFunctionLeadAdd from "@/pages/HotelFunctionLeadManagement/HotelFunctionLeadAdd"
import HotelFunctionLeadChange from "@/pages/HotelFunctionLeadManagement/HotelFunctionLeadChange"
import HotelFunctionLeadDetail from "@/pages/HotelFunctionLeadManagement/HotelFunctionLeadDetail"
import HotelFunctionLeadList from "@/pages/HotelFunctionLeadManagement/HotelFunctionLeadList"

//关联酒店 
import HotelContactAdd from "@/pages/HotelContactManagement/HotelContactAdd"
import HotelContactChange from "@/pages/HotelContactManagement/HotelContactChange"
import HotelContactDetail from "@/pages/HotelContactManagement/HotelContactDetail"
import HotelContactList from "@/pages/HotelContactManagement/HotelContactList"

//酒店管理->功能区房源管理
import HotelFunctionHouseResourceList from '@/pages/HotelFunctionHouseResourceManagement/HotelFunctionHouseResourceList'
import HotelFunctionHouseResourceAdd from '@/pages/HotelFunctionHouseResourceManagement/HotelFunctionHouseResourceAdd'
import HotelFunctionHouseResourceEdit from '@/pages/HotelFunctionHouseResourceManagement/HotelFunctionHouseResourceEdit'
import HotelFunctionHouseResourceDetail from '@/pages/HotelFunctionHouseResourceManagement/HotelFunctionHouseResourceDetail'

//消息管理
import HotelMarketingSMS from '@/pages/HotelMessageNotificationManagement/HotelMarketingSMS'
import HotelMarketingDetail from '@/pages/HotelMessageNotificationManagement/HotelMarketingDetail'
import HotelMarketingTexting from '@/pages/HotelMessageNotificationManagement/HotelMarketingTexting'

//协议单位
import HotelEnterprisesAdd from "@/pages/HotelEnterprisesManagement/HotelEnterprisesAdd"
import HotelEnterprisesChange from "@/pages/HotelEnterprisesManagement/HotelEnterprisesChange"
import HotelEnterprisesDetail from "@/pages/HotelEnterprisesManagement/HotelEnterprisesDetail"
import HotelEnterprisesList from "@/pages/HotelEnterprisesManagement/HotelEnterprisesList"

//单位房源管理
import HotelEnterprisesRoomsAdd from "@/pages/HotelEnterprisesRoomsManagement/HotelEnterprisesRoomsAdd"
import HotelEnterprisesRoomsChange from "@/pages/HotelEnterprisesRoomsManagement/HotelEnterprisesRoomsChange"
import HotelEnterprisesRoomsList from "@/pages/HotelEnterprisesRoomsManagement/HotelEnterprisesRoomsList"
import HotelEnterprisesRoomsDetail from "@/pages/HotelEnterprisesRoomsManagement/HotelEnterprisesRoomsDetail"

//单位授权码
import HotelEnterprisesCodeList from "@/pages/HotelEnterprisesCodeManagement/HotelEnterprisesCodeList"
import HotelEnterprisesCodeDetail from "@/pages/HotelEnterprisesCodeManagement/HotelEnterprisesCodeDetail"
//单位授权码订单
import HotelEnterprisesCodeOrderList from "@/pages/HotelEnterprisesCodeManagement/HotelEnterprisesCodeOrderList"

//最优弹性价记录
import HotelAdaptPriceList from "@/pages/HotelAdaptPriceRecordManagement/HotelAdaptPriceList"
//最优弹性价记录订单
import HotelAdaptPriceOrderList from "@/pages/HotelAdaptPriceRecordManagement/HotelAdaptPriceOrderList"


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
    }, {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage,
      children: [{
        path: '/index',
        name: 'index',
        component: index
      }, {
        path: '/HotelPrivilegeUserList',
        name: 'HotelPrivilegeUserList',
        component: HotelPrivilegeUserList
      }, {
        path: '/HotelPrivilegeUserAdd',
        name: 'HotelPrivilegeUserAdd',
        component: HotelPrivilegeUserAdd
      }, {
        path: '/HotelPrivilegeUserModify',
        name: 'HotelPrivilegeUserModify',
        component: HotelPrivilegeUserModify
      }, {
        path: '/HotelPrivilegeRoleList',
        name: 'HotelPrivilegeRoleList',
        component: HotelPrivilegeRoleList
      }, {
        path: '/HotelPrivilegeRoleAdd',
        name: 'HotelPrivilegeRoleAdd',
        component: HotelPrivilegeRoleAdd
      }, {
        path: '/HotelPrivilegeRoleModify',
        name: 'HotelPrivilegeRoleModify',
        component: HotelPrivilegeRoleModify
      }, {
        path: '/HotelPrivilegeUpdateUserInfo',
        name: 'HotelPrivilegeUpdateUserInfo',
        component: HotelPrivilegeUpdateUserInfo
      }, {
        path: '/HotelPrivilegeUpdatePWD',
        name: 'HotelPrivilegeUpdatePWD',
        component: HotelPrivilegeUpdatePWD
      },
       {
        path: '/HotelInventoryList',
        name: 'HotelInventoryList',
        component: HotelInventoryList
      },
       {
        path: '/HotelInventoryWarehousing',
        name: 'HotelInventoryWarehousing',
        component: HotelInventoryWarehousing
      }, 
      {
        path: '/HotelInventorySales',
        name: 'HotelInventorySales',
        component: HotelInventorySales
      }, 
      {
        path: '/HotelGodownEntryList',
        name: 'HotelGodownEntryList',
        component: HotelGodownEntryList
      }, {
        path: '/HotelGodownEntryAdd',
        name: 'HotelGodownEntryAdd',
        component: HotelGodownEntryAdd
      }, {
        path: '/HotelGodownEntryDetail',
        name: 'HotelGodownEntryDetail',
        component: HotelGodownEntryDetail
      }, {
        path: '/HotelGodownEntryModify',
        name: 'HotelGodownEntryModify',
        component: HotelGodownEntryModify
      }, {
        path: '/HotelReplenishList',
        name: 'HotelReplenishList',
        component: HotelReplenishList
      }, {
        path: '/HotelClaimGoodsList',
        name: 'HotelClaimGoodsList',
        component: HotelClaimGoodsList
      }, {
        path: '/HotelInformationModify',
        name: 'HotelInformationModify',
        component: HotelInformationModify
      }, {
        path: '/HotelGridList',
        name: 'HotelGridList',
        component: HotelGridList
      }, {
        path: '/HotelCommodityMarketList',
        name: 'HotelCommodityMarketList',
        component: HotelCommodityMarketList
      }, {
        path: '/HotelCommodityMarketAdd',
        name: 'HotelCommodityMarketAdd',
        component: HotelCommodityMarketAdd
      }, {
        path: '/HotelCommodityMarketModify',
        name: 'HotelCommodityMarketModify',
        component: HotelCommodityMarketModify
      }, {
        path: '/HotelOwnCommodityList',
        name: 'HotelOwnCommodityList',
        component: HotelOwnCommodityList
      }, {
        path: '/HotelOwnCommodityAdd',
        name: 'HotelOwnCommodityAdd',
        component: HotelOwnCommodityAdd
      }, {
        path: '/HotelOwnCommodityModify',
        name: 'HotelOwnCommodityModify',
        component: HotelOwnCommodityModify
      }, {
        path: '/HotelOwnCommodityDetail',
        name: 'HotelOwnCommodityDetail',
        component: HotelOwnCommodityDetail
      }, {
        path: '/HotelAllCommodityManage',
        name: 'HotelAllCommodityManage',
        component: HotelAllCommodityManage
      }, {
        path: '/HotelAllCommodityDetail',
        name: 'HotelAllCommodityDetail',
        component: HotelAllCommodityDetail
      }, {
        path: '/HotelFeatureType',
        name: 'HotelFeatureType',
        component: HotelFeatureType
      }, {
        path: '/HotelFeatureTypeAdd',
        name: 'HotelFeatureTypeAdd',
        component: HotelFeatureTypeAdd
      }, {
        path: '/HotelFeatureTypeDetail',
        name: 'HotelFeatureTypeDetail',
        component: HotelFeatureTypeDetail
      }, {
        path: '/HotelFeatureTypeDetailAdd',
        name: 'HotelFeatureTypeDetailAdd',
        component: HotelFeatureTypeDetailAdd
      }, {
        path: '/HotelFeatureTypeDetailModify',
        name: 'HotelFeatureTypeDetailModify',
        component: HotelFeatureTypeDetailModify
      }, {
        path: '/HotelServiceList',
        name: 'HotelServiceList',
        component: HotelServiceList
      }, {
        path: '/HotelServiceAdd',
        name: 'HotelServiceAdd',
        component: HotelServiceAdd
      }, {
        path: '/HotelServiceModify',
        name: 'HotelServiceModify',
        component: HotelServiceModify
      }, {
        path: '/HotelServiceDetail',
        name: 'HotelServiceDetail',
        component: HotelServiceDetail
      }, {
        path: '/HotelServiceCatalogueList',
        name: 'HotelServiceCatalogueList',
        component: HotelServiceCatalogueList
      }, {
        path: '/HotelServiceCatalogueAdd',
        name: 'HotelServiceCatalogueAdd',
        component: HotelServiceCatalogueAdd
      }, {
        path: '/HotelServiceCatalogueModify',
        name: 'HotelServiceCatalogueModify',
        component: HotelServiceCatalogueModify
      }, {
        path: '/HotelServicePicture',
        name: 'HotelServicePicture',
        component: HotelServicePicture
      },
       {
        path: '/HotelServiceSelectList',
        name: 'HotelServiceSelectList',
        component: HotelServiceSelectList
      },
       {
        path: '/HotelServiceSelectAdd',
        name: 'HotelServiceSelectAdd',
        component: HotelServiceSelectAdd
      }, 
      {
        path: '/HotelServiceSelectModify',
        name: 'HotelServiceSelectModify',
        component: HotelServiceSelectModify
      },
       {
        path: '/HotelServiceIconList',
        name: 'HotelServiceIconList',
        component: HotelServiceIconList
      }, 
      {
        path: '/HotelServiceIconAdd',
        name: 'HotelServiceIconAdd',
        component: HotelServiceIconAdd
      },
       {
        path: '/HotelServiceIconModify',
        name: 'HotelServiceIconModify',
        component: HotelServiceIconModify
      }, 
      {
        path: '/HotelServiceBannerList',
        name: 'HotelServiceBannerList',
        component: HotelServiceBannerList
      }, 
      {
        path: '/HotelServiceBannerAdd',
        name: 'HotelServiceBannerAdd',
        component: HotelServiceBannerAdd
      }, 
      {
        path: '/HotelServiceBannerModify',
        name: 'HotelServiceBannerModify',
        component: HotelServiceBannerModify
      },
       {
        path: '/HotelServiceFormList',
        name: 'HotelServiceFormList',
        component: HotelServiceFormList
      },
       {
        path: '/HotelServiceFormAdd',
        name: 'HotelServiceFormAdd',
        component: HotelServiceFormAdd
      },
       {
        path: '/HotelServiceFormModify',
        name: 'HotelServiceFormModify',
        component: HotelServiceFormModify
      },
       {
        path: '/HotelServiceFormIntroduce',
        name: 'HotelServiceFormIntroduce',
        component: HotelServiceFormIntroduce
      }, 
      {
        path: '/HotelServiceOrderDetail',
        name: 'HotelServiceOrderDetail',
        component: HotelServiceOrderDetail
      }, {
        path: '/HotelOwnDeliveryList',
        name: 'HotelOwnDeliveryList',
        component: HotelOwnDeliveryList
      }, {
        path: '/HotelOwnDeliveryDetail',
        name: 'HotelOwnDeliveryDetail',
        component: HotelOwnDeliveryDetail
      }, {
        path: '/HotelServiceDeliveryList',
        name: 'HotelServiceDeliveryList',
        component: HotelServiceDeliveryList
      }, {
        path: '/HotelServiceDeliveryDetail',
        name: 'HotelServiceDeliveryDetail',
        component: HotelServiceDeliveryDetail
      },

      {
        path: '/HotelRevenueStatistics',
        name: 'HotelRevenueStatistics',
        component: HotelRevenueStatistics
      }, 
      {
        path: '/HotelRevenueDetail',
        name: 'HotelRevenueDetail',
        component: HotelRevenueDetail
      }, 
      {
        path: '/HotelFaultManagement',
        name: 'HotelFaultManagement',
        component: HotelFaultManagement
      }, 
      {
        path: '/HotelPurchaseOrderlist',
        name: 'HotelPurchaseOrderlist',
        component: HotelPurchaseOrderlist
      }, {
        path: '/HotelSeepurchaseOrder',
        name: 'HotelSeepurchaseOrder',
        component: HotelSeepurchaseOrder
      }, {
        path: '/HotelPurchaseOrderedit',
        name: 'HotelPurchaseOrderedit',
        component: HotelPurchaseOrderedit
      },
      {
        path: '/HotelDivideInto',
        name: 'HotelDivideInto',
        component: HotelDivideInto
      },
       {
        path: '/HotelWithdrawalsRecord',
        name: 'HotelWithdrawalsRecord',
        component: HotelWithdrawalsRecord
      }, 
      {
        path: '/HotelWithdrawalsRecordDetail',
        name: 'HotelWithdrawalsRecordDetail',
        component: HotelWithdrawalsRecordDetail
      }, 
      {
        path: '/HotelReplenishmentFeeList',
        name: 'HotelReplenishmentFeeList',
        component: HotelReplenishmentFeeList
      },
       {
        path: '/HotelReplenishmentFeeRecordList',
        name: 'HotelReplenishmentFeeRecordList',
        component: HotelReplenishmentFeeRecordList
      }, 
      {
        path: '/checkhotelrecord',
        name: 'checkhotelrecord',
        component: checkhotelrecord
      },
      {
        path: '/hotelrecorddetail',
        name: 'hotelrecorddetail',
        component: hotelrecorddetail,
      }, 
      {
        path: '/Cabinetgl',
        name: 'Cabinetgl',
        component: Cabinetgl,
      }, {
        path: '/Cabinetchange',
        name: 'Cabinetchange',
        component: Cabinetchange,
      }, {
        path: '/Cabinetlook',
        name: 'Cabinetlook',
        component: Cabinetlook,
      }, {
        path: '/replacecabinet',
        name: 'replacecabinet',
        component: replacecabinet,
      },
       {
        path: '/invoicerecord',
        name: 'invoicerecord',
        component: invoicerecord,
      },
      //审核
      {
        path: '/HotelProcessList',
        name: 'HotelProcessList',
        component: HotelProcessList
      }, {
        path: '/HotelProcessDetails',
        name: 'HotelProcessDetails',
        component: HotelProcessDetails
      }, {
        path: '/HotelPendingClaimList',
        name: 'HotelPendingClaimList',
        component: HotelPendingClaimList
      }, {
        path: '/HotelPendingClaimDetails',
        name: 'HotelPendingClaimDetails',
        component: HotelPendingClaimDetails
      }, {
        path: '/HotelPendingReviewList',
        name: 'HotelPendingReviewList',
        component: HotelPendingReviewList
      }, {
        path: '/HotelPendingReviewDetails',
        name: 'HotelPendingReviewDetails',
        component: HotelPendingReviewDetails
      }, {
        path: '/HotelReviewList',
        name: 'HotelReviewList',
        component: HotelReviewList
      }, {
        path: '/HotelReviewDetails',
        name: 'HotelReviewDetails',
        component: HotelReviewDetails
      }, {
        path: '/HotelOrderList',
        name: 'HotelOrderList',
        component: HotelOrderList
      }, {
        path: '/HotelEatinOrderList',
        name: 'HotelEatinOrderList',
        component: HotelEatinOrderList
      }, {
        path: '/HotelOrderDetails',
        name: 'HotelOrderDetails',
        component: HotelOrderDetails
      }, {
        path: '/HotelOrderCouponDetails',
        name: 'HotelOrderCouponDetails',
        component: HotelOrderCouponDetails
      }, {
        path: '/Hotelownprodstock',
        name: 'Hotelownprodstock',
        component: Hotelownprodstock
      }, {
        path: '/Hotelallprodstock',
        name: 'Hotelallprodstock',
        component: Hotelallprodstock
      },
      {
        path: '/Hotelwarehouseadd',
        name: 'Hotelwarehouseadd',
        component: Hotelwarehouseadd
      },
      {
        path: '/Hotelouthouselist',
        name: 'Hotelouthouselist',
        component: Hotelouthouselist
      }, {
        path: '/Hotelouthouseadd',
        name: 'Hotelouthouseadd',
        component: Hotelouthouseadd
      }, {
        path: '/Hotelouthouseedit',
        name: 'Hotelouthouseedit',
        component: Hotelouthouseedit
      }, {
        path: '/Hotelouthousedetail',
        name: 'Hotelouthousedetail',
        component: Hotelouthousedetail
      }, {
        path: '/HotelownprodWarehousing',
        name: 'HotelownprodWarehousing',
        component: HotelownprodWarehousing
      }, {
        path: '/HotelownprodWarehousingcheck',
        name: 'HotelownprodWarehousingcheck',
        component: HotelownprodWarehousingcheck
      }, {
        path: '/HotelownprodWarehousingexamine',
        name: 'HotelownprodWarehousingexamine',
        component: HotelownprodWarehousingexamine
      }, {
        path: '/HotelownprodWarehousingadd',
        name: 'HotelownprodWarehousingadd',
        component: HotelownprodWarehousingadd
      }, {
        path: '/Hotelownprodoutlist',
        name: 'Hotelownprodoutlist',
        component: Hotelownprodoutlist
      }, {
        path: '/Hotelownprodoutcheck',
        name: 'Hotelownprodoutcheck',
        component: Hotelownprodoutcheck
      }, {
        path: '/Hotelownprodouttrial',
        name: 'Hotelownprodouttrial',
        component: Hotelownprodouttrial
      }, {
        path: '/Hotelownprodoutadd',
        name: 'Hotelownprodoutadd',
        component: Hotelownprodoutadd
      }, {
        path: '/allsaleapply',
        name: 'allsaleapply',
        component: allsaleapply
      }, {
        path: '/allsaleapplydetail',
        name: 'allsaleapplydetail',
        component: allsaleapplydetail
      }, {
        path: '/selfaftersalelist',
        name: 'selfaftersalelist',
        component: selfaftersalelist
      }, {
        path: '/selfaftersaledetail',
        name: 'selfaftersaledetail',
        component: selfaftersaledetail
      }, {
        path: '/HotelAccountgMan',
        name: 'HotelAccountgMan',
        component: HotelAccountgMan
      }, {
        path: '/HotelAccountInfo',
        name: 'HotelAccountInfo',
        component: HotelAccountInfo
      }, {
        path: '/HotelDividedetail',
        name: 'HotelDividedetail',
        component: HotelDividedetail
      }, {
        path: '/Hotelgetcashdetail',
        name: 'Hotelgetcashdetail',
        component: Hotelgetcashdetail
      }, {
        path: '/Hotelcheckgetcashdetail',
        name: 'Hotelcheckgetcashdetail',
        component: Hotelcheckgetcashdetail
      },
      //客房预订
      {
        path: '/HotelBookTypeList',
        name: 'HotelBookTypeList',
        component: HotelBookTypeList
      }, {
        path: '/HotelBookTypeAdd',
        name: 'HotelBookTypeAdd',
        component: HotelBookTypeAdd
      }, {
        path: '/HotelBookTypeModify',
        name: 'HotelBookTypeModify',
        component: HotelBookTypeModify
      }, {
        path: '/HotelBookTypeDetail',
        name: 'HotelBookTypeDetail',
        component: HotelBookTypeDetail
      }, {
        path: '/HotelBookResourceList',
        name: 'HotelBookResourceList',
        component: HotelBookResourceList
      }, {
        path: '/HotelBookResourceAdd',
        name: 'HotelBookResourceAdd',
        component: HotelBookResourceAdd
      }, {
        path: '/HotelBookResourceModify',
        name: 'HotelBookResourceModify',
        component: HotelBookResourceModify
      },
      {
        path: '/HotelBookResourceDetail',
        name: 'HotelBookResourceDetail',
        component: HotelBookResourceDetail
      },
      {
        path: '/HotelBookPriceManage',
        name: 'HotelBookPriceManage',
        component: HotelBookPriceManage
      },
      {
        path: '/HotelBookPriceManageList',
        name: 'HotelBookPriceManageList',
        component: HotelBookPriceManageList
      },
      {
        path: '/HotelBookStatusManage',
        name: 'HotelBookStatusManage',
        component: HotelBookStatusManage
      },
      {
        path: '/HotelBookStatusHandleList',
        name: 'HotelBookStatusHandleList',
        component: HotelBookStatusHandleList
      },
      {
        path: '/HotelBookOrderList',
        name: 'HotelBookOrderList',
        component: HotelBookOrderList
      }, {
        path: '/HotelBookOrderDetail',
        name: 'HotelBookOrderDetail',
        component: HotelBookOrderDetail
      }, {
        path: '/HotelWaitDealOrder',
        name: 'HotelWaitDealOrder',
        component: HotelWaitDealOrder
      }, {
        path: '/HotelWaitOrderdetail',
        name: 'HotelWaitOrderdetail',
        component: HotelWaitOrderdetail
      },
      {
        path: '/HotelAllOrderList',
        name: 'HotelAllOrderList',
        component: HotelAllOrderList
      }, 
      {
        path: '/HotelAllOrderDetail',
        name: 'HotelAllOrderDetail',
        component: HotelAllOrderDetail
      },
      //酒店文化
      {
        path: '/HotelCultureList',
        name: 'HotelCultureList',
        component: HotelCultureList
      }, {
        path: '/HotelCultureAdd',
        name: 'HotelCultureAdd',
        component: HotelCultureAdd
      }, {
        path: '/HotelCultureModify',
        name: 'HotelCultureModify',
        component: HotelCultureModify
      }, {
        path: '/HotelCultureDetail',
        name: 'HotelCultureDetail',
        component: HotelCultureDetail
      }, {
        path: '/HotelCultureDetailAdd',
        name: 'HotelCultureDetailAdd',
        component: HotelCultureDetailAdd
      }, {
        path: '/HotelCultureDetailModify',
        name: 'HotelCultureDetailModify',
        component: HotelCultureDetailModify
      }, {
        path: '/HotelAllInvoiceList',
        name: 'HotelAllInvoiceList',
        component: HotelAllInvoiceList
      }, {
        path: '/HotelAllInvoiceDetail',
        name: 'HotelAllInvoiceDetail',
        component: HotelAllInvoiceDetail
      }, {
        path: '/HotelMinibarProdList',
        name: 'HotelMinibarProdList',
        component: HotelMinibarProdList
      }, {
        path: '/HotelMinibarProdAdd',
        name: 'HotelMinibarProdAdd',
        component: HotelMinibarProdAdd
      }, {
        path: '/HotelMinibarProdModify',
        name: 'HotelMinibarProdModify',
        component: HotelMinibarProdModify
      }, {
        path: '/HotelCabCommodityManage',
        name: 'HotelCabCommodityManage',
        component: HotelCabCommodityManage
      }, {
        path: '/HotelCabCommodityModify',
        name: 'HotelCabCommodityModify',
        component: HotelCabCommodityModify
      }, {
        path: '/HotelFunctionList',
        name: 'HotelFunctionList',
        component: HotelFunctionList
      }, {
        path: '/HotelFunctionModify',
        name: 'HotelFunctionModify',
        component: HotelFunctionModify
      }, {
        path: '/HotelFunctionDetail',
        name: 'HotelFunctionDetail',
        component: HotelFunctionDetail
      }, {
        path: '/HotelFunctionClassify',
        name: 'HotelFunctionClassify',
        component: HotelFunctionClassify
      }, {
        path: '/HotelFunctionProdList',
        name: 'HotelFunctionProdList',
        component: HotelFunctionProdList
      }, {
        path: '/HotelFunctionProdAdd',
        name: 'HotelFunctionProdAdd',
        component: HotelFunctionProdAdd
      }, {
        path: '/HotelFunctionProdModify',
        name: 'HotelFunctionProdModify',
        component: HotelFunctionProdModify
      }, {
        path: '/HotelFunctionProdDetail',
        name: 'HotelFunctionProdDetail',
        component: HotelFunctionProdDetail
      }, {
        path: '/VirtualCabinetAdd',
        name: 'VirtualCabinetAdd',
        component: VirtualCabinetAdd
      }, {
        path: '/VirtualCabinetChange',
        name: 'VirtualCabinetChange',
        component: VirtualCabinetChange
      }, {
        path: '/VirtualCabinetConfiguration',
        name: 'VirtualCabinetConfiguration',
        component: VirtualCabinetConfiguration
      }, {
        path: '/HotelExpressTemplate',
        name: 'HotelExpressTemplate',
        component: HotelExpressTemplate
      }, {
        path: '/HotelExpressAdd',
        name: 'HotelExpressAdd',
        component: HotelExpressAdd
      }, {
        path: '/HotelExpressChange',
        name: 'HotelExpressChange',
        component: HotelExpressChange
      }, {
        path: '/HotelProdCouponBatch',
        name: 'HotelProdCouponBatch',
        component: HotelProdCouponBatch
      }, {
        path: '/HotelProdCouponBatchAdd',
        name: 'HotelProdCouponBatchAdd',
        component: HotelProdCouponBatchAdd
      }, {
        path: '/HotelCoupondia',
        name: 'HotelCoupondia',
        component: HotelCoupondia
      }, {
        path: '/HotelProdCouponBatchEdit',
        name: 'HotelProdCouponBatchEdit',
        component: HotelProdCouponBatchEdit
      }, {
        path: '/HotelProdCouponBatchCheck',
        name: 'HotelProdCouponBatchCheck',
        component: HotelProdCouponBatchCheck
      }, {
        path: '/HotelProdCouponGroup',
        name: 'HotelProdCouponGroup',
        component: HotelProdCouponGroup
      }, {
        path: '/HotelAllCouponGroupAdd',
        name: 'HotelAllCouponGroupAdd',
        component: HotelAllCouponGroupAdd
      }, {
        path: '/HotelProdCouponGroupEdit',
        name: 'HotelProdCouponGroupEdit',
        component: HotelProdCouponGroupEdit
      }, {
        path: '/HotelCouponList',
        name: 'HotelCouponList',
        component: HotelCouponList
      }, {
        path: '/HotelCouponSendRecord',
        name: 'HotelCouponSendRecord',
        component: HotelCouponSendRecord
      }, {
        path: '/HotelReportOverdueProd',
        name: 'HotelReportOverdueProd',
        component: HotelReportOverdueProd
      }, {
        path: '/HotelReportOrderAll',
        name: 'HotelReportOrderAll',
        component: HotelReportOrderAll
      },
      {
        path: '/HotelOwnProdSpecsList',
        name: 'HotelOwnProdSpecsList',
        component: HotelOwnProdSpecsList
      }, 
      {
        path: '/HotelOwnProdSpecsAdd',
        name: 'HotelOwnProdSpecsAdd',
        component: HotelOwnProdSpecsAdd
      }, 
      {
        path: '/HotelOwnProdSpecsModify',
        name: 'HotelOwnProdSpecsModify',
        component: HotelOwnProdSpecsModify
      },
       {
        path: '/HotelOwnProdSpecsDetail',
        name: 'HotelOwnProdSpecsDetail',
        component: HotelOwnProdSpecsDetail
      },
       {
        path: '/HotelFunctionSpecsList',
        name: 'HotelFunctionSpecsList',
        component: HotelFunctionSpecsList
      },
       {
        path: '/HotelFunctionSpecsAdd',
        name: 'HotelFunctionSpecsAdd',
        component: HotelFunctionSpecsAdd
      }, 
      {
        path: '/HotelFunctionSpecsModify',
        name: 'HotelFunctionSpecsModify',
        component: HotelFunctionSpecsModify
      }, 
      {
        path: '/HotelFunctionSpecsDetail',
        name: 'HotelFunctionSpecsDetail',
        component: HotelFunctionSpecsDetail
      }, 
      {
        path: '/HotelCardticketList',
        name: 'HotelCardticketList',
        component: HotelCardticketList
      }, {
        path: '/HotelCardticketAdd',
        name: 'HotelCardticketAdd',
        component: HotelCardticketAdd
      }, {
        path: '/HotelselfTakingList',
        name: 'HotelselfTakingList',
        component: HotelselfTakingList
      }, {
        path: '/HotelselfTakingAdd',
        name: 'HotelselfTakingAdd',
        component: HotelselfTakingAdd
      }, {
        path: '/HotelselfTakingEdit',
        name: 'HotelselfTakingEdit',
        component: HotelselfTakingEdit
      }, {
        path: '/HotelselfTakingDetail',
        name: 'HotelselfTakingDetail',
        component: HotelselfTakingDetail
      }, {
        path: '/HotelCardticketEdit',
        name: 'HotelCardticketEdit',
        component: HotelCardticketEdit
      }, {
        path: '/HotelCardticketDetail',
        name: 'HotelCardticketDetail',
        component: HotelCardticketDetail
      }, {
        path: '/HotelCardCouponList',
        name: 'HotelCardCouponList',
        component: HotelCardCouponList
      }, {
        path: '/HotelCardCouponDetail',
        name: 'HotelCardCouponDetail',
        component: HotelCardCouponDetail
      }, {
        path: '/HotelCardCouponRecord',
        name: 'HotelCardCouponRecord',
        component: HotelCardCouponRecord
      }, {
        path: '/VirtualCabinetDetail',
        name: 'VirtualCabinetDetail',
        component: VirtualCabinetDetail
      }, {
        path: '/HotelWaiteEntryRecord',
        name: 'HotelWaiteEntryRecord',
        component: HotelWaiteEntryRecord
      }, {
        path: '/HotelWaiteEntryRecordDetail',
        name: 'HotelWaiteEntryRecordDetail',
        component: HotelWaiteEntryRecordDetail
      }, {
        path: '/HotelEntryRecord',
        name: 'HotelEntryRecord',
        component: HotelEntryRecord
      }, {
        path: '/HotelEntryRecordDetail',
        name: 'HotelEntryRecordDetail',
        component: HotelEntryRecordDetail
      }, {
        path: '/HotelADList',
        name: 'HotelADList',
        component: HotelADList
      }, {
        path: '/HotelADAdd',
        name: 'HotelADAdd',
        component: HotelADAdd
      }, {
        path: '/HotelADModify',
        name: 'HotelADModify',
        component: HotelADModify
      }, {
        path: '/HotelADDetail',
        name: 'HotelADDetail',
        component: HotelADDetail
      }, {
        path: '/HotelADQuoteDetail',
        name: 'HotelADQuoteDetail',
        component: HotelADQuoteDetail

      }, {
        path: '/HotelCustomerList',
        name: 'HotelCustomerList',
        component: HotelCustomerList
      }, {
        path: '/HotelCustomerManage',
        name: 'HotelCustomerManage',
        component: HotelCustomerManage
      }, {
        path: '/HotelCustomerManageDetail',
        name: 'HotelCustomerManageDetail',
        component: HotelCustomerManageDetail
      }, {
        path: '/HotelStaffManage',
        name: 'HotelStaffManage',
        component: HotelStaffManage
      }, {
        path: '/HotelStaffManageDetail',
        name: 'HotelStaffManageDetail',
        component: HotelStaffManageDetail
      }, {
        path: '/HotelCustomerAccess',
        name: 'HotelCustomerAccess',
        component: HotelCustomerAccess
      }, {
        path: '/HotelCustomerAccessDetail',
        name: 'HotelCustomerAccessDetail',
        component: HotelCustomerAccessDetail
      }, {
        path: '/HotelCustomerOrder',
        name: 'HotelCustomerOrder',
        component: HotelCustomerOrder
      }, {
        path: '/HotelEmployeeList',
        name: 'HotelEmployeeList',
        component: HotelEmployeeList
      }, {
        path: '/HotelEmpRetailRecord',
        name: 'HotelEmpRetailRecord',
        component: HotelEmpRetailRecord
      }, {
        path: '/HotelOrderRecord',
        name: 'HotelOrderRecord',
        component: HotelOrderRecord
      }, {
        path: '/HotelRetailRecord',
        name: 'HotelRetailRecord',
        component: HotelRetailRecord
      }, {
        path: '/HotelShareRecord',
        name: 'HotelShareRecord',
        component: HotelShareRecord
      }, {
        path: '/HotelVisitRecord',
        name: 'HotelVisitRecord',
        component: HotelVisitRecord
      }, {
        path: '/HotelActivityAdd',
        name: 'HotelActivityAdd',
        component: HotelActivityAdd
      }, {
        path: '/HotelActivityChange',
        name: 'HotelActivityChange',
        component: HotelActivityChange
      },
      {
        path: '/HotelActivityDef',
        name: 'HotelActivityDef',
        component: HotelActivityDef
      },
      {
        path: '/HotelActivityDetail',
        name: 'HotelActivityDetail',
        component: HotelActivityDetail
      },
      {
        path: '/HotelActivityList',
        name: 'HotelActivityList',
        component: HotelActivityList
      },
       {
        path: '/HotelActivityRecord',
        name: 'HotelActivityRecord',
        component: HotelActivityRecord
      },
       {
        path: '/HotelActRedpackDef',
        name: 'HotelActRedpackDef',
        component: HotelActRedpackDef
      },
       {
        path: '/HotelActShareDef',
        name: 'HotelActShareDef',
        component: HotelActShareDef
      }, 
      {
        path: '/HotelRedpackDetail',
        name: 'HotelRedpackDetail',
        component: HotelRedpackDetail
      }, {
        path: '/HotelRedPackShareRE',
        name: 'HotelRedPackShareRE',
        component: HotelRedPackShareRE
      }, {
        path: '/HotelRedPackGetRecord',
        name: 'HotelRedPackGetRecord',
        component: HotelRedPackGetRecord
      }, {
        path: '/HotelRedPackTotal',
        name: 'HotelRedPackTotal',
        component: HotelRedPackTotal
      },
       {
        path: '/HotelActSecondHalf',
        name: 'HotelActSecondHalf',
        component: HotelActSecondHalf
      },
      {
        path: '/HotelRedPackList',
        name: 'HotelRedPackList',
        component: HotelRedPackList
      },
       {
        path: '/HotelActivityMeeting',
        name: 'HotelActivityMeeting',
        component: HotelActivityMeeting
      },
      {
        path: '/HotelActivityMeetingDetail',
        name: 'HotelActivityMeetingDetail',
        component: HotelActivityMeetingDetail
      }, {
        path: '/HotelActivityMeetingRecords',
        name: 'HotelActivityMeetingRecords',
        component: HotelActivityMeetingRecords
      }, {

        path: '/HotelFunctionLeadAdd',
        name: 'HotelFunctionLeadAdd',
        component: HotelFunctionLeadAdd
      }, {
        path: '/HotelFunctionLeadChange',
        name: 'HotelFunctionLeadChange',
        component: HotelFunctionLeadChange
      }, {
        path: '/HotelFunctionLeadDetail',
        name: 'HotelFunctionLeadDetail',
        component: HotelFunctionLeadDetail
      }, {
        path: '/HotelFunctionLeadList',
        name: 'HotelFunctionLeadList',
        component: HotelFunctionLeadList

      }, {
        path: '/HotelContactAdd',
        name: 'HotelContactAdd',
        component: HotelContactAdd
      }, {
        path: '/HotelContactChange',
        name: 'HotelContactChange',
        component: HotelContactChange
      }, {
        path: '/HotelContactDetail',
        name: 'HotelContactDetail',
        component: HotelContactDetail
      }, {
        path: '/HotelContactList',
        name: 'HotelContactList',
        component: HotelContactList
      },
      //功能区房源管理
      {
        path: '/HotelFunctionHouseResourceList',
        name: 'HotelFunctionHouseResourceList',
        component: HotelFunctionHouseResourceList
      },
      {
        path: '/HotelFunctionHouseResourceAdd',
        name: 'HotelFunctionHouseResourceAdd',
        component: HotelFunctionHouseResourceAdd
      },
      {
        path: '/HotelFunctionHouseResourceEdit',
        name: 'HotelFunctionHouseResourceEdit',
        component: HotelFunctionHouseResourceEdit
      },
      {
        path: '/HotelFunctionHouseResourceDetail',
        name: 'HotelFunctionHouseResourceDetail',
        component: HotelFunctionHouseResourceDetail
      },
      //消息通知
      {
        path: '/HotelMarketingSMS',
        name: 'HotelMarketingSMS',
        component: HotelMarketingSMS
      },
      {
        path: '/HotelMarketingTexting',
        name: 'HotelMarketingTexting',
        component: HotelMarketingTexting
      },
      {
        path: '/HotelMarketingDetail',
        name: 'HotelMarketingDetail',
        component: HotelMarketingDetail
      }, {
        path: '/HotelEnterprisesCodeList',
        name: 'HotelEnterprisesCodeList',
        component: HotelEnterprisesCodeList
      }, {
        path: '/HotelEnterprisesCodeDetail',
        name: 'HotelEnterprisesCodeDetail',
        component: HotelEnterprisesCodeDetail
      }, {
        path: '/HotelEnterprisesRoomsList',
        name: 'HotelEnterprisesRoomsList',
        component: HotelEnterprisesRoomsList
      }, {
        path: '/HotelEnterprisesRoomsDetail',
        name: 'HotelEnterprisesRoomsDetail',
        component: HotelEnterprisesRoomsDetail
      }, {
        path: '/HotelEnterprisesRoomsChange',
        name: 'HotelEnterprisesRoomsChange',
        component: HotelEnterprisesRoomsChange
      }, {
        path: '/HotelEnterprisesRoomsAdd',
        name: 'HotelEnterprisesRoomsAdd',
        component: HotelEnterprisesRoomsAdd
      }, {
        path: '/HotelEnterprisesList',
        name: 'HotelEnterprisesList',
        component: HotelEnterprisesList
      }, {
        path: '/HotelEnterprisesDetail',
        name: 'HotelEnterprisesDetail',
        component: HotelEnterprisesDetail
      }, {
        path: '/HotelEnterprisesChange',
        name: 'HotelEnterprisesChange',
        component: HotelEnterprisesChange
      }, {
        path: '/HotelEnterprisesAdd',
        name: 'HotelEnterprisesAdd',
        component: HotelEnterprisesAdd
      }, {
        path: '/HotelEnterprisesCodeOrderList',
        name: 'HotelEnterprisesCodeOrderList',
        component: HotelEnterprisesCodeOrderList
      }, {
        path: '/HotelAdaptPriceList',
        name: 'HotelAdaptPriceList',
        component: HotelAdaptPriceList
      }, {
        path: '/HotelAdaptPriceOrderList',
        name: 'HotelAdaptPriceOrderList',
        component: HotelAdaptPriceOrderList
      }, {
        path: '/CabinetDetail',
        name: 'CabinetDetail',
        component: CabinetDetail
      }, {
        path: '/HotelActivityScanCode',
        name: 'HotelActivityScanCode',
        component: HotelActivityScanCode
      }, {
        path: '/HotelActivityScanRecord',
        name: 'HotelActivityScanRecord',
        component: HotelActivityScanRecord
      }, {
        path: '/CabinetAdd',
        name: 'CabinetAdd',
        component: CabinetAdd
      },

      ]
    }
  ]
})
