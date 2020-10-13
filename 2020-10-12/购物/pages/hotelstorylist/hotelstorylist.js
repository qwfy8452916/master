const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    hotelId: '',
    detailtype: false,
    storylist: [],//故事列表
    detailinfo: []//故事详情
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    const that = this;
    that.setData({
      hotelId: app.globalData.hotelId
    });
    that.get_hotelstorylist();
  },
  get_hotelstorylist: function () {
    const that = this;
    let linkData = {
      hotelId: app.globalData.hotelId
    };
    wxrequest.gethotelstorylist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          storylist: resdatas
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
    });
  },
  detailfun: function (e) {//查看详情
    const that = this;
    wxrequest.gethotelstorydetail(e.currentTarget.dataset.id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          detailinfo: resdatas,
          detailtype: true
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
    });
  },
  closefun: function () {//关闭详情弹窗
    this.setData({
      detailtype: false
    })
  },
  move: function () {}
})