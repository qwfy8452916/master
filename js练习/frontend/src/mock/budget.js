import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const versionList = []
const count = 10

for (let i = 0; i < count; i++) {
  versionList.push(Mock.mock({
    id: '@increment',
    'versionname|1': ['经济版', '舒适版', '品质版'],
    sort: '@increment'
  }))
}

export default {
  getList: config => {
    const { importance, type, title, page = 1, limit = 10, sort } = param2Obj(config.url)

    let mockList = versionList.filter(item => {
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
  }
}
