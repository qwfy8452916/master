const app = getApp()
Page({
  data: {
    orderlist: []
  },
  onLoad: function (options) {
    let that = this;
    wx.request({
      // url: 'http://192.168.1.91:9001/longan/api/fin/invoice/customer',
      url: app.data.requestUrl + 'fin/invoice/customer',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      data: {
        customerId: options.customerId,
        hotelId: options.hotelId,
        orderId: options.orderId
      },
      method: "get",
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
})