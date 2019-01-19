import request from '@/utils/request'


export function fetchUserList(query) {
  return request({
    url: 'admin/user/userlist/',
    method: 'get',
    params: query
  })
}

export function fetchUserInfo(query) {
  return request({
    url: 'admin/user/getuserinfo/',
    method: 'get',
    params: query
  })
}

export function fetchUserEdit(query) {
  return request({
    url: 'admin/user/edituser/',
    method: 'post',
    data: query
  })
}

export function fetchUserSwitch(query) {
  return request({
    url: 'admin/user/stopuser/',
    method: 'post',
    data: query
  })
}

export function fetchUserAdd(query) {
  return request({
    url: 'admin/user/adduser/',
    method: 'post',
    data: query
  })
}

export function fetchFeedbackList(query) {
  return request({
    url: 'http://192.168.8.109:3000/mock/19/admin/feedback/feedbacklist/',
    method: 'get',
    params: query
  })
}

export function fetchCity(query) {
  return request({
    url: 'admin/city/citylist',
    method: 'get',
    params: query
  })
}
