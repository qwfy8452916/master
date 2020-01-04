// pages/wxif/wxif.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessSubType: '',
    msgjudge: {
      minMsg: false,
      sceneMsg: false,
      roomMsg: false,
      roombookMsg: false,
      replenishMsg: false,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  cancelmsg: function (e) {
    let that = this;
    let businessSubType = e.currentTarget.dataset.businesssubtype;
    this.setData({
      businessSubType: businessSubType
    })
    let nowmsgjudge = that.data.msgjudge;
    console.log(nowmsgjudge)
    if (that.data.businessSubType == '1') {
      that.setData({
        'msgjudge.minMsg': !that.data.msgjudge.minMsg
      })
      // nowmsgjudge.minMsg = !nowmsgjudge.minMsg
    } else if (that.data.businessSubType == '2') {
      that.setData({
        'msgjudge.sceneMsg': !that.data.msgjudge.sceneMsg
      })
      // nowmsgjudge.sceneMsg = !nowmsgjudge.sceneMsg
    } else if (that.data.businessSubType == '3') {
      that.setData({
        'msgjudge.roomMsg': !that.data.msgjudge.roomMsg
      })
      // nowmsgjudge.roomMsg = !nowmsgjudge.roomMsg
    } else if (that.data.businessSubType == '4') {
      that.setData({
        'msgjudge.roombookMsg': !that.data.msgjudge.roombookMsg
      })
      // nowmsgjudge.roombookMsg = !nowmsgjudge.roombookMsg
    } else if (that.data.businessSubType == '5') {
      that.setData({
        'msgjudge.replenishMsg': !that.data.msgjudge.replenishMsg
      })
      // nowmsgjudge.replenishMsg = !nowmsgjudge.replenishMsg
    }
    this.setData({
      // msgjudg: nowmsgjudge,
      isShowMsg: false
    });
    console.log(that.data.msgjudg)
  },

  ensuremsg: function (e) {
    let that = this;
    let businessSubType = e.currentTarget.dataset.businesssubtype;
    this.setData({
      businessSubType: businessSubType
    })
    console.log(that.data.businessSubType)
    let nowmsgjudge = this.data.msgjudge;
    if (that.data.businessSubType == '1') {
      that.setData({
        'msgjudge.minMsg': !that.data.msgjudge.minMsg
      })
      // nowmsgjudge.minMsg = !nowmsgjudge.minMsg
    } else if (that.data.businessSubType == '2') {
      that.setData({
        'msgjudge.sceneMsg': !that.data.msgjudge.sceneMsg
      })
      // nowmsgjudge.sceneMsg = !nowmsgjudge.sceneMsg
    } else if (that.data.businessSubType == '3') {
      that.setData({
        'msgjudge.roomMsg': !that.data.msgjudge.roomMsg
      })
      // nowmsgjudge.roomMsg = !nowmsgjudge.roomMsg
    } else if (that.data.businessSubType == '4') {
      that.setData({
        'msgjudge.roombookMsg': !that.data.msgjudge.roombookMsg
      })
      // nowmsgjudge.roombookMsg = !nowmsgjudge.roombookMsg
    } else if (that.data.businessSubType == '5') {
      that.setData({
        'msgjudge.replenishMsg': !that.data.msgjudge.replenishMsg
      })
      // nowmsgjudge.replenishMsg = !nowmsgjudge.replenishMsg
    }
    console.log(this.data.msgjudge)
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