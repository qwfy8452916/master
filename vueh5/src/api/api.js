/*
* @Author: qz_xsc
* @Date:   2018-10-18 10:29:46
* @Last Modified by:   qz_xsc
* @Last Modified time: 2018-10-23 16:42:03
*/
import request from './request'

export function experience (id) {
  return request({
    url: '/experience/web?id=' + id,
    method: 'get',
    data: id
  })
}
export function getCity () {
  return request({
    url: '/city/getallcitylist',
    method: 'get'
  })
}
export function setFeedBack (parms) {
  return request({
    url: '/user/feedback',
    method: 'post',
    data: parms
  })
}
export function upLoadImg (parms) {
  return request({
    url: '/user/feedback/imgup',
    method: 'post',
    data: parms,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function zbfb (parms) {
  return request({
    url: '/zbfb/v1/hl',
    method: 'post',
    data: parms
  })
}
export function hlresult (parms) {
  return request({
    url: '/zbfb/v1/hl/component',
    method: 'post',
    data: parms
  })
}
