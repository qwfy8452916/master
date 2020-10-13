const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    operatorImageList: []
  },
  onLoad: function (options) {
    const that = this;
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.getadvertiselist().then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          operatorImageList: resdatas
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
      wx.hideLoading();
      console.log(err)
    })
  },
  onShow: function () {
    wx.hideHomeButton();
  }
})