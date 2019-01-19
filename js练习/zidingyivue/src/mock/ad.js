import Mock from 'mockjs'
import { param2Obj } from '@/untils'

const posList = []
const adList = []
const count = 5
const adCount = 50

const baseStr = 'banner'

for (let i = 0; i < count; i++) {
  posList.push(Mock.mock({
    id: '@increment',
    pos: '@ctitle(3, 6)' + baseStr
  }))
}
for (let i = 0; i < adCount; i++) {
  adList.push(Mock.mock({
    id: '@increment',
    pos: '@ctitle(3, 6)' + baseStr,
    thumb: '@image("200x100")',
    theme: '@ctitle(12, 25)',
    startTime: '@datetime("yyyy-MM-dd")',
    endTime: '@datetime("yyyy-MM-dd")',
    'status|1': ['0', '1'],
    sort: '@integer(1, 3)'
  }))
}

export default {
  pos: () => {
    return {
      total: posList.length,
      data: posList
    }
  },
  getList: config => {
    const { importance, type, title, page = 1, limit = 10, sort } = param2Obj(config.url)

    let mockList = adList.filter(item => {
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
      total: adCount,
      data: pageList
    }
  }
}
