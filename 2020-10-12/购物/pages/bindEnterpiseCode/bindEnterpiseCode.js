// pages/bindEnterpiseCode/bindEnterpiseCode.js
const app = getApp();
import wxrequest from '../../request/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifDetail:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   ifDetail: options.ifDetail?true:false
    // })
  },
  codeSubmit(e){
    let formData = e.detail.value;
    let license = app.globalData.license
    if (formData.bindUserName.replace(/\s+/g, '') == "") {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (formData.bindUserMobile.replace(/\s+/g, '') == "") {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (formData.bindUserEmail.replace(/\s+/g, '') == "") {
      wx.showToast({
        title: '请输入邮箱',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(!(/^1[3456789]\d{9}$/.test(formData.bindUserMobile))){ 
      wx.showToast({
        title: '手机号码有误，请重填',
        icon: 'none',
        duration: 2000
      })
      return; 
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wxrequest.bindEnterpriseCode(license,formData).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '绑定成功！',
          icon: 'success'
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/my/my'
          })
        }, 2000);
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
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