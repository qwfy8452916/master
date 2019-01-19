import request from '@/utils/request'

export function fetchMaterialBillPos() {
  return request({
    url: '/materialBill/pos',
    method: 'get'
  })
}
// 材料品牌-列表页-列表
export function fetchMaterialBillList(query) {
  return request({
    url: '/admin/brands/getbrandlist',
    method: 'get',
    params: query
  })
}

// 材料品牌-榜单管理-获取品牌
export function fetchGetBrand(query) {
  return request({
    url: '/admin/brands/getbrandinfo',
    method: 'get',
    params: query
  })
}
// 材料品牌-榜单管理-添加品牌
export function fetchAddBrand(query) {
  return request({
    url: '/admin/brands/addbrand',
    method: 'post',
    data: query
  })
}
// 材料品牌-榜单管理-编辑品牌
export function fetchEditBrand(query) {
  return request({
    url: '/admin/brands/editbrand',
    method: 'post',
    data: query
  })
}
// 材料品牌-列表页-移至垃圾箱
export function fetchMoveTrash(query) {
  return request({
    url: '/admin/brands/movetrash',
    method: 'post',
    data: query
  })
}
// 材料品牌-列表页-恢复品牌
export function fetchResetBrand(query) {
  return request({
    url: '/admin/brands/resetbrand',
    method: 'post',
    data: query
  })
}
// 材料品牌-列表页-删除品牌
export function fetchDelBrand(query) {
  return request({
    url: '/admin/brands/delbrand',
    method: 'post',
    data: query
  })
}
// 材料品牌-分类管理-列表
export function fetchBrandClassifyList(query) {
  return request({
    url: '/admin/brands/category/getcategorylist',
    method: 'get',
    params: query
  })
}
// 材料品牌-分类管理-添加分类
export function fetchAddCategory(query) {
  return request({
    url: '/admin/brands/category/addcategory',
    method: 'post',
    data: query
  })
}
// 材料品牌-分类管理-编辑分类
export function fetchEditCategory(query) {
  return request({
    url: '/admin/brands/category/editcategory',
    method: 'post',
    data: query
  })
}
// 材料品牌-分类管理-删除分类
export function fetchDelCategory(query) {
  return request({
    url: '/admin/brands/category/delcategory',
    method: 'post',
    data: query
  })
}
// 材料品牌-分类管理-获取分类
export function fetchGetCategory(query) {
  return request({
    url: '/admin/brands/category/getcategory',
    method: 'get',
    params: query
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