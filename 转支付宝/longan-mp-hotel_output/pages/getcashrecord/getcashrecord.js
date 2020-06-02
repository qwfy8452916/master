const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
// pages/getcashrecord/getcashrecord.js
const app = getApp();
let apiUrl = app.getApiUrl();
let token = app.globalData.token;

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
      } else if (res) {}
    }
  });
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    getcashrecorddata: [],
    //提现记录
    page: 1,
    judge: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getcashrecord();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  getcashrecord: function () {
    let that = this;
    wx2my.showLoading({
      title: "加载中",
      duration: 500
    });
    wx2my.request({
      url: apiUrl + '/fin/repl/withdraw',
      header: {
        'content-type': 'application/json',
        'Authorization': wx2my.getStorageSync("Token")
      },
      data: {
        encryptedOrgId: wx2my.getStorageSync("organizationid"),
        pageNo: that.data.page,
        pageSize: 20
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode);
          return false;
        }

        if (res.data.code == 0) {
          if (0 < res.data.data.list.length && res.data.data.list.length < 20) {
            that.setData({
              judge: false
            });
          } else {
            that.setData({
              judge: true
            });
          }

          let nowgetcashrecorddata = res.data.data.list.concat(that.data.getcashrecorddata);
          that.setData({
            getcashrecorddata: nowgetcashrecorddata
          });
        }
      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {});
      }
    });
  },
  moredata: function () {
    let that = this;
    let nowpage = that.data.page;

    if (that.data.judge) {
      that.setData({
        page: ++nowpage
      });
      that.getcashrecord();
    }
  },

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