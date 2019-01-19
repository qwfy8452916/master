

import Mock from 'mockjs'
import adAPI from './ad'



// Mock.setup({
//   timeout: '350-600'
// })


// 正则匹配/ad/pos的接口
Mock.mock(/\/ad\/pos/, 'get', adAPI.pos)    
Mock.mock(/\/ad\/list/, 'get', adAPI.getList)

export default Mock
