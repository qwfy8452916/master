// pages/waitAccountIncome/waitAccountIncome.js
const app = getApp();
import wxrequest from '../../request/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waitIncomData:[], //待入账列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.waitIncom();
  },


//获取用户待入账列表信息

  waitIncom: function () {
    const that = this;
    let data={
      userId: app.globalData.userId
    }
    wxrequest.waitIncom(data,2).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        console.log(resdatas.records)
        that.setData({
          waitIncomData: resdatas.records
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
        wx.hideLoading();
        console.log(err)
      });
  },

  //待入账收入详情
  detail: function (e) {
    let id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../waitAccountIncomeDetail/waitAccountIncomeDetail?id='+id,
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