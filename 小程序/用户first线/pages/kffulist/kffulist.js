const app = getApp()
Page({
  data: {
    themecolor: '',//主题颜色
    userid: '',
    hotelId: '',
    orderlist: []
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      hotelId: options.hotelId,
      userid: options.userid
    })
    wx.getStorage({
      key: 'themecolor',
      success(res) {
        that.setData({
          themecolor: res.data
        })
      }
    });
    wx.request({
      url: app.data.requestUrl + 'rmsvc/records/customer',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "get",
      data: {
        customerId: options.userid,
        hotelId: options.hotelId
      },
      success(res) {
        let resdata = res.data;
        let resdatas = res.data.data;
        if (resdata.code == '0') {
          that.setData({
            orderlist: resdatas
          })
        };
      }
    });
  },
  smgw: function () {
    wx.redirectTo({
      url: '../orderlist/orderlist'
    })
  },
  detials: function(e){
    wx.navigateTo({
      url: '../orderdetails/orderdetails?serviceid=' + e.currentTarget.dataset.id + '&type=1'
    })
  },
  mhotelmall: function () {
    wx.redirectTo({
      url: '../mhotelmall/mhotelmall?typeindex=all&hotelId=' + this.data.hotelId + '&userid=' + this.data.userid
    })
  }
})