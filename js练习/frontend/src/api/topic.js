import request from '@/utils/request'


// 话题列表
export function fetchTopicList(query) {
  return request({
    url: 'admin/topic/list',
    method: 'get',
    params: query
  })
}

// 新建话题
export function fetchAddTopic(query) {
  return request({
    url: 'admin/topic/add',
    method: 'post',
    data: query
  })
}
// 编辑话题数据显示
export function fetchEidtTopicShow(query) {
  return request({
    url: 'admin/topic/edit',
    method: 'get',
    params: query
  })
}
// 编辑话题
export function fetchEidtTopic(query) {
  return request({
    url: 'admin/topic/edit/do',
    method: 'post',
    data: query
  })
}
// 置顶/取消置顶
export function fetchTopTopic(query) {
  return request({
    url: 'admin/topic/top',
    method: 'post',
    data: query
  })
}
// 移入移除
export function fetchSwitchTopic(query) {
  return request({
    url: 'admin/topic/switch',
    method: 'post',
    data: query
  })
}
// 图片上传
export function fetchUploadImg(query) {
  return request({
    url: 'admin/topic/img',
    method: 'post',
    data: query
  })
}

export function fetchStatistic(query) {
  return request({
    url: 'admin/topic/statistic',
    method: 'get',
    params: query
  })
}

export function fetchDrop(query) {
  return request({
    url: 'admin/topic/drop',
    method: 'post',
    data: query
  })
}
export function fetchId(query) {
  return request({
    url: 'admin/manager/search',
    method: 'get',
    params: query
  })
}
