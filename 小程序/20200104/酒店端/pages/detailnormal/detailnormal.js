// pages/detailnormal/detailnormal.js

const app = getApp()
let apiUrl = app.getApiUrl();
let hotelid = app.globalData.hotelId;
let passid = app.globalData.passId;
let token = app.globalData.token
function alerttishi(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    cancelColor: "#ff9700",
    confirmColor: "#ff9700",
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    abnormaldata:[],   //数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let nowid = options.id
    that.getabnormallist(nowid)
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

  //查看正常

  getabnormallist: function (id) {
    let that = this;
    wx.request({
      url: apiUrl + '/mal/' + id,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          wx.showLoading({
            title: "加载中",
            duration: 500,
          })

          that.setData({
            abnormaldata: res.data.data
          })
          console.log(that.data.abnormaldata)
        }
      },
      fail: function (error) {
        alerttishi("提示", error, function () {
        });
      }
    });
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