// pages/myorder/myorder.js
const app = getApp()
let apiUrl = app.getApiUrl();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myorderdata:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(app.globalData.token)
    wx.request({
      url: apiUrl + '/v1/myrenovation/getorderslist',
      header: {
        'content-type': 'application/json',
        'token': app.globalData.token
      },
      success: function (res) {
        console.log(res)
        that.setData({
          myorderdata: res.data.data.orderlist
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
  fenpeiorder:function(e){
    var dingdanhao=e.target.dataset.order;
    var tiaozhuan=e.target.dataset.comstate;
    if (tiaozhuan == 1){
      wx.navigateTo({
        // url: "../index/index?order_no=" + dingdanhao,
        url: "../index/index?order_no=" + '2018100986324003',
      })
    } else if (tiaozhuan == 2){
      wx.navigateTo({
        url: "../companyprogress/companyprogress?order_no=" + dingdanhao,
      })
    }


  }
})