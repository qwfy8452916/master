//app.js 线上
App({
  data: {},
  onLaunch: function (options) {
    var wxUpgrade = require("./upGrade/upGrade")
    wxUpgrade.getGolabalData(this.globalData.updataObj)
    wxUpgrade.autoUpdate();
  },
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
    requestUrl: 'http://122.51.200.225/longan/api/',//90测试服
    // requestUrl: 'http://192.168.1.121:9010/longan/api/',//本地测试服
    QRurllink: '',
    token: '',
    userInfo: '',
    isIpx: false,
    num: 0,
    addressinfo: '',
    hotelLongitude: '',
    hotelLatitude: '',
    cabCode: '',
    code: '',
    cabId: '',
    userId: '',
    commonId: '',
    hotelId: '',
    hotelInfo: '',
    shareUser: '',
    sharecode: '',
    shareObj: '',
    shareObjectId: '',
    shareUserAvatarUrl: '../../../img/my-btnimg25.png',
    shareUserNickName: '',
    regbagact_type: 0,
    shareStyle: '',
    shareredbag_code: '',
    mpCode: 'MP_CUST_HOTEL',
    appId: '',
    appSecret: '',
    appletType: '',
    actlistdata: [],
    updataObj:{
      ifForce: true
    },
    redPacketShowFlag: 0,
    spotpurchaseflag: '',
    shareFlag: '',
    employee: '',
    points: [],//自提点
    enterStyle: '',//1-默认,2-分享
    funcIdval: '',
    funcids: [],
    adtype: 1,
    imgurldata: '',
    settleShareCode: '',
    visitRecordId: '',
    isshowicon: true,
    businessCode: '',
    userInfodata: '',
    authFlag: '',//是否已认证（信息、手机号）
    memberLevel: '',//是否是会员
    authFlagMobile: '',//是否已认证手机号
    bindAreaFlag: '',//0：无绑定  1：房间  2：餐桌  3：定点
    isclearfooddata: 0,
    jumpurl: '',
    categoryId: '',
    lastActIds: [2],
    linkUrl: '',
    FuncListVal: '',
    isDefault: '',
    typeval: 0
  }
})