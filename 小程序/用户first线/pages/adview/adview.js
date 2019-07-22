
Page({
  data: {
    operatorImageList: []
  },
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'operatorImageList',
      success: function(res) {
        that.setData({
          operatorImageList: res.data
        })
      },
    })
  }
})