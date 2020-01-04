// pages/firstList/firstList.js
const app = getApp();
import wxrequest from '../../request/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    firstList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    wxrequest.getCabFirstList().then(res => {
      wx.hideLoading()
      if(res.data.code == 0){
        console.log(res.data)
        let firstList = res.data.data.map(item => {
          return {
            hotelName:item.fsHotelDTO.hotelName,
            starLeval:item.fsHotelDTO.starLevel,
            cabtypeList:item.cabType,
            cabNum:item.fsCabinetDTOS.length,
            imgUrl:item.fsHotelDTO.hotelImageUrl
          }
        })
        this.setData({
          firstList:firstList
        })
      }
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
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