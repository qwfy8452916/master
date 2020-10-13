const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    commoditylist: [],
    serviceid: '',
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      serviceid: options.serviceid,
    });
  },
  backbtn: function () {
    wx.reLaunch({
      url: '../index/index'
    })
  },
  lookdetails: function(){
    wx.navigateTo({
      url: '../orderdetails/orderdetails?serviceid=' + this.data.serviceid
    })
  },
})