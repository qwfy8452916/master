// pages/foodOrderDetail/foodOrderDetail.js
const app = getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    detailId: '',
    shuzhanJudge: true,
    deliveryDateDetail: {}, //配送详情数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detailId: options.id
    })
    this.hotelOrderDetails(options.id);
  },


  //获取详情
  hotelOrderDetails: function (id) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.hotelOrderDetails(id).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        that.setData({
          deliveryDateDetail: resdata.data
        })
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  },


//修改订单
  editOrder:function(e){
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '../foodOrderEdit/foodOrderEdit?id='+id,
    })
  },





  shuzhan: function () {
    this.setData({
      shuzhanJudge: !this.data.shuzhanJudge
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