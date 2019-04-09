import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import HomePage from '@/pages/HomePage'
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
import LonganPrivilegeUserList from '@/components/LonganPrivilegeUserList'
import LonganPrivilegeUserAdd from '@/components/LonganPrivilegeUserAdd'
import LonganPrivilegeUserModify from '@/components/LonganPrivilegeUserModify'
// import  { PrivilegeUserAdd, PrivilegeUserModify } from 'user-privilege-management'
import LonganHotelCommodityList from '@/components/LonganHotelCommodityList'
import LonganHotelCommodityModify from '@/components/LonganHotelCommodityModify'

Vue.use(Router)

export default new Router({
  routes: [
	{
		path: '/login',
		name: 'login',
		component: login
	},{
		path: '/',
		name: 'HomePage',
		component: HomePage,
		children:[{
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
			path: 'LonganHotelCommodityList',
			name: 'LonganHotelCommodityList',
			component: LonganHotelCommodityList
		},{
			path: 'LonganHotelCommodityModify',
			name: 'LonganHotelCommodityModify',
			component: LonganHotelCommodityModify
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
		}]
	}]
})
