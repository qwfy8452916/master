import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const typeList = []
const articleList = []
const count = 5
const examineCount = 50

for (let i = 0; i < count; i++) {
  typeList.push(Mock.mock({
    id: '@increment',
    value: '@ctitle(3, 6)'
  }))
}

for (let i = 0; i < examineCount; i++) {
  articleList.push(Mock.mock({
    id: '@increment',
    title: '@ctitle(3,5)',
    classify: '@ctitle(2, 6)',
    creater: '@ctitle(2, 6)',
    label: '@ctitle(2, 6)',
    readerNum: '@natural(0,100)',
    discussNum: '@natural(0,100)',
    collectNum: '@natural(0,100)',
    loveNum: '@natural(0,100)',
    mobile: /^1[0-9]{10}$/,
    'images|1-5': {
      img_1: '@image(\'300x250\')',
      img_2: '@image(\'300x250\')',
      img_3: '@image(\'300x250\')'
    },
    commitDate: '@datetime("yyyy-MM-dd")',
    'status|1': [true, false],
    status: '@natural(1,3)',
    result: '@cparagraph'
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

    let mockList = articleList.filter(item => {
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
      total: examineCount,
      data: pageList
    }
  }
}
