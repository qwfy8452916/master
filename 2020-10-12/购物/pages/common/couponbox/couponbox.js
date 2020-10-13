const app = getApp();
import wxrequest from '../../../request/api'
Component({
  properties: {
    couponlist: {
      type: Array,
      value: []
    },
    couponRange: {
      type: Number,
      value: ''
    }
  },
  data: {
    couponlist: [],
    expandClose: '',
    proddata: ''
  },
  attached(){
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction:"ease"
    })
  },
  methods: {
    closefun(){
      this.animation.bottom(-500).step();
      this.setData({
        expandClose: this.animation.export(),
        couponlist: []
      });
    },
    showlist(data){
      this.animation.bottom(0).step();
      this.setData({
        expandClose: this.animation.export(),
        proddata: data
      })
    },
    get_couponlist: function () {//获取优惠券列表
      wx.showLoading({
        title: '加载中',
      });
      const that = this;
      if(!that.data.proddata.prodOwnerOrgId) {
        that.data.proddata.prodOwnerOrgId = 0;
      }
      if(!that.data.proddata.funcProdId) {
        that.data.proddata.funcProdId = 0;
      }
      if(!that.data.proddata.hotelProdId) {
        that.data.proddata.hotelProdId = 0;
      }
      if(!that.data.proddata.id) {
        that.data.proddata.id = 0;
      }
      let linkData = {
        userId: app.globalData.userId,
        couponRange: that.properties.couponRange,
        hotelId: app.globalData.hotelId,
        prodOwnerOrgId: that.data.proddata.prodOwnerOrgId,
        funcProdId: that.data.proddata.funcProdId,
        hotelProdId: that.data.proddata.hotelProdId,
        roomResourceId: that.data.proddata.id,
        drawWay: 2
      };
      wxrequest.getcouponlist(linkData).then(res => {
        let resdata = res.data;
        if (resdata.code == 0) {
          let resdatas = res.data.data.map(item => {
            item.batchStartTime = item.batchStartTime.substring(0,10);
            item.batchEndTime = item.batchEndTime.substring(0,10);
            return item;
          });
          that.setData({
            couponlist: resdatas
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
        cusId: app.globalData.userId,
        drawWay: 2,//1：领取中心；2：详情页；3：列表页
        getWay: 1
      };
      wxrequest.postcoupon(linkData).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data;
        if (resdata.code == 0) {
          that.get_couponlist();
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
  }
})
