const app = getApp()
Page({
  data: {
    urldata: ''
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      urldata: options.url
    });
  }
})