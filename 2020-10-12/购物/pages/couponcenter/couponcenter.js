const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    coupon_list: [],//优惠券列表
    coupon_explain: '',   //优惠券说明
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
  get_couponlist: function (userId, hotelid) {//获取优惠券列表
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    let linkData = {
      categoryIds: '',
      userId: userId,
      drawWay: 1,//1：领取中心，2：详情页，3：列表页
      funcId: '',
      funcProdId: '',
      hotelId: hotelid,
      hotelProdId: '',
      sceneCode: ''
    };
    wxrequest.getcouponlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data.map(item => {
        item.batchStartTime = item.batchStartTime.substring(0,10);
        item.batchEndTime = item.batchEndTime.substring(0,10);
        return item;
      });
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
      wx.hideLoading();
      console.log(err)
    });
  },
  receive: function (e) {//领取优惠券
    const that = this;
    let linkData = {
      batchId: e.currentTarget.dataset.id,
      cusId: that.data.userId,
      drawWay: 1,//1：领取中心；2：详情页；3：列表页
      getWay: 1
    };
    wxrequest.postcoupon(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.get_couponlist(that.data.userId, that.data.hotelid);
        wx.showToast({
          title: '领取成功',
          icon: 'success',
          duration: 2000
        });
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
  //查看使用说明
  lookexplain(e){
    const that = this;
    let params = {
      hotelId: this.data.hotelid,
    };
    let id = e.currentTarget.dataset.id;
    let idx = e.currentTarget.dataset.idx;
    if(that.data.coupon_list[idx].exstate){
      let couponl = that.data.coupon_list;
      couponl[idx].exstate = false;
      that.setData({
        coupon_list: couponl
      });
    }else{
      wxrequest.getcouponexplain(params, id).then(res => {
        let resdata = res.data;
        if (resdata.code == 0) {
          that.setData({
            coupon_explain: resdata.data
          });
          let coupon_l = that.data.coupon_list;
          // let coupon_l = that.data.coupon_list.map(item => {
          //   item.exstate = false;
          //   return item;
          // });
          coupon_l[idx].exstate = true;
          that.setData({
            coupon_list: coupon_l
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
    }
  },
})