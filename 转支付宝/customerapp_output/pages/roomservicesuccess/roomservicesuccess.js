const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    commoditylist: [],
    serviceid: ''
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      serviceid: options.serviceid
    });
  },
  backbtn: function () {
    wx2my.reLaunch({
      url: '../index/index'
    });
  },
  lookdetails: function () {
    wx2my.navigateTo({
      url: '../orderdetails/orderdetails?serviceid=' + this.data.serviceid
    });
  }
});