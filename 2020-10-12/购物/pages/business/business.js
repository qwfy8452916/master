const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    global_Data: ''
  },
  onLoad: function (options) {
    this.setData({
      global_Data: app.globalData
    })
  },
  tel: function () {
    wx.makePhoneCall({
      phoneNumber: '18912773939'
    })
  }
})