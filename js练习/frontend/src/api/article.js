import request from '@/utils/request'

export function getData(query) {
  return request({
    url: 'admin/article/articlelist',
    method: 'get',
    params: query
  })
}

export function create(query) {
  return request({
    url: '/admin/article/addarticle',
    method: 'post',
    data: query
  })
}

export function searchTag(query) {
  return request({
    url: '/admin/articletags/searchtaginfo',
    method: 'get',
    params: query
  })
}

export function searchUser(query) {
  return request({
    url: '/admin/user/searchuserinfo',
    method: 'get',
    params: query
  })
}

export function getArticle(query) {
  return request({
    url: '/admin/article/getarticleinfo/',
    method: 'get',
    params: query
  })
}

export function editArticle(query) {
  return request({
    url: '/admin/article/editarticle/',
    method: 'post',
    data: query
  })
}

// 移入垃圾箱
export function moveIn(query) {
  return request({
    url: '/admin/article/movetrash/',
    method: 'post',
    data: query
  })
}

// 置顶
export function topUp(query) {
  return request({
    url: '/admin/article/topup/',
    method: 'post',
    data: query
  })
}

// 永久删除
export function deleteArticle(query) {
  return request({
    url: '/admin/article/delarticle/',
    method: 'post',
    data: query
  })
}

export function reset(query) {
  return request({
    url: '/admin/article/reset',
    method: 'post',
    data: query
  })
}

//tag.vue

export function getTagList(query) {
  return request({
    url: '/admin/articletags/gettaglist/',
    method: 'get',
    params: query
  })
}

export function createTag(query) {
  return request({
    url: '/admin/articletags/addtag/',
    method: 'post',
    data: query
  })
}

export function editTag(query) {
  return request({
    url: '/admin/articletags/edittag/',
    method: 'post',
    data: query
  })
}

export function deleteTag(query) {
  return request({
    url: '/admin/articletags/deltag/',
    method: 'post',
    data: query
  })
}

export function getTag(query) {
  return request({
    url: '/admin/articletags/gettaginfo/',
    method: 'get',
    params: query
  })
}

export function searchInfo(query) {
  return request({
    url: '/admin/manager/search',
    method: 'get',
    params: query
  })
}