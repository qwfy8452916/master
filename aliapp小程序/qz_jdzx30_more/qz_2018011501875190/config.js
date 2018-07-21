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
        appid: '2018011501875190', //① 修改appid
        xcxtitle: '装修公司排名',
        jubuGonglueType: '',
        jubuxgtType: '9',
        jubusyxgtpx: 'c,i,a,b,h,t,e',
        sourceMark: 'lljs-zfb-xcx'
    }
};
//console.log(config);

module.exports = config;