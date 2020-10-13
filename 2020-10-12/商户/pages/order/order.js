// pages/order/order.js
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
    let that=this;
    this.setData({
      authzData: wx.getStorageSync("pageAuthority"),
    })


    let popup = this.selectComponent("#tabbar");
    if (options.tabindex) {
      that.setData({
        Tabindex: options.tabindex
      })
    } else {
      that.setData({
        Tabindex: 3
      })
    }
    popup.dabdata()
    popup.tabzhixing(that.data.Tabindex)

  },

  //自营配送单
  ownDeliveryList:function(){
    wx.navigateTo({
      url: '../ownDeliveryList/ownDeliveryList',
    })
  },

  //自营售后
  ownAfterSale:function(){
    wx.navigateTo({
      url: '../ownAfterSale/ownAfterSale',
    })
  },

  //店内送
  storeDeliv:function(){
    wx.navigateTo({
      url: '../storeDeliv/storeDeliv',
    })
  },

  //堂食
  foodOrder:function(){
    wx.navigateTo({
      url: '../foodOrder/foodOrder',
    })
  },

  //订房订单
  // bookingOrder:function(){
  //   wx.navigateTo({
  //     url: '../bookingOrderList/bookingOrderList',
  //   })
  // },

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