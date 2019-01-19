import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const posList = []
const coverList = []
const count = 5
const adCount = 50

for (let i = 0; i < count; i++) {
  posList.push(Mock.mock({
    id: '@increment',
    pos: '@ctitle(3, 6)'
  }))
}
for (let i = 0; i < adCount; i++) {
  coverList.push(Mock.mock({
    id: '@increment',
    pos: '@ctitle(3, 6)',
    title: '@ctitle(10, 20)',
    thumb: '@image("200x100")',
    theme: '@ctitle(12, 25)',
    desc: '@ctitle(25, 45)'
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

    let mockList = coverList.filter(item => {
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
