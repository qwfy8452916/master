/*
* @Author: qz_dc
* @Date:   2018-10-08 11:54:16
* @Last Modified by:   qz_dc
* @Last Modified time: 2018-10-08 11:54:19
*/
import request from '@/utils/request'

export function userSearch(name) {
  return request({
    url: '/search/user',
    method: 'get',
    params: { name }
  })
}
