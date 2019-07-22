const app = getApp()
Page({
  data: {
    autoplay: true,
    circular: true,
    interval: 3500,
    duration: 500,
    detials: []
  },
  onLoad: function (options) {
    let that = this;
    wx.request({
      // url: 'http://192.168.1.46:9001/longan/api/hotel/feature/detail',
      url: app.data.requestUrl + 'hotel/feature/detail',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "get",
      data: {
        featureHotelId: options.typeid,
        id: options.detialid
      },
      success(res) {
        if (res.data.code == 0) {
          that.setData({
            detials: res.data.data.records
          });
        }
      }
    });
  },
})