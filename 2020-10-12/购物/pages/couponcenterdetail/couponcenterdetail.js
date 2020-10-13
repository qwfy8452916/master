const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    detaildata: {},
    coupon_explain: '',
  },
  onLoad: function (options) {
    const that = this;
    that.get_detaildatafun(options.id);
  },
  get_detaildatafun(id){
    const that = this;
    wxrequest.getminecoupondetail(id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let listdata = resdatas.actCouponPartInDetailDTOS.map(item => {
          item.exstate = false;
          return item;
        });
        console.log(listdata);
        that.setData({
          detaildata: listdata
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
      hotelId: app.globalData.hotelId,
    };
    let id = e.currentTarget.dataset.id;
    let idx = e.currentTarget.dataset.idx;
    if(that.data.detaildata[idx].exstate){
      let couponl = that.data.detaildata;
      couponl[idx].exstate = false;
      that.setData({
        detaildata: couponl
      });
    }else{
      wxrequest.getcouponexplain(params, id).then(res => {
        let resdata = res.data;
        if (resdata.code == 0) {
          that.setData({
            coupon_explain: resdata.data
          });
          let coupon_l = that.data.detaildata;
          coupon_l[idx].exstate = true;
          that.setData({
            detaildata: coupon_l
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