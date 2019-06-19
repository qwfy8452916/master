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
import CommodityList from '@/components/CommodityList'
import CommodityAdd from '@/components/CommodityAdd'
import Commodityedit from '@/components/Commodityedit'
import Cabinetgl from '@/components/Cabinetgl'
import Cabinetchange from '@/components/Cabinetchange'
import Cabinetlook from '@/components/Cabinetlook'
import PurchaseOrderlist from '@/components/PurchaseOrderlist'
import PurchaseOrderadd from '@/components/PurchaseOrderadd'
import PurchaseOrderedit from '@/components/PurchaseOrderedit'
import SeepurchaseOrder from '@/components/SeepurchaseOrder'
import checkhotelrecord from '@/components/checkhotelrecord'
import hotelrecorddetail from '@/components/hotelrecorddetail'
// import  { PrivilegeUserAdd, PrivilegeUserModify } from 'user-privilege-management'
import LonganPrivilegeUserList from '@/components/LonganPrivilegeUserList'
import LonganPrivilegeUserAdd from '@/components/LonganPrivilegeUserAdd'
import LonganPrivilegeUserModify from '@/components/LonganPrivilegeUserModify'
import LonganPrivilegeRoleList from '@/components/LonganPrivilegeRoleList'
import LonganPrivilegeRoleAdd from '@/components/LonganPrivilegeRoleAdd'
import LonganPrivilegeRoleModify from '@/components/LonganPrivilegeRoleModify'
import LonganHotelCommodityList from '@/components/LonganHotelCommodityList'
import LonganHotelCommodityModify from '@/components/LonganHotelCommodityModify'
import LonganHotelCabinetList from '@/components/LonganHotelCabinetList'
import LonganHotelCommodityAdd from '@/components/LonganHotelCommodityAdd'
import LonganHotelCabinetModify from '@/components/LonganHotelCabinetModify'
import LonganInventoryList from '@/components/LonganInventoryList'
import LonganGodownEntryList from '@/components/LonganGodownEntryList'
import LonganGodownEntryDetail from '@/components/LonganGodownEntryDetail'
import LonganGodownEntryAudit from '@/components/LonganGodownEntryAudit'
import LonganServiceTypeList from '@/components/LonganServiceTypeList'
import LonganServiceTypeAdd from '@/components/LonganServiceTypeAdd'
import LonganServiceTypeModify from '@/components/LonganServiceTypeModify'
import LonganServiceTypeDetail from '@/components/LonganServiceTypeDetail'
import LonganHotelServiceList from '@/components/LonganHotelServiceList'
import LonganHotelServiceAdd from '@/components/LonganHotelServiceAdd'
import LonganHotelServiceDetail from '@/components/LonganHotelServiceDetail'
import LonganCommonFeature from '@/components/LonganCommonFeature'
import LonganHotelFeature from '@/components/LonganHotelFeature'
import LonganCommonFeatureAdd from '@/components/LonganCommonFeatureAdd'
import LonganCommonFeatureModify from '@/components/LonganCommonFeatureModify'

import LonganRevenueStatistics from '@/components/LonganRevenueStatistics'
import LonganRevenueDetail from '@/components/LonganRevenueDetail'
import LonganOperationAnalysis from '@/components/LonganOperationAnalysis'
import LonganDeclarationForm from '@/components/LonganDeclarationForm'
import LonganAbnormalStateOfCabinet from '@/components/LonganAbnormalStateOfCabinet'

import LonganDivideInto from '@/components/LonganDivideInto'
import LonganWithdrawalsRecord from '@/components/LonganWithdrawalsRecord'
import LonganWithdrawalsRecordDetail from '@/components/LonganWithdrawalsRecordDetail'
import LonganWithdrawalsRecordHandle from '@/components/LonganWithdrawalsRecordHandle'
import LonganReplenishmentFee from '@/components/LonganReplenishmentFee'
import LonganReplenishmentFeeDiscount from '@/components/LonganReplenishmentFeeDiscount'

import LonganFinancialCost from '@/components/LonganFinancialCost'

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
			path: '/LonganHotelServiceDetail',
			name: 'LonganHotelServiceDetail',
			component: LonganHotelServiceDetail
		},{
			path: '/LonganCommonFeature',
			name: 'LonganCommonFeature',
			component: LonganCommonFeature
		},{
			path: '/LonganHotelFeature',
			name: 'LonganHotelFeature',
			component: LonganHotelFeature
		},{
			path: '/LonganCommonFeatureAdd',
			name: 'LonganCommonFeatureAdd',
			component: LonganCommonFeatureAdd
		},{
			path: '/LonganCommonFeatureModify',
			name: 'LonganCommonFeatureModify',
			component: LonganCommonFeatureModify
		},

		
		{
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
		}]
	}]
})
