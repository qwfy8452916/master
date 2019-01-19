import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const typeList = []
let topicList = []
const count = 5
const topicCount = 50

for (let i = 0; i < count; i++) {
  typeList.push(Mock.mock({
    id: '@increment',
    value: '@ctitle(3, 6)'
  }))
}

for (let i = 0; i < topicCount; i++) {
  topicList.push(Mock.mock({
    id: '@increment',
    title: '@ctitle(3,5)',
    creater: '@ctitle(2, 6)',
    viewNum: '@natural(0,100)',
    discussNum: '@natural(0,100)',
    loveNum: '@natural(0,100)',
    releaseTime: '@datetime("yyyy-MM-dd")',
    'status|1': [0, 1],
  }))
}
export default {
  pos: () => {
    return {
      total: typeList.length,
      data: typeList
    }
  },
  getList: config => {
    const { importance, type, title, page = 1, limit = 10, sort } = param2Obj(config.url)

    let mockList = topicList.filter(item => {
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
      total: topicCount,
      data: pageList
    }
  }
}
