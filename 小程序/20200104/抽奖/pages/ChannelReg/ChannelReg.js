// pages/ChannelReg/ChannelReg.js
const app = getApp()
import wxrequest from '../../request/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    mobile: ''
  },
  register(){
    if (this.data.account == "" || this.data.mobile == "") {
      wx.showToast({
        title: '请输入注册信息',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if(!(/^1[3456789]\d{9}$/.test(this.data.mobile))){ 
      wx.showToast({
        title: '手机号码有误，请重填',
        icon: 'none',
        duration: 2000
      })
      return false; 
    }
    let data = {
      fullName: this.data.account,
      mobile: this.data.mobile
    }
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    wxrequest.regInvestor(data).then(res => {
      wx.hideLoading()
      if(res.data.code == 0){
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 2000
        })
        wx.setStorageSync('isMember', 1)
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/personal/personal'
          })
        }, 2000);
      }
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  getaccount(e){
    this.setData({
      account: e.detail.value
    })
  },
  getmobile(e){
    this.setData({
      mobile: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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