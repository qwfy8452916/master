import request from '@/utils/request'

export function fetchClassifyList(query) {
  return request({
    url: 'admin/budget/cate/show/all',
    method: 'get',
    params: query
  })
}

export function fetchClassifyEdit(query) {
  return request({
    url: 'admin/budget/version/edit/do',
    method: 'post',
    data: query
  })
}

export function fetchTopClassifyAdd(query) {
  return request({
    url: 'admin/budget/cate/add',
    method: 'post',
    data: query
  })
}

export function fetchTopClassifyEdit(query) {
  return request({
    url: 'admin/budget/cate/edit/do',
    method: 'post',
    data: query
  })
}

export function fetchVersionAdd(query) {
  return request({
    url: 'admin/budget/version/add',
    method: 'post',
    data: query
  })
}

export function fetchVersionEdit(query) {
  return request({
    url: 'admin/budget/version/edit/do',
    method: 'post',
    data: query
  })
}

export function fetchVersionDetail(query) {
  return request({
    url: 'admin/budget/version/edit',
    method: 'get',
    params: query
  })
}

export function fetchVersionList(query) {
  return request({
    url: 'admin/budget/version/list',
    method: 'get',
    params: query
  })
}

export function fetchClassifyDel(query) {
  return request({
    url: 'admin/budget/cate/del',
    method: 'post',
    data: query
  })
}

export function fetchVersionDel(query) {
  return request({
    url: 'admin/budget/version/del',
    method: 'post',
    data: query
  })
}
