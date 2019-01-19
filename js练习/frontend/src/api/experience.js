import request from '@/utils/request'

export function getExp(query) {
  return request({
    url: '/admin/experience/article/list',
    method: 'get',
    params: query
  })
}

export function createContent(query) {
  return request({
    url: '/admin/experience/article/add',
    method: 'post',
    data: query
  })
}

export function getEditExp(query) {
  return request({
    url: '/admin/experience/article/edit',
    method: 'get',
    params: query
  })
}

export function editExp(query) {
  return request({
    url: '/admin/experience/article/edit/do',
    method: 'post',
    data: query
  })
}

export function preview(query) {
  return request({
    url: '/admin/experience/article/preview',
    method: 'get',
    params: query
  })
}

export function garbage(query) {
  return request({
    url: '/admin/experience/article/switch',
    method: 'post',
    data: query
  })
}

export function Delete(query) {
  return request({
    url: '/admin/experience/article/drop',
    method: 'post',
    data: query
  })
}

export function getCate(query) {
  return request({
    url: '/admin/experience/cate/list',
    method: 'get',
    params: query
  })
}

export function addCate(query) {
  return request({
    url: '/admin/experience/cate/add',
    method: 'post',
    data: query
  })
}

export function editCate(query) {
  return request({
    url: '/admin/experience/cate/edit/do',
    method: 'post',
    data: query
  })
}

export function cateGet(query) {
  return request({
    url: '/admin/experience/cate/list/all',
    method: 'get',
    params: query
  })
}

export function delCate(query) {
  return request({
    url: '/admin/experience/cate/del',
    method: 'post',
    data: query
  })
}

export function getNum(query) {
  return request({
    url: '/admin/experience/article/statistic',
    method: 'get',
    params: query
  })
}