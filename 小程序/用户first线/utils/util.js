const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const formatDateend = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate() + 2
  return [year, month, day].map(formatNumber).join('-')
}

function regexConfig() {
  var reg = {
    userid: /^[A-Za-z0-9]+$/,  //邮箱正则验证
    user_tel: /^1(3|4|5|7|8)\d{9}$/,  //手机号正则验证
    user_name: /^[\u4e00-\u9fa5]$/  //姓名汉字正则验证
  }
  return reg;
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatDateend: formatDateend,
  regexConfig: regexConfig
}

