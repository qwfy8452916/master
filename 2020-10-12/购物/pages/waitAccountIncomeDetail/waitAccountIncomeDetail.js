// pages/waitAccountIncomeDetail/waitAccountIncomeDetail.js
const app = getApp();
import wxrequest from '../../request/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailId:'', //详情id
    detailData:{}, //详情数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detailId: options.id
    })
    this.waitIncomeDetail();
  },



  //获取用户收支单条信息
  waitIncomeDetail: function () {
    const that = this;
    let data = {
      userType: 2,
      id: this.data.detailId
    }
    wxrequest.waitIncomeDetail(data).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          detailData: resdatas
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