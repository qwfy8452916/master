import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const typeList = []
const systemList = []
const count = 5
const upgradeCount = 50

for (let i = 0; i < count; i++) {
  typeList.push(Mock.mock({
    id: '@increment',
    value: '@ctitle(3, 10)'
  }))
}

for (let i = 0; i < upgradeCount; i++) {
  systemList.push(Mock.mock({
    id: '@increment',
    system: '@title(1)',
    version: 'v' + '@natural(0,1)' + '.' + '@natural(0,1)' + '.' + '@natural(0,1)',
    link: '@url("http ")',
    'isCoerce|1': ['是', '否'],
    content: '@csentence()',
    time: '@datetime("yyyy-MM-dd")',
    'isRubbish|1': [true, false]
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

    let mockList = systemList.filter(item => {
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
      total: upgradeCount,
      data: pageList
    }
  }
}
