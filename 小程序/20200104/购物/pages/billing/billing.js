const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    isInvoice: ''//酒店是否支持开房费发票
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      isInvoice: options.isinvoice
    });
  },
  billingfun: function () {//申请开票
    wx.navigateTo({
      url: '../billingapply/billingapply?isinvoice=' + this.data.isInvoice
    })
  },
  billinglistfun: function () {//开票记录
    wx.navigateTo({
      url: '../billingrecord/billingrecord'
    })
  }
})