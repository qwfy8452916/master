// pages/openfail/openfail.js
Page({
  data: {
    hotelContactsMobile: '0512-12345678',
  },
  backbtn: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  tel: function () {
    let that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.hotelContactsMobile
    })
  },
})