// pages/shareTotal/shareTotal.js
const app = getApp()
let apiUrl = app.globalData.requestUrl;
let token = app.globalData.token
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
    authzData: {}, //功能权限
    shareData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      authzData: wx.getStorageSync("pageAuthority"),
    })
    
    var hotelId = wx.getStorageSync('hotelId')
    var userId = wx.getStorageSync('empId')
    let that = this
    wx.request({
      url: apiUrl + `mktg/team/user/${hotelId}/1/${userId}`,
      data: {},
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          res.data.data.shareDataTotal = (res.data.data.shareManageBonus+res.data.data.shareBonus).toFixed(2)
          that.setData({
            shareData: res.data.data
          })
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