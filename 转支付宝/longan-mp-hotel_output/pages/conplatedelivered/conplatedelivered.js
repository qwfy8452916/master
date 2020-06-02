const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
// pages/conplatedelivered/conplatedelivered.js
const app = getApp();
let apiUrl = app.getApiUrl();
let token = app.globalData.token;
let organizationid = app.globalData.organizationid;

function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx2my.showModal({
    title: title,
    content: content,
    confirmText: "确定",
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
    complatedata: '' //完成配送数据

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata();
  },
  getdata: function () {
    let that = this;
    let hotelId = wx2my.getStorageSync("hotelid");
    wx2my.request({
      url: apiUrl + '/order/delivery/rountine',
      data: {
        hotelId: wx2my.getStorageSync("hotelid"),
        delivCompleteEmpId: wx2my.getStorageSync("empid") // status: 2,

      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx2my.getStorageSync("Token")
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode);
          return false;
        }

        if (res.data.code == 0) {
          console.log(res.data.data);
          that.setData({
            complatedata: res.data.data.records
          });
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {});
        }
      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {});
      }
    });
  },
  wanchengdetail: function (e) {
    let id = e.currentTarget.dataset.id;
    let delivtype = e.currentTarget.dataset.delivtype;
    wx2my.navigateTo({
      url: '../conplatedelivereddetail/conplatedelivereddetail?id=' + id + '&delivtype=' + delivtype
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