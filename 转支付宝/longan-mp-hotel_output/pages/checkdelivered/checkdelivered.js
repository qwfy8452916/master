const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
let apiUrl = app.getApiUrl();
let hotelid = app.globalData.hotelId;
let token = app.globalData.token;
let organizationid = app.globalData.organizationid;

function alerttishi(title = "提示", content = "消息提示", confirm, confirm2) {
  wx2my.showModal({
    title: title,
    content: content,
    confirmText: "是",
    cancelText: "否",
    confirmColor: "#ff9700",
    cancelColor: "#ff9700",
    showCancel: true,
    success: function (res) {
      if (res.confirm) {
        confirm();
      } else if (res.cancel) {
        confirm2();
      }
    }
  });
}

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  testingniu: function () {
    let that = this;
    alerttishi("是否完成配送", "请确认用户已收到所有商品", function (res) {
      console.log("确定");
    }, function (res) {
      console.log("取消");
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});