// pages/news/news.js
const app = getApp()
let apiUrl = app.getApiUrl();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsdata:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    // console.log(app.globalData.token)

    wx.request({
      url: apiUrl + '/v1/user/newslist',
      header: {
        'content-type': 'application/json',
        'token': app.globalData.token
        
      },
      success: function (res) {
        console.log(res)
        that.setData({
          newsdata:res.data.data.list,
        })
      }
      
    });

    
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

  },
  xiangqing:function(){
    wx.navigateTo({
      url: '../companyprogress/companyprogress'
    })

  }
})