import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const posList = []
const contrastList = []
const count = 5
const contrastCount = 50

const baseStr = 'banner'

for (let i = 0; i < count; i++) {
  posList.push(Mock.mock({
    id: '@increment',
    pos: '@ctitle(3, 6)' + baseStr
  }))
}
for (let i = 0; i < contrastCount; i++) {
  contrastList.push(Mock.mock({
    id: '@increment',
    name1: '@ctitle(3, 6)',
    people1: '@increment',
    name2: '@ctitle(3, 6)',
    people2: '@increment',
    creatorName: '@ctitle(2, 4)',
    commentNum: '@increment',
    likeNum: '@increment',
    release_time: '@datetime("yyyy-MM-dd")',
    'status|1': ['0', '1']
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

    let mockList = contrastList.filter(item => {
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
      total: contrastCount,
      data: pageList
    }
  }
}

