/**
 * 小程序配置文件
 */

// API接口
var host_api = 'http://appapi.qizuang.com';
var host_img = 'http://staticqns.qizuang.com/';

var config = {
  service: {
    host_api: host_api,
    host_img: host_img,
    appid: '2018011501875395', //① 修改appid
    sourceMark: 'lljs-zfb-xcx', //渠道
    xcxtitle: '简单装修',
    jubuGonglueType: 'weiyu',
    jubuxgtType: '8',
    jubusyxgtpx: 'i,a,b,h,c,t,e'
  }
};


module.exports = config;