const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    themecolor: '',
    indexnum: 0,//0：未使用；1：已使用；2：已过期
    coupon_list: [],//优惠券列表
    cusId: '',
    hotelid: '',
    cabcode: ''
  },
  onLoad: function (options) {
    const that = this;
    wx.getStorage({
      key: 'themecolor',
      success(res) {
        that.setData({
          themecolor: res.data
        })
      }
    });
    that.setData({
      cusId: app.globalData.userId,
      hotelid: app.globalData.hotelId,
      cabcode: app.globalData.cabCode
    });
    that.getcouponlist(app.globalData.userId, app.globalData.hotelId, app.globalData.cabCode, 0);
  },
  changetype: function (e) {//切换类型
    this.setData({
      indexnum: e.currentTarget.dataset.num
    });
    this.getcouponlist(this.data.cusId, this.data.hotelid, this.data.cabcode, e.currentTarget.dataset.num);
  },
  getcouponlist: function (cusId, hotelid, cabcode, couponState){//获取优惠券列表
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    let linkData = {
      cusId: cusId,
      couponState: couponState,
      hotelId: hotelid,
      cabCode: cabcode
    };
    wxrequest.getcouponlist2(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          coupon_list: resdatas
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
  }
})