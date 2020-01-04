// pages/ChannelLogin/ChannelLogin.js
const app = getApp();
import wxrequest from '../../request/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userLoginData: {
      name: "",
      pwd: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  //登录
  loginSubmit: function (e) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let formData = e.detail.value;
    if (formData.name.replace(/\s+/g, '') == "" || formData.pwd.replace(/\s+/g, '') == "") {
      wx.showToast({
        title: '请输入登录信息',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let loginData = {
      userName: formData.name,
      password: formData.pwd
    };
    wxrequest.channelLogin(loginData)
      .then(res => {
        // console.log(res);
        if (res.data.code == 0){
          wx.setStorage({
            key: "isChannel",
            data: 1
          })
          wx.setStorageSync('channelAuth', {
            id: res.data.data.id
          })
          wx.reLaunch({
            url: '../index/index'
          })
        }else{
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