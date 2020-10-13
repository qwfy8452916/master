const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    listdata: [],
  },
  onLoad: function (options) {
    const that = this;
    that.get_listdata();
  },
  get_listdata(){
    const that = this;
    wx.showLoading({
      title: '加载中'
    })
    wxrequest.getminecouponlist().then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          listdata: resdatas
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
  detailfun(e){
    wx.navigateTo({
      url: '../couponcenterdetail/couponcenterdetail?id=' + e.currentTarget.dataset.id
    })
  }
})