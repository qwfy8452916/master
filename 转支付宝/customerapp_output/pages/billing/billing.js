const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    oprInvoiceSup: '',
    //检查酒店所属运营商是否支持开商品发票
    isInvoice: '' //酒店是否支持开房费发票

  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      isInvoice: options.isinvoice,
      oprInvoiceSup: options.oprinvoicesup
    });
  },
  billingfun: function () {
    //申请开票
    wx2my.navigateTo({
      url: '../billingapply/billingapply?isinvoice=' + this.data.isInvoice + '&oprinvoicesup=' + this.data.oprInvoiceSup
    });
  },
  billinglistfun: function () {
    //开票记录
    wx2my.navigateTo({
      url: '../billingrecord/billingrecord'
    });
  }
});