/*
* @Author: qz_xsc
* @Date:   2018-10-18 10:29:46
* @Last Modified by:   qz_xsc
* @Last Modified time: 2018-10-23 16:42:03
*/
import request from './request'

export function experience (id) {
  return request({
    url: 'experience/detail',
    method: 'get',
    data: id
  })
}
export function getCity () {
  return request({
    url: '/admin/city/citylist',
    method: 'get'
  })
}
