import Mock from 'mockjs'
import adAPI from './ad'
import coverAPI from './cover'
import userAPI from './user'
import budgetAPI from './budget'
import contrastAPI from './contrast'

import examineAPI from './examine'

import upgradeAPI from './upgrade'

import topicAPI from './topic'


import materialBillAPI from './materialBill'


// Mock.setup({
//   timeout: '350-600'
// })

// 广告位相关
Mock.mock(/\/ad\/pos/, 'get', adAPI.pos)
Mock.mock(/\/ad\/list/, 'get', adAPI.getList)

// 封面相关
Mock.mock(/\/cover\/pos/, 'get', coverAPI.pos)
Mock.mock(/\/cover\/list/, 'get', coverAPI.getList)

// 用户相关
Mock.mock(/\/user\/list/, 'get', userAPI.getList)
Mock.mock(/\/user\/feedbacks/, 'get', userAPI.getFeedbacks)

// 预算相关
Mock.mock(/\/budget\/versionlist/, 'get', budgetAPI.getList)

// 对比管理
Mock.mock(/\/contrast\/pos/, 'get', contrastAPI.pos)
Mock.mock(/\/contrast\/list/, 'get', contrastAPI.getList)

// 话题管理
Mock.mock(/\/topic\/pos/, 'get', topicAPI.pos)
// Mock.mock(/\/topic\/list/, 'get', topicAPI.getList)


// 文章审核
Mock.mock(/\/examine\/pos/, 'get', examineAPI.pos)
Mock.mock(/\/examine\/list/, 'get', examineAPI.getList)
// 升级管理
Mock.mock(/\/upgrade\/pos/, 'get', upgradeAPI.pos)
Mock.mock(/\/upgrade\/list/, 'get', upgradeAPI.getList)

// 材料品牌榜单管理
Mock.mock(/\/materialBill\/pos/, 'get', materialBillAPI.pos)
Mock.mock(/\/materialBill\/list/, 'get', materialBillAPI.getList)


export default Mock
