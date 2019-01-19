import request from '@/utils/request'


// 材料分类-列表页-列表
export function fetchGetClassificationList(query) {
  return request({
    url: '/admin/classification/getclassificationlist',
    method: 'get',
    params: query
  })
}
// 材料分类-列表页-添加榜单
export function fetchAddClassification(query) {
  return request({
    url: '/admin/classification/addclassification',
    method: 'post',
    data: query
  })
}
// 材料分类-列表页-编辑榜单
export function fetchEditClassification(query) {
  return request({
    url: '/admin/classification/editclassification',
    method: 'post',
    data: query
  })
}
// 材料分类-列表页-获取榜单
export function fetchGetClassification(query) {
  return request({
    url: '/admin/classification/getclassificationinfo',
    method: 'get',
    params: query
  })
}
// 材料分类-列表页-移至垃圾箱
export function fetchMoveTrash(query) {
  return request({
    url: '/admin/classification/movetrash',
    method: 'post',
    data: query
  })
}
// 材料分类-列表页-恢复
export function fetchReset(query) {
  return request({
    url: '/admin/classification/reset',
    method: 'post',
    data: query
  })
}
// 材料分类-列表页-删除
export function delCategory(query) {
  return request({
    url: '/admin/classification/delclassification',
    method: 'post',
    data: query
  })
}
// 材料分类-分类管理-列表
export function getCategoryList(query) {
  return request({
    url: '/admin/classification/category/getcategorylist',
    method: 'get',
    params: query
  })
}
// 材料分类-分类管理-添加分类
export function addCategory(query) {
  return request({
    url: '/admin/classification/category/addcategory',
    method: 'post',
    data: query
  })
}
// 材料分类-分类管理-编辑分类
export function editCategory(query) {
  return request({
    url: '/admin/classification/category/editcategory',
    method: 'post',
    data: query
  })
}
// 材料分类-分类管理-获取分类信息
export function getCategory(query) {
  return request({
    url: '/admin/classification/category/getcategory',
    method: 'get',
    params: query
  })
}
// 材料分类-分类管理-删除分类
export function classifyDelCategory(query) {
  return request({
    url: '/admin/classification/category/delcategory',
    method: 'post',
    data: query
  })
}
// 后台用户查找
export function searchUser(query) {
  return request({
    url: '/admin/manager/search',
    method: 'get',
    params: query
  })
}