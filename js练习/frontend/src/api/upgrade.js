import request from '@/utils/request'


export function fetchUpList(query) {
  return request({
    url: 'admin/version/getversionlist',
    method: 'get',
    params: query
  })
}

export function fetchAddVersion(query) {
  return request({
    url: 'admin/version/addversion',
    method: 'post',
    data: query
  })
}

export function fetchDelVersion(query) {
  return request({
    url: 'admin/version/delversion',
    method: 'post',
    data: query
  })
}


export function fetchEditversion(query) {
  return request({
    url: 'http://192.168.8.109:3000/mock/19/admin/version/editversion',
    method: 'post',
    data: query
  })
}

export function fetchGetVersion(query) {
  return request({
    url: 'http://192.168.8.109:3000/mock/19/admin/version/getversioninfo',
    method: 'post',
    data: query
  })
}

export function fetchResetversion(query) {
  return request({
    url: 'http://192.168.8.109:3000/mock/19/admin/version/resetversion',
    method: 'post',
    data: query
  })
}

export function fetchTrash(query) {
  return request({
    url: 'http://192.168.8.109:3000/mock/19/admin/version/trash',
    method: 'post',
    data: query
  })
}

