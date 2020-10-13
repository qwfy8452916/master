// pages/couponManage/couponManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      authzData: wx.getStorageSync("pageAuthority"),
    })

  },

  //优惠券批次
  couponBatch:function(){
    wx.navigateTo({
      url: '../couponBatch/couponBatch',
    })
  },

  //优惠券分组
  couponGroup:function(){
    wx.navigateTo({
      url: '../couponGroup/couponGroup',
    })
  },

  //优惠券管理
  useCoupon:function(){
    wx.navigateTo({
      url: '../useCoupon/useCoupon',
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