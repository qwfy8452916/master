const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    customerId: '',
    livedlist: []
  },
  onLoad: function (options) {
    const that = this;
    wx.showLoading({
      title: '加载中',
    })
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
        wx.hideLoading();
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      console.log(err)
    });
  },
  reservation: function (e) {//客房协议价
    const that = this;
    const list = [];
    wx.setStorage({
      key: 'rmsvcImageDTOs',
      data: list
    });

    wx.redirectTo({
      url: '../reservation/reservation'
    })
  },
})