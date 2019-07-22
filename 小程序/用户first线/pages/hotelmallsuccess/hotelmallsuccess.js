const app = getApp()
Page({
  data: {
    commoditylist: [],
    orderid: ''//订单id
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      orderid: options.orderid
    })
    wx.getStorage({
      key: 'hotelId',
      success: function(res) {
        wx.request({
          url: app.data.requestUrl + 'hotel/product/hshop/product',
          header: {
            'content-type': 'application/json', // 默认值
            'Authorization': wx.getStorageSync("token")
          },
          data: {
            hotelId: res.data
          },
          method: "get",
          success(res) {
            let resdata = res.data;
            if (resdata.code == 0) {
              that.setData({
                commoditylist: resdata.data
              })
            }
          }
        })
      },
    })
  },
  backfun: function(){//返回列表页
    wx.redirectTo({
      url: '../hotelmall/hotelmall'
    })
  },
  details: function (e) {//商品详情
    wx.navigateTo({
      url: '../hotelmalldetails/hotelmalldetails?hotelProdId=' + e.currentTarget.dataset.hotelprodid
    })
  },
  orderdetails: function(){//订单详情
    wx.navigateTo({
      url: '../hotelmallorderdetails/hotelmallorderdetails?orderid=' + this.data.orderid
    })
  }
})