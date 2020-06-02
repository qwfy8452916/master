const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    hotelId: '',
    customerId: '',
    billinglist: []
  },
  onLoad: function (options) {
    wx2my.showLoading({
      title: '加载中'
    });
    const that = this;
    that.setData({
      hotelId: app.globalData.hotelId,
      customerId: app.globalData.userId
    });
    that.get_billingrecord();
  },
  get_billingrecord: function () {
    //获取开票记录
    const that = this;
    let linkData = {
      hotelId: app.globalData.hotelId,
      customerId: app.globalData.userId
    };
    wxrequest.getbillingrecord(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          billinglist: resdatas
        });
        wx2my.hideLoading();
      } else {
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  },
  detail: function (e) {
    //查看详情
    wx2my.navigateTo({
      url: '../billingdetail/billingdetail?id=' + e.currentTarget.dataset.id + '&invtype=' + e.currentTarget.dataset.invtype
    });
  }
});