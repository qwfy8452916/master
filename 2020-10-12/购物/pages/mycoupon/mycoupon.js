const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    themecolor: '',
    indexnum: 0,//0：未使用；1：已使用；2：已过期
    coupon_list: [],//优惠券列表
    coupon_explain: '',   //优惠券说明
    cusId: '',
    hotelid: '',
    cabcode: '',
    createdByOrderId: 0,
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
      cabcode: app.globalData.cabCode,
      createdByOrderId: typeof(options.orderid)== 'undefined'? 0:options.orderid,
    });
    that.getcouponlist(app.globalData.userId, app.globalData.hotelId, app.globalData.cabCode, 0, that.data.createdByOrderId);
  },
  changetype: function (e) {//切换类型
    this.setData({
      indexnum: e.currentTarget.dataset.num
    });
    this.getcouponlist(this.data.cusId, this.data.hotelid, this.data.cabcode, e.currentTarget.dataset.num, this.data.createdByOrderId);
  },
  getcouponlist: function (cusId, hotelid, cabcode, couponState, createdByOrderId){//获取优惠券列表
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    let linkData = {
      cusId: cusId,
      couponState: couponState,
      hotelId: hotelid,
      cabCode: cabcode,
      createdByOrderId: createdByOrderId,
    };
    wxrequest.getcouponlist2(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data.map(item => {
        item.couponDiscount = parseFloat(item.couponDiscount/10).toFixed(1)
        item.exstate = false;
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