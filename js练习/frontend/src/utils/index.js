/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') { return ['一', '二', '三', '四', '五', '六', '日'][value - 1] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}
// 过滤特殊字符
export function filterSpecialSymbal(val) {
  if (!val) {
    return
  }
  val = String(val)
  const lastV = val.substring(val.length - 1, val.length)
  const pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%&*（）\-+={}|《》？：“”【】、；‘’，。、]/im
  const pattern1 = /[……——]/im
  if (pattern.test(lastV)) {
    return val.slice(0, val.length - 1)
  }
  if (pattern1.test(lastV)) {
    return val.slice(0, val.length - 2)
  }
  return val.replace(/\s+/g, '')
}

// 过滤空格
export function filterSpaceSymbal(val) {
  return val.replace(/\s+/g, '')
}

// 检测纯数字/纯字母/纯特殊符号
export function checkPureSymbal(val) {
  const reg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%\^&*+-_,.?''""~`{}[\](\){\}:;/]{6,24}/
  return reg.test(val)
}

// 过滤预算版本中有价格的数据并存入数组中
export function filterCateDetail(data) {
  if (!Array.isArray(data)) {
    return
  }
  let cateDetail = []
  function loopFilter(data) {
    data.forEach(item => {
      if (item.children) {
        loopFilter(item.children)
      } else {
        if (item.version_price) {
          cateDetail.push({
            cate_id: item.id,
            version_price: item.version_price
          })
        }
      }
    })
  }
  loopFilter(data)
  return cateDetail
}
