// pages/accountInfo/accountInfo.js
const app = getApp()
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    accountdetail: {},  //账户信息
  },


 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      authzData: wx.getStorageSync("pageAuthority"),
    })
    this.getAccountData();
  },


  //获取账户金额信息 与银行账户信息同一接口
  getAccountData: function () {//待支付列表

    const that = this;
    let linkData = {
      orgId: wx.getStorageSync("orgId"),
    };
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.getAccountData(linkData).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        that.setData({
          accountdetail: resdata.data
        })
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
      });
  },
  
  //提现
  withdrawal:function(){
    wx.navigateTo({
      url: '../getCash/getCash',
    })
  },

  //提现记录
  getCashRecord:function(){
    wx.navigateTo({
      url: '../getCashRecord/getCashRecord',
    })
  },

  //待入账记录
  waitIncomeRecord:function(){
    wx.navigateTo({
      url: '../waitIncomeRecord/waitIncomeRecord',
    })
  },

  //入账记录
  incomeRecord:function(){
    wx.navigateTo({
      url: '../incomeRecord/incomeRecord',
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