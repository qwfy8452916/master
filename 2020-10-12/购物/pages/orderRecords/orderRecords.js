// pages/shareRecords/shareRecords.js
const app = getApp()
let apiUrl = app.globalData.requestUrl
function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      } else if (res) { }
    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareData:[],
    ifshow: false,
    shareId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shareCode = options.shareCode
    var shareId = options.shareId
    this.setData({
      shareId
    })
    let that = this
    wx.request({
      url: apiUrl + `mktg/share/order/record/${shareCode}`,
      data: {},
      header: {
        'content-type': 'application/json',
        'Authorization': app.globalData.token
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            shareData: res.data.data
          })
          if(!res.data.data.length){
            that.setData({
              ifshow: true
            })
          }
        } else {
          wx.hideLoading()
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        wx.hideLoading()
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})