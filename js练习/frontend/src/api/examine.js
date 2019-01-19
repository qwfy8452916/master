import request from '@/utils/request'

export function fetchExaminePos() {
  return request({
    url: '/examine/pos',
    method: 'get'
  })
}

export function fetchExamineList(query) {
  return request({
    url: '/examine/list',
    method: 'get',
    params: query
  })
}
