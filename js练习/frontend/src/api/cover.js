import request from '@/utils/request'

export function fetchCoverList(query) {
  return request({
    url: 'admin/face/list',
    method: 'get',
    params: query
  })
}

export function fetchCoverAdd(query) {
  return request({
    url: 'admin/face/add',
    method: 'post',
    data: query
  })
}

export function fetchCoverDel(query) {
  return request({
    url: 'admin/face/del',
    method: 'post',
    data: query
  })
}

export function fetchCoverDetail(query) {
  return request({
    url: 'admin/face/edit',
    method: 'get',
    params: query
  })
}

export function fetchCoverEdit(query) {
  return request({
    url: 'admin/face/edit/do',
    method: 'post',
    data: query
  })
}
