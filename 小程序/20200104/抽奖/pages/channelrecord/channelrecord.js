// pages/channelrecord/channelrecord.js
const app = getApp();
import wxrequest from '../../request/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (options.upperSC != undefined && options.partnerid != undefined) {
      wx.setStorageSync('partnerid', options.partnerid)
      let recordData = {
        investorId: options.partnerid,
        shareCode: options.upperSC
      };
      wxrequest.channelRecord(recordData)
        .then(res => {
          // console.log(res);
          if (res.data.code == 0) {
            const recordDataList = res.data.data.map(item => {
              return {
                id: item.id,
                cabTypeName: item.cabTypeName,
                cabinetQuantity: item.cabinetQuantity,
                payTime: item.payTime,
                actualPayAmount: item.actualPayAmount
              }
            });
            that.setData({
              recordList: recordDataList
            });
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        })
        .catch(err => {
          wx.hideLoading()
          console.log(err)
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