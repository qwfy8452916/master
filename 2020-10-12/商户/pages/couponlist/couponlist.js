const app = getApp();
import wxrequest from '../../utils/api'
app.Base({
  data: {
    authzData: {}, //功能权限
    batchData: [],
    coupon_explain: '',
  },
  onLoad: function (options) {
    const that = this;
    this.setData({
      authzData: wx.getStorageSync("pageAuthority"),
    })
    that.get_CouponBatch();
  },
  get_CouponBatch () {
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    wxrequest.getsendCouponBatch().then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let batchData_list1 = that.data.batchData;
        const batchData_list2 = that.data.batchData;
        let records = resdatas.records.map(item => {
          item.couponDiscount = parseFloat(item.couponDiscount/10).toFixed(1)
          item.exstate = false;
          return item;
        });
        if (batchData_list2.length == 0) {
          batchData_list1 = records;
        } else {
          batchData_list1 = batchData_list2.concat(records);
        }
        that.setData({
          batchData: batchData_list1
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
  lookexplain(e){//查看使用说明
    const that = this;
    let id = e.currentTarget.dataset.id;
    let idx = e.currentTarget.dataset.idx;
    let params = {
      hotelId: app.globalData.hotelId,
    };
    wxrequest.getcouponexplain(params, id).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        that.setData({
          coupon_explain: resdata.data
        });
        let coupon_l = that.data.batchData.map(item => {
            item.exstate = false;
          return item;
        });
        coupon_l[idx].exstate = true;
        that.setData({
          batchData: coupon_l
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
  sendfun(){
    wx.showToast({
      title: '暂未开放,敬请期待',
      icon: 'none',
      duration: 2000
    })
  },
  sendlistfun(){
    wx.navigateTo({
      url: '../sendlist/sendlist',
    })
  }
})