import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import HomePage from '@/pages/HomePage'
import index from '@/components/index'
// import LonganUserList from '@/components/LonganUserList'
// import LonganUserAdd from '@/components/LonganUserAdd'
// import LonganUserModify from '@/components/LonganUserModify'
import LonganHotelList from '@/components/LonganHotelList'
import LonganHotelAdd from '@/components/LonganHotelAdd'
import LonganHotelDetail from '@/components/LonganHotelDetail'
import LonganHotelModify from '@/components/LonganHotelModify'
import LonganHotelGridList from '@/components/LonganHotelGridList'
import LonganHotelProtocolList from '@/components/LonganHotelProtocolList'
import LonganHotelProtocolAdd from '@/components/LonganHotelProtocolAdd'
import LonganHotelProtocolDetail from '@/components/LonganHotelProtocolDetail'
import LonganHotelPlatCommodityList from '@/components/LonganHotelPlatCommodityList'
import LonganHotelPlatCommodityAdd from '@/components/LonganHotelPlatCommodityAdd'
import LonganHotelPlatCommodityModify from '@/components/LonganHotelPlatCommodityModify'
import LonganHotelPlatCommodityDetail from '@/components/LonganHotelPlatCommodityDetail'
import LonganHotelCommodityMarketList from '@/components/LonganHotelCommodityMarketList'
import LonganHotelCommodityMarketAdd from '@/components/LonganHotelCommodityMarketAdd'
import LonganHotelCommodityMarketModify from '@/components/LonganHotelCommodityMarketModify'
import LonganHotelAllCommodityList from '@/components/LonganHotelAllCommodityList'
import LonganHotelAllCommodityModify from '@/components/LonganHotelAllCommodityModify'
import LonganHotelAllCommodityDetail from '@/components/LonganHotelAllCommodityDetail'
import CommodityList from '@/components/CommodityList'
import CommodityAdd from '@/components/CommodityAdd'
import Commodityedit from '@/components/Commodityedit'
import LonganAllCommodityManage from '@/components/LonganAllCommodityManage'
import LonganAllCommodityDetail from '@/components/LonganAllCommodityDetail'
import LonganPlatformCommodityList from '@/components/LonganPlatformCommodityList'
import LonganPlatformCommodityAdd from '@/components/LonganPlatformCommodityAdd'
import LonganPlatformCommodityModify from '@/components/LonganPlatformCommodityModify'
import LonganPlatformCommodityDetail from '@/components/LonganPlatformCommodityDetail'
import LonganCommodityStatisticsList from '@/components/LonganCommodityStatisticsList'
import LonganCommodityStatisticsAdd from '@/components/LonganCommodityStatisticsAdd'
import LonganCommodityStatisticsModify from '@/components/LonganCommodityStatisticsModify'
import LonganCommodityMarketTemplateList from '@/components/LonganCommodityMarketTemplateList'
import LonganCommodityMarketTemplateAdd from '@/components/LonganCommodityMarketTemplateAdd'
import LonganCommodityMarketTemplateModify from '@/components/LonganCommodityMarketTemplateModify'
import Cabinetgl from '@/components/Cabinetgl'
import Cabinetchange from '@/components/Cabinetchange'
import Cabinetlook from '@/components/Cabinetlook'
import LonganReplenishList from '@/components/LonganReplenishList'
import LonganCabTypeList from '@/components/LonganCabTypeList'
import LonganCabTypeListAdd from '@/components/LonganCabTypeListAdd'
import LonganCabTypeEdit from '@/components/LonganCabTypeEdit'
import LonganCabTypeDetail from '@/components/LonganCabTypeDetail'
import VirtualCabinetConfiguration from '@/components/VirtualCabinetConfiguration'
import VirtualCabinetAdd from '@/components/VirtualCabinetAdd'
import VirtualCabinetChange from '@/components/VirtualCabinetChange'
import PurchaseOrderlist from '@/components/PurchaseOrderlist'
import PurchaseOrderadd from '@/components/PurchaseOrderadd'
import PurchaseOrderedit from '@/components/PurchaseOrderedit'
import SeepurchaseOrder from '@/components/SeepurchaseOrder'
import hotelrecorddetail from '@/components/hotelrecorddetail'
import hotelskinlist from '@/components/hotelskinlist'
import hotelskinadd from '@/components/hotelskinadd'
import hotelskinmodify from '@/components/hotelskinmodify'
import invoicerecord from '@/components/invoicerecord'
import replacecabinet from '@/components/replacecabinet'
// import  { PrivilegeUserAdd, PrivilegeUserModify } from 'user-privilege-management'
import LonganPrivilegeUserList from '@/components/LonganPrivilegeUserList'
import LonganPrivilegeUserAdd from '@/components/LonganPrivilegeUserAdd'
import LonganPrivilegeUserModify from '@/components/LonganPrivilegeUserModify'
import LonganPrivilegeRoleList from '@/components/LonganPrivilegeRoleList'
import LonganPrivilegeRoleAdd from '@/components/LonganPrivilegeRoleAdd'
import LonganPrivilegeRoleModify from '@/components/LonganPrivilegeRoleModify'
import LonganPrivilegeUpdateUserInfo from '@/components/LonganPrivilegeUpdateUserInfo'
import LonganPrivilegeUpdatePWD from '@/components/LonganPrivilegeUpdatePWD'
import LonganStaffManage from '@/components/LonganStaffManage'
import LonganCustomerManage from '@/components/LonganCustomerManage'
import LonganCustomerWithdrawRecord from '@/components/LonganCustomerWithdrawRecord'

import LonganHotelCommodityList from '@/components/LonganHotelCommodityList'
import LonganHotelCommodityModify from '@/components/LonganHotelCommodityModify'
import LonganHotelCabinetList from '@/components/LonganHotelCabinetList'
import LonganHotelCommodityAdd from '@/components/LonganHotelCommodityAdd'
import LonganHotelCabinetModify from '@/components/LonganHotelCabinetModify'
import LonganInventoryList from '@/components/LonganInventoryList'
import LonganGodownEntryList from '@/components/LonganGodownEntryList'
import LonganGodownEntryDetail from '@/components/LonganGodownEntryDetail'
import LonganGodownEntryAudit from '@/components/LonganGodownEntryAudit'
import LonganCommonFeature from '@/components/LonganCommonFeature'
import LonganCommonFeatureAdd from '@/components/LonganCommonFeatureAdd'
import LonganCommonFeatureModify from '@/components/LonganCommonFeatureModify'
import LonganHotelFeature from '@/components/LonganHotelFeature'
import LonganHotelFeatureAdd from '@/components/LonganHotelFeatureAdd'
import LonganHotelFeatureDetail from '@/components/LonganHotelFeatureDetail'
import LonganHotelFeatureDetailAdd from '@/components/LonganHotelFeatureDetailAdd'
import LonganHotelFeatureDetailModify from '@/components/LonganHotelFeatureDetailModify'
import LonganPlatDeliveryList from '@/components/LonganPlatDeliveryList'
import LonganPlatDeliveryDetail from '@/components/LonganPlatDeliveryDetail'
import LonganAllDeliveryList from '@/components/LonganAllDeliveryList'
import LonganAllDeliveryDetail from '@/components/LonganAllDeliveryDetail'
import LonganRevenueStatistics from '@/components/LonganRevenueStatistics'
import LonganRevenueDetail from '@/components/LonganRevenueDetail'
import LonganOperationAnalysis from '@/components/LonganOperationAnalysis'
import LonganOperationAnalysisDetail from '@/components/LonganOperationAnalysisDetail'
import LonganDeclarationForm from '@/components/LonganDeclarationForm'
import LonganAbnormalStateOfCabinet from '@/components/LonganAbnormalStateOfCabinet'
import LonganDivideInto from '@/components/LonganDivideInto'
import LonganWithdrawalsRecord from '@/components/LonganWithdrawalsRecord'
import LonganWithdrawalsRecordDetail from '@/components/LonganWithdrawalsRecordDetail'
import LonganWithdrawalsRecordHandle from '@/components/LonganWithdrawalsRecordHandle'
import LonganReplenishmentFee from '@/components/LonganReplenishmentFee'
import LonganReplenishmentFeeDiscount from '@/components/LonganReplenishmentFeeDiscount'
import LonganFinancialCost from '@/components/LonganFinancialCost'
import LonganHotelAfterSale from '@/components/LonganHotelAfterSale'
import allsaleapply from '@/components/allsaleapply'
import allsaleapplydetail from '@/components/allsaleapplydetail'
import platformaftersale from '@/components/platformaftersale'
import platformaftersaledetail from '@/components/platformaftersaledetail'
import LonganMerchant from '@/components/LonganMerchant'
import LonganMerchantadd from '@/components/LonganMerchantadd'
import LonganMerchantchange from '@/components/LonganMerchantchange'
import LonganSupplierApply from '@/components/LonganSupplierApply'
import LonganSupplierDetail from '@/components/LonganSupplierDetail'
import LonganOrderList from '@/components/LonganOrderList'
import LonganOrderProductDetails from '@/components/LonganOrderProductDetails'
import LonganOrderDeliveryDetails from '@/components/LonganOrderDeliveryDetails'
import LonganOrderCouponDetails from '@/components/LonganOrderCouponDetails'
import LonganOrderDetails from '@/components/LonganOrderDetails'
//Header
import LonganOperator from '@/components/LonganOperator'
//审核
import LonganProcessList from '@/components/LonganProcessList'
import LonganProcessDetails from '@/components/LonganProcessDetails'
import LonganPendingClaimList from '@/components/LonganPendingClaimList'
import LonganPendingClaimDetails from '@/components/LonganPendingClaimDetails'
import LonganPendingReviewList from '@/components/LonganPendingReviewList'
import LonganPendingReviewDetails from '@/components/LonganPendingReviewDetails'
import LonganReviewList from '@/components/LonganReviewList'
import LonganReviewDetails from '@/components/LonganReviewDetails'
//茶叶商品
import TeashopTeaList from '@/components/TeashopTeaList'
import TeashopTeaAdd from '@/components/TeashopTeaAdd'
import TeashopTeaModify from '@/components/TeashopTeaModify'
import TeashopTeaDetail from '@/components/TeashopTeaDetail'
import TeashopOrderManage from '@/components/TeashopOrderManage'
import TeashopOrderDetail from '@/components/TeashopOrderDetail'
import TeashopMembercardList from '@/components/TeashopMembercardList'
import TeashopMembercardAdd from '@/components/TeashopMembercardAdd'
import TeashopMembercardModify from '@/components/TeashopMembercardModify'
import TeashopMembercardDetail from '@/components/TeashopMembercardDetail'
import TeashopMemberManage from '@/components/TeashopMemberManage'
import TeashopMemberDetail from '@/components/TeashopMemberDetail'
import TeashopCommonUserManage from '@/components/TeashopCommonUserManage'
//库存
import HotelPlatformInventory from '@/components/HotelPlatformInventory'
import hotelproInventorylist from '@/components/hotelproInventorylist'
import PlatformenterOrderlist from '@/components/PlatformenterOrderlist'
import PlatformenterOrderdetail from '@/components/PlatformenterOrderdetail'
import PlatformoutOrderlist from '@/components/PlatformoutOrderlist'
import PlatformoutOrderdetail from '@/components/PlatformoutOrderdetail'
import allenterorderlist from '@/components/allenterorderlist'
import allenterorderdetail from '@/components/allenterorderdetail'
import alloutorderlist from '@/components/alloutorderlist'
import alloutorderdetail from '@/components/alloutorderdetail'
//加盟商管理
import LonganFranchiseelist from '@/components/LonganFranchiseelist'
import LonganFranchiseeadd from '@/components/LonganFranchiseeadd'
import LonganFranchiseeedit from '@/components/LonganFranchiseeedit'
import LonganFranchiseeedetail from '@/components/LonganFranchiseeedetail'
import LonganFranchiseehotellist from '@/components/LonganFranchiseehotellist'
import LonganFranchiseehoteladd from '@/components/LonganFranchiseehoteladd'
import LonganFranchiseehoteldetail from '@/components/LonganFranchiseehoteldetail'
import LonganAccountlist from '@/components/LonganAccountlist'
import LonganOrgAccountlist from '@/components/LonganOrgAccountlist'
import LonganOrganDivide from '@/components/LonganOrganDivide'
import LonganClassifyDivide from '@/components/LonganClassifyDivide'
import LonganDetailedDivide from '@/components/LonganDetailedDivide'
import LonganCarryDetail from '@/components/LonganCarryDetail'
import LongancheckCarryDetail from '@/components/LongancheckCarryDetail'
import LonganAccountHandle from '@/components/LonganAccountHandle'
import LonganChoiceCabinet from '@/components/LonganChoiceCabinet'
//评价管理
import LonganDefEvaluate from '@/components/LonganDefEvaluate'
import LonganDefEvaluateAdd from '@/components/LonganDefEvaluateAdd'
import LonganDefEvaluateEdit from '@/components/LonganDefEvaluateEdit'
import LonganDefEvaluateDetail from '@/components/LonganDefEvaluateDetail'
import LonganHotelEvaluate from '@/components/LonganHotelEvaluate'
import LonganHotelEvalDetail from '@/components/LonganHotelEvalDetail'
import LonganPartnerSetup from '@/components/LonganPartnerSetup'
//客房预订
import LonganBookType from '@/components/LonganBookType'
import LonganBookTypeDetail from '@/components/LonganBookTypeDetail'
import LonganBookResource from '@/components/LonganBookResource'
import LonganBookResourceDetail from '@/components/LonganBookResourceDetail'
import LonganBookPrice from '@/components/LonganBookPrice'
import LonganBookStatus from '@/components/LonganBookStatus'
import LonganBookOrder from '@/components/LonganBookOrder'
import LonganBookOrderDetail from '@/components/LonganBookOrderDetail'
//配送管理
import LonganAllDelivery from '@/components/LonganAllDelivery'
import LonganGuestMiniDelidetail from '@/components/LonganGuestMiniDelidetail'
import LonganALLDelidetail from '@/components/LonganALLDelidetail'
//酒店文化
import LonganHotelCultureList from '@/components/LonganHotelCultureList'
import LonganHotelCultureAdd from '@/components/LonganHotelCultureAdd'
import LonganHotelCultureModify from '@/components/LonganHotelCultureModify'
import LonganHotelCultureDetail from '@/components/LonganHotelCultureDetail'
import LonganHotelCultureDetailAdd from '@/components/LonganHotelCultureDetailAdd'
import LonganHotelCultureDetailModify from '@/components/LonganHotelCultureDetailModify'
//商品销售发票税率
import LonganInvoiceRateList from '@/components/LonganInvoiceRateList'
import LonganInvoiceRateAdd from '@/components/LonganInvoiceRateAdd'
import LonganInvoiceRateModify from '@/components/LonganInvoiceRateModify'
//开票管理
import LonganWaitInvoiceProdList from '@/components/LonganWaitInvoiceProdList'
import LonganWaitInvoiceProdDetail from '@/components/LonganWaitInvoiceProdDetail'
import LonganAllInvoiceList from '@/components/LonganAllInvoiceList'
import LonganAllInvoiceDetail from '@/components/LonganAllInvoiceDetail'
//故障管理
import LonganMalfunctionManage from '@/components/LonganMalfunctionManage'
//酒店功能区
import LonganHotelFunctionList from '@/components/LonganHotelFunctionList'
import LonganHotelFunctionAdd from '@/components/LonganHotelFunctionAdd'
import LonganHotelFunctionModify from '@/components/LonganHotelFunctionModify'
import LonganHotelFunctionDetail from '@/components/LonganHotelFunctionDetail'
import LonganHotelFunctionClassify from '@/components/LonganHotelFunctionClassify'
//酒店功能区商品管理
import LonganFunctionProdList from '@/components/LonganFunctionProdList'
import LonganFunctionProdAdd from '@/components/LonganFunctionProdAdd'
import LonganFunctionProdModify from '@/components/LonganFunctionProdModify'
import LonganFunctionProdDetail from '@/components/LonganFunctionProdDetail'
//酒店迷你吧商品管理
import LonganMinibarProdList from '@/components/LonganMinibarProdList'
import LonganMinibarProdAdd from '@/components/LonganMinibarProdAdd'
import LonganMinibarProdModify from '@/components/LonganMinibarProdModify'
//快递费模板
import LonganExpressTemplate from '@/components/LonganExpressTemplate'
import LonganExpressAdd from '@/components/LonganExpressAdd'
import LonganExpressChange from '@/components/LonganExpressChange'

//消息模板
import LonganMessagelist from '@/components/LonganMessagelist'
import LonganmessageTest from '@/components/LonganmessageTest'
import LonganWaitSendMessage from '@/components/LonganWaitSendMessage'
import LonganSendMessage from '@/components/LonganSendMessage'
import LonganContentTemp from '@/components/LonganContentTemp'
//财运星
import LaunchCabinetManagement from '@/components/LaunchCabinetManagement'
import LauncherManagement from '@/components/LauncherManagement'
import LaunchHotelManagement from '@/components/LaunchHotelManagement'
import LaunchHotelAdd from '@/components/LaunchHotelAdd'
import LaunchHotelChange from '@/components/LaunchHotelChange'
import LaunchCabinetAdd from '@/components/LaunchCabinetAdd'
import LaunchCabinetChange from '@/components/LaunchCabinetChange'
import LonganCabinetType from '@/components/LonganCabinetType'
import LonganCabinetTypeAdd from '@/components/LonganCabinetTypeAdd'
import LonganCabinetTypeChange from '@/components/LonganCabinetTypeChange'
import LonganFsData from '@/components/LonganFsData'

import LauncherbounceRecords from '@/components/LauncherbounceRecords'
import LauncherinvestorCabinet from '@/components/LauncherinvestorCabinet'
import LauncherinvestorOrder from '@/components/LauncherinvestorOrder'
import LauncherlookRecords from '@/components/LauncherlookRecords'
import LonganMemberRewards from '@/components/LonganMemberRewards'
import longanWithdraw from '@/components/longanWithdraw'

//会员管理
import LonganMemberAdd from '@/components/LonganMemberAdd'
import LonganMemberChange from '@/components/LonganMemberChange'
import LonganMemberList from '@/components/LonganMemberList'
import LonganMemberComRecords from '@/components/LonganMemberComRecords'
import LonganMemberCom from '@/components/LonganMemberCom'
import LonganRebackMoney from '@/components/LonganRebackMoney'
//渠道管理
import LonganChannelList from '@/components/LonganChannelList'
import LonganChannelAdd from '@/components/LonganChannelAdd'
import LonganChannelModify from '@/components/LonganChannelModify'
import LonganChannelShareLink from '@/components/LonganChannelShareLink'
import LonganChannelPartner from '@/components/LonganChannelPartner'
//红包管理
import LonganRedPacketList from '@/components/LonganRedPacketList'
//控制板物联卡
import LonganIotCardList from '@/components/LonganIotCardList'
//优惠券
import LonganPlatformCoupon from '@/components/LonganPlatformCoupon'
import LonganPlatformCouponAdd from '@/components/LonganPlatformCouponAdd'
import LonganCoupondia from '@/components/LonganCoupondia'
import LonganAllCouponGroup from '@/components/LonganAllCouponGroup'
import LonganAllCouponGroupAdd from '@/components/LonganAllCouponGroupAdd'
import LonganAllCouponGroupEdit from '@/components/LonganAllCouponGroupEdit'
import LonganPlatformCouponEdit from '@/components/LonganPlatformCouponEdit'
import LonganPlatformCouponcheck from '@/components/LonganPlatformCouponcheck'
import LonganAllCouponBatch from '@/components/LonganAllCouponBatch'
import LonganAllCouponBatchEdit from '@/components/LonganAllCouponBatchEdit'
import LonganGrantCouponRecord from '@/components/LonganGrantCouponRecord'
import LonganAllGrantRecord from '@/components/LonganAllGrantRecord'
import LonganAllCouponList from '@/components/LonganAllCouponList'
import LonganCouponOrder from '@/components/LonganCouponOrder'
import LonganProdCouponBatch from '@/components/LonganProdCouponBatch'
import LonganProdCouponBatchAdd from '@/components/LonganProdCouponBatchAdd'
import LonganProdCouponBatchEdit from '@/components/LonganProdCouponBatchEdit'
import LonganProdCouponBatchCheck from '@/components/LonganProdCouponBatchCheck'
import LonganProdCouponGroup from '@/components/LonganProdCouponGroup'
import LonganProdCouponGroupEdit from '@/components/LonganProdCouponGroupEdit'
import LonganCouponList from '@/components/LonganCouponList'
import LonganCouponOrderDetail from '@/components/LonganCouponOrderDetail'
//实时分成
import LonganPredictEarnings from '@/components/LonganPredictEarnings'
//客房服务
import LonganServiceTypeList from '@/components/LonganServiceTypeList'
import LonganServiceTypeAdd from '@/components/LonganServiceTypeAdd'
import LonganServiceTypeModify from '@/components/LonganServiceTypeModify'
import LonganServiceTypeDetail from '@/components/LonganServiceTypeDetail'
import LonganHotelServiceList from '@/components/LonganHotelServiceList'
import LonganHotelServiceAdd from '@/components/LonganHotelServiceAdd'
import LonganHotelServiceModify from '@/components/LonganHotelServiceModify'
import LonganHotelServiceDetail from '@/components/LonganHotelServiceDetail'
import LonganHotelServiceCatalogueList from '@/components/LonganHotelServiceCatalogueList'
import LonganHotelServiceCatalogueAdd from '@/components/LonganHotelServiceCatalogueAdd'
import LonganHotelServiceCatalogueModify from '@/components/LonganHotelServiceCatalogueModify'
import LonganHotelServicePicture from '@/components/LonganHotelServicePicture'
import LonganHotelServiceSelectList from '@/components/LonganHotelServiceSelectList'
import LonganHotelServiceSelectAdd from '@/components/LonganHotelServiceSelectAdd'
import LonganHotelServiceSelectModify from '@/components/LonganHotelServiceSelectModify'
import LonganHotelServiceIconList from '@/components/LonganHotelServiceIconList'
import LonganHotelServiceIconAdd from '@/components/LonganHotelServiceIconAdd'
import LonganHotelServiceIconModify from '@/components/LonganHotelServiceIconModify'
import LonganHotelServiceBannerList from '@/components/LonganHotelServiceBannerList'
import LonganHotelServiceBannerAdd from '@/components/LonganHotelServiceBannerAdd'
import LonganHotelServiceBannerModify from '@/components/LonganHotelServiceBannerModify'
import LonganHotelServiceFormList from '@/components/LonganHotelServiceFormList'
import LonganHotelServiceFormAdd from '@/components/LonganHotelServiceFormAdd'
import LonganHotelServiceFormModify from '@/components/LonganHotelServiceFormModify'
import LonganHotelServiceFormIntroduce from '@/components/LonganHotelServiceFormIntroduce'
import checkhotelrecord from '@/components/checkhotelrecord'
import LonganServiceOrderDetail from '@/components/LonganServiceOrderDetail'
//统计报表
import LonganReportAllSell from '@/components/LonganReportAllSell'
import LonganReportHotelSell from '@/components/LonganReportHotelSell'
import LonganReportProdSell from '@/components/LonganReportProdSell'
import LonganReportRoomBook from '@/components/LonganReportRoomBook'
import LonganReportOverdueProd from '@/components/LonganReportOverdueProd'

//红包管理
import LonganRedPackList from '@/components/LonganRedPackList'
//活动管理
import LonganActivityAdd from '@/components/LonganActivityAdd'
import LonganActivityChange from '@/components/LonganActivityChange'
import LonganActivityDef from '@/components/LonganActivityDef'
import LonganActivityDetail from '@/components/LonganActivityDetail'
import LonganActivityList from '@/components/LonganActivityList'
import LonganActivityRecord from '@/components/LonganActivityRecord'
import LonganActRedpackDef from '@/components/LonganActRedpackDef'
import LonganActShareDef from '@/components/LonganActShareDef'
//福柜
import LonganLuckyBagsRecords from '@/components/LonganLuckyBagsRecords'
//酒店分销设置
import LonganShareBonus from "@/components/LonganShareBonus"
import LonganShareBonusAdd from "@/components/LonganShareBonusAdd"
import LonganShareBonusChange from "@/components/LonganShareBonusChange"
import LonganShareBonusDetail from "@/components/LonganShareBonusDetail"
//员工管理
import LonganEmployeeList from "@/components/LonganEmployeeList"
import LonganEmployeeReDetail from "@/components/LonganEmployeeReDetail"
import LonganEmployeeCash from "@/components/LonganEmployeeCash"
//顾客管理
import LonganCustomerList from "@/components/LonganCustomerList"
import LonganCustomerReDetail from "@/components/LonganCustomerReDetail"
import LonganCustomerCash from "@/components/LonganCustomerCash"
//酒店分享记录
import LonganHotelShareRecord from "@/components/LonganHotelShareRecord"
import LonganHotelVisitRecord from "@/components/LonganHotelVisitRecord"
import LonganHotelOrderRecord from "@/components/LonganHotelOrderRecord"
//酒店分销记录
import LonganHotelRetailRecord from "@/components/LonganHotelRetailRecord"
import LonganEmpRetailRecord from "@/components/LonganEmpRetailRecord"
//酒店自提点
import LonganselfTakingList from "@/components/LonganselfTakingList"
import LonganselfTakingAdd from "@/components/LonganselfTakingAdd"
import LonganselfTakingEdit from "@/components/LonganselfTakingEdit"
import LonganselfTakingDetail from "@/components/LonganselfTakingDetail"

import VirtualCabinetDetail from "@/components/VirtualCabinetDetail"
//链接
import LonganFuncLinkList from "@/components/LonganFuncLinkList"
import LonganFuncLinkChange from "@/components/LonganFuncLinkChange"
import LonganFuncLinkAdd from "@/components/LonganFuncLinkAdd"
import LonganFuncLinkDetail from "@/components/LonganFuncLinkDetail"
import LonganFuncLinkParams from "@/components/LonganFuncLinkParams"

//规格管理
import LonganProdSpecsList from "@/components/LonganProdSpecsList"
import LonganProdSpecsAdd from "@/components/LonganProdSpecsAdd"
import LonganProdSpecsModify from "@/components/LonganProdSpecsModify"
import LonganProdSpecsDetail from "@/components/LonganProdSpecsDetail"
import LonganHotelProdSpecsList from "@/components/LonganHotelProdSpecsList"
import LonganHotelProdSpecsAdd from "@/components/LonganHotelProdSpecsAdd"
import LonganHotelProdSpecsModify from "@/components/LonganHotelProdSpecsModify"
import LonganHotelProdSpecsDetail from "@/components/LonganHotelProdSpecsDetail"
import LonganFunctionSpecsList from "@/components/LonganFunctionSpecsList"
import LonganFunctionSpecsAdd from "@/components/LonganFunctionSpecsAdd"
import LonganFunctionSpecsModify from "@/components/LonganFunctionSpecsModify"
import LonganFunctionSpecsDetail from "@/components/LonganFunctionSpecsDetail"

//卡券
import LonganCardticketList from "@/components/LonganCardticketList"
import LonganCardticketDetail from "@/components/LonganCardticketDetail"
import LonganCardCouponList from "@/components/LonganCardCouponList"
import LonganCardCouponDetail from "@/components/LonganCardCouponDetail"
import LonganCardCouponRecord from "@/components/LonganCardCouponRecord"
import uploadpic from "@/components/uploadpic"

//物流
import LonganExternalLogistics from "@/components/LonganExternalLogistics"
import LonganExternalLogisticsEdit from "@/components/LonganExternalLogisticsEdit"
import LonganExternalLogisticsDetail from "@/components/LonganExternalLogisticsDetail"
import LonganHotelLogistics from "@/components/LonganHotelLogistics"
import LonganHotelLogisticsAdd from "@/components/LonganHotelLogisticsAdd"
import LonganHotelLogisticsEdit from "@/components/LonganHotelLogisticsEdit"
import LonganHotelLogisticsDetail from "@/components/LonganHotelLogisticsDetail"
import LonganExternalOrder from "@/components/LonganExternalOrder"
import LonganExternalDetail from "@/components/LonganExternalDetail"
//组织待入账分成记录
import LonganOrganWaitDivide from "@/components/LonganOrganWaitDivide"
import LonganOrganWaitDivideDetail from "@/components/LonganOrganWaitDivideDetail"
import LonganOrganDivideRecord from '@/components/LonganOrganDivideRecord'
import LonganOrganDivideRecordDetail from '@/components/LonganOrganDivideRecordDetail'
import LonganWaitAccountIncome from '@/components/LonganWaitAccountIncome'
import LonganWaitAccountIncomeDetail from '@/components/LonganWaitAccountIncomeDetail'
import LonganIncomeRecord from '@/components/LonganIncomeRecord'
import LonganIncomeRecordDetail from '@/components/LonganIncomeRecordDetail'
import LonganCustomerWaitIn from '@/components/LonganCustomerWaitIn'
import LonganCustomerWaitInDetail from '@/components/LonganCustomerWaitInDetail'
import LonganCustomerIncomeRecord from '@/components/LonganCustomerIncomeRecord'
import LonganCustomerInRecordDetail from '@/components/LonganCustomerInRecordDetail'
//酒店广告页管理
import LonganHotelADList from "@/components/LonganHotelADList"
import LonganHotelADAdd from "@/components/LonganHotelADAdd"
import LonganHotelADModify from "@/components/LonganHotelADModify"
import LonganHotelADDetail from "@/components/LonganHotelADDetail"
import LonganHotelADQuoteDetail from "@/components/LonganHotelADQuoteDetail"

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
		children:[{
			path: '/index',
			name: 'index',
			component: index
		},{
			path: '/LonganPrivilegeUserList',
			name: 'LonganPrivilegeUserList',
			component: LonganPrivilegeUserList
		},{
			path: '/LonganPrivilegeUserAdd',
			name: 'LonganPrivilegeUserAdd',
			component: LonganPrivilegeUserAdd
		},{
			path: '/LonganPrivilegeUserModify',
			name: 'LonganPrivilegeUserModify',
			component: LonganPrivilegeUserModify
		},{
			path: '/LonganPrivilegeRoleList',
			name: 'LonganPrivilegeRoleList',
			component: LonganPrivilegeRoleList
		},{
			path: '/LonganPrivilegeRoleAdd',
			name: 'LonganPrivilegeRoleAdd',
			component: LonganPrivilegeRoleAdd
		},{
			path: '/LonganPrivilegeRoleModify',
			name: 'LonganPrivilegeRoleModify',
			component: LonganPrivilegeRoleModify
		},{
			path: '/LonganPrivilegeUpdateUserInfo',
			name: 'LonganPrivilegeUpdateUserInfo',
			component: LonganPrivilegeUpdateUserInfo
		},{
			path: '/LonganPrivilegeUpdatePWD',
			name: 'LonganPrivilegeUpdatePWD',
			component: LonganPrivilegeUpdatePWD
		},{
			path: '/LonganStaffManage',
			name: 'LonganStaffManage',
			component: LonganStaffManage
		},{
			path: '/LonganCustomerManage',
			name: 'LonganCustomerManage',
			component: LonganCustomerManage
		},{
			path: '/LonganCustomerWithdrawRecord',
			name: 'LonganCustomerWithdrawRecord',
			component: LonganCustomerWithdrawRecord
		},{
			path: '/LonganHotelList',
			name: 'LonganHotelList',
			component: LonganHotelList
		},{
			path: '/LonganHotelAdd',
			name: 'LonganHotelAdd',
			component: LonganHotelAdd
		},{
			path: '/LonganHotelDetail',
			name: 'LonganHotelDetail',
			component: LonganHotelDetail
		},{
			path: '/LonganHotelModify',
			name: 'LonganHotelModify',
			component: LonganHotelModify
		},{
			path: '/LonganHotelGridList',
			name: 'LonganHotelGridList',
			component: LonganHotelGridList
		},{
			path: '/LonganHotelProtocolList',
			name: 'LonganHotelProtocolList',
			component: LonganHotelProtocolList
		},{
			path: '/LonganHotelProtocolAdd',
			name: 'LonganHotelProtocolAdd',
			component: LonganHotelProtocolAdd
		},{
			path: '/LonganHotelProtocolDetail',
			name: 'LonganHotelProtocolDetail',
			component: LonganHotelProtocolDetail
		},{
			path: '/LonganHotelPlatCommodityList',
			name: 'LonganHotelPlatCommodityList',
			component: LonganHotelPlatCommodityList
		},{
			path: '/LonganHotelPlatCommodityAdd',
			name: 'LonganHotelPlatCommodityAdd',
			component: LonganHotelPlatCommodityAdd
		},{
			path: '/LonganHotelPlatCommodityDetail',
			name: 'LonganHotelPlatCommodityDetail',
			component: LonganHotelPlatCommodityDetail
		},{
			path: '/LonganHotelPlatCommodityModify',
			name: 'LonganHotelPlatCommodityModify',
			component: LonganHotelPlatCommodityModify
		},{
			path: '/LonganHotelCommodityList',
			name: 'LonganHotelCommodityList',
			component: LonganHotelCommodityList
		},{
			path: '/LonganHotelCommodityAdd',
			name: 'LonganHotelCommodityAdd',
			component: LonganHotelCommodityAdd
		},{
			path: '/LonganHotelCommodityModify',
			name: 'LonganHotelCommodityModify',
			component: LonganHotelCommodityModify
		},{
			path: '/LonganHotelCabinetList',
			name: 'LonganHotelCabinetList',
			component: LonganHotelCabinetList
		},{
			path: '/LonganHotelCabinetModify',
			name: 'LonganHotelCabinetModify',
			component: LonganHotelCabinetModify
		},{
			path: '/LonganHotelCommodityMarketList',
			name: 'LonganHotelCommodityMarketList',
			component: LonganHotelCommodityMarketList
		},{
			path: '/LonganHotelCommodityMarketAdd',
			name: 'LonganHotelCommodityMarketAdd',
			component: LonganHotelCommodityMarketAdd
		},{
			path: '/LonganHotelCommodityMarketModify',
			name: 'LonganHotelCommodityMarketModify',
			component: LonganHotelCommodityMarketModify
		},{
			path: '/LonganHotelAllCommodityList',
			name: 'LonganHotelAllCommodityList',
			component: LonganHotelAllCommodityList
		},{
			path: '/LonganHotelAllCommodityModify',
			name: 'LonganHotelAllCommodityModify',
			component: LonganHotelAllCommodityModify
		},{
			path: '/LonganHotelAllCommodityDetail',
			name: 'LonganHotelAllCommodityDetail',
			component: LonganHotelAllCommodityDetail
		},{
			path: '/LonganInventoryList',
			name: 'LonganInventoryList',
			component: LonganInventoryList
		},{
			path: '/LonganGodownEntryList',
			name: 'LonganGodownEntryList',
			component: LonganGodownEntryList
		},{
			path: '/LonganGodownEntryDetail',
			name: 'LonganGodownEntryDetail',
			component: LonganGodownEntryDetail
		},{
			path: '/LonganGodownEntryAudit',
			name: 'LonganGodownEntryAudit',
			component: LonganGodownEntryAudit
		},{
			path: '/LonganServiceTypeList',
			name: 'LonganServiceTypeList',
			component: LonganServiceTypeList
		},{
			path: '/LonganServiceTypeAdd',
			name: 'LonganServiceTypeAdd',
			component: LonganServiceTypeAdd
		},{
			path: '/LonganServiceTypeModify',
			name: 'LonganServiceTypeModify',
			component: LonganServiceTypeModify
		},{
			path: '/LonganServiceTypeDetail',
			name: 'LonganServiceTypeDetail',
			component: LonganServiceTypeDetail
		},{
			path: '/LonganHotelServiceList',
			name: 'LonganHotelServiceList',
			component: LonganHotelServiceList
		},{
			path: '/LonganHotelServiceAdd',
			name: 'LonganHotelServiceAdd',
			component: LonganHotelServiceAdd
		},{
			path: '/LonganHotelServiceModify',
			name: 'LonganHotelServiceModify',
			component: LonganHotelServiceModify
		},{
			path: '/LonganHotelServiceDetail',
			name: 'LonganHotelServiceDetail',
			component: LonganHotelServiceDetail
		},{
			path: '/LonganHotelServiceCatalogueList',
			name: 'LonganHotelServiceCatalogueList',
			component: LonganHotelServiceCatalogueList
		},{
			path: '/LonganHotelServiceCatalogueAdd',
			name: 'LonganHotelServiceCatalogueAdd',
			component: LonganHotelServiceCatalogueAdd
		},{
			path: '/LonganHotelServiceCatalogueModify',
			name: 'LonganHotelServiceCatalogueModify',
			component: LonganHotelServiceCatalogueModify
		},{
			path: '/LonganHotelServicePicture',
			name: 'LonganHotelServicePicture',
			component: LonganHotelServicePicture
		},{
			path: '/LonganHotelServiceSelectList',
			name: 'LonganHotelServiceSelectList',
			component: LonganHotelServiceSelectList
		},{
			path: '/LonganHotelServiceSelectAdd',
			name: 'LonganHotelServiceSelectAdd',
			component: LonganHotelServiceSelectAdd
		},{
			path: '/LonganHotelServiceSelectModify',
			name: 'LonganHotelServiceSelectModify',
			component: LonganHotelServiceSelectModify
		},{
			path: '/LonganHotelServiceIconList',
			name: 'LonganHotelServiceIconList',
			component: LonganHotelServiceIconList
		},{
			path: '/LonganHotelServiceIconAdd',
			name: 'LonganHotelServiceIconAdd',
			component: LonganHotelServiceIconAdd
		},{
			path: '/LonganHotelServiceIconModify',
			name: 'LonganHotelServiceIconModify',
			component: LonganHotelServiceIconModify
		},{
			path: '/LonganHotelServiceBannerList',
			name: 'LonganHotelServiceBannerList',
			component: LonganHotelServiceBannerList
		},{
			path: '/LonganHotelServiceBannerAdd',
			name: 'LonganHotelServiceBannerAdd',
			component: LonganHotelServiceBannerAdd
		},{
			path: '/LonganHotelServiceBannerModify',
			name: 'LonganHotelServiceBannerModify',
			component: LonganHotelServiceBannerModify
		},{
			path: '/LonganHotelServiceFormList',
			name: 'LonganHotelServiceFormList',
			component: LonganHotelServiceFormList
		},{
			path: '/LonganHotelServiceFormAdd',
			name: 'LonganHotelServiceFormAdd',
			component: LonganHotelServiceFormAdd
		},{
			path: '/LonganHotelServiceFormModify',
			name: 'LonganHotelServiceFormModify',
			component: LonganHotelServiceFormModify
		},{
			path: '/LonganHotelServiceFormIntroduce',
			name: 'LonganHotelServiceFormIntroduce',
			component: LonganHotelServiceFormIntroduce
		},{
			path: '/LonganServiceOrderDetail',
			name: 'LonganServiceOrderDetail',
			component: LonganServiceOrderDetail
		},{
			path: '/LonganReportAllSell',
			name: 'LonganReportAllSell',
			component: LonganReportAllSell
		},{
			path: '/LonganReportHotelSell',
			name: 'LonganReportHotelSell',
			component: LonganReportHotelSell
		},{
			path: '/LonganReportProdSell',
			name: 'LonganReportProdSell',
			component: LonganReportProdSell
		},{
			path: '/LonganReportRoomBook',
			name: 'LonganReportRoomBook',
			component: LonganReportRoomBook
		},{
			path: '/LonganReportOverdueProd',
			name: 'LonganReportOverdueProd',
			component: LonganReportOverdueProd
		},{
			path: '/LonganCommonFeature',
			name: 'LonganCommonFeature',
			component: LonganCommonFeature
		},{
			path: '/LonganCommonFeatureAdd',
			name: 'LonganCommonFeatureAdd',
			component: LonganCommonFeatureAdd
		},{
			path: '/LonganCommonFeatureModify',
			name: 'LonganCommonFeatureModify',
			component: LonganCommonFeatureModify
		},{
			path: '/LonganHotelFeature',
			name: 'LonganHotelFeature',
			component: LonganHotelFeature
		},{
			path: '/LonganHotelFeatureAdd',
			name: 'LonganHotelFeatureAdd',
			component: LonganHotelFeatureAdd
		},{
			path: '/LonganHotelFeatureDetail',
			name: 'LonganHotelFeatureDetail',
			component: LonganHotelFeatureDetail
		},{
			path: '/LonganHotelFeatureDetailAdd',
			name: 'LonganHotelFeatureDetailAdd',
			component: LonganHotelFeatureDetailAdd
		},{
			path: '/LonganHotelFeatureDetailModify',
			name: 'LonganHotelFeatureDetailModify',
			component: LonganHotelFeatureDetailModify
		},{
			path: '/LonganPlatDeliveryList',
			name: 'LonganPlatDeliveryList',
			component: LonganPlatDeliveryList
		},{
			path: '/LonganPlatDeliveryDetail',
			name: 'LonganPlatDeliveryDetail',
			component: LonganPlatDeliveryDetail
		},{
			path: '/LonganAllDeliveryList',
			name: 'LonganAllDeliveryList',
			component: LonganAllDeliveryList
		},{
			path: '/LonganAllDeliveryDetail',
			name: 'LonganAllDeliveryDetail',
			component: LonganAllDeliveryDetail
		},{
			path: '/CommodityList',
			name: 'CommodityList',
			component: CommodityList
		},{
			path: '/CommodityAdd',
			name: 'CommodityAdd',
			component: CommodityAdd
		},{
			path: '/Commodityedit',
			name: 'Commodityedit',
			component: Commodityedit
		},{
			path: '/LonganAllCommodityManage',
			name: 'LonganAllCommodityManage',
			component: LonganAllCommodityManage
		},{
			path: '/LonganAllCommodityDetail',
			name: 'LonganAllCommodityDetail',
			component: LonganAllCommodityDetail
		},{
			path: '/LonganPlatformCommodityList',
			name: 'LonganPlatformCommodityList',
			component: LonganPlatformCommodityList
		},{
			path: '/LonganPlatformCommodityAdd',
			name: 'LonganPlatformCommodityAdd',
			component: LonganPlatformCommodityAdd
		},{
			path: '/LonganPlatformCommodityModify',
			name: 'LonganPlatformCommodityModify',
			component: LonganPlatformCommodityModify
		},{
			path: '/LonganPlatformCommodityDetail',
			name: 'LonganPlatformCommodityDetail',
			component: LonganPlatformCommodityDetail
		},{
			path: '/LonganCommodityStatisticsList',
			name: 'LonganCommodityStatisticsList',
			component: LonganCommodityStatisticsList
		},{
			path: '/LonganCommodityStatisticsAdd',
			name: 'LonganCommodityStatisticsAdd',
			component: LonganCommodityStatisticsAdd
		},{
			path: '/LonganCommodityStatisticsModify',
			name: 'LonganCommodityStatisticsModify',
			component: LonganCommodityStatisticsModify
		},{
			path: '/LonganCommodityMarketTemplateList',
			name: 'LonganCommodityMarketTemplateList',
			component: LonganCommodityMarketTemplateList
		},{
			path: '/LonganCommodityMarketTemplateAdd',
			name: 'LonganCommodityMarketTemplateAdd',
			component: LonganCommodityMarketTemplateAdd
		},{
			path: '/LonganCommodityMarketTemplateModify',
			name: 'LonganCommodityMarketTemplateModify',
			component: LonganCommodityMarketTemplateModify
		},{
			path: '/Cabinetgl',
			name: 'Cabinetgl',
			component: Cabinetgl
		},{
			path: '/Cabinetchange',
			name: 'Cabinetchange',
			component: Cabinetchange
		},{
			path: '/Cabinetlook',
			name: 'Cabinetlook',
			component: Cabinetlook
		},{
			path: '/PurchaseOrderlist',
			name: 'PurchaseOrderlist',
			component: PurchaseOrderlist
		},{
			path: '/PurchaseOrderadd',
			name: 'PurchaseOrderadd',
			component: PurchaseOrderadd
		},{
			path: '/PurchaseOrderedit',
			name: 'PurchaseOrderedit',
			component: PurchaseOrderedit
		},{
			path: '/SeepurchaseOrder',
			name: 'SeepurchaseOrder',
			component: SeepurchaseOrder
    	},{
			path: '/checkhotelrecord',
			name: 'checkhotelrecord',
			component: checkhotelrecord
		},{
			path: '/hotelrecorddetail',
			name: 'hotelrecorddetail',
			component: hotelrecorddetail
		},{
			path: '/LonganRevenueStatistics',
			name: 'LonganRevenueStatistics',
			component: LonganRevenueStatistics
		},{
			path: '/LonganRevenueDetail',
			name: 'LonganRevenueDetail',
			component: LonganRevenueDetail
		},{
			path: '/LonganOperationAnalysis',
			name: 'LonganOperationAnalysis',
			component: LonganOperationAnalysis
		},{
			path: '/LonganOperationAnalysisDetail',
			name: 'LonganOperationAnalysisDetail',
			component: LonganOperationAnalysisDetail
		},{
			path: '/LonganDeclarationForm',
			name: 'LonganDeclarationForm',
			component: LonganDeclarationForm
		},{
			path: '/LonganAbnormalStateOfCabinet',
			name: 'LonganAbnormalStateOfCabinet',
			component: LonganAbnormalStateOfCabinet
		},{
			path: '/LonganDivideInto',
			name: 'LonganDivideInto',
			component: LonganDivideInto
		},{
			path: '/LonganWithdrawalsRecord',
			name: 'LonganWithdrawalsRecord',
			component: LonganWithdrawalsRecord
		},{
			path: '/LonganWithdrawalsRecordDetail',
			name: 'LonganWithdrawalsRecordDetail',
			component: LonganWithdrawalsRecordDetail
		},{
			path: '/LonganWithdrawalsRecordHandle',
			name: 'LonganWithdrawalsRecordHandle',
			component: LonganWithdrawalsRecordHandle
		},{
			path: '/LonganReplenishmentFee',
			name: 'LonganReplenishmentFee',
			component: LonganReplenishmentFee
        },{
			path: '/LonganReplenishmentFeeDiscount',
			name: 'LonganReplenishmentFeeDiscount',
			component: LonganReplenishmentFeeDiscount
		},{
			path: '/LonganFinancialCost',
			name: 'LonganFinancialCost',
			component: LonganFinancialCost
		},{
			path: '/hotelskinlist',
			name: 'hotelskinlist',
			component: hotelskinlist
		},{
			path: '/hotelskinadd',
			name: 'hotelskinadd',
			component: hotelskinadd
		},{
			path: '/hotelskinmodify',
			name: 'hotelskinmodify',
			component: hotelskinmodify
		},{
			path: '/invoicerecord',
			name: 'invoicerecord',
			component: invoicerecord
		},{
			path: '/replacecabinet',
			name: 'replacecabinet',
			component: replacecabinet
		},{
			path: '/LonganHotelAfterSale',
			name: 'LonganHotelAfterSale',
			component: LonganHotelAfterSale
		},{
			path: '/LonganMerchant',
			name: 'LonganMerchant',
			component: LonganMerchant
		},{
			path: '/LonganMerchantadd',
			name: 'LonganMerchantadd',
			component: LonganMerchantadd
		},{
			path: '/LonganMerchantchange',
			name: 'LonganMerchantchange',
			component: LonganMerchantchange
		},{
			path: '/LonganOperator',
			name: 'LonganOperator',
			component: LonganOperator
		},{
			path: '/LonganOrderList',
			name: 'LonganOrderList',
			component: LonganOrderList
		},{
			path: '/LonganOrderProductDetails',
			name: 'LonganOrderProductDetails',
			component: LonganOrderProductDetails
		},{
			path: '/LonganOrderDeliveryDetails',
			name: 'LonganOrderDeliveryDetails',
			component: LonganOrderDeliveryDetails
		},{
			path: '/LonganOrderCouponDetails',
			name: 'LonganOrderCouponDetails',
			component: LonganOrderCouponDetails
		},{
			path: '/LonganOrderDetails',
			name: 'LonganOrderDetails',
			component: LonganOrderDetails
		},{
			path: '/LonganProcessList',
			name: 'LonganProcessList',
			component: LonganProcessList
		},{
			path: '/LonganProcessDetails',
			name: 'LonganProcessDetails',
			component: LonganProcessDetails
		},{
			path: '/LonganPendingClaimList',
			name: 'LonganPendingClaimList',
			component: LonganPendingClaimList
		},{
			path: '/LonganPendingClaimDetails',
			name: 'LonganPendingClaimDetails',
			component: LonganPendingClaimDetails
		},{
			path: '/LonganPendingReviewList',
			name: 'LonganPendingReviewList',
			component: LonganPendingReviewList
		},{
			path: '/LonganPendingReviewDetails',
			name: 'LonganPendingReviewDetails',
			component: LonganPendingReviewDetails
		},{
			path: '/LonganReviewList',
			name: 'LonganReviewList',
			component: LonganReviewList
		},{
			path: '/LonganReviewDetails',
			name: 'LonganReviewDetails',
			component: LonganReviewDetails
		},{
			path: '/TeashopTeaList',
			name: 'TeashopTeaList',
			component: TeashopTeaList
		},{
			path: '/TeashopTeaAdd',
			name: 'TeashopTeaAdd',
			component: TeashopTeaAdd
		},{
			path: '/TeashopTeaModify',
			name: 'TeashopTeaModify',
			component: TeashopTeaModify
		},{
			path: '/TeashopTeaDetail',
			name: 'TeashopTeaDetail',
			component: TeashopTeaDetail
		},{
			path: '/TeashopOrderManage',
			name: 'TeashopOrderManage',
			component: TeashopOrderManage
		},{
			path: '/TeashopOrderDetail',
			name: 'TeashopOrderDetail',
			component: TeashopOrderDetail
		},{
			path: '/TeashopMembercardList',
			name: 'TeashopMembercardList',
			component: TeashopMembercardList
		},{
			path: '/TeashopMembercardAdd',
			name: 'TeashopMembercardAdd',
			component: TeashopMembercardAdd
		},{
			path: '/TeashopMembercardModify',
			name: 'TeashopMembercardModify',
			component: TeashopMembercardModify
		},{
			path: '/TeashopMembercardDetail',
			name: 'TeashopMembercardDetail',
			component: TeashopMembercardDetail
		},{
			path: '/TeashopMemberManage',
			name: 'TeashopMemberManage',
			component: TeashopMemberManage
		},{
			path: '/TeashopMemberDetail',
			name: 'TeashopMemberDetail',
			component: TeashopMemberDetail
		},{
			path: '/TeashopCommonUserManage',
			name: 'TeashopCommonUserManage',
			component: TeashopCommonUserManage
		},{
			path: '/allsaleapply',
			name: 'allsaleapply',
			component: allsaleapply
		},{
			path: '/allsaleapplydetail',
			name: 'allsaleapplydetail',
			component: allsaleapplydetail
		},{
			path: '/platformaftersale',
			name: 'platformaftersale',
			component: platformaftersale
		},{
			path: '/platformaftersaledetail',
			name: 'platformaftersaledetail',
			component: platformaftersaledetail
		},{
			path: '/HotelPlatformInventory',
			name: 'HotelPlatformInventory',
			component: HotelPlatformInventory
		},{
			path: '/hotelproInventorylist',
			name: 'hotelproInventorylist',
			component: hotelproInventorylist
		},{
			path: '/PlatformenterOrderlist',
			name: 'PlatformenterOrderlist',
			component: PlatformenterOrderlist
		},{
			path: '/PlatformenterOrderdetail',
			name: 'PlatformenterOrderdetail',
			component: PlatformenterOrderdetail
		},{
			path: '/PlatformoutOrderlist',
			name: 'PlatformoutOrderlist',
			component: PlatformoutOrderlist
		},{
			path: '/PlatformoutOrderdetail',
			name: 'PlatformoutOrderdetail',
			component: PlatformoutOrderdetail
		},{
			path: '/allenterorderlist',
			name: 'allenterorderlist',
			component: allenterorderlist
		},{
			path: '/allenterorderdetail',
			name: 'allenterorderdetail',
			component: allenterorderdetail
		},{
			path: '/alloutorderlist',
			name: 'alloutorderlist',
			component: alloutorderlist
		},{
			path: '/alloutorderdetail',
			name: 'alloutorderdetail',
			component: alloutorderdetail
		},{
			path: '/LonganFranchiseelist',
			name: 'LonganFranchiseelist',
			component: LonganFranchiseelist
		},{
			path: '/LonganFranchiseeadd',
			name: 'LonganFranchiseeadd',
			component: LonganFranchiseeadd
		},{
			path: '/LonganFranchiseeedit',
			name: 'LonganFranchiseeedit',
			component: LonganFranchiseeedit
		},{
			path: '/LonganFranchiseeedetail',
			name: 'LonganFranchiseeedetail',
			component: LonganFranchiseeedetail
		},{
			path: '/LonganFranchiseehotellist',
			name: 'LonganFranchiseehotellist',
			component: LonganFranchiseehotellist
		},{
			path: '/LonganFranchiseehoteladd',
			name: 'LonganFranchiseehoteladd',
			component: LonganFranchiseehoteladd
		},{
			path: '/LonganFranchiseehoteldetail',
			name: 'LonganFranchiseehoteldetail',
			component: LonganFranchiseehoteldetail
		},{
			path: '/LonganAccountlist',
			name: 'LonganAccountlist',
			component: LonganAccountlist
		},{
			path: '/LonganOrganDivide',
			name: 'LonganOrganDivide',
			component: LonganOrganDivide
		},{
			path: '/LonganClassifyDivide',
			name: 'LonganClassifyDivide',
			component: LonganClassifyDivide
		},{
			path: '/LonganDetailedDivide',
			name: 'LonganDetailedDivide',
			component: LonganDetailedDivide
		},{
			path: '/LonganCarryDetail',
			name: 'LonganCarryDetail',
			component: LonganCarryDetail
		},{
			path: '/LongancheckCarryDetail',
			name: 'LongancheckCarryDetail',
			component: LongancheckCarryDetail
		},{
			path: '/LonganAccountHandle',
			name: 'LonganAccountHandle',
			component: LonganAccountHandle
		},{
			path: '/LonganDefEvaluate',
			name: 'LonganDefEvaluate',
			component: LonganDefEvaluate
		},{
			path: '/LonganDefEvaluateAdd',
			name: 'LonganDefEvaluateAdd',
			component: LonganDefEvaluateAdd
		},{
			path: '/LonganDefEvaluateEdit',
			name: 'LonganDefEvaluateEdit',
			component: LonganDefEvaluateEdit
		},{
			path: '/LonganDefEvaluateDetail',
			name: 'LonganDefEvaluateDetail',
			component: LonganDefEvaluateDetail
		},{
			path: '/LonganHotelEvaluate',
			name: 'LonganHotelEvaluate',
			component: LonganHotelEvaluate
		},{
			path: '/LonganHotelEvalDetail',
			name: 'LonganHotelEvalDetail',
			component: LonganHotelEvalDetail
		},{
			path: '/LonganPartnerSetup',
			name: 'LonganPartnerSetup',
			component: LonganPartnerSetup
		},{
			path: '/LonganBookType',
			name: 'LonganBookType',
			component: LonganBookType
		},{
			path: '/LonganBookTypeDetail',
			name: 'LonganBookTypeDetail',
			component: LonganBookTypeDetail
		},{
			path: '/LonganBookResource',
			name: 'LonganBookResource',
			component: LonganBookResource
		},{
			path: '/LonganBookResourceDetail',
			name: 'LonganBookResourceDetail',
			component: LonganBookResourceDetail
		},{
			path: '/LonganBookPrice',
			name: 'LonganBookPrice',
			component: LonganBookPrice
		},{
			path: '/LonganBookStatus',
			name: 'LonganBookStatus',
			component: LonganBookStatus
		},{
			path: '/LonganBookOrder',
			name: 'LonganBookOrder',
			component: LonganBookOrder
		},{
			path: '/LonganBookOrderDetail',
			name: 'LonganBookOrderDetail',
			component: LonganBookOrderDetail
		},{
			path: '/LonganAllDelivery',
			name: 'LonganAllDelivery',
			component: LonganAllDelivery
		},{
			path: '/LonganGuestMiniDelidetail',
			name: 'LonganGuestMiniDelidetail',
			component: LonganGuestMiniDelidetail
		},{
			path: '/LonganHotelCultureList',
			name: 'LonganHotelCultureList',
			component: LonganHotelCultureList
		},{
			path: '/LonganHotelCultureAdd',
			name: 'LonganHotelCultureAdd',
			component: LonganHotelCultureAdd
		},{
			path: '/LonganHotelCultureModify',
			name: 'LonganHotelCultureModify',
			component: LonganHotelCultureModify
		},{
			path: '/LonganHotelCultureDetail',
			name: 'LonganHotelCultureDetail',
			component: LonganHotelCultureDetail
		},{
			path: '/LonganHotelCultureDetailAdd',
			name: 'LonganHotelCultureDetailAdd',
			component: LonganHotelCultureDetailAdd
		},{
			path: '/LonganHotelCultureDetailModify',
			name: 'LonganHotelCultureDetailModify',
			component: LonganHotelCultureDetailModify
		},{
			path: '/LonganInvoiceRateList',
			name: 'LonganInvoiceRateList',
			component: LonganInvoiceRateList
		},{
			path: '/LonganInvoiceRateAdd',
			name: 'LonganInvoiceRateAdd',
			component: LonganInvoiceRateAdd
		},{
			path: '/LonganInvoiceRateModify',
			name: 'LonganInvoiceRateModify',
			component: LonganInvoiceRateModify
		},{
			path: '/LonganWaitInvoiceProdList',
			name: 'LonganWaitInvoiceProdList',
			component: LonganWaitInvoiceProdList
		},{
			path: '/LonganWaitInvoiceProdDetail',
			name: 'LonganWaitInvoiceProdDetail',
			component: LonganWaitInvoiceProdDetail
		},{
			path: '/LonganAllInvoiceList',
			name: 'LonganAllInvoiceList',
			component: LonganAllInvoiceList
		},{
			path: '/LonganAllInvoiceDetail',
			name: 'LonganAllInvoiceDetail',
			component: LonganAllInvoiceDetail
		},{
			path: '/LonganALLDelidetail',
			name: 'LonganALLDelidetail',
			component: LonganALLDelidetail
		},{
			path: '/LonganSupplierApply',
			name: 'LonganSupplierApply',
			component: LonganSupplierApply
		},{
			path: '/LonganSupplierDetail',
			name: 'LonganSupplierDetail',
			component: LonganSupplierDetail
		},{
			path: '/LonganMalfunctionManage',
			name: 'LonganMalfunctionManage',
			component: LonganMalfunctionManage
		},{
			path: '/LonganHotelFunctionList',
			name: 'LonganHotelFunctionList',
			component: LonganHotelFunctionList
		},{
			path: '/LonganHotelFunctionAdd',
			name: 'LonganHotelFunctionAdd',
			component: LonganHotelFunctionAdd
		},{
			path: '/LonganHotelFunctionModify',
			name: 'LonganHotelFunctionModify',
			component: LonganHotelFunctionModify
		},{
			path: '/LonganHotelFunctionDetail',
			name: 'LonganHotelFunctionDetail',
			component: LonganHotelFunctionDetail
		},{
			path: '/LonganHotelFunctionClassify',
			name: 'LonganHotelFunctionClassify',
			component: LonganHotelFunctionClassify
		},{
			path: '/LonganFunctionProdList',
			name: 'LonganFunctionProdList',
			component: LonganFunctionProdList
		},{
			path: '/LonganFunctionProdAdd',
			name: 'LonganFunctionProdAdd',
			component: LonganFunctionProdAdd
		},{
			path: '/LonganFunctionProdModify',
			name: 'LonganFunctionProdModify',
			component: LonganFunctionProdModify
		},{
			path: '/LonganFunctionProdDetail',
			name: 'LonganFunctionProdDetail',
			component: LonganFunctionProdDetail
		},{
			path: '/LonganMinibarProdList',
			name: 'LonganMinibarProdList',
			component: LonganMinibarProdList
		},{
			path: '/LonganMinibarProdAdd',
			name: 'LonganMinibarProdAdd',
			component: LonganMinibarProdAdd
		},{
			path: '/LonganMinibarProdModify',
			name: 'LonganMinibarProdModify',
			component: LonganMinibarProdModify
		},{
			path: '/VirtualCabinetConfiguration',
			name: 'VirtualCabinetConfiguration',
			component: VirtualCabinetConfiguration
		},{
			path: '/VirtualCabinetAdd',
			name: 'VirtualCabinetAdd',
			component: VirtualCabinetAdd
		},{
			path: '/VirtualCabinetChange',
			name: 'VirtualCabinetChange',
			component: VirtualCabinetChange
		},{
			path: '/LonganChoiceCabinet',
			name: 'LonganChoiceCabinet',
			component: LonganChoiceCabinet
		},{
			path: '/LaunchCabinetManagement',
			name: 'LaunchCabinetManagement',
			component: LaunchCabinetManagement
		},{
			path: '/LauncherManagement',
			name: 'LauncherManagement',
			component: LauncherManagement
		},{
			path: '/LaunchHotelManagement',
			name: 'LaunchHotelManagement',
			component: LaunchHotelManagement
		},{
			path: '/LonganMessagelist',
			name: 'LonganMessagelist',
			component: LonganMessagelist
		},{
			path: '/LonganmessageTest',
			name: 'LonganmessageTest',
			component: LonganmessageTest
		},{
			path: '/LonganWaitSendMessage',
			name: 'LonganWaitSendMessage',
			component: LonganWaitSendMessage
		},{
			path: '/LonganSendMessage',
			name: 'LonganSendMessage',
			component: LonganSendMessage
		},{
			path: '/LonganContentTemp',
			name: 'LonganContentTemp',
			component: LonganContentTemp
		},{
			path: '/LaunchHotelAdd',
			name: 'LaunchHotelAdd',
			component: LaunchHotelAdd
		},{
			path: '/LaunchHotelChange',
			name: 'LaunchHotelChange',
			component: LaunchHotelChange
		},{
			path: '/LaunchCabinetAdd',
			name: 'LaunchCabinetAdd',
			component: LaunchCabinetAdd
		},{
			path: '/LaunchCabinetChange',
			name: 'LaunchCabinetChange',
			component: LaunchCabinetChange
		},{
			path: '/LauncherbounceRecords',
			name: 'LauncherbounceRecords',
			component: LauncherbounceRecords
		},{
			path: '/LauncherinvestorCabinet',
			name: 'LauncherinvestorCabinet',
			component: LauncherinvestorCabinet
		},{
			path: '/LauncherinvestorOrder',
			name: 'LauncherinvestorOrder',
			component: LauncherinvestorOrder
		},{
			path: '/LauncherlookRecords',
			name: 'LauncherlookRecords',
			component: LauncherlookRecords
		},{
			path: '/LonganChannelList',
			name: 'LonganChannelList',
			component: LonganChannelList
		},{
			path: '/LonganChannelAdd',
			name: 'LonganChannelAdd',
			component: LonganChannelAdd
		},{
			path: '/LonganChannelModify',
			name: 'LonganChannelModify',
			component: LonganChannelModify
		},{
			path: '/LonganChannelShareLink',
			name: 'LonganChannelShareLink',
			component: LonganChannelShareLink
		},{
			path: '/LonganChannelPartner',
			name: 'LonganChannelPartner',
			component: LonganChannelPartner
		},{
			path: '/LonganRedPacketList',
			name: 'LonganRedPacketList',
			component: LonganRedPacketList
		},{
			path: '/LonganCabinetType',
			name: 'LonganCabinetType',
			component: LonganCabinetType
		},{
			path: '/LonganCabinetTypeAdd',
			name: 'LonganCabinetTypeAdd',
			component: LonganCabinetTypeAdd
		},{
			path: '/LonganCabinetTypeChange',
			name: 'LonganCabinetTypeChange',
			component: LonganCabinetTypeChange
		},{
			path: '/LonganMemberList',
			name: 'LonganMemberList',
			component: LonganMemberList
		},{
			path: '/LonganMemberAdd',
			name: 'LonganMemberAdd',
			component: LonganMemberAdd
		},{
			path: '/LonganMemberChange',
			name: 'LonganMemberChange',
			component: LonganMemberChange
		},{
			path: '/LonganMemberCom',
			name: 'LonganMemberCom',
			component: LonganMemberCom
		},{
			path: '/LonganMemberComRecords',
			name: 'LonganMemberComRecords',
			component: LonganMemberComRecords
		},{
			path:"/LonganIotCardList",
			name:'LonganIotCardList',
			component:LonganIotCardList
		},{
			path:"/LonganPlatformCoupon",
			name:'LonganPlatformCoupon',
			component:LonganPlatformCoupon
		},{
			path:"/LonganPlatformCouponAdd",
			name:'LonganPlatformCouponAdd',
			component:LonganPlatformCouponAdd
		},{
			path:"/LonganCoupondia",
			name:'LonganCoupondia',
			component:LonganCoupondia
		},{
			path: '/LonganPredictEarnings',
			name: 'LonganPredictEarnings',
			component: LonganPredictEarnings
		},{path: '/LonganExpressTemplate',
			name: 'LonganExpressTemplate',
			component: LonganExpressTemplate
		},{
			path: '/LonganExpressAdd',
			name: 'LonganExpressAdd',
			component: LonganExpressAdd
		},{
			path: '/longanWithdraw',
			name: 'longanWithdraw',
			component: longanWithdraw
		},{
			path: '/LonganMemberRewards',
			name: 'LonganMemberRewards',
			component: LonganMemberRewards
		},{
			path: '/LonganExpressChange',
			name: 'LonganExpressChange',
			component: LonganExpressChange
		},{
			path: '/LonganAllCouponGroup',
			name: 'LonganAllCouponGroup',
			component: LonganAllCouponGroup
		},{
			path: '/LonganAllCouponGroupAdd',
			name: 'LonganAllCouponGroupAdd',
			component: LonganAllCouponGroupAdd
		},{
			path: '/LonganAllCouponGroupEdit',
			name: 'LonganAllCouponGroupEdit',
			component: LonganAllCouponGroupEdit
		},{
			path: '/LonganPlatformCouponEdit',
			name: 'LonganPlatformCouponEdit',
			component: LonganPlatformCouponEdit
		},{
			path: '/LonganPlatformCouponcheck',
			name: 'LonganPlatformCouponcheck',
			component: LonganPlatformCouponcheck
		},{
			path: '/LonganAllCouponBatch',
			name: 'LonganAllCouponBatch',
			component: LonganAllCouponBatch
		},{
			path: '/LonganAllCouponBatchEdit',
			name: 'LonganAllCouponBatchEdit',
			component: LonganAllCouponBatchEdit
		},{
			path: '/LonganGrantCouponRecord',
			name: 'LonganGrantCouponRecord',
			component: LonganGrantCouponRecord
		},{
			path: '/LonganAllGrantRecord',
			name: 'LonganAllGrantRecord',
			component: LonganAllGrantRecord
		},{
			path: '/LonganAllCouponList',
			name: 'LonganAllCouponList',
			component: LonganAllCouponList
		},{
			path: '/LonganCouponOrder',
			name: 'LonganCouponOrder',
			component: LonganCouponOrder
		},{
			path: '/LonganProdCouponBatch',
			name: 'LonganProdCouponBatch',
			component: LonganProdCouponBatch
		},{
			path: '/LonganProdCouponBatchAdd',
			name: 'LonganProdCouponBatchAdd',
			component: LonganProdCouponBatchAdd
		},{
			path: '/LonganProdCouponBatchEdit',
			name: 'LonganProdCouponBatchEdit',
			component: LonganProdCouponBatchEdit
		},{
			path: '/LonganProdCouponBatchCheck',
			name: 'LonganProdCouponBatchCheck',
			component: LonganProdCouponBatchCheck
		},{
			path: '/LonganProdCouponGroup',
			name: 'LonganProdCouponGroup',
			component: LonganProdCouponGroup
		},{
			path: '/LonganProdCouponGroupEdit',
			name: 'LonganProdCouponGroupEdit',
			component: LonganProdCouponGroupEdit
		},{
			path: '/LonganCouponList',
			name: 'LonganCouponList',
			component: LonganCouponList
		},{
			path: '/LonganCouponOrderDetail',
			name: 'LonganCouponOrderDetail',
			component: LonganCouponOrderDetail
		},{
			path: '/LonganRebackMoney',
			name: 'LonganRebackMoney',
			component: LonganRebackMoney
		},{
			path: '/LonganReplenishList',
			name: 'LonganReplenishList',
			component: LonganReplenishList
		},{
			path:'/LonganCabTypeList',
			name:'LonganCabTypeList',
			component:LonganCabTypeList
		},{
			path:'/LonganCabTypeListAdd',
			name:'LonganCabTypeListAdd',
			component:LonganCabTypeListAdd
		},{
			path:'/LonganCabTypeEdit',
			name:'LonganCabTypeEdit',
			component:LonganCabTypeEdit
		},{
			path:'/LonganCabTypeDetail',
			name:'LonganCabTypeDetail',
			component:LonganCabTypeDetail
		},{
			path: '/LonganActivityAdd',
			name: 'LonganActivityAdd',
			component: LonganActivityAdd
		},{
			path: '/LonganActivityChange',
			name: 'LonganActivityChange',
			component: LonganActivityChange
		},{
			path: '/LonganActivityDef',
			name: 'LonganActivityDef',
			component: LonganActivityDef
		},{
			path: '/LonganActivityDetail',
			name: 'LonganActivityDetail',
			component: LonganActivityDetail
		},{
			path: '/LonganActivityList',
			name: 'LonganActivityList',
			component: LonganActivityList
		},{
			path: '/LonganActivityRecord',
			name: 'LonganActivityRecord',
			component: LonganActivityRecord
		},{
			path: '/LonganRedPackList',
			name: 'LonganRedPackList',
			component: LonganRedPackList
		},{
			path: '/LonganLuckyBagsRecords',
			name: 'LonganLuckyBagsRecords',
			component: LonganLuckyBagsRecords
		},{
			path: '/LonganFsData',
			name: 'LonganFsData',
			component: LonganFsData
		},{
			path: '/LonganActRedpackDef',
			name: 'LonganActRedpackDef',
			component: LonganActRedpackDef
		},{
			path: '/LonganActShareDef',
			name: 'LonganActShareDef',
			component: LonganActShareDef
		},{
			path: '/LonganShareBonus',
			name: 'LonganShareBonus',
			component: LonganShareBonus
		},{
			path: '/LonganShareBonusAdd',
			name: 'LonganShareBonusAdd',
			component: LonganShareBonusAdd
		},{
			path: '/LonganShareBonusChange',
			name: 'LonganShareBonusChange',
			component: LonganShareBonusChange
		},{
			path: '/LonganShareBonusDetail',
			name: 'LonganShareBonusDetail',
			component: LonganShareBonusDetail
		},{
			path: '/LonganEmployeeList',
			name: 'LonganEmployeeList',
			component: LonganEmployeeList
		},{
			path: '/LonganEmployeeCash',
			name: 'LonganEmployeeCash',
			component: LonganEmployeeCash
		},{
			path: '/LonganEmployeeReDetail',
			name: 'LonganEmployeeReDetail',
			component: LonganEmployeeReDetail
		},{
			path: '/LonganCustomerList',
			name: 'LonganCustomerList',
			component: LonganCustomerList
		},{
			path: '/LonganCustomerCash',
			name: 'LonganCustomerCash',
			component: LonganCustomerCash
		},{
			path: '/LonganCustomerReDetail',
			name: 'LonganCustomerReDetail',
			component: LonganCustomerReDetail
		},{
			path: '/LonganHotelShareRecord',
			name: 'LonganHotelShareRecord',
			component: LonganHotelShareRecord
		},{
			path: '/LonganselfTakingList',
			name: 'LonganselfTakingList',
			component: LonganselfTakingList
		},{
			path: '/LonganselfTakingAdd',
			name: 'LonganselfTakingAdd',
			component: LonganselfTakingAdd
		},{
			path: '/LonganselfTakingEdit',
			name: 'LonganselfTakingEdit',
			component: LonganselfTakingEdit
		},{
			path: '/LonganselfTakingDetail',
			name: 'LonganselfTakingDetail',
			component: LonganselfTakingDetail
		},{
			path: '/VirtualCabinetDetail',
			name: 'VirtualCabinetDetail',
			component: VirtualCabinetDetail
		},{
			path: '/LonganFuncLinkList',
			name: 'LonganFuncLinkList',
			component: LonganFuncLinkList
		},{
			path: '/LonganFuncLinkDetail',
			name: 'LonganFuncLinkDetail',
			component: LonganFuncLinkDetail
		},{
			path: '/LonganFuncLinkAdd',
			name: 'LonganFuncLinkAdd',
			component: LonganFuncLinkAdd
		},{
			path: '/LonganFuncLinkChange',
			name: 'LonganFuncLinkChange',
			component: LonganFuncLinkChange
		},{
			path: '/LonganFuncLinkParams',
			name: 'LonganFuncLinkParams',
			component: LonganFuncLinkParams
		},{
			path: '/LonganProdSpecsList',
			name: 'LonganProdSpecsList',
			component: LonganProdSpecsList
		},{
			path: '/LonganProdSpecsAdd',
			name: 'LonganProdSpecsAdd',
			component: LonganProdSpecsAdd
		},{
			path: '/LonganProdSpecsModify',
			name: 'LonganProdSpecsModify',
			component: LonganProdSpecsModify
		},{
			path: '/LonganProdSpecsDetail',
			name: 'LonganProdSpecsDetail',
			component: LonganProdSpecsDetail
		},{
			path: '/LonganHotelProdSpecsList',
			name: 'LonganHotelProdSpecsList',
			component: LonganHotelProdSpecsList
		},{
			path: '/LonganHotelProdSpecsAdd',
			name: 'LonganHotelProdSpecsAdd',
			component: LonganHotelProdSpecsAdd
		},{
			path: '/LonganHotelProdSpecsModify',
			name: 'LonganHotelProdSpecsModify',
			component: LonganHotelProdSpecsModify
		},{
			path: '/LonganHotelProdSpecsDetail',
			name: 'LonganHotelProdSpecsDetail',
			component: LonganHotelProdSpecsDetail
		},{
			path: '/LonganFunctionSpecsList',
			name: 'LonganFunctionSpecsList',
			component: LonganFunctionSpecsList
		},{
			path: '/LonganFunctionSpecsAdd',
			name: 'LonganFunctionSpecsAdd',
			component: LonganFunctionSpecsAdd
		},{
			path: '/LonganFunctionSpecsModify',
			name: 'LonganFunctionSpecsModify',
			component: LonganFunctionSpecsModify
		},{
			path: '/LonganFunctionSpecsDetail',
			name: 'LonganFunctionSpecsDetail',
			component: LonganFunctionSpecsDetail
		},{
			path: '/LonganCardticketList',
			name: 'LonganCardticketList',
			component: LonganCardticketList
		},{
			path: '/LonganCardticketDetail',
			name: 'LonganCardticketDetail',
			component: LonganCardticketDetail
		},{
			path: '/LonganCardCouponList',
			name: 'LonganCardCouponList',
			component: LonganCardCouponList
		},{
			path: '/LonganCardCouponDetail',
			name: 'LonganCardCouponDetail',
			component: LonganCardCouponDetail
		},{
			path: '/LonganCardCouponRecord',
			name: 'LonganCardCouponRecord',
			component: LonganCardCouponRecord
		},{
			path: '/uploadpic',
			name: 'uploadpic',
			component: uploadpic
		},{
			path: '/LonganExternalLogistics',
			name: 'LonganExternalLogistics',
			component: LonganExternalLogistics
		},{
			path: '/LonganExternalLogisticsEdit',
			name: 'LonganExternalLogisticsEdit',
			component: LonganExternalLogisticsEdit
		},{
			path: '/LonganExternalLogisticsDetail',
			name: 'LonganExternalLogisticsDetail',
			component: LonganExternalLogisticsDetail
		},{
			path: '/LonganHotelLogistics',
			name: 'LonganHotelLogistics',
			component: LonganHotelLogistics
		},{
			path: '/LonganHotelLogisticsAdd',
			name: 'LonganHotelLogisticsAdd',
			component: LonganHotelLogisticsAdd
		},{
			path: '/LonganHotelLogisticsEdit',
			name: 'LonganHotelLogisticsEdit',
			component: LonganHotelLogisticsEdit
		},{
			path: '/LonganHotelLogisticsDetail',
			name: 'LonganHotelLogisticsDetail',
			component: LonganHotelLogisticsDetail
		},{
			path: '/LonganExternalOrder',
			name: 'LonganExternalOrder',
			component: LonganExternalOrder
		},{
			path: '/LonganExternalDetail',
			name: 'LonganExternalDetail',
			component: LonganExternalDetail
		},{
			path: '/LonganOrganWaitDivide',
			name: 'LonganOrganWaitDivide',
			component: LonganOrganWaitDivide
		},{
			path: '/LonganOrganWaitDivideDetail',
			name: 'LonganOrganWaitDivideDetail',
			component: LonganOrganWaitDivideDetail
		},{
			path: '/LonganOrganDivideRecord',
			name: 'LonganOrganDivideRecord',
			component: LonganOrganDivideRecord
		},{
			path: '/LonganOrganDivideRecordDetail',
			name: 'LonganOrganDivideRecordDetail',
			component: LonganOrganDivideRecordDetail
		},{
			path: '/LonganWaitAccountIncome',
			name: 'LonganWaitAccountIncome',
			component: LonganWaitAccountIncome
		},{
			path: '/LonganWaitAccountIncomeDetail',
			name: 'LonganWaitAccountIncomeDetail',
			component: LonganWaitAccountIncomeDetail
		},{
			path: '/LonganIncomeRecord',
			name: 'LonganIncomeRecord',
			component: LonganIncomeRecord
		},{
			path: '/LonganIncomeRecordDetail',
			name: 'LonganIncomeRecordDetail',
			component: LonganIncomeRecordDetail
		},{
			path: '/LonganCustomerWaitIn',
			name: 'LonganCustomerWaitIn',
			component: LonganCustomerWaitIn
		},{
			path: '/LonganCustomerWaitInDetail',
			name: 'LonganCustomerWaitInDetail',
			component: LonganCustomerWaitInDetail
		},{
			path: '/LonganCustomerIncomeRecord',
			name: 'LonganCustomerIncomeRecord',
			component: LonganCustomerIncomeRecord
		},{
			path: '/LonganCustomerInRecordDetail',
			name: 'LonganCustomerInRecordDetail',
			component: LonganCustomerInRecordDetail
		},{
			path: '/LonganOrgAccountlist',
			name: 'LonganOrgAccountlist',
			component: LonganOrgAccountlist
		},{
			path: '/LonganHotelADList',
			name: 'LonganHotelADList',
			component: LonganHotelADList
		},{
			path: '/LonganHotelADAdd',
			name: 'LonganHotelADAdd',
			component: LonganHotelADAdd
		},{
			path: '/LonganHotelADModify',
			name: 'LonganHotelADModify',
			component: LonganHotelADModify
		},{
			path: '/LonganHotelADDetail',
			name: 'LonganHotelADDetail',
			component: LonganHotelADDetail
		},{
			path: '/LonganHotelADQuoteDetail',
			name: 'LonganHotelADQuoteDetail',
			component: LonganHotelADQuoteDetail
		},{
			path: '/LonganHotelVisitRecord',
			name: 'LonganHotelVisitRecord',
			component: LonganHotelVisitRecord
		},{
			path: '/LonganHotelOrderRecord',
			name: 'LonganHotelOrderRecord',
			component: LonganHotelOrderRecord
		},{
			path: '/LonganHotelRetailRecord',
			name: 'LonganHotelRetailRecord',
			component: LonganHotelRetailRecord
		},{
			path: '/LonganEmpRetailRecord',
			name: 'LonganEmpRetailRecord',
			component: LonganEmpRetailRecord
		}

	]
	}]
})
