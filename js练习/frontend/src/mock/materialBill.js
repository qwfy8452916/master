import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const posList = []
const materialBillList = []
const count = 10
const materialBillCount = 100

const baseStr = 'banner'

for (let i = 0; i < count; i++) {
  posList.push(Mock.mock({
    id: '@increment',
    pos: '@ctitle(3, 6)' + baseStr
  }))
}
for (let i = 0; i < materialBillCount; i++) {
    materialBillList.push(Mock.mock({
    id: '@increment',
    ctitle: '@ctitle(3, 10)',
    creatorName: '@ctitle(2, 4)',
    commentNum: '@integer(1, 100)',
    likeNum: '@integer(1, 1000)',
    collectNum: '@integer(1, 1000)',
    release_time: '@datetime("yyyy-MM-dd")',
    sortValue: '@integer(1, 10)'
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

    let mockList = materialBillList.filter(item => {
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
      total: materialBillCount,
      data: pageList
    }
  }
}

