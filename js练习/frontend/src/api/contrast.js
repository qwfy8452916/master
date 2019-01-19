import request from '@/utils/request'

export function fetchContrastPos() {
  return request({
    url: '/contrast/pos',
    method: 'get'
  })
}

export function fetchContrastList(query) {
  return request({
    url: 'pk/list',
    method: 'get',
    params: query
  })
}

export function userList(query) {
  return request({
    url: 'manage/user/search',
    method: 'get',
    params: query
  })
}

export function fetchAdd(query) {
  return request({
    url: 'pk/add',
    method: 'post',
    params: query
  })
}

export function fetchDetail(query) {
  return request({
    url: 'pk/edit',
    method: 'get',
    params: query
  })
}

export function fetchEdit(query) {
  return request({
    url: 'pk/edit/do',
    method: 'post',
    data: query
  })
}
