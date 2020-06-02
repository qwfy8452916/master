const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    customerId: '',
    livedlist: []
  },
  onLoad: function (options) {
    const that = this;
    wx2my.showLoading({
      title: '加载中'
    });
    that.setData({
      customerId: app.globalData.userId
    });
    let linkData = {
      customerId: app.globalData.userId
    };
    wxrequest.getlicedhotel(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          livedlist: resdatas
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
  reservation: function (e) {
    //客房协议价
    const that = this;
    const list = [];
    wx2my.setStorage({
      key: 'rmsvcImageDTOs',
      data: list
    });
    wx2my.reLaunch({
      url: '../reservation/reservation'
    });
  }
});