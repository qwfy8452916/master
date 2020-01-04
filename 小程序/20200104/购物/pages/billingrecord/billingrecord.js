const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    hotelId: '',
    customerId: '',
    billinglist: []
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    that.setData({
      hotelId: app.globalData.hotelId,
      customerId: app.globalData.userId
    });
    that.get_billingrecord();
  },
  get_billingrecord: function () {//获取开票记录
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
        })
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
  detail: function (e) {//查看详情
    wx.navigateTo({
      url: '../billingdetail/billingdetail?id=' + e.currentTarget.dataset.id + '&invtype=' + e.currentTarget.dataset.invtype
    })
  }
})