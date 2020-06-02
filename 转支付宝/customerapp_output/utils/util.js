const wx2my = require('../wx2my');
const Behavior = require('../Behavior');
const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

const formatDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(formatNumber).join('-');
};

const formatcurrenttime = date => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [hour, minute].map(formatNumber).join(':');
};

const formatDateend = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate() + 2;
  return [year, month, day].map(formatNumber).join('-');
};

function regexConfig() {
  var reg = {
    userid: /^[A-Za-z0-9]+$/,
    //邮箱正则验证
    user_tel: /^1(3|4|5|7|8)\d{9}$/,
    //手机号正则验证
    user_name: /^[\u4e00-\u9fa5]$/ //姓名汉字正则验证

  };
  return reg;
} //todate默认参数是当前日期，可以传入对应时间 todate格式为2018-10-05


function getDates(days, todate) {
  var dateArry = [];

  for (var i = 0; i < days; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj);
  }

  return dateArry;
}

function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  let yearDate = date.getFullYear();
  let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  let dayFormate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  dateObj.time = yearDate + '-' + month + '-' + dayFormate;
  dateObj.week = show_day[day];
  return dateObj;
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatDateend: formatDateend,
  regexConfig: regexConfig,
  formatcurrenttime: formatcurrenttime,
  getDates: getDates
};