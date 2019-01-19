import request from '@/untils/request'
console.log(request)
// 本地接口
export function ceshiajax(query) {
  return request({
    url: '/v1/experience/detail',
    method: 'get',
    params: query
  })
}

// mock自定义接口
export function mockajax(query) {
  return request({
    url: '/ad/pos',
    method: 'get',
    params: query
  })
}

// 定义的测试函数
export function xx(){
	var aa='hello'
	console.log('调取函数')
	return aa
}
export function first(){
	console.log('打印输出')
}
export default{
	
}