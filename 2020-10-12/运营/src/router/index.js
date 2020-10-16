import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import HomePage from '@/pages/HomePage'
import index from '@/pages/index'
// import LonganUserList from '@/components/LonganUserList'
// import LonganUserAdd from '@/components/LonganUserAdd'
// import LonganUserModify from '@/components/LonganUserModify'
// 酒店管理 start 
import LonganHotelList from '@/pages/LonganHotelManagement/LonganHotelList'
import LonganHotelAdd from '@/pages/LonganHotelManagement/LonganHotelAdd'
import LonganHotelDetail from '@/pages/LonganHotelManagement/LonganHotelDetail'
import LonganHotelModify from '@/pages/LonganHotelManagement/LonganHotelModify'
// 酒店管理 end

//柜子管理 - 未更换的格子
import LonganHotelGridList from '@/pages/LonganHotelCabinetManagement/LonganHotelGridList'
//柜子管理 - 更换的记录
import replacecabinet from '@/pages/LonganHotelCabinetManagement/replacecabinet'
//柜子管理 - 控制板物联卡
import LonganIotCardList from '@/pages/LonganHotelCabinetManagement/LonganIotCardList'
//柜子管理 - 补货管理
import LonganReplenishList from '@/pages/LonganHotelCabinetManagement/LonganReplenishList'
//柜子管理 - 柜子类型管理
import LonganCabTypeList from '@/pages/LonganHotelCabinetManagement/LonganCabTypeList'
import LonganCabTypeListAdd from '@/pages/LonganHotelCabinetManagement/LonganCabTypeListAdd'
import LonganCabTypeEdit from '@/pages/LonganHotelCabinetManagement/LonganCabTypeEdit'
import LonganCabTypeDetail from '@/pages/LonganHotelCabinetManagement/LonganCabTypeDetail'
//柜子管理 - 保修单
import LonganDeclarationForm from '@/pages/LonganHotelCabinetManagement/LonganDeclarationForm'
//柜子管理 - 故障管理
import LonganMalfunctionManage from '@/pages/LonganHotelCabinetManagement/LonganMalfunctionManage'



import LonganHotelCommodityMarketList from '@/components/LonganHotelCommodityMarketList'
import LonganHotelCommodityMarketAdd from '@/components/LonganHotelCommodityMarketAdd'
import LonganHotelCommodityMarketModify from '@/components/LonganHotelCommodityMarketModify'



import CommodityList from '@/components/CommodityList'
import CommodityAdd from '@/components/CommodityAdd'
import Commodityedit from '@/components/Commodityedit'

// 商品管理 - 全部商品管理
import LonganAllCommodityManage from '@/pages/LonganAllCommodityManagement/LonganAllCommodityManage'
import LonganAllCommodityDetail from '@/pages/LonganAllCommodityManagement/LonganAllCommodityDetail'
// 商品管理 - 运营商商品管理
import LonganPlatformCommodityList from '@/pages/LonganPlatformCommodityManangement/LonganPlatformCommodityList'
import LonganPlatformCommodityAdd from '@/pages/LonganPlatformCommodityManangement/LonganPlatformCommodityAdd'
import LonganPlatformCommodityModify from '@/pages/LonganPlatformCommodityManangement/LonganPlatformCommodityModify'
import LonganPlatformCommodityDetail from '@/pages/LonganPlatformCommodityManangement/LonganPlatformCommodityDetail'
// 商品管理 - 酒店平台商品管理
import LonganHotelPlatCommodityList from '@/pages/LonganHotelPlatCommodityManagement/LonganHotelPlatCommodityList'
import LonganHotelPlatCommodityAdd from '@/pages/LonganHotelPlatCommodityManagement/LonganHotelPlatCommodityAdd'
import LonganHotelPlatCommodityModify from '@/pages/LonganHotelPlatCommodityManagement/LonganHotelPlatCommodityModify'
import LonganHotelPlatCommodityDetail from '@/pages/LonganHotelPlatCommodityManagement/LonganHotelPlatCommodityDetail'
// 商品管理 - 酒店商品管理
import LonganHotelAllCommodityList from '@/pages/LonganHotelAllCommodityManagement/LonganHotelAllCommodityList'
import LonganHotelAllCommodityModify from '@/pages/LonganHotelAllCommodityManagement/LonganHotelAllCommodityModify'
import LonganHotelAllCommodityDetail from '@/pages/LonganHotelAllCommodityManagement/LonganHotelAllCommodityDetail'
//商品管理 - 酒店功能区商品管理
import LonganFunctionProdList from '@/pages/LonganFunctionProdManagement/LonganFunctionProdList'
import LonganFunctionProdAdd from '@/pages/LonganFunctionProdManagement/LonganFunctionProdAdd'
import LonganFunctionProdModify from '@/pages/LonganFunctionProdManagement/LonganFunctionProdModify'
import LonganFunctionProdDetail from '@/pages/LonganFunctionProdManagement/LonganFunctionProdDetail'
//商品管理 - 酒店迷你吧商品管理
import LonganMinibarProdList from '@/pages/LonganMinibarProdManagement/LonganMinibarProdList'
import LonganMinibarProdAdd from '@/pages/LonganMinibarProdManagement/LonganMinibarProdAdd'
import LonganMinibarProdModify from '@/pages/LonganMinibarProdManagement/LonganMinibarProdModify'
//商品管理 - 外部物流
import LonganExternalLogistics from "@/pages/LonganExternalLogisticsManagement/LonganExternalLogistics"
import LonganExternalLogisticsEdit from "@/pages/LonganExternalLogisticsManagement/LonganExternalLogisticsEdit"
import LonganExternalLogisticsDetail from "@/pages/LonganExternalLogisticsManagement/LonganExternalLogisticsDetail"
//商品管理 - 商品统计分类
import LonganCommodityStatisticsList from '@/pages/LonganCommodityStatisticsManagement/LonganCommodityStatisticsList'
import LonganCommodityStatisticsAdd from '@/pages/LonganCommodityStatisticsManagement/LonganCommodityStatisticsAdd'
import LonganCommodityStatisticsModify from '@/pages/LonganCommodityStatisticsManagement/LonganCommodityStatisticsModify'
//商品管理 - 快递费模板
import LonganExpressTemplate from '@/pages/LonganExpressTemplateManagement/LonganExpressTemplate'
import LonganExpressAdd from '@/pages/LonganExpressTemplateManagement/LonganExpressAdd'
import LonganExpressChange from '@/pages/LonganExpressTemplateManagement/LonganExpressChange'
//商品管理 - 酒店商品评价
import LonganHotelEvaluate from '@/pages/LonganHotelEvaluateManagement/LonganHotelEvaluate'
import LonganHotelEvalDetail from '@/pages/LonganHotelEvaluateManagement/LonganHotelEvalDetail'
//商品管理 - 酒店商品默认评价
import LonganDefEvaluate from '@/pages/LonganHotelEvaluateManagement/LonganDefEvaluate'
import LonganDefEvaluateAdd from '@/pages/LonganHotelEvaluateManagement/LonganDefEvaluateAdd'
import LonganDefEvaluateEdit from '@/pages/LonganHotelEvaluateManagement/LonganDefEvaluateEdit'
import LonganDefEvaluateDetail from '@/pages/LonganHotelEvaluateManagement/LonganDefEvaluateDetail'


import LonganCommodityMarketTemplateList from '@/components/LonganCommodityMarketTemplateList'
import LonganCommodityMarketTemplateAdd from '@/components/LonganCommodityMarketTemplateAdd'
import LonganCommodityMarketTemplateModify from '@/components/LonganCommodityMarketTemplateModify'

//二维码管理
import Cabinetgl from '@/pages/LonganHotelQrCodeManagement/Cabinetgl'
import Cabinetchange from '@/pages/LonganHotelQrCodeManagement/Cabinetchange'
import CabinetAdd from '@/pages/LonganHotelQrCodeManagement/CabinetAdd'
import CabinetDetail from '@/pages/LonganHotelQrCodeManagement/CabinetDetail'
//二维码管理 - 查看商品信息
import Cabinetlook from '@/pages/LonganHotelQrCodeManagement/Cabinetlook'



//进场配置管理
import VirtualCabinetConfiguration from '@/pages/LonganHotelVirtualCabinetConfigurationManagement/VirtualCabinetConfiguration'
import VirtualCabinetAdd from '@/pages/LonganHotelVirtualCabinetConfigurationManagement/VirtualCabinetAdd'
import VirtualCabinetChange from '@/pages/LonganHotelVirtualCabinetConfigurationManagement/VirtualCabinetChange'
import VirtualCabinetDetail from "@/pages/LonganHotelVirtualCabinetConfigurationManagement/VirtualCabinetDetail"


import SeepurchaseOrder from '@/components/SeepurchaseOrder'
import hotelrecorddetail from '@/components/hotelrecorddetail'

//酒店主题管理
import hotelskinlist from '@/pages/LonganHotelskinManagement/hotelskinlist'
import hotelskinadd from '@/pages/LonganHotelskinManagement/hotelskinadd'
import hotelskinmodify from '@/pages/LonganHotelskinManagement/hotelskinmodify'

import invoicerecord from '@/components/invoicerecord'



// 用户信息管理 - 用户管理
// import  { PrivilegeUserAdd, PrivilegeUserModify } from 'user-privilege-management'
import LonganPrivilegeUserList from '@/pages/LonganPrivilegeUserManagement/LonganPrivilegeUserList'
import LonganPrivilegeUserAdd from '@/pages/LonganPrivilegeUserManagement/LonganPrivilegeUserAdd'
import LonganPrivilegeUserModify from '@/pages/LonganPrivilegeUserManagement/LonganPrivilegeUserModify'
// 用户信息管理 - 角色管理
import LonganPrivilegeRoleList from '@/pages/LonganPrivilegeUserManagement/LonganPrivilegeRoleList'
import LonganPrivilegeRoleAdd from '@/pages/LonganPrivilegeUserManagement/LonganPrivilegeRoleAdd'
import LonganPrivilegeRoleModify from '@/pages/LonganPrivilegeUserManagement/LonganPrivilegeRoleModify'
// 用户信息管理 - 个人信息
import LonganPrivilegeUpdateUserInfo from '@/pages/LonganPrivilegeUserManagement/LonganPrivilegeUpdateUserInfo'
// 用户信息管理 - 修改密码
import LonganPrivilegeUpdatePWD from '@/pages/LonganPrivilegeUserManagement/LonganPrivilegeUpdatePWD'
// 用户信息管理 - 企业信息
import LonganOperator from '@/pages/LonganPrivilegeUserManagement/LonganOperator'



import LonganHotelCommodityList from '@/components/LonganHotelCommodityList'
import LonganHotelCommodityModify from '@/components/LonganHotelCommodityModify'
import LonganHotelCabinetList from '@/components/LonganHotelCabinetList'
import LonganHotelCommodityAdd from '@/components/LonganHotelCommodityAdd'
import LonganHotelCabinetModify from '@/components/LonganHotelCabinetModify'
import LonganInventoryList from '@/components/LonganInventoryList'
import LonganGodownEntryList from '@/components/LonganGodownEntryList'
import LonganGodownEntryDetail from '@/components/LonganGodownEntryDetail'
import LonganGodownEntryAudit from '@/components/LonganGodownEntryAudit'

// 酒店客房设施管理 - 客房设施分类
import LonganCommonFeature from '@/pages/LonganHotelFeatureManagement/LonganCommonFeature'
import LonganCommonFeatureAdd from '@/pages/LonganHotelFeatureManagement/LonganCommonFeatureAdd'
import LonganCommonFeatureModify from '@/pages/LonganHotelFeatureManagement/LonganCommonFeatureModify'
// 酒店客房设施管理 - 酒店客房设施管理
import LonganHotelFeature from '@/pages/LonganHotelFeatureManagement/LonganHotelFeature'
import LonganHotelFeatureAdd from '@/pages/LonganHotelFeatureManagement/LonganHotelFeatureAdd'
import LonganHotelFeatureDetail from '@/pages/LonganHotelFeatureManagement/LonganHotelFeatureDetail'
import LonganHotelFeatureDetailAdd from '@/pages/LonganHotelFeatureManagement/LonganHotelFeatureDetailAdd'
import LonganHotelFeatureDetailModify from '@/pages/LonganHotelFeatureManagement/LonganHotelFeatureDetailModify'


import LonganRevenueStatistics from '@/components/LonganRevenueStatistics'
import LonganRevenueDetail from '@/components/LonganRevenueDetail'
import LonganOperationAnalysis from '@/components/LonganOperationAnalysis'
import LonganOperationAnalysisDetail from '@/components/LonganOperationAnalysisDetail'
import LonganAbnormalStateOfCabinet from '@/components/LonganAbnormalStateOfCabinet'
import LonganDivideInto from '@/components/LonganDivideInto'
import LonganWithdrawalsRecord from '@/components/LonganWithdrawalsRecord'
import LonganWithdrawalsRecordDetail from '@/components/LonganWithdrawalsRecordDetail'
import LonganWithdrawalsRecordHandle from '@/components/LonganWithdrawalsRecordHandle'

import LonganFinancialCost from '@/components/LonganFinancialCost'
import LonganHotelAfterSale from '@/components/LonganHotelAfterSale'


// 售后服务 - 运营商商品售后
import platformaftersale from '@/pages/LonganAftersaleManagement/platformaftersale'
import platformaftersaledetail from '@/pages/LonganAftersaleManagement/platformaftersaledetail'
// 售后服务 - 全部商品售后
import allsaleapply from '@/pages/LonganAftersaleManagement/allsaleapply'
import allsaleapplydetail from '@/pages/LonganAftersaleManagement/allsaleapplydetail'

//入住商管理 - 入住商管理
import LonganMerchant from '@/pages/LonganMerchantManagement/LonganMerchant'
import LonganMerchantadd from '@/pages/LonganMerchantManagement/LonganMerchantadd'
import LonganMerchantchange from '@/pages/LonganMerchantManagement/LonganMerchantchange'
//入住商管理 - 供应商申请
import LonganSupplierApply from '@/pages/LonganMerchantManagement/LonganSupplierApply'
import LonganSupplierDetail from '@/pages/LonganMerchantManagement/LonganSupplierDetail'

// 订单配送 - 订单管理
import LonganOrderList from '@/pages/LonganOrderDistribution/LonganOrderList'
// 订单配送 - 订单管理 - 商品详情
import LonganOrderProductDetails from '@/pages/LonganOrderDistribution/LonganOrderProductDetails'
// 订单配送 - 订单管理 - 配送详情
import LonganOrderDeliveryDetails from '@/pages/LonganOrderDistribution/LonganOrderDeliveryDetails'
// 订单配送 - 订单管理 - 卡券详情
import LonganOrderCouponDetails from '@/pages/LonganOrderDistribution/LonganOrderCouponDetails'
// 订单配送 - 运营商商品配送单
import LonganPlatDeliveryList from '@/pages/LonganOrderDistribution/LonganPlatDeliveryList'
import LonganPlatDeliveryDetail from '@/pages/LonganOrderDistribution/LonganPlatDeliveryDetail'
// 订单配送 - 全部商品配送单
import LonganAllDeliveryList from '@/pages/LonganOrderDistribution/LonganAllDeliveryList'
import LonganAllDeliveryDetail from '@/pages/LonganOrderDistribution/LonganAllDeliveryDetail'
// 订单配送 - 所有酒店现场配送单
import LonganAllDelivery from '@/pages/LonganOrderDistribution/LonganAllDelivery'
import LonganALLDelidetail from '@/pages/LonganOrderDistribution/LonganALLDelidetail'
import LonganGuestMiniDelidetail from '@/pages/LonganOrderDistribution/LonganGuestMiniDelidetail'
// 订单配送 - 外部配送单
import LonganExternalOrder from "@/pages/LonganOrderDistribution/LonganExternalOrder"
import LonganExternalDetail from "@/pages/LonganOrderDistribution/LonganExternalDetail"


import LonganOrderDetails from '@/components/LonganOrderDetails'


//审核管理 - 我发起的流程
import LonganProcessList from '@/pages/LonganProcessManagement/LonganProcessList'
import LonganProcessDetails from '@/pages/LonganProcessManagement/LonganProcessDetails'
//审核管理 - 待审核任务
import LonganPendingReviewList from '@/pages/LonganProcessManagement/LonganPendingReviewList'
import LonganPendingReviewDetails from '@/pages/LonganProcessManagement/LonganPendingReviewDetails'
//审核管理 - 已审核任务
import LonganReviewList from '@/pages/LonganProcessManagement/LonganReviewList'
import LonganReviewDetails from '@/pages/LonganProcessManagement/LonganReviewDetails'

import LonganPendingClaimList from '@/pages/LonganProcessManagement/LonganPendingClaimList'
import LonganPendingClaimDetails from '@/pages/LonganProcessManagement/LonganPendingClaimDetails'


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

//库存管理 - 酒店平台商品库存
import HotelPlatformInventory from '@/pages/LonganHotelInventoryManagement/HotelPlatformInventory'
//库存管理 - 全部商品库存
import hotelproInventorylist from '@/pages/LonganHotelInventoryManagement/hotelproInventorylist'
//库存管理 - 运营商商品入库单
import PlatformenterOrderlist from '@/pages/LonganHotelInventoryManagement/PlatformenterOrderlist'
//库存管理 - 运营商商品出库单
import PlatformoutOrderlist from '@/pages/LonganHotelInventoryManagement/PlatformoutOrderlist'
import PlatformoutOrderdetail from '@/pages/LonganHotelInventoryManagement/PlatformoutOrderdetail'
//库存管理 - 全部入库单
import allenterorderlist from '@/pages/LonganHotelInventoryManagement/allenterorderlist'
import allenterorderdetail from '@/pages/LonganHotelInventoryManagement/allenterorderdetail'
//库存管理 - 全部出库单
import alloutorderlist from '@/pages/LonganHotelInventoryManagement/alloutorderlist'
import alloutorderdetail from '@/pages/LonganHotelInventoryManagement/alloutorderdetail'
//库存管理 - 采购管理
import PurchaseOrderlist from '@/pages/LonganHotelInventoryManagement/PurchaseOrderlist'
import PurchaseOrderadd from '@/pages/LonganHotelInventoryManagement/PurchaseOrderadd'
import PurchaseOrderedit from '@/pages/LonganHotelInventoryManagement/PurchaseOrderedit'

import PlatformenterOrderdetail from '@/components/PlatformenterOrderdetail'


//合作伙伴管理 - 合作伙伴管理
import LonganFranchiseelist from '@/pages/LonganFranchiseeManagement/LonganFranchiseelist'
import LonganFranchiseeadd from '@/pages/LonganFranchiseeManagement/LonganFranchiseeadd'
import LonganFranchiseeedit from '@/pages/LonganFranchiseeManagement/LonganFranchiseeedit'
import LonganFranchiseeedetail from '@/pages/LonganFranchiseeManagement/LonganFranchiseeedetail'
import LonganPartnerSetup from '@/pages/LonganFranchiseeManagement/LonganPartnerSetup'
//合作伙伴管理 - 合作伙伴酒店管理
import LonganFranchiseehotellist from '@/pages/LonganFranchiseeManagement/LonganFranchiseehotellist'
import LonganFranchiseehoteladd from '@/pages/LonganFranchiseeManagement/LonganFranchiseehoteladd'
import LonganFranchiseehoteldetail from '@/pages/LonganFranchiseeManagement/LonganFranchiseehoteldetail'
//合作伙伴管理 - 合作伙伴酒店管理 - 管理柜子
import LonganChoiceCabinet from '@/pages/LonganFranchiseeManagement/LonganChoiceCabinet'

import LonganAccountlist from '@/components/LonganAccountlist'

import LonganOrganDivide from '@/components/LonganOrganDivide'







//客房预订 - 房型管理
import LonganBookTypeList from '@/pages/LonganBookTypeManagement/LonganBookTypeList'
import LonganBookTypeDetail from '@/pages/LonganBookTypeManagement/LonganBookTypeDetail'
//客房预订 - 房源管理
import LonganBookResourceList from '@/pages/LonganBookResourceManagemant/LonganBookResourceList'
import LonganBookResourceDetail from '@/pages/LonganBookResourceManagemant/LonganBookResourceDetail'
//客房预订 - 房价管理
import LonganBookPrice from '@/pages/LonganBookPriceManagement/LonganBookPrice'
import LonganBookPriceList from '@/pages/LonganBookPriceManagement/LonganBookPriceList'
//客房预订 - 房态管理
import LonganBookStatus from '@/pages/LonganBookStatusManagement/LonganBookStatus'
import LonganBookStatusHandleList from '@/pages/LonganBookStatusManagement/LonganBookStatusHandleList'
//客房预订 - 订单管理
import LonganBookOrder from '@/pages/LonganBookOrderManagement/LonganBookOrder'
import LonganBookOrderDetail from '@/pages/LonganBookOrderManagement/LonganBookOrderDetail'

//酒店文化
import LonganHotelCultureList from '@/pages/LonganHotelCultureManagement/LonganHotelCultureList'
import LonganHotelCultureAdd from '@/pages/LonganHotelCultureManagement/LonganHotelCultureAdd'
import LonganHotelCultureModify from '@/pages/LonganHotelCultureManagement/LonganHotelCultureModify'
import LonganHotelCultureDetail from '@/pages/LonganHotelCultureManagement/LonganHotelCultureDetail'
import LonganHotelCultureDetailAdd from '@/pages/LonganHotelCultureManagement/LonganHotelCultureDetailAdd'
import LonganHotelCultureDetailModify from '@/pages/LonganHotelCultureManagement/LonganHotelCultureDetailModify'


// 财务管理 - 实时分成
import LonganPredictEarnings from '@/pages/LonganFinancialManagement/LonganPredictEarnings'
// 财务管理 - 发票税率
import LonganInvoiceRateList from '@/pages/LonganFinancialManagement/InvoiceRateManagemnt/LonganInvoiceRateList'
import LonganInvoiceRateAdd from '@/pages/LonganFinancialManagement/InvoiceRateManagemnt/LonganInvoiceRateAdd'
import LonganInvoiceRateModify from '@/pages/LonganFinancialManagement/InvoiceRateManagemnt/LonganInvoiceRateModify'
// 财务管理 - 分成协议
import LonganHotelProtocolList from '@/pages/LonganFinancialManagement/ProtocolManagement/LonganHotelProtocolList'
import LonganHotelProtocolAdd from '@/pages/LonganFinancialManagement/ProtocolManagement/LonganHotelProtocolAdd'
import LonganHotelProtocolDetail from '@/pages/LonganFinancialManagement/ProtocolManagement/LonganHotelProtocolDetail'
// 财务管理 - 组织账户管理
import LonganOrgAccountlist from '@/pages/LonganFinancialManagement/OrgAccountManagement/LonganOrgAccountlist'
// 财务管理 - 组织账户管理 - 待入账分成
import LonganOrganWaitDivide from "@/pages/LonganFinancialManagement/OrgAccountManagement/LonganOrganWaitDivide"
import LonganOrganWaitDivideDetail from "@/pages/LonganFinancialManagement/OrgAccountManagement/LonganOrganWaitDivideDetail"
// 财务管理 - 组织账户管理 - 分成记录
import LonganOrganDivideRecord from '@/pages/LonganFinancialManagement/OrgAccountManagement/LonganOrganDivideRecord'
import LonganOrganDivideRecordDetail from '@/pages/LonganFinancialManagement/OrgAccountManagement/LonganOrganDivideRecordDetail'
// 财务管理 - 分类分成
import LonganClassifyDivide from '@/pages/LonganFinancialManagement/LonganClassifyDivide'
// 财务管理 - 分类分成 - 查看详情
import LonganDetailedDivide from '@/pages/LonganFinancialManagement/LonganDetailedDivide'
// 财务管理 - 提现记录
import LonganCarryDetail from '@/pages/LonganFinancialManagement/LonganCarryDetail'
import LongancheckCarryDetail from '@/pages/LonganFinancialManagement/LongancheckCarryDetail'
// 财务管理 - 提现记录 - 处理
import LonganAccountHandle from '@/pages/LonganFinancialManagement/LonganAccountHandle'
// 财务管理 - 补货费
import LonganReplenishmentFee from '@/pages/LonganFinancialManagement/ReplenishmentFeeManagement/LonganReplenishmentFee'
// 财务管理 - 补货费用提现
import LonganReplenishmentFeeDiscount from '@/pages/LonganFinancialManagement/ReplenishmentFeeManagement/LonganReplenishmentFeeDiscount'
// 财务管理 - 待开商品销售发票
import LonganWaitInvoiceProdList from '@/pages/LonganFinancialManagement/WaitInvoiceProdManagement/LonganWaitInvoiceProdList'
import LonganWaitInvoiceProdDetail from '@/pages/LonganFinancialManagement/WaitInvoiceProdManagement/LonganWaitInvoiceProdDetail'
// 财务管理 - 全部发票管理
import LonganAllInvoiceList from '@/pages/LonganFinancialManagement/AllInvoiceManagement/LonganAllInvoiceList'
import LonganAllInvoiceDetail from '@/pages/LonganFinancialManagement/AllInvoiceManagement/LonganAllInvoiceDetail'


import LonganWaitAccountIncome from '@/components/LonganWaitAccountIncome'
import LonganWaitAccountIncomeDetail from '@/components/LonganWaitAccountIncomeDetail'
import LonganIncomeRecord from '@/components/LonganIncomeRecord'
import LonganIncomeRecordDetail from '@/components/LonganIncomeRecordDetail'
import LonganCustomerWaitIn from '@/components/LonganCustomerWaitIn'
import LonganCustomerWaitInDetail from '@/components/LonganCustomerWaitInDetail'
import LonganCustomerIncomeRecord from '@/components/LonganCustomerIncomeRecord'
import LonganCustomerInRecordDetail from '@/components/LonganCustomerInRecordDetail'



//酒店功能区
import LonganHotelFunctionList from '@/pages/LonganHotelFunctionManagement/LonganHotelFunctionList'
import LonganHotelFunctionAdd from '@/pages/LonganHotelFunctionManagement/LonganHotelFunctionAdd'
import LonganHotelFunctionModify from '@/pages/LonganHotelFunctionManagement/LonganHotelFunctionModify'
import LonganHotelFunctionDetail from '@/pages/LonganHotelFunctionManagement/LonganHotelFunctionDetail'
import LonganHotelFunctionClassify from '@/pages/LonganHotelFunctionManagement/LonganHotelFunctionClassify'


//消息通知管理 - 消息模板
import LonganMessagelist from '@/pages/LonganMessageManagement/LonganMessagelist'
import LonganMessageAdd from '@/pages/LonganMessageManagement/LonganMessageAdd'
import LonganMessageEdit from '@/pages/LonganMessageManagement/LonganMessageEdit'
import LonganMessageDetail from '@/pages/LonganMessageManagement/LonganMessageDetail'
//消息通知管理 - 测试
import LonganmessageTest from '@/pages/LonganMessageManagement/LonganmessageTest'
//消息通知管理 - 待发送消息
import LonganWaitSendMessage from '@/pages/LonganMessageManagement/LonganWaitSendMessage'
//消息通知管理 - 已发送消息
import LonganSendMessage from '@/pages/LonganMessageManagement/LonganSendMessage'
//消息通知管理 - 内容模板
import LonganContentTemp from '@/pages/LonganMessageManagement/LonganContentTemp'
//消息通知管理 - 营销短信管理
import LonganMarketingSMS from '@/pages/LonganMessageManagement/LonganMarketingSMS'
import LonganMarketingDetail from '@/pages/LonganMessageManagement/LonganMarketingDetail'

//财运星 - 实时数据
import LonganFsData from '@/pages/LonganFortuneStarManagement/LonganFsData'
//财运星 - 投放酒店管理
import LaunchHotelManagement from '@/pages/LonganFortuneStarManagement/LaunchHotelManagement/LaunchHotelManagement'
import LaunchHotelAdd from '@/pages/LonganFortuneStarManagement/LaunchHotelManagement/LaunchHotelAdd'
import LaunchHotelChange from '@/pages/LonganFortuneStarManagement/LaunchHotelManagement/LaunchHotelChange'
//财运星 - 投放柜子管理
import LaunchCabinetManagement from '@/pages/LonganFortuneStarManagement/LaunchCabinetManagement/LaunchCabinetManagement'
//财运星 - 投放柜子管理 - 添加柜子
import LaunchCabinetAdd from '@/pages/LonganFortuneStarManagement/LaunchCabinetManagement/LaunchCabinetAdd'
//财运星 - 投放柜子管理 - 修改柜子
import LaunchCabinetChange from '@/pages/LonganFortuneStarManagement/LaunchCabinetManagement/LaunchCabinetChange'
//财运星 - 投资人管理
import LauncherManagement from '@/pages/LonganFortuneStarManagement/LauncherManagement/LauncherManagement'
//财运星 - 投资人管理 - 访问记录
import LauncherlookRecords from '@/pages/LonganFortuneStarManagement/LauncherManagement/LauncherlookRecords'
//财运星 - 投资人管理 - 优惠券记录
import LauncherbounceRecords from '@/pages/LonganFortuneStarManagement/LauncherManagement/LauncherbounceRecords'
//财运星 - 投资订单
import LauncherinvestorOrder from '@/pages/LonganFortuneStarManagement/LauncherManagement/LauncherinvestorOrder'
//财运星 - 投资柜子
import LauncherinvestorCabinet from '@/pages/LonganFortuneStarManagement/LauncherManagement/LauncherinvestorCabinet'
//财运星 - 退款记录
import LonganRebackMoney from '@/pages/LonganFortuneStarManagement/LonganRebackMoney'
//财运星 - 渠道管理
import LonganChannelList from '@/pages/LonganFortuneStarManagement/ChannelManagement/LonganChannelList'
import LonganChannelAdd from '@/pages/LonganFortuneStarManagement/ChannelManagement/LonganChannelAdd'
import LonganChannelModify from '@/pages/LonganFortuneStarManagement/ChannelManagement/LonganChannelModify'
//财运星 - 渠道商链接
import LonganChannelShareLink from '@/pages/LonganFortuneStarManagement/ChannelManagement/LonganChannelShareLink'
//财运星 - 渠道商合伙人
import LonganChannelPartner from '@/pages/LonganFortuneStarManagement/ChannelManagement/LonganChannelPartner'
//财运星 - 红包管理
import LonganRedPacketList from '@/pages/LonganFortuneStarManagement/LonganRedPacketList'
//财运星 - 柜子类型管理
import LonganCabinetType from '@/pages/LonganFortuneStarManagement/LaunchCabinetManagement/LonganCabinetType'
import LonganCabinetTypeAdd from '@/pages/LonganFortuneStarManagement/LaunchCabinetManagement/LonganCabinetTypeAdd'
import LonganCabinetTypeChange from '@/pages/LonganFortuneStarManagement/LaunchCabinetManagement/LonganCabinetTypeChange'
//财运星 - 会员管理
import LonganMemberList from '@/pages/LonganFortuneStarManagement/MemberManagement/LonganMemberList'
import LonganMemberAdd from '@/pages/LonganFortuneStarManagement/MemberManagement/LonganMemberAdd'
import LonganMemberChange from '@/pages/LonganFortuneStarManagement/MemberManagement/LonganMemberChange'
//财运星 - 会员管理 - 财富合伙人投资记录
import LonganMemberComRecords from '@/pages/LonganFortuneStarManagement/MemberManagement/LonganMemberComRecords'
//财运星 - 会员提现
import longanWithdraw from '@/pages/LonganFortuneStarManagement/longanWithdraw'
//财运星 - 会员奖励
import LonganMemberRewards from '@/pages/LonganFortuneStarManagement/MemberManagement/LonganMemberRewards'

import LonganMemberCom from '@/components/LonganMemberCom'



//优惠券管理 - 通用优惠券批次管理
import LonganPlatformCoupon from '@/pages/LonganCouponManagement/GeneralCouponBatchManagement/LonganPlatformCoupon'
import LonganPlatformCouponAdd from '@/pages/LonganCouponManagement/GeneralCouponBatchManagement/LonganPlatformCouponAdd'
import LonganPlatformCouponEdit from '@/pages/LonganCouponManagement/GeneralCouponBatchManagement/LonganPlatformCouponEdit'
import LonganPlatformCouponcheck from '@/pages/LonganCouponManagement/GeneralCouponBatchManagement/LonganPlatformCouponcheck'

//优惠券管理 - 所有优惠券分组
import LonganAllCouponGroup from '@/pages/LonganCouponManagement/AllCouponGroupManagement/LonganAllCouponGroup'
import LonganAllCouponGroupAdd from '@/pages/LonganCouponManagement/AllCouponGroupManagement/LonganAllCouponGroupAdd'
import LonganAllCouponGroupEdit from '@/pages/LonganCouponManagement/AllCouponGroupManagement/LonganAllCouponGroupEdit'
//优惠券管理 - 所有优惠券批次
import LonganAllCouponBatch from '@/pages/LonganCouponManagement/CouponBatchManagement/LonganAllCouponBatch'
import LonganAllCouponBatchEdit from '@/pages/LonganCouponManagement/CouponBatchManagement/LonganAllCouponBatchEdit'
//优惠券管理 - 优惠券发放管理
import LonganGrantCouponRecord from '@/pages/LonganCouponManagement/LonganGrantCouponRecord'
//优惠券管理 - 优惠券发放管理 - 发放记录
import LonganAllGrantRecord from '@/pages/LonganCouponManagement/LonganAllGrantRecord'
//优惠券管理 - 优惠券发送记录
import LonganCouponSendRecord from '@/pages/LonganCouponManagement/LonganCouponSendRecord'
//优惠券管理 - 所有优惠券管理
import LonganAllCouponList from '@/pages/LonganCouponManagement/LonganAllCouponList'
//优惠券管理 - 平台商品优惠券批次管理
import LonganProdCouponBatch from '@/pages/LonganCouponManagement/PlatformProdCouponBatchManagement/LonganProdCouponBatch'
import LonganProdCouponBatchAdd from '@/pages/LonganCouponManagement/PlatformProdCouponBatchManagement/LonganProdCouponBatchAdd'
import LonganProdCouponBatchEdit from '@/pages/LonganCouponManagement/PlatformProdCouponBatchManagement/LonganProdCouponBatchEdit'
import LonganProdCouponBatchCheck from '@/pages/LonganCouponManagement/PlatformProdCouponBatchManagement/LonganProdCouponBatchCheck'
//优惠券管理 - 平台商品优惠券分组管理
import LonganProdCouponGroup from '@/pages/LonganCouponManagement/PlatformProdCouponGroup/LonganProdCouponGroup'
import LonganProdCouponGroupEdit from '@/pages/LonganCouponManagement/PlatformProdCouponGroup/LonganProdCouponGroupEdit'
//优惠券管理 - 平台商品优惠券管理
import LonganCouponList from '@/pages/LonganCouponManagement/LonganCouponList'

import LonganCoupondia from '@/components/LonganCoupondia'
import LonganCouponOrder from '@/components/LonganCouponOrder'
import LonganCouponOrderDetail from '@/components/LonganCouponOrderDetail'


//客房服务 - 服务类型
import LonganServiceTypeList from '@/pages/LonganHousekeepingManagement/LonganServiceTypeList'
import LonganServiceTypeAdd from '@/pages/LonganHousekeepingManagement/LonganServiceTypeAdd'
import LonganServiceTypeModify from '@/pages/LonganHousekeepingManagement/LonganServiceTypeModify'
import LonganServiceTypeDetail from '@/pages/LonganHousekeepingManagement/LonganServiceTypeDetail'
//客房服务 - 酒店服务类型
import LonganHotelServiceList from '@/pages/LonganHousekeepingManagement/LonganHotelServiceList'
import LonganHotelServiceAdd from '@/pages/LonganHousekeepingManagement/LonganHotelServiceAdd'
import LonganHotelServiceModify from '@/pages/LonganHousekeepingManagement/LonganHotelServiceModify'
import LonganHotelServiceDetail from '@/pages/LonganHousekeepingManagement/LonganHotelServiceDetail'
//客房服务 - 酒店服务类型 - 管理明细
import LonganHotelServiceBannerList from '@/pages/LonganHousekeepingManagement/LonganHotelServiceBannerList'
import LonganHotelServiceBannerAdd from '@/pages/LonganHousekeepingManagement/LonganHotelServiceBannerAdd'
import LonganHotelServiceBannerModify from '@/pages/LonganHousekeepingManagement/LonganHotelServiceBannerModify'
//客房服务 - 酒店服务类型 - 管理目录
import LonganHotelServiceCatalogueList from '@/pages/LonganHousekeepingManagement/LonganHotelServiceCatalogueList'
import LonganHotelServiceCatalogueAdd from '@/pages/LonganHousekeepingManagement/LonganHotelServiceCatalogueAdd'
import LonganHotelServiceCatalogueModify from '@/pages/LonganHousekeepingManagement/LonganHotelServiceCatalogueModify'
//客房服务 - 客房服务订单
import checkhotelrecord from '@/pages/LonganHousekeepingManagement/checkhotelrecord'
import LonganServiceOrderDetail from '@/pages/LonganHousekeepingManagement/LonganServiceOrderDetail'


import LonganHotelServicePicture from '@/components/LonganHotelServicePicture'
import LonganHotelServiceSelectList from '@/components/LonganHotelServiceSelectList'
import LonganHotelServiceSelectAdd from '@/components/LonganHotelServiceSelectAdd'
import LonganHotelServiceSelectModify from '@/components/LonganHotelServiceSelectModify'
import LonganHotelServiceIconList from '@/components/LonganHotelServiceIconList'
import LonganHotelServiceIconAdd from '@/components/LonganHotelServiceIconAdd'
import LonganHotelServiceIconModify from '@/components/LonganHotelServiceIconModify'



import LonganHotelServiceFormList from '@/components/LonganHotelServiceFormList'
import LonganHotelServiceFormAdd from '@/components/LonganHotelServiceFormAdd'
import LonganHotelServiceFormModify from '@/components/LonganHotelServiceFormModify'
import LonganHotelServiceFormIntroduce from '@/components/LonganHotelServiceFormIntroduce'


//统计报表
import LonganReportAllSell from '@/pages/LonganStatisticalFormManagement/LonganReportAllSell'
import LonganReportHotelSell from '@/pages/LonganStatisticalFormManagement/LonganReportHotelSell'
import LonganReportProdSell from '@/pages/LonganStatisticalFormManagement/LonganReportProdSell'
import LonganReportRoomBook from '@/pages/LonganStatisticalFormManagement/LonganReportRoomBook'
import LonganReportOverdueProd from '@/pages/LonganStatisticalFormManagement/LonganReportOverdueProd'
import LonganReportOrderAll from '@/pages/LonganStatisticalFormManagement/LonganReportOrderAll'


//活动管理 - 活动管理
import LonganActivityList from '@/pages/LonganActivityManagement/LonganActivityList'
import LonganActivityAdd from '@/pages/LonganActivityManagement/LonganActivityAdd'
import LonganActivityChange from '@/pages/LonganActivityManagement/LonganActivityChange'
import LonganActivityDetail from '@/pages/LonganActivityManagement/LonganActivityDetail'
//活动管理 - 活动明细
import LonganActivityScanCode from "@/pages/LonganActivityManagement/LonganActivityScanCode"
//活动管理 - 红包管理
import LonganRedPackList from '@/pages/LonganActivityManagement/LonganRedPackList'
import LonganRedpackDetail from '@/pages/LonganActivityManagement/LonganRedpackDetail'
//活动管理 - 红包管理 - 分享记录
import LonganRedPackShareRE from '@/pages/LonganActivityManagement/LonganRedPackShareRE'
//活动管理 - 红包管理 - 领取记录
import LonganRedPackGetRecord from '@/pages/LonganActivityManagement/LonganRedPackGetRecord'
//活动管理 - 会议参与记录
import LonganActivityMeetingRecords from '@/pages/LonganActivityManagement/LonganActivityMeetingRecords'
import LonganActivityMeetingDetail from '@/pages/LonganActivityManagement/LonganActivityMeetingDetail'
//活动管理 - 扫码领券活动参与记录
import LonganActivityScanRecord from "@/pages/LonganActivityManagement/LonganActivityScanRecord"
//活动管理 - 分享红包汇总统计
import LonganRedPackTotal from '@/pages/LonganActivityManagement/LonganRedPackTotal'
//活动管理 - 分分享红包酒店汇总统计
import LonganRedPackHotelTotal from '@/pages/LonganActivityManagement/LonganRedPackHotelTotal'

import LonganActSecondHalf from '@/components/LonganActSecondHalf'
import LonganActivityDef from '@/components/LonganActivityDef'
import LonganActivityRecord from '@/components/LonganActivityRecord'
import LonganActRedpackDef from '@/components/LonganActRedpackDef'
import LonganActShareDef from '@/components/LonganActShareDef'

//福柜
import LonganLuckyBagsRecords from '@/pages/LonganLuckyBagsRecordsManagement/LonganLuckyBagsRecords'

//酒店分销设置
import LonganShareBonus from "@/pages/LonganShareBonusManagement/LonganShareBonus"
import LonganShareBonusAdd from "@/pages/LonganShareBonusManagement/LonganShareBonusAdd"
import LonganShareBonusChange from "@/pages/LonganShareBonusManagement/LonganShareBonusChange"
import LonganShareBonusDetail from "@/pages/LonganShareBonusManagement/LonganShareBonusDetail"

//员工管理 - 员工管理
import LonganStaffManage from '@/pages/LonganStaffManagement/LonganStaffManage'
import LonganStaffManageDetail from '@/pages/LonganStaffManagement/LonganStaffManageDetail'

//员工管理 - 员工下级管理
import LonganEmployeeList from "@/pages/LonganStaffManagement/LonganEmployeeList"
import LonganEmployeeReDetail from "@/pages/LonganStaffManagement/LonganEmployeeReDetail"
import LonganEmployeeCash from "@/pages/LonganStaffManagement/LonganEmployeeCash"

//顾客管理
import LonganCustomerManage from '@/pages/LonganCustomerManagement/LonganCustomerManage'
import LonganCustomerManageDetail from '@/pages/LonganCustomerManagement/LonganCustomerManageDetail'
import LonganCustomerList from "@/pages/LonganCustomerManagement/LonganCustomerList"
import LonganCustomerReDetail from "@/pages/LonganCustomerManagement/LonganCustomerReDetail"
import LonganCustomerCash from "@/pages/LonganCustomerManagement/LonganCustomerCash"
import LonganCustomerAccess from "@/pages/LonganCustomerManagement/LonganCustomerAccess"
import LonganCustomerAccessDetail from "@/pages/LonganCustomerManagement/LonganCustomerAccessDetail"
import LonganCustomerOrder from "@/pages/LonganCustomerManagement/LonganCustomerOrder"
//顾客管理 - 提现记录
import LonganCustomerWithdrawRecord from '@/pages/LonganCustomerManagement/LonganCustomerWithdrawRecord'

//酒店分享记录
import LonganHotelShareRecord from "@/pages/LonganHotelShareRecordManagement/LonganHotelShareRecord"
import LonganHotelVisitRecord from "@/pages/LonganHotelShareRecordManagement/LonganHotelVisitRecord"
import LonganHotelOrderRecord from "@/pages/LonganHotelShareRecordManagement/LonganHotelOrderRecord"

//酒店分销记录
import LonganHotelRetailRecord from "@/pages/LonganHotelRetailRecordManagement/LonganHotelRetailRecord"
import LonganEmpRetailRecord from "@/pages/LonganHotelRetailRecordManagement/LonganEmpRetailRecord"

//酒店自提点
import LonganselfTakingList from "@/pages/LonganselfTakingManagement/LonganselfTakingList"
import LonganselfTakingAdd from "@/pages/LonganselfTakingManagement/LonganselfTakingAdd"
import LonganselfTakingEdit from "@/pages/LonganselfTakingManagement/LonganselfTakingEdit"
import LonganselfTakingDetail from "@/pages/LonganselfTakingManagement/LonganselfTakingDetail"


//链接管理
import LonganFuncLinkList from "@/pages/LonganFuncLinkManagement/LonganFuncLinkList"
import LonganFuncLinkChange from "@/pages/LonganFuncLinkManagement/LonganFuncLinkChange"
import LonganFuncLinkAdd from "@/pages/LonganFuncLinkManagement/LonganFuncLinkAdd"
import LonganFuncLinkDetail from "@/pages/LonganFuncLinkManagement/LonganFuncLinkDetail"
import LonganFuncLinkParams from "@/pages/LonganFuncLinkManagement/LonganFuncLinkParams"

//商品规格管理
import LonganProdSpecsList from "@/pages/LonganProdSpecsManagement/LonganProdSpecsList"
import LonganProdSpecsAdd from "@/pages/LonganProdSpecsManagement/LonganProdSpecsAdd"
import LonganProdSpecsModify from "@/pages/LonganProdSpecsManagement/LonganProdSpecsModify"
import LonganProdSpecsDetail from "@/pages/LonganProdSpecsManagement/LonganProdSpecsDetail"
//酒店商品规格管理
import LonganHotelProdSpecsList from "@/pages/LonganHotelProdSpecsManagement/LonganHotelProdSpecsList"
import LonganHotelProdSpecsAdd from "@/pages/LonganHotelProdSpecsManagement/LonganHotelProdSpecsAdd"
import LonganHotelProdSpecsModify from "@/pages/LonganHotelProdSpecsManagement/LonganHotelProdSpecsModify"
import LonganHotelProdSpecsDetail from "@/pages/LonganHotelProdSpecsManagement/LonganHotelProdSpecsDetail"
//功能区商品管理
import LonganFunctionSpecsList from "@/pages/LonganFunctionSpecsManagement/LonganFunctionSpecsList"
import LonganFunctionSpecsAdd from "@/pages/LonganFunctionSpecsManagement/LonganFunctionSpecsAdd"
import LonganFunctionSpecsModify from "@/pages/LonganFunctionSpecsManagement/LonganFunctionSpecsModify"
import LonganFunctionSpecsDetail from "@/pages/LonganFunctionSpecsManagement/LonganFunctionSpecsDetail"

//卡券管理 - 卡券管理
import LonganCardticketList from "@/pages/LonganCardCouponManagement/LonganCardticketList"
import LonganCardticketDetail from "@/pages/LonganCardCouponManagement/LonganCardticketDetail"
//卡券管理 - 用户卡券管理
import LonganCardCouponList from "@/pages/LonganCardCouponManagement/LonganCardCouponList"
import LonganCardCouponDetail from "@/pages/LonganCardCouponManagement/LonganCardCouponDetail"
import LonganCardCouponRecord from "@/pages/LonganCardCouponManagement/LonganCardCouponRecord"

import uploadpic from "@/components/uploadpic"


//酒店外部物流管理
import LonganHotelLogistics from "@/pages/LonganHotelLogisticsManagement/LonganHotelLogistics"
import LonganHotelLogisticsAdd from "@/pages/LonganHotelLogisticsManagement/LonganHotelLogisticsAdd"
import LonganHotelLogisticsEdit from "@/pages/LonganHotelLogisticsManagement/LonganHotelLogisticsEdit"
import LonganHotelLogisticsDetail from "@/pages/LonganHotelLogisticsManagement/LonganHotelLogisticsDetail"




//酒店广告页管理
import LonganHotelADList from "@/pages/LonganHotelADManagement/LonganHotelADList"
import LonganHotelADAdd from "@/pages/LonganHotelADManagement/LonganHotelADAdd"
import LonganHotelADModify from "@/pages/LonganHotelADManagement/LonganHotelADModify"
import LonganHotelADDetail from "@/pages/LonganHotelADManagement/LonganHotelADDetail"
//酒店广告页管理 - 广告页引用详情
import LonganHotelADQuoteDetail from "@/pages/LonganHotelADManagement/LonganHotelADQuoteDetail"

//智能会议
import LonganActivityMeeting from "@/components/LonganActivityMeeting"

//关联酒店
import LonganContactHotelList from "@/pages/LonganContactHotelManagement/LonganContactHotelList"
import LonganContactDetail from "@/pages/LonganContactHotelManagement/LonganContactDetail"

//酒店功能区导航
import LonganFunctionLeadList from "@/pages/LonganFunctionLeadManagement/LonganFunctionLeadList"
import LonganFunctionLeadChange from "@/pages/LonganFunctionLeadManagement/LonganFunctionLeadChange"
import LonganFunctionLeadDetail from "@/pages/LonganFunctionLeadManagement/LonganFunctionLeadDetail"
import LonganFunctionLeadAdd from "@/pages/LonganFunctionLeadManagement/LonganFunctionLeadAdd"

//酒店管理->功能区房源管理
import LonganHotelFunctionHouseResourceList from '@/pages/LonganHotelFunctionHouseResourceManagement/LonganHotelFunctionHouseResourceList'
import LonganHotelFunctionHouseResourceAdd from '@/pages/LonganHotelFunctionHouseResourceManagement/LonganHotelFunctionHouseResourceAdd'
import LonganHotelFunctionHouseResourceEdit from '@/pages/LonganHotelFunctionHouseResourceManagement/LonganHotelFunctionHouseResourceEdit'
import LonganHotelFunctionHouseResourceDetail from '@/pages/LonganHotelFunctionHouseResourceManagement/LonganHotelFunctionHouseResourceDetail'

//单位协议价 - 协议单位管理
import LonganEnterprisesDetail from "@/pages/LonganUnitBargainManagement/LonganEnterprisesDetail"
import LonganEnterprisesList from "@/pages/LonganUnitBargainManagement/LonganEnterprisesList"
//单位协议价 - 单位房源协议价
import LonganEnterprisesRoomsList from "@/pages/LonganUnitBargainManagement/LonganEnterprisesRoomsList"
import LonganEnterprisesRoomsDetail from "@/pages/LonganUnitBargainManagement/LonganEnterprisesRoomsDetail"
//单位协议价 - 单位授权码
import LonganEnterprisesCodeList from "@/pages/LonganUnitBargainManagement/LonganEnterprisesCodeList"
import LonganEnterprisesCodeDetail from "@/pages/LonganUnitBargainManagement/LonganEnterprisesCodeDetail"
//单位协议价 - 单位授权码订单
import LonganEnterprisesCodeOrderList from "@/pages/LonganUnitBargainManagement/LonganEnterprisesCodeOrderList"
//单位协议价 - 最优弹性价记录
import LonganAdaptPriceList from "@/pages/LonganUnitBargainManagement/LonganAdaptPriceList"
//单位协议价 - 最优弹性价记录订单
import LonganAdaptPriceOrderList from "@/pages/LonganUnitBargainManagement/LonganAdaptPriceOrderList"



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
				path: '/LonganPrivilegeUserList',
				name: 'LonganPrivilegeUserList',
				component: LonganPrivilegeUserList
			}, {
				path: '/LonganPrivilegeUserAdd',
				name: 'LonganPrivilegeUserAdd',
				component: LonganPrivilegeUserAdd
			}, {
				path: '/LonganPrivilegeUserModify',
				name: 'LonganPrivilegeUserModify',
				component: LonganPrivilegeUserModify
			}, {
				path: '/LonganPrivilegeRoleList',
				name: 'LonganPrivilegeRoleList',
				component: LonganPrivilegeRoleList
			}, {
				path: '/LonganPrivilegeRoleAdd',
				name: 'LonganPrivilegeRoleAdd',
				component: LonganPrivilegeRoleAdd
			}, {
				path: '/LonganPrivilegeRoleModify',
				name: 'LonganPrivilegeRoleModify',
				component: LonganPrivilegeRoleModify
			}, {
				path: '/LonganPrivilegeUpdateUserInfo',
				name: 'LonganPrivilegeUpdateUserInfo',
				component: LonganPrivilegeUpdateUserInfo
			}, {
				path: '/LonganPrivilegeUpdatePWD',
				name: 'LonganPrivilegeUpdatePWD',
				component: LonganPrivilegeUpdatePWD
			}, {
				path: '/LonganStaffManage',
				name: 'LonganStaffManage',
				component: LonganStaffManage
			}, {
				path: '/LonganStaffManageDetail',
				name: 'LonganStaffManageDetail',
				component: LonganStaffManageDetail
			}, {
				path: '/LonganCustomerManage',
				name: 'LonganCustomerManage',
				component: LonganCustomerManage
			}, {
				path: '/LonganCustomerManageDetail',
				name: 'LonganCustomerManageDetail',
				component: LonganCustomerManageDetail
			}, {
				path: '/LonganCustomerWithdrawRecord',
				name: 'LonganCustomerWithdrawRecord',
				component: LonganCustomerWithdrawRecord
			}, {
				path: '/LonganHotelList',
				name: 'LonganHotelList',
				component: LonganHotelList
			}, {
				path: '/LonganHotelAdd',
				name: 'LonganHotelAdd',
				component: LonganHotelAdd
			}, {
				path: '/LonganHotelDetail',
				name: 'LonganHotelDetail',
				component: LonganHotelDetail
			}, {
				path: '/LonganHotelModify',
				name: 'LonganHotelModify',
				component: LonganHotelModify
			}, {
				path: '/LonganHotelGridList',
				name: 'LonganHotelGridList',
				component: LonganHotelGridList
			}, {
				path: '/LonganHotelProtocolList',
				name: 'LonganHotelProtocolList',
				component: LonganHotelProtocolList
			}, {
				path: '/LonganHotelProtocolAdd',
				name: 'LonganHotelProtocolAdd',
				component: LonganHotelProtocolAdd
			}, {
				path: '/LonganHotelProtocolDetail',
				name: 'LonganHotelProtocolDetail',
				component: LonganHotelProtocolDetail
			}, {
				path: '/LonganHotelPlatCommodityList',
				name: 'LonganHotelPlatCommodityList',
				component: LonganHotelPlatCommodityList
			}, {
				path: '/LonganHotelPlatCommodityAdd',
				name: 'LonganHotelPlatCommodityAdd',
				component: LonganHotelPlatCommodityAdd
			}, {
				path: '/LonganHotelPlatCommodityDetail',
				name: 'LonganHotelPlatCommodityDetail',
				component: LonganHotelPlatCommodityDetail
			}, {
				path: '/LonganHotelPlatCommodityModify',
				name: 'LonganHotelPlatCommodityModify',
				component: LonganHotelPlatCommodityModify
			}, {
				path: '/LonganHotelCommodityList',
				name: 'LonganHotelCommodityList',
				component: LonganHotelCommodityList
			}, {
				path: '/LonganHotelCommodityAdd',
				name: 'LonganHotelCommodityAdd',
				component: LonganHotelCommodityAdd
			}, {
				path: '/LonganHotelCommodityModify',
				name: 'LonganHotelCommodityModify',
				component: LonganHotelCommodityModify
			}, {
				path: '/LonganHotelCabinetList',
				name: 'LonganHotelCabinetList',
				component: LonganHotelCabinetList
			}, {
				path: '/LonganHotelCabinetModify',
				name: 'LonganHotelCabinetModify',
				component: LonganHotelCabinetModify
			}, {
				path: '/LonganHotelCommodityMarketList',
				name: 'LonganHotelCommodityMarketList',
				component: LonganHotelCommodityMarketList
			}, {
				path: '/LonganHotelCommodityMarketAdd',
				name: 'LonganHotelCommodityMarketAdd',
				component: LonganHotelCommodityMarketAdd
			}, {
				path: '/LonganHotelCommodityMarketModify',
				name: 'LonganHotelCommodityMarketModify',
				component: LonganHotelCommodityMarketModify
			}, {
				path: '/LonganHotelAllCommodityList',
				name: 'LonganHotelAllCommodityList',
				component: LonganHotelAllCommodityList
			}, {
				path: '/LonganHotelAllCommodityModify',
				name: 'LonganHotelAllCommodityModify',
				component: LonganHotelAllCommodityModify
			}, {
				path: '/LonganHotelAllCommodityDetail',
				name: 'LonganHotelAllCommodityDetail',
				component: LonganHotelAllCommodityDetail
			}, {
				path: '/LonganInventoryList',
				name: 'LonganInventoryList',
				component: LonganInventoryList
			}, {
				path: '/LonganGodownEntryList',
				name: 'LonganGodownEntryList',
				component: LonganGodownEntryList
			}, {
				path: '/LonganGodownEntryDetail',
				name: 'LonganGodownEntryDetail',
				component: LonganGodownEntryDetail
			}, {
				path: '/LonganGodownEntryAudit',
				name: 'LonganGodownEntryAudit',
				component: LonganGodownEntryAudit
			}, {
				path: '/LonganServiceTypeList',
				name: 'LonganServiceTypeList',
				component: LonganServiceTypeList
			}, {
				path: '/LonganServiceTypeAdd',
				name: 'LonganServiceTypeAdd',
				component: LonganServiceTypeAdd
			}, {
				path: '/LonganServiceTypeModify',
				name: 'LonganServiceTypeModify',
				component: LonganServiceTypeModify
			}, {
				path: '/LonganServiceTypeDetail',
				name: 'LonganServiceTypeDetail',
				component: LonganServiceTypeDetail
			}, {
				path: '/LonganHotelServiceList',
				name: 'LonganHotelServiceList',
				component: LonganHotelServiceList
			}, {
				path: '/LonganHotelServiceAdd',
				name: 'LonganHotelServiceAdd',
				component: LonganHotelServiceAdd
			}, {
				path: '/LonganHotelServiceModify',
				name: 'LonganHotelServiceModify',
				component: LonganHotelServiceModify
			}, {
				path: '/LonganHotelServiceDetail',
				name: 'LonganHotelServiceDetail',
				component: LonganHotelServiceDetail
			}, {
				path: '/LonganHotelServiceCatalogueList',
				name: 'LonganHotelServiceCatalogueList',
				component: LonganHotelServiceCatalogueList
			}, {
				path: '/LonganHotelServiceCatalogueAdd',
				name: 'LonganHotelServiceCatalogueAdd',
				component: LonganHotelServiceCatalogueAdd
			}, {
				path: '/LonganHotelServiceCatalogueModify',
				name: 'LonganHotelServiceCatalogueModify',
				component: LonganHotelServiceCatalogueModify
			}, {
				path: '/LonganHotelServicePicture',
				name: 'LonganHotelServicePicture',
				component: LonganHotelServicePicture
			}, {
				path: '/LonganHotelServiceSelectList',
				name: 'LonganHotelServiceSelectList',
				component: LonganHotelServiceSelectList
			}, {
				path: '/LonganHotelServiceSelectAdd',
				name: 'LonganHotelServiceSelectAdd',
				component: LonganHotelServiceSelectAdd
			}, {
				path: '/LonganHotelServiceSelectModify',
				name: 'LonganHotelServiceSelectModify',
				component: LonganHotelServiceSelectModify
			}, {
				path: '/LonganHotelServiceIconList',
				name: 'LonganHotelServiceIconList',
				component: LonganHotelServiceIconList
			}, {
				path: '/LonganHotelServiceIconAdd',
				name: 'LonganHotelServiceIconAdd',
				component: LonganHotelServiceIconAdd
			}, {
				path: '/LonganHotelServiceIconModify',
				name: 'LonganHotelServiceIconModify',
				component: LonganHotelServiceIconModify
			}, {
				path: '/LonganHotelServiceBannerList',
				name: 'LonganHotelServiceBannerList',
				component: LonganHotelServiceBannerList
			}, {
				path: '/LonganHotelServiceBannerAdd',
				name: 'LonganHotelServiceBannerAdd',
				component: LonganHotelServiceBannerAdd
			}, {
				path: '/LonganHotelServiceBannerModify',
				name: 'LonganHotelServiceBannerModify',
				component: LonganHotelServiceBannerModify
			}, {
				path: '/LonganHotelServiceFormList',
				name: 'LonganHotelServiceFormList',
				component: LonganHotelServiceFormList
			}, {
				path: '/LonganHotelServiceFormAdd',
				name: 'LonganHotelServiceFormAdd',
				component: LonganHotelServiceFormAdd
			}, {
				path: '/LonganHotelServiceFormModify',
				name: 'LonganHotelServiceFormModify',
				component: LonganHotelServiceFormModify
			}, {
				path: '/LonganHotelServiceFormIntroduce',
				name: 'LonganHotelServiceFormIntroduce',
				component: LonganHotelServiceFormIntroduce
			}, {
				path: '/LonganServiceOrderDetail',
				name: 'LonganServiceOrderDetail',
				component: LonganServiceOrderDetail
			}, {
				path: '/LonganReportAllSell',
				name: 'LonganReportAllSell',
				component: LonganReportAllSell
			}, {
				path: '/LonganReportHotelSell',
				name: 'LonganReportHotelSell',
				component: LonganReportHotelSell
			}, {
				path: '/LonganReportProdSell',
				name: 'LonganReportProdSell',
				component: LonganReportProdSell
			}, {
				path: '/LonganReportRoomBook',
				name: 'LonganReportRoomBook',
				component: LonganReportRoomBook
			}, {
				path: '/LonganReportOverdueProd',
				name: 'LonganReportOverdueProd',
				component: LonganReportOverdueProd
			}, {
				path: '/LonganReportOrderAll',
				name: 'LonganReportOrderAll',
				component: LonganReportOrderAll
			}, {
				path: '/LonganCommonFeature',
				name: 'LonganCommonFeature',
				component: LonganCommonFeature
			}, {
				path: '/LonganCommonFeatureAdd',
				name: 'LonganCommonFeatureAdd',
				component: LonganCommonFeatureAdd
			}, {
				path: '/LonganCommonFeatureModify',
				name: 'LonganCommonFeatureModify',
				component: LonganCommonFeatureModify
			}, {
				path: '/LonganHotelFeature',
				name: 'LonganHotelFeature',
				component: LonganHotelFeature
			}, {
				path: '/LonganHotelFeatureAdd',
				name: 'LonganHotelFeatureAdd',
				component: LonganHotelFeatureAdd
			}, {
				path: '/LonganHotelFeatureDetail',
				name: 'LonganHotelFeatureDetail',
				component: LonganHotelFeatureDetail
			}, {
				path: '/LonganHotelFeatureDetailAdd',
				name: 'LonganHotelFeatureDetailAdd',
				component: LonganHotelFeatureDetailAdd
			}, {
				path: '/LonganHotelFeatureDetailModify',
				name: 'LonganHotelFeatureDetailModify',
				component: LonganHotelFeatureDetailModify
			}, {
				path: '/LonganPlatDeliveryList',
				name: 'LonganPlatDeliveryList',
				component: LonganPlatDeliveryList
			}, {
				path: '/LonganPlatDeliveryDetail',
				name: 'LonganPlatDeliveryDetail',
				component: LonganPlatDeliveryDetail
			}, {
				path: '/LonganAllDeliveryList',
				name: 'LonganAllDeliveryList',
				component: LonganAllDeliveryList
			}, {
				path: '/LonganAllDeliveryDetail',
				name: 'LonganAllDeliveryDetail',
				component: LonganAllDeliveryDetail
			}, {
				path: '/CommodityList',
				name: 'CommodityList',
				component: CommodityList
			}, {
				path: '/CommodityAdd',
				name: 'CommodityAdd',
				component: CommodityAdd
			}, {
				path: '/Commodityedit',
				name: 'Commodityedit',
				component: Commodityedit
			}, {
				path: '/LonganAllCommodityManage',
				name: 'LonganAllCommodityManage',
				component: LonganAllCommodityManage
			}, {
				path: '/LonganAllCommodityDetail',
				name: 'LonganAllCommodityDetail',
				component: LonganAllCommodityDetail
			}, {
				path: '/LonganPlatformCommodityList',
				name: 'LonganPlatformCommodityList',
				component: LonganPlatformCommodityList
			}, {
				path: '/LonganPlatformCommodityAdd',
				name: 'LonganPlatformCommodityAdd',
				component: LonganPlatformCommodityAdd
			}, {
				path: '/LonganPlatformCommodityModify',
				name: 'LonganPlatformCommodityModify',
				component: LonganPlatformCommodityModify
			}, {
				path: '/LonganPlatformCommodityDetail',
				name: 'LonganPlatformCommodityDetail',
				component: LonganPlatformCommodityDetail
			}, {
				path: '/LonganCommodityStatisticsList',
				name: 'LonganCommodityStatisticsList',
				component: LonganCommodityStatisticsList
			}, {
				path: '/LonganCommodityStatisticsAdd',
				name: 'LonganCommodityStatisticsAdd',
				component: LonganCommodityStatisticsAdd
			}, {
				path: '/LonganCommodityStatisticsModify',
				name: 'LonganCommodityStatisticsModify',
				component: LonganCommodityStatisticsModify
			}, {
				path: '/LonganCommodityMarketTemplateList',
				name: 'LonganCommodityMarketTemplateList',
				component: LonganCommodityMarketTemplateList
			}, {
				path: '/LonganCommodityMarketTemplateAdd',
				name: 'LonganCommodityMarketTemplateAdd',
				component: LonganCommodityMarketTemplateAdd
			}, {
				path: '/LonganCommodityMarketTemplateModify',
				name: 'LonganCommodityMarketTemplateModify',
				component: LonganCommodityMarketTemplateModify
			}, {
				path: '/Cabinetgl',
				name: 'Cabinetgl',
				component: Cabinetgl
			}, {
				path: '/Cabinetchange',
				name: 'Cabinetchange',
				component: Cabinetchange
			}, {
				path: '/Cabinetlook',
				name: 'Cabinetlook',
				component: Cabinetlook
			}, {
				path: '/PurchaseOrderlist',
				name: 'PurchaseOrderlist',
				component: PurchaseOrderlist
			}, {
				path: '/PurchaseOrderadd',
				name: 'PurchaseOrderadd',
				component: PurchaseOrderadd
			}, {
				path: '/PurchaseOrderedit',
				name: 'PurchaseOrderedit',
				component: PurchaseOrderedit
			}, {
				path: '/SeepurchaseOrder',
				name: 'SeepurchaseOrder',
				component: SeepurchaseOrder
			}, {
				path: '/checkhotelrecord',
				name: 'checkhotelrecord',
				component: checkhotelrecord
			}, {
				path: '/hotelrecorddetail',
				name: 'hotelrecorddetail',
				component: hotelrecorddetail
			}, {
				path: '/LonganRevenueStatistics',
				name: 'LonganRevenueStatistics',
				component: LonganRevenueStatistics
			}, {
				path: '/LonganRevenueDetail',
				name: 'LonganRevenueDetail',
				component: LonganRevenueDetail
			}, {
				path: '/LonganOperationAnalysis',
				name: 'LonganOperationAnalysis',
				component: LonganOperationAnalysis
			}, {
				path: '/LonganOperationAnalysisDetail',
				name: 'LonganOperationAnalysisDetail',
				component: LonganOperationAnalysisDetail
			}, {
				path: '/LonganDeclarationForm',
				name: 'LonganDeclarationForm',
				component: LonganDeclarationForm
			}, {
				path: '/LonganAbnormalStateOfCabinet',
				name: 'LonganAbnormalStateOfCabinet',
				component: LonganAbnormalStateOfCabinet
			}, {
				path: '/LonganDivideInto',
				name: 'LonganDivideInto',
				component: LonganDivideInto
			}, {
				path: '/LonganWithdrawalsRecord',
				name: 'LonganWithdrawalsRecord',
				component: LonganWithdrawalsRecord
			}, {
				path: '/LonganWithdrawalsRecordDetail',
				name: 'LonganWithdrawalsRecordDetail',
				component: LonganWithdrawalsRecordDetail
			}, {
				path: '/LonganWithdrawalsRecordHandle',
				name: 'LonganWithdrawalsRecordHandle',
				component: LonganWithdrawalsRecordHandle
			}, {
				path: '/LonganReplenishmentFee',
				name: 'LonganReplenishmentFee',
				component: LonganReplenishmentFee
			}, {
				path: '/LonganReplenishmentFeeDiscount',
				name: 'LonganReplenishmentFeeDiscount',
				component: LonganReplenishmentFeeDiscount
			}, {
				path: '/LonganFinancialCost',
				name: 'LonganFinancialCost',
				component: LonganFinancialCost
			}, {
				path: '/hotelskinlist',
				name: 'hotelskinlist',
				component: hotelskinlist
			}, {
				path: '/hotelskinadd',
				name: 'hotelskinadd',
				component: hotelskinadd
			}, {
				path: '/hotelskinmodify',
				name: 'hotelskinmodify',
				component: hotelskinmodify
			}, {
				path: '/invoicerecord',
				name: 'invoicerecord',
				component: invoicerecord
			}, {
				path: '/replacecabinet',
				name: 'replacecabinet',
				component: replacecabinet
			}, {
				path: '/LonganHotelAfterSale',
				name: 'LonganHotelAfterSale',
				component: LonganHotelAfterSale
			}, {
				path: '/LonganMerchant',
				name: 'LonganMerchant',
				component: LonganMerchant
			}, {
				path: '/LonganMerchantadd',
				name: 'LonganMerchantadd',
				component: LonganMerchantadd
			}, {
				path: '/LonganMerchantchange',
				name: 'LonganMerchantchange',
				component: LonganMerchantchange
			}, {
				path: '/LonganOperator',
				name: 'LonganOperator',
				component: LonganOperator
			}, {
				path: '/LonganOrderList',
				name: 'LonganOrderList',
				component: LonganOrderList
			}, {
				path: '/LonganOrderProductDetails',
				name: 'LonganOrderProductDetails',
				component: LonganOrderProductDetails
			}, {
				path: '/LonganOrderDeliveryDetails',
				name: 'LonganOrderDeliveryDetails',
				component: LonganOrderDeliveryDetails
			}, {
				path: '/LonganOrderCouponDetails',
				name: 'LonganOrderCouponDetails',
				component: LonganOrderCouponDetails
			}, {
				path: '/LonganOrderDetails',
				name: 'LonganOrderDetails',
				component: LonganOrderDetails
			}, {
				path: '/LonganProcessList',
				name: 'LonganProcessList',
				component: LonganProcessList
			}, {
				path: '/LonganProcessDetails',
				name: 'LonganProcessDetails',
				component: LonganProcessDetails
			}, {
				path: '/LonganPendingClaimList',
				name: 'LonganPendingClaimList',
				component: LonganPendingClaimList
			}, {
				path: '/LonganPendingClaimDetails',
				name: 'LonganPendingClaimDetails',
				component: LonganPendingClaimDetails
			}, {
				path: '/LonganPendingReviewList',
				name: 'LonganPendingReviewList',
				component: LonganPendingReviewList
			}, {
				path: '/LonganPendingReviewDetails',
				name: 'LonganPendingReviewDetails',
				component: LonganPendingReviewDetails
			}, {
				path: '/LonganReviewList',
				name: 'LonganReviewList',
				component: LonganReviewList
			}, {
				path: '/LonganReviewDetails',
				name: 'LonganReviewDetails',
				component: LonganReviewDetails
			}, {
				path: '/TeashopTeaList',
				name: 'TeashopTeaList',
				component: TeashopTeaList
			}, {
				path: '/TeashopTeaAdd',
				name: 'TeashopTeaAdd',
				component: TeashopTeaAdd
			}, {
				path: '/TeashopTeaModify',
				name: 'TeashopTeaModify',
				component: TeashopTeaModify
			}, {
				path: '/TeashopTeaDetail',
				name: 'TeashopTeaDetail',
				component: TeashopTeaDetail
			}, {
				path: '/TeashopOrderManage',
				name: 'TeashopOrderManage',
				component: TeashopOrderManage
			}, {
				path: '/TeashopOrderDetail',
				name: 'TeashopOrderDetail',
				component: TeashopOrderDetail
			}, {
				path: '/TeashopMembercardList',
				name: 'TeashopMembercardList',
				component: TeashopMembercardList
			}, {
				path: '/TeashopMembercardAdd',
				name: 'TeashopMembercardAdd',
				component: TeashopMembercardAdd
			}, {
				path: '/TeashopMembercardModify',
				name: 'TeashopMembercardModify',
				component: TeashopMembercardModify
			}, {
				path: '/TeashopMembercardDetail',
				name: 'TeashopMembercardDetail',
				component: TeashopMembercardDetail
			}, {
				path: '/TeashopMemberManage',
				name: 'TeashopMemberManage',
				component: TeashopMemberManage
			}, {
				path: '/TeashopMemberDetail',
				name: 'TeashopMemberDetail',
				component: TeashopMemberDetail
			}, {
				path: '/TeashopCommonUserManage',
				name: 'TeashopCommonUserManage',
				component: TeashopCommonUserManage
			}, {
				path: '/allsaleapply',
				name: 'allsaleapply',
				component: allsaleapply
			}, {
				path: '/allsaleapplydetail',
				name: 'allsaleapplydetail',
				component: allsaleapplydetail
			}, {
				path: '/platformaftersale',
				name: 'platformaftersale',
				component: platformaftersale
			}, {
				path: '/platformaftersaledetail',
				name: 'platformaftersaledetail',
				component: platformaftersaledetail
			}, {
				path: '/HotelPlatformInventory',
				name: 'HotelPlatformInventory',
				component: HotelPlatformInventory
			}, {
				path: '/hotelproInventorylist',
				name: 'hotelproInventorylist',
				component: hotelproInventorylist
			}, {
				path: '/PlatformenterOrderlist',
				name: 'PlatformenterOrderlist',
				component: PlatformenterOrderlist
			}, {
				path: '/PlatformenterOrderdetail',
				name: 'PlatformenterOrderdetail',
				component: PlatformenterOrderdetail
			}, {
				path: '/PlatformoutOrderlist',
				name: 'PlatformoutOrderlist',
				component: PlatformoutOrderlist
			}, {
				path: '/PlatformoutOrderdetail',
				name: 'PlatformoutOrderdetail',
				component: PlatformoutOrderdetail
			}, {
				path: '/allenterorderlist',
				name: 'allenterorderlist',
				component: allenterorderlist
			}, {
				path: '/allenterorderdetail',
				name: 'allenterorderdetail',
				component: allenterorderdetail
			}, {
				path: '/alloutorderlist',
				name: 'alloutorderlist',
				component: alloutorderlist
			}, {
				path: '/alloutorderdetail',
				name: 'alloutorderdetail',
				component: alloutorderdetail
			}, {
				path: '/LonganFranchiseelist',
				name: 'LonganFranchiseelist',
				component: LonganFranchiseelist
			}, {
				path: '/LonganFranchiseeadd',
				name: 'LonganFranchiseeadd',
				component: LonganFranchiseeadd
			}, {
				path: '/LonganFranchiseeedit',
				name: 'LonganFranchiseeedit',
				component: LonganFranchiseeedit
			}, {
				path: '/LonganFranchiseeedetail',
				name: 'LonganFranchiseeedetail',
				component: LonganFranchiseeedetail
			}, {
				path: '/LonganFranchiseehotellist',
				name: 'LonganFranchiseehotellist',
				component: LonganFranchiseehotellist
			}, {
				path: '/LonganFranchiseehoteladd',
				name: 'LonganFranchiseehoteladd',
				component: LonganFranchiseehoteladd
			}, {
				path: '/LonganFranchiseehoteldetail',
				name: 'LonganFranchiseehoteldetail',
				component: LonganFranchiseehoteldetail
			}, {
				path: '/LonganAccountlist',
				name: 'LonganAccountlist',
				component: LonganAccountlist
			}, {
				path: '/LonganOrganDivide',
				name: 'LonganOrganDivide',
				component: LonganOrganDivide
			}, {
				path: '/LonganClassifyDivide',
				name: 'LonganClassifyDivide',
				component: LonganClassifyDivide
			}, {
				path: '/LonganDetailedDivide',
				name: 'LonganDetailedDivide',
				component: LonganDetailedDivide
			}, {
				path: '/LonganCarryDetail',
				name: 'LonganCarryDetail',
				component: LonganCarryDetail
			}, {
				path: '/LongancheckCarryDetail',
				name: 'LongancheckCarryDetail',
				component: LongancheckCarryDetail
			}, {
				path: '/LonganAccountHandle',
				name: 'LonganAccountHandle',
				component: LonganAccountHandle
			}, {
				path: '/LonganDefEvaluate',
				name: 'LonganDefEvaluate',
				component: LonganDefEvaluate
			}, {
				path: '/LonganDefEvaluateAdd',
				name: 'LonganDefEvaluateAdd',
				component: LonganDefEvaluateAdd
			}, {
				path: '/LonganDefEvaluateEdit',
				name: 'LonganDefEvaluateEdit',
				component: LonganDefEvaluateEdit
			}, {
				path: '/LonganDefEvaluateDetail',
				name: 'LonganDefEvaluateDetail',
				component: LonganDefEvaluateDetail
			}, {
				path: '/LonganHotelEvaluate',
				name: 'LonganHotelEvaluate',
				component: LonganHotelEvaluate
			}, {
				path: '/LonganHotelEvalDetail',
				name: 'LonganHotelEvalDetail',
				component: LonganHotelEvalDetail
			}, {
				path: '/LonganPartnerSetup',
				name: 'LonganPartnerSetup',
				component: LonganPartnerSetup
			}, {
				path: '/LonganBookTypeList',
				name: 'LonganBookTypeList',
				component: LonganBookTypeList
			}, {
				path: '/LonganBookTypeDetail',
				name: 'LonganBookTypeDetail',
				component: LonganBookTypeDetail
			}, {
				path: '/LonganBookResourceList',
				name: 'LonganBookResourceList',
				component: LonganBookResourceList
			}, {
				path: '/LonganBookResourceDetail',
				name: 'LonganBookResourceDetail',
				component: LonganBookResourceDetail
			}, {
				path: '/LonganBookPrice',
				name: 'LonganBookPrice',
				component: LonganBookPrice
			},
			{
				path: '/LonganBookPriceList',
				name: 'LonganBookPriceList',
				component: LonganBookPriceList
			},
			{
				path: '/LonganBookStatus',
				name: 'LonganBookStatus',
				component: LonganBookStatus
			}, {
				path: '/LonganBookStatusHandleList',
				name: 'LonganBookStatusHandleList',
				component: LonganBookStatusHandleList
			},
			{
				path: '/LonganBookOrder',
				name: 'LonganBookOrder',
				component: LonganBookOrder
			}, {
				path: '/LonganBookOrderDetail',
				name: 'LonganBookOrderDetail',
				component: LonganBookOrderDetail
			}, {
				path: '/LonganAllDelivery',
				name: 'LonganAllDelivery',
				component: LonganAllDelivery
			}, {
				path: '/LonganGuestMiniDelidetail',
				name: 'LonganGuestMiniDelidetail',
				component: LonganGuestMiniDelidetail
			}, {
				path: '/LonganHotelCultureList',
				name: 'LonganHotelCultureList',
				component: LonganHotelCultureList
			}, {
				path: '/LonganHotelCultureAdd',
				name: 'LonganHotelCultureAdd',
				component: LonganHotelCultureAdd
			}, {
				path: '/LonganHotelCultureModify',
				name: 'LonganHotelCultureModify',
				component: LonganHotelCultureModify
			}, {
				path: '/LonganHotelCultureDetail',
				name: 'LonganHotelCultureDetail',
				component: LonganHotelCultureDetail
			}, {
				path: '/LonganHotelCultureDetailAdd',
				name: 'LonganHotelCultureDetailAdd',
				component: LonganHotelCultureDetailAdd
			}, {
				path: '/LonganHotelCultureDetailModify',
				name: 'LonganHotelCultureDetailModify',
				component: LonganHotelCultureDetailModify
			}, {
				path: '/LonganInvoiceRateList',
				name: 'LonganInvoiceRateList',
				component: LonganInvoiceRateList
			}, {
				path: '/LonganInvoiceRateAdd',
				name: 'LonganInvoiceRateAdd',
				component: LonganInvoiceRateAdd
			}, {
				path: '/LonganInvoiceRateModify',
				name: 'LonganInvoiceRateModify',
				component: LonganInvoiceRateModify
			}, {
				path: '/LonganWaitInvoiceProdList',
				name: 'LonganWaitInvoiceProdList',
				component: LonganWaitInvoiceProdList
			}, {
				path: '/LonganWaitInvoiceProdDetail',
				name: 'LonganWaitInvoiceProdDetail',
				component: LonganWaitInvoiceProdDetail
			}, {
				path: '/LonganAllInvoiceList',
				name: 'LonganAllInvoiceList',
				component: LonganAllInvoiceList
			}, {
				path: '/LonganAllInvoiceDetail',
				name: 'LonganAllInvoiceDetail',
				component: LonganAllInvoiceDetail
			}, {
				path: '/LonganALLDelidetail',
				name: 'LonganALLDelidetail',
				component: LonganALLDelidetail
			}, {
				path: '/LonganSupplierApply',
				name: 'LonganSupplierApply',
				component: LonganSupplierApply
			}, {
				path: '/LonganSupplierDetail',
				name: 'LonganSupplierDetail',
				component: LonganSupplierDetail
			}, {
				path: '/LonganMalfunctionManage',
				name: 'LonganMalfunctionManage',
				component: LonganMalfunctionManage
			}, {
				path: '/LonganHotelFunctionList',
				name: 'LonganHotelFunctionList',
				component: LonganHotelFunctionList
			}, {
				path: '/LonganHotelFunctionAdd',
				name: 'LonganHotelFunctionAdd',
				component: LonganHotelFunctionAdd
			}, {
				path: '/LonganHotelFunctionModify',
				name: 'LonganHotelFunctionModify',
				component: LonganHotelFunctionModify
			}, {
				path: '/LonganHotelFunctionDetail',
				name: 'LonganHotelFunctionDetail',
				component: LonganHotelFunctionDetail
			}, {
				path: '/LonganHotelFunctionClassify',
				name: 'LonganHotelFunctionClassify',
				component: LonganHotelFunctionClassify
			}, {
				path: '/LonganFunctionProdList',
				name: 'LonganFunctionProdList',
				component: LonganFunctionProdList
			}, {
				path: '/LonganFunctionProdAdd',
				name: 'LonganFunctionProdAdd',
				component: LonganFunctionProdAdd
			}, {
				path: '/LonganFunctionProdModify',
				name: 'LonganFunctionProdModify',
				component: LonganFunctionProdModify
			}, {
				path: '/LonganFunctionProdDetail',
				name: 'LonganFunctionProdDetail',
				component: LonganFunctionProdDetail
			}, {
				path: '/LonganMinibarProdList',
				name: 'LonganMinibarProdList',
				component: LonganMinibarProdList
			}, {
				path: '/LonganMinibarProdAdd',
				name: 'LonganMinibarProdAdd',
				component: LonganMinibarProdAdd
			}, {
				path: '/LonganMinibarProdModify',
				name: 'LonganMinibarProdModify',
				component: LonganMinibarProdModify
			}, {
				path: '/VirtualCabinetConfiguration',
				name: 'VirtualCabinetConfiguration',
				component: VirtualCabinetConfiguration
			}, {
				path: '/VirtualCabinetAdd',
				name: 'VirtualCabinetAdd',
				component: VirtualCabinetAdd
			}, {
				path: '/VirtualCabinetChange',
				name: 'VirtualCabinetChange',
				component: VirtualCabinetChange
			}, {
				path: '/LonganChoiceCabinet',
				name: 'LonganChoiceCabinet',
				component: LonganChoiceCabinet
			}, {
				path: '/LaunchCabinetManagement',
				name: 'LaunchCabinetManagement',
				component: LaunchCabinetManagement
			}, {
				path: '/LauncherManagement',
				name: 'LauncherManagement',
				component: LauncherManagement
			}, {
				path: '/LaunchHotelManagement',
				name: 'LaunchHotelManagement',
				component: LaunchHotelManagement
			}, {
				path: '/LonganMessagelist',
				name: 'LonganMessagelist',
				component: LonganMessagelist
			}, {
				path: '/LonganMessageAdd',
				name: 'LonganMessageAdd',
				component: LonganMessageAdd
			}, {
				path: '/LonganMessageEdit',
				name: 'LonganMessageEdit',
				component: LonganMessageEdit
			}, {
				path: '/LonganMessageDetail',
				name: 'LonganMessageDetail',
				component: LonganMessageDetail
			}, {
				path: '/LonganmessageTest',
				name: 'LonganmessageTest',
				component: LonganmessageTest
			}, {
				path: '/LonganWaitSendMessage',
				name: 'LonganWaitSendMessage',
				component: LonganWaitSendMessage
			}, {
				path: '/LonganSendMessage',
				name: 'LonganSendMessage',
				component: LonganSendMessage
			}, {
				path: '/LonganContentTemp',
				name: 'LonganContentTemp',
				component: LonganContentTemp
			}, {
				path: '/LonganMarketingSMS',
				name: 'LonganMarketingSMS',
				component: LonganMarketingSMS
			}, {
				path: '/LonganMarketingDetail',
				name: 'LonganMarketingDetail',
				component: LonganMarketingDetail
			}, {
				path: '/LaunchHotelAdd',
				name: 'LaunchHotelAdd',
				component: LaunchHotelAdd
			}, {
				path: '/LaunchHotelChange',
				name: 'LaunchHotelChange',
				component: LaunchHotelChange
			}, {
				path: '/LaunchCabinetAdd',
				name: 'LaunchCabinetAdd',
				component: LaunchCabinetAdd
			}, {
				path: '/LaunchCabinetChange',
				name: 'LaunchCabinetChange',
				component: LaunchCabinetChange
			}, {
				path: '/LauncherbounceRecords',
				name: 'LauncherbounceRecords',
				component: LauncherbounceRecords
			}, {
				path: '/LauncherinvestorCabinet',
				name: 'LauncherinvestorCabinet',
				component: LauncherinvestorCabinet
			}, {
				path: '/LauncherinvestorOrder',
				name: 'LauncherinvestorOrder',
				component: LauncherinvestorOrder
			}, {
				path: '/LauncherlookRecords',
				name: 'LauncherlookRecords',
				component: LauncherlookRecords
			}, {
				path: '/LonganChannelList',
				name: 'LonganChannelList',
				component: LonganChannelList
			}, {
				path: '/LonganChannelAdd',
				name: 'LonganChannelAdd',
				component: LonganChannelAdd
			}, {
				path: '/LonganChannelModify',
				name: 'LonganChannelModify',
				component: LonganChannelModify
			}, {
				path: '/LonganChannelShareLink',
				name: 'LonganChannelShareLink',
				component: LonganChannelShareLink
			}, {
				path: '/LonganChannelPartner',
				name: 'LonganChannelPartner',
				component: LonganChannelPartner
			}, {
				path: '/LonganRedPacketList',
				name: 'LonganRedPacketList',
				component: LonganRedPacketList
			}, {
				path: '/LonganCabinetType',
				name: 'LonganCabinetType',
				component: LonganCabinetType
			}, {
				path: '/LonganCabinetTypeAdd',
				name: 'LonganCabinetTypeAdd',
				component: LonganCabinetTypeAdd
			}, {
				path: '/LonganCabinetTypeChange',
				name: 'LonganCabinetTypeChange',
				component: LonganCabinetTypeChange
			}, {
				path: '/LonganMemberList',
				name: 'LonganMemberList',
				component: LonganMemberList
			}, {
				path: '/LonganMemberAdd',
				name: 'LonganMemberAdd',
				component: LonganMemberAdd
			}, {
				path: '/LonganMemberChange',
				name: 'LonganMemberChange',
				component: LonganMemberChange
			}, {
				path: '/LonganMemberCom',
				name: 'LonganMemberCom',
				component: LonganMemberCom
			}, {
				path: '/LonganMemberComRecords',
				name: 'LonganMemberComRecords',
				component: LonganMemberComRecords
			}, {
				path: "/LonganIotCardList",
				name: 'LonganIotCardList',
				component: LonganIotCardList
			}, {
				path: "/LonganPlatformCoupon",
				name: 'LonganPlatformCoupon',
				component: LonganPlatformCoupon
			}, {
				path: "/LonganPlatformCouponAdd",
				name: 'LonganPlatformCouponAdd',
				component: LonganPlatformCouponAdd
			}, {
				path: "/LonganCoupondia",
				name: 'LonganCoupondia',
				component: LonganCoupondia
			}, {
				path: '/LonganPredictEarnings',
				name: 'LonganPredictEarnings',
				component: LonganPredictEarnings
			}, {
				path: '/LonganExpressTemplate',
				name: 'LonganExpressTemplate',
				component: LonganExpressTemplate
			}, {
				path: '/LonganExpressAdd',
				name: 'LonganExpressAdd',
				component: LonganExpressAdd
			}, {
				path: '/longanWithdraw',
				name: 'longanWithdraw',
				component: longanWithdraw
			}, {
				path: '/LonganMemberRewards',
				name: 'LonganMemberRewards',
				component: LonganMemberRewards
			}, {
				path: '/LonganExpressChange',
				name: 'LonganExpressChange',
				component: LonganExpressChange
			}, {
				path: '/LonganAllCouponGroup',
				name: 'LonganAllCouponGroup',
				component: LonganAllCouponGroup
			}, {
				path: '/LonganAllCouponGroupAdd',
				name: 'LonganAllCouponGroupAdd',
				component: LonganAllCouponGroupAdd
			}, {
				path: '/LonganAllCouponGroupEdit',
				name: 'LonganAllCouponGroupEdit',
				component: LonganAllCouponGroupEdit
			}, {
				path: '/LonganPlatformCouponEdit',
				name: 'LonganPlatformCouponEdit',
				component: LonganPlatformCouponEdit
			}, {
				path: '/LonganPlatformCouponcheck',
				name: 'LonganPlatformCouponcheck',
				component: LonganPlatformCouponcheck
			}, {
				path: '/LonganAllCouponBatch',
				name: 'LonganAllCouponBatch',
				component: LonganAllCouponBatch
			}, {
				path: '/LonganAllCouponBatchEdit',
				name: 'LonganAllCouponBatchEdit',
				component: LonganAllCouponBatchEdit
			}, {
				path: '/LonganGrantCouponRecord',
				name: 'LonganGrantCouponRecord',
				component: LonganGrantCouponRecord
			}, {
				path: '/LonganCouponSendRecord',
				name: 'LonganCouponSendRecord',
				component: LonganCouponSendRecord
			}, {
				path: '/LonganAllGrantRecord',
				name: 'LonganAllGrantRecord',
				component: LonganAllGrantRecord
			}, {
				path: '/LonganAllCouponList',
				name: 'LonganAllCouponList',
				component: LonganAllCouponList
			}, {
				path: '/LonganCouponOrder',
				name: 'LonganCouponOrder',
				component: LonganCouponOrder
			}, {
				path: '/LonganProdCouponBatch',
				name: 'LonganProdCouponBatch',
				component: LonganProdCouponBatch
			}, {
				path: '/LonganProdCouponBatchAdd',
				name: 'LonganProdCouponBatchAdd',
				component: LonganProdCouponBatchAdd
			}, {
				path: '/LonganProdCouponBatchEdit',
				name: 'LonganProdCouponBatchEdit',
				component: LonganProdCouponBatchEdit
			}, {
				path: '/LonganProdCouponBatchCheck',
				name: 'LonganProdCouponBatchCheck',
				component: LonganProdCouponBatchCheck
			}, {
				path: '/LonganProdCouponGroup',
				name: 'LonganProdCouponGroup',
				component: LonganProdCouponGroup
			}, {
				path: '/LonganProdCouponGroupEdit',
				name: 'LonganProdCouponGroupEdit',
				component: LonganProdCouponGroupEdit
			}, {
				path: '/LonganCouponList',
				name: 'LonganCouponList',
				component: LonganCouponList
			}, {
				path: '/LonganCouponOrderDetail',
				name: 'LonganCouponOrderDetail',
				component: LonganCouponOrderDetail
			}, {
				path: '/LonganRebackMoney',
				name: 'LonganRebackMoney',
				component: LonganRebackMoney
			}, {
				path: '/LonganReplenishList',
				name: 'LonganReplenishList',
				component: LonganReplenishList
			}, {
				path: '/LonganCabTypeList',
				name: 'LonganCabTypeList',
				component: LonganCabTypeList
			}, {
				path: '/LonganCabTypeListAdd',
				name: 'LonganCabTypeListAdd',
				component: LonganCabTypeListAdd
			}, {
				path: '/LonganCabTypeEdit',
				name: 'LonganCabTypeEdit',
				component: LonganCabTypeEdit
			}, {
				path: '/LonganCabTypeDetail',
				name: 'LonganCabTypeDetail',
				component: LonganCabTypeDetail
			}, {
				path: '/LonganActivityAdd',
				name: 'LonganActivityAdd',
				component: LonganActivityAdd
			}, {
				path: '/LonganActivityChange',
				name: 'LonganActivityChange',
				component: LonganActivityChange
			}, {
				path: '/LonganActivityDef',
				name: 'LonganActivityDef',
				component: LonganActivityDef
			}, {
				path: '/LonganActivityDetail',
				name: 'LonganActivityDetail',
				component: LonganActivityDetail
			}, {
				path: '/LonganActivityList',
				name: 'LonganActivityList',
				component: LonganActivityList
			}, {
				path: '/LonganActivityRecord',
				name: 'LonganActivityRecord',
				component: LonganActivityRecord
			}, {
				path: '/LonganRedPackList',
				name: 'LonganRedPackList',
				component: LonganRedPackList
			}, {
				path: '/LonganLuckyBagsRecords',
				name: 'LonganLuckyBagsRecords',
				component: LonganLuckyBagsRecords
			}, {
				path: '/LonganFsData',
				name: 'LonganFsData',
				component: LonganFsData
			}, {
				path: '/LonganActRedpackDef',
				name: 'LonganActRedpackDef',
				component: LonganActRedpackDef
			}, {
				path: '/LonganActShareDef',
				name: 'LonganActShareDef',
				component: LonganActShareDef
			}, {
				path: '/LonganShareBonus',
				name: 'LonganShareBonus',
				component: LonganShareBonus
			}, {
				path: '/LonganShareBonusAdd',
				name: 'LonganShareBonusAdd',
				component: LonganShareBonusAdd
			}, {
				path: '/LonganShareBonusChange',
				name: 'LonganShareBonusChange',
				component: LonganShareBonusChange
			}, {
				path: '/LonganShareBonusDetail',
				name: 'LonganShareBonusDetail',
				component: LonganShareBonusDetail
			}, {
				path: '/LonganEmployeeList',
				name: 'LonganEmployeeList',
				component: LonganEmployeeList
			}, {
				path: '/LonganEmployeeCash',
				name: 'LonganEmployeeCash',
				component: LonganEmployeeCash
			}, {
				path: '/LonganEmployeeReDetail',
				name: 'LonganEmployeeReDetail',
				component: LonganEmployeeReDetail
			}, {
				path: '/LonganCustomerList',
				name: 'LonganCustomerList',
				component: LonganCustomerList
			}, {
				path: '/LonganCustomerCash',
				name: 'LonganCustomerCash',
				component: LonganCustomerCash
			}, {
				path: '/LonganCustomerAccess',
				name: 'LonganCustomerAccess',
				component: LonganCustomerAccess
			}, {
				path: '/LonganCustomerAccessDetail',
				name: 'LonganCustomerAccessDetail',
				component: LonganCustomerAccessDetail
			}, {
				path: '/LonganCustomerOrder',
				name: 'LonganCustomerOrder',
				component: LonganCustomerOrder
			}, {
				path: '/LonganCustomerReDetail',
				name: 'LonganCustomerReDetail',
				component: LonganCustomerReDetail
			}, {
				path: '/LonganHotelShareRecord',
				name: 'LonganHotelShareRecord',
				component: LonganHotelShareRecord
			}, {
				path: '/LonganselfTakingList',
				name: 'LonganselfTakingList',
				component: LonganselfTakingList
			}, {
				path: '/LonganselfTakingAdd',
				name: 'LonganselfTakingAdd',
				component: LonganselfTakingAdd
			}, {
				path: '/LonganselfTakingEdit',
				name: 'LonganselfTakingEdit',
				component: LonganselfTakingEdit
			}, {
				path: '/LonganselfTakingDetail',
				name: 'LonganselfTakingDetail',
				component: LonganselfTakingDetail
			}, {
				path: '/VirtualCabinetDetail',
				name: 'VirtualCabinetDetail',
				component: VirtualCabinetDetail
			}, {
				path: '/LonganFuncLinkList',
				name: 'LonganFuncLinkList',
				component: LonganFuncLinkList
			}, {
				path: '/LonganFuncLinkDetail',
				name: 'LonganFuncLinkDetail',
				component: LonganFuncLinkDetail
			}, {
				path: '/LonganFuncLinkAdd',
				name: 'LonganFuncLinkAdd',
				component: LonganFuncLinkAdd
			}, {
				path: '/LonganFuncLinkChange',
				name: 'LonganFuncLinkChange',
				component: LonganFuncLinkChange
			}, {
				path: '/LonganFuncLinkParams',
				name: 'LonganFuncLinkParams',
				component: LonganFuncLinkParams
			}, {
				path: '/LonganProdSpecsList',
				name: 'LonganProdSpecsList',
				component: LonganProdSpecsList
			}, {
				path: '/LonganProdSpecsAdd',
				name: 'LonganProdSpecsAdd',
				component: LonganProdSpecsAdd
			}, {
				path: '/LonganProdSpecsModify',
				name: 'LonganProdSpecsModify',
				component: LonganProdSpecsModify
			}, {
				path: '/LonganProdSpecsDetail',
				name: 'LonganProdSpecsDetail',
				component: LonganProdSpecsDetail
			}, {
				path: '/LonganHotelProdSpecsList',
				name: 'LonganHotelProdSpecsList',
				component: LonganHotelProdSpecsList
			}, {
				path: '/LonganHotelProdSpecsAdd',
				name: 'LonganHotelProdSpecsAdd',
				component: LonganHotelProdSpecsAdd
			}, {
				path: '/LonganHotelProdSpecsModify',
				name: 'LonganHotelProdSpecsModify',
				component: LonganHotelProdSpecsModify
			}, {
				path: '/LonganHotelProdSpecsDetail',
				name: 'LonganHotelProdSpecsDetail',
				component: LonganHotelProdSpecsDetail
			}, {
				path: '/LonganFunctionSpecsList',
				name: 'LonganFunctionSpecsList',
				component: LonganFunctionSpecsList
			}, {
				path: '/LonganFunctionSpecsAdd',
				name: 'LonganFunctionSpecsAdd',
				component: LonganFunctionSpecsAdd
			}, {
				path: '/LonganFunctionSpecsModify',
				name: 'LonganFunctionSpecsModify',
				component: LonganFunctionSpecsModify
			}, {
				path: '/LonganFunctionSpecsDetail',
				name: 'LonganFunctionSpecsDetail',
				component: LonganFunctionSpecsDetail
			}, {
				path: '/LonganCardticketList',
				name: 'LonganCardticketList',
				component: LonganCardticketList
			}, {
				path: '/LonganCardticketDetail',
				name: 'LonganCardticketDetail',
				component: LonganCardticketDetail
			}, {
				path: '/LonganCardCouponList',
				name: 'LonganCardCouponList',
				component: LonganCardCouponList
			}, {
				path: '/LonganCardCouponDetail',
				name: 'LonganCardCouponDetail',
				component: LonganCardCouponDetail
			}, {
				path: '/LonganCardCouponRecord',
				name: 'LonganCardCouponRecord',
				component: LonganCardCouponRecord
			}, {
				path: '/uploadpic',
				name: 'uploadpic',
				component: uploadpic
			}, {
				path: '/LonganExternalLogistics',
				name: 'LonganExternalLogistics',
				component: LonganExternalLogistics
			}, {
				path: '/LonganExternalLogisticsEdit',
				name: 'LonganExternalLogisticsEdit',
				component: LonganExternalLogisticsEdit
			}, {
				path: '/LonganExternalLogisticsDetail',
				name: 'LonganExternalLogisticsDetail',
				component: LonganExternalLogisticsDetail
			}, {
				path: '/LonganHotelLogistics',
				name: 'LonganHotelLogistics',
				component: LonganHotelLogistics
			}, {
				path: '/LonganHotelLogisticsAdd',
				name: 'LonganHotelLogisticsAdd',
				component: LonganHotelLogisticsAdd
			}, {
				path: '/LonganHotelLogisticsEdit',
				name: 'LonganHotelLogisticsEdit',
				component: LonganHotelLogisticsEdit
			}, {
				path: '/LonganHotelLogisticsDetail',
				name: 'LonganHotelLogisticsDetail',
				component: LonganHotelLogisticsDetail
			}, {
				path: '/LonganExternalOrder',
				name: 'LonganExternalOrder',
				component: LonganExternalOrder
			}, {
				path: '/LonganExternalDetail',
				name: 'LonganExternalDetail',
				component: LonganExternalDetail
			}, {
				path: '/LonganOrganWaitDivide',
				name: 'LonganOrganWaitDivide',
				component: LonganOrganWaitDivide
			}, {
				path: '/LonganOrganWaitDivideDetail',
				name: 'LonganOrganWaitDivideDetail',
				component: LonganOrganWaitDivideDetail
			}, {
				path: '/LonganOrganDivideRecord',
				name: 'LonganOrganDivideRecord',
				component: LonganOrganDivideRecord
			}, {
				path: '/LonganOrganDivideRecordDetail',
				name: 'LonganOrganDivideRecordDetail',
				component: LonganOrganDivideRecordDetail
			}, {
				path: '/LonganWaitAccountIncome',
				name: 'LonganWaitAccountIncome',
				component: LonganWaitAccountIncome
			}, {
				path: '/LonganWaitAccountIncomeDetail',
				name: 'LonganWaitAccountIncomeDetail',
				component: LonganWaitAccountIncomeDetail
			}, {
				path: '/LonganIncomeRecord',
				name: 'LonganIncomeRecord',
				component: LonganIncomeRecord
			}, {
				path: '/LonganIncomeRecordDetail',
				name: 'LonganIncomeRecordDetail',
				component: LonganIncomeRecordDetail
			}, {
				path: '/LonganCustomerWaitIn',
				name: 'LonganCustomerWaitIn',
				component: LonganCustomerWaitIn
			}, {
				path: '/LonganCustomerWaitInDetail',
				name: 'LonganCustomerWaitInDetail',
				component: LonganCustomerWaitInDetail
			}, {
				path: '/LonganCustomerIncomeRecord',
				name: 'LonganCustomerIncomeRecord',
				component: LonganCustomerIncomeRecord
			}, {
				path: '/LonganCustomerInRecordDetail',
				name: 'LonganCustomerInRecordDetail',
				component: LonganCustomerInRecordDetail
			}, {
				path: '/LonganOrgAccountlist',
				name: 'LonganOrgAccountlist',
				component: LonganOrgAccountlist
			}, {
				path: '/LonganHotelADList',
				name: 'LonganHotelADList',
				component: LonganHotelADList
			}, {
				path: '/LonganHotelADAdd',
				name: 'LonganHotelADAdd',
				component: LonganHotelADAdd
			}, {
				path: '/LonganHotelADModify',
				name: 'LonganHotelADModify',
				component: LonganHotelADModify
			}, {
				path: '/LonganHotelADDetail',
				name: 'LonganHotelADDetail',
				component: LonganHotelADDetail
			}, {
				path: '/LonganHotelADQuoteDetail',
				name: 'LonganHotelADQuoteDetail',
				component: LonganHotelADQuoteDetail
			}, {
				path: '/LonganHotelVisitRecord',
				name: 'LonganHotelVisitRecord',
				component: LonganHotelVisitRecord
			}, {
				path: '/LonganHotelOrderRecord',
				name: 'LonganHotelOrderRecord',
				component: LonganHotelOrderRecord
			}, {
				path: '/LonganHotelRetailRecord',
				name: 'LonganHotelRetailRecord',
				component: LonganHotelRetailRecord
			}, {
				path: '/LonganEmpRetailRecord',
				name: 'LonganEmpRetailRecord',
				component: LonganEmpRetailRecord
			}, {
				path: '/LonganRedpackDetail',
				name: 'LonganRedpackDetail',
				component: LonganRedpackDetail
			}, {
				path: '/LonganRedPackShareRE',
				name: 'LonganRedPackShareRE',
				component: LonganRedPackShareRE
			}, {
				path: '/LonganRedPackGetRecord',
				name: 'LonganRedPackGetRecord',
				component: LonganRedPackGetRecord
			}, {
				path: '/LonganRedPackTotal',
				name: 'LonganRedPackTotal',
				component: LonganRedPackTotal
			}, {
				path: '/LonganRedPackHotelTotal',
				name: 'LonganRedPackHotelTotal',
				component: LonganRedPackHotelTotal
			}, {
				path: '/LonganActSecondHalf',
				name: 'LonganActSecondHalf',
				component: LonganActSecondHalf
			}, {
				path: '/LonganActivityMeeting',
				name: 'LonganActivityMeeting',
				component: LonganActivityMeeting
			}, {
				path: '/LonganActivityMeetingRecords',
				name: 'LonganActivityMeetingRecords',
				component: LonganActivityMeetingRecords
			}, {
				path: '/LonganActivityMeetingDetail',
				name: 'LonganActivityMeetingDetail',
				component: LonganActivityMeetingDetail
			}, {
				path: '/LonganFunctionLeadList',
				name: 'LonganFunctionLeadList',
				component: LonganFunctionLeadList
			}, {
				path: '/LonganFunctionLeadChange',
				name: 'LonganFunctionLeadChange',
				component: LonganFunctionLeadChange
			}, {
				path: '/LonganFunctionLeadDetail',
				name: 'LonganFunctionLeadDetail',
				component: LonganFunctionLeadDetail
			}, {
				path: '/LonganFunctionLeadAdd',
				name: 'LonganFunctionLeadAdd',
				component: LonganFunctionLeadAdd
			}, {
				path: '/LonganContactHotelList',
				name: 'LonganContactHotelList',
				component: LonganContactHotelList
			}, {
				path: '/LonganContactDetail',
				name: 'LonganContactDetail',
				component: LonganContactDetail
			},
			//功能区房源管理
			{
				path: '/LonganHotelFunctionHouseResourceList',
				name: 'LonganHotelFunctionHouseResourceList',
				component: LonganHotelFunctionHouseResourceList
			},
			{
				path: '/LonganHotelFunctionHouseResourceAdd',
				name: 'LonganHotelFunctionHouseResourceAdd',
				component: LonganHotelFunctionHouseResourceAdd
			},
			{
				path: '/LonganHotelFunctionHouseResourceEdit',
				name: 'LonganHotelFunctionHouseResourceEdit',
				component: LonganHotelFunctionHouseResourceEdit
			},
			{
				path: '/LonganHotelFunctionHouseResourceDetail',
				name: 'LonganHotelFunctionHouseResourceDetail',
				component: LonganHotelFunctionHouseResourceDetail
			}, {
				path: '/LonganEnterprisesCodeList',
				name: 'LonganEnterprisesCodeList',
				component: LonganEnterprisesCodeList
			}, {
				path: '/LonganEnterprisesCodeDetail',
				name: 'LonganEnterprisesCodeDetail',
				component: LonganEnterprisesCodeDetail
			}, {
				path: '/LonganEnterprisesRoomsList',
				name: 'LonganEnterprisesRoomsList',
				component: LonganEnterprisesRoomsList
			}, {
				path: '/LonganEnterprisesRoomsDetail',
				name: 'LonganEnterprisesRoomsDetail',
				component: LonganEnterprisesRoomsDetail
			}, {
				path: '/LonganEnterprisesList',
				name: 'LonganEnterprisesList',
				component: LonganEnterprisesList
			}, {
				path: '/LonganEnterprisesDetail',
				name: 'LonganEnterprisesDetail',
				component: LonganEnterprisesDetail
			}, {
				path: '/LonganEnterprisesCodeOrderList',
				name: 'LonganEnterprisesCodeOrderList',
				component: LonganEnterprisesCodeOrderList
			}, {
				path: '/LonganAdaptPriceList',
				name: 'LonganAdaptPriceList',
				component: LonganAdaptPriceList
			}, {
				path: '/LonganAdaptPriceOrderList',
				name: 'LonganAdaptPriceOrderList',
				component: LonganAdaptPriceOrderList
			}, {
				path: '/CabinetDetail',
				name: 'CabinetDetail',
				component: CabinetDetail
			}, {
				path: '/CabinetAdd',
				name: 'CabinetAdd',
				component: CabinetAdd
			}, {
				path: '/LonganActivityScanCode',
				name: 'LonganActivityScanCode',
				component: LonganActivityScanCode
			}, {
				path: '/LonganActivityScanRecord',
				name: 'LonganActivityScanRecord',
				component: LonganActivityScanRecord
			}

			]
		}]
})
