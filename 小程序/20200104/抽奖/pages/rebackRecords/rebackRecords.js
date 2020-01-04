// pages/myCommunity/myCommunity.js
import wxrequest from '../../request/api'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CommunityList:[],
    ifshow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
    let data = {
      investorId: wx.getStorageSync('userAuth').id,
    }
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    wxrequest.getRebackRecords(data).then(res => {
      wx.hideLoading()
      if(res.data.code == 0){
        this.setData({
          CommunityList: res.data.data
        })
        if(!this.data.CommunityList[0]){
          this.setData({
            ifshow:true
          })
        }
      }
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
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