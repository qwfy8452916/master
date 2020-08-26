//app.js 线上
import {originPage} from './utils/originPage.js'
App({
  data: {},
  onLaunch: function (options) {
    var wxUpgrade = require("./utils/upGrade")
    wxUpgrade.getGolabalData(this.globalData.updataObj)
    wxUpgrade.autoUpdate();
  },
  onShow: function (options) {},
  Base:originPage,
  globalData: {
    // requestUrl: 'https://api.kefangbao.com.cn/longan/api/',//线上服务
    requestUrl: 'http://122.51.200.225/longan/api/',//90测试服
    // requestUrl: 'http://192.168.1.89:9001/longan/api/',//本地测试服
    // requestUrl: 'http://192.168.1.83:9001/longan/api/',//本地测试服
    token: '',
    mpCode: 'MP_CUST_HOTEL',
    userInfo: null,
    imgUrl: 'cloud://mphotel-anqp1.6d70-mphotel-anqp1-1302101816/',
    userName: '',
    empId: '', 
    userId: '',
    toKen: '',
    hotelId: '',
    subRespBeanList: '',
    empDTO: '',
    orgDTO: '',
    orgAs: '',
    oprDTO: '',
    hotelDTO: '',
    merchantDTO: '',
    allyDTO: '',
    empIsBind: '',
    permCodes: '',
    tabAuthority:{},
    pageAuthority:{},
  }
})