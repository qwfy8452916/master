// pages/shouquan/shouquan.js
const app = getApp()
let apiUrl = app.getApiUrl();
let token = app.globalData.token
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receive:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.sendid)
    this.setData({
      receive: options.sendid
    })
  },

  refuse:function(){
    wx.redirectTo({
      url: '../login/login',
    })
  },

  shouquanlogin: function (e) {
    let that = this;


    if (!e.detail.userInfo) {
      console.log("没有授权")
      console.log(that.data.receive)
      
        wx.redirectTo({
          url: '../login/login',
        })


    } else {
      console.log("授权了")
      if (that.data.receive == 'user'){
        wx.redirectTo({
          url: '../personalcenter/personalcenter',
        })
      }

      if (that.data.receive == 'login') {
        wx.redirectTo({
          url: '../login/login',
        })
      }
      app.getuserinfo(function (res) {
        console.log(res)
        // that.loginniu()

      })
    }
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