//app.js 线上
App({
  data: {},
  onLaunch: function (options) {},
  onShow: function (options) {
    var _this = this
    wx.getSystemInfo({
      success: function (res) {
        if (res.model.search('iPhone X') != -1 || res.model.search('iPhone XR') != -1 || res.model.search('iPhone XS Max') != -1 || res.model.search('iPhone 11') != -1 || res.model.search('iPhone 11 Pro') != -1) {
          _this.globalData.isIpx = true
        }
      }
    });
  },
  globalData: {
    // requestUrl: 'https://api.kefangbao.com.cn/longan/api/',//线上服务
    // requestUrl: 'http://172.16.200.137:9001/longan/api/',//137服务
    requestUrl: 'http://172.16.200.90:9001/longan/api/',//90测试服 
    // requestUrl: 'http://192.168.1.83:9001/longan/api/',//本地测试服
    userInfo: null,
    isIpx: false,
    num: 0,
    cabCode: '',
    cabId: '',
    userId: '',
    hotelId: '',
    shareUser: '',
    shareObj: '',
    shareObjectId: '',
    shareUserAvatarUrl: '../../../img/my-btnimg25.png',
    shareUserNickName: '',
    regbagact_type: 0,
    shareredbag_code: '',
    appId: 'wx_buy_app_id',
    appSecret: 'wx_buy_app_secret',
    appletType: 'BUY_APPLET',
    actlistdata: []
  }
})