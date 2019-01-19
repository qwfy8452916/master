import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const userList = []
const count = 50
const feedBackList = []
const feedbackCount = 50

for (let i = 0; i < count; i++) {
  userList.push(Mock.mock({
    id: '@increment',
    user: '@cname',
    uid: '@integer(100,10000)',
    address: '@province' + '@city' + '@county',
    'gender|1': ['男', '女'],
    'itag|1': ['用户', '管理员'],
    phone: '@integer(100)',
    articlesize: '@integer(1, 500)',
    collectsize: '@integer(1, 600)',
    discusssize: '@integer(1, 800)',
    'status|1': ['0', '1'],
    regtime: '@datetime'
  }))
}

for (let i = 0; i < feedbackCount; i++) {
  feedBackList.push(Mock.mock({
    id: '@increment',
    uid: '@integer(100,10000)',
    content: '@ctitle(20,50)',
    phone: '@integer(100)',
    time: '@datetime("yyyy-MM-dd")'
  }))
}

export default {
  getList: config => {
    const { importance, type, title, page = 1, limit = 10, sort } = param2Obj(config.url)

    let mockList = userList.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: count,
      data: pageList
    }
  },
  getFeedbacks: config => {
    const { importance, type, title, page = 1, limit = 10, sort } = param2Obj(config.url)

    let mockList = feedBackList.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: feedbackCount,
      data: pageList
    }
  }
}
