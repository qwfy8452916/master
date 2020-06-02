const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    coupon_list: [],
    //优惠券列表
    userId: '',
    hotelid: ''
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      userId: app.globalData.userId,
      hotelid: app.globalData.hotelId
    });
    that.get_couponlist(app.globalData.userId, app.globalData.hotelId);
  },
  get_couponlist: function (userId, hotelid) {
    //获取优惠券列表
    wx2my.showLoading({
      title: '加载中'
    });
    const that = this;
    let linkData = {
      categoryIds: '',
      userId: userId,
      drawWay: 1,
      //1：领取中心，2：详情页，3：列表页
      funcId: '',
      funcProdId: '',
      hotelId: hotelid,
      hotelProdId: '',
      sceneCode: ''
    };
    wxrequest.getcouponlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          coupon_list: resdatas
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
  receive: function (e) {
    //领取优惠券
    const that = this;
    let linkData = {
      batchId: e.currentTarget.dataset.id,
      cusId: that.data.userId,
      drawWay: 1,
      //1：领取中心；2：详情页；3：列表页
      getWay: 1
    };
    wxrequest.postcoupon(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.get_couponlist(that.data.userId, that.data.hotelid);
        wx2my.showToast({
          title: '领取成功',
          icon: 'success',
          duration: 2000
        });
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
  }
});