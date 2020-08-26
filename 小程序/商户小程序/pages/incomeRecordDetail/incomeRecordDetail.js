// pages/incomeRecordDetail/incomeRecordDetail.js
const app=getApp();
import wxrequest from '../../utils/api';
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    incomeDetailData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.incomeRecordDetail()
  },


  //获取待入账记录详情
  incomeRecordDetail: function () {
    let that = this;
    wx.showLoading({
      title: "加载中"
    })
    wxrequest.incomeRecordDetail(that.data.id).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      if (resdata.code == 0) {
        that.setData({
          incomeDetailData: resdata.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
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