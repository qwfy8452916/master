import request from '@/utils/request'

export function fetchAdList(query) {
  return request({
    url: 'admin/banner/list',
    method: 'get',
    params: query
  })
}

export function fetchAdAdd(query) {
  return request({
    url: 'admin/banner/add',
    method: 'post',
    data: query
  })
}

export function fetchAdDetail(query) {
  return request({
    url: 'admin/banner/edit/',
    method: 'get',
    params: query
  })
}

export function fetchAdSwitch(query) {
  return request({
    url: 'admin/banner/switch',
    method: 'post',
    data: query
  })
}

export function fetchAdEdit(query) {
  return request({
    url: 'admin/banner/edit/do',
    method: 'post',
    data: query
  })
}

export function fetchAdDel(query) {
  return request({
    url: '/banner/del',
    method: 'post',
    data: query
  })
}

