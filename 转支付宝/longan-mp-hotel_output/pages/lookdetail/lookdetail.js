const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
// pages/lookdetail/lookdetail.js
const app = getApp();
let apiUrl = app.getApiUrl();
let hotelid = app.globalData.hotelId;
let passid = app.globalData.passId;
let token = app.globalData.token;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    abnormaldata: [],
    //异常数据
    page: 1,
    nowid: "" //id

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let that = this; // let nowid = options.id

    that.setData({
      nowid: options.id
    });
    that.getabnormallist(options.id);
  },
  //查看异常列表
  getabnormallist: function (id) {
    let that = this;
    wx2my.showLoading({
            title: "加载中",
            duration: 500
          });
    wx2my.request({
      url: apiUrl + '/mal/' + id,
      header: {
        'content-type': 'application/json',
        'Authorization': wx2my.getStorageSync("Token")
      },
      method: "GET",
      success: function (res) {
        wx2my.hideLoading()
        if (res.statusCode == 401) {
          app.overtime(res.statusCode);
          return false;
        }

        if (res.data.code == 0) {
          
          that.setData({
            abnormaldata: res.data.data
          });
          console.log(that.data.abnormaldata);
        }
      },
      fail: function (error) {
        wx2my.hideLoading()
        alerttishi("提示", error, function () {});
      }
    });
  },
  repairurl: function () {
    let that = this;
    wx2my.redirectTo({
      url: '../repair/repair?id=' + that.data.nowid
    });
  },
  cancelfanhui: function () {
    wx2my.redirectTo({
      url: '../cabinetlist/cabinetlist?navindex=' + 1
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getabnormallist(this.data.nowid);
  },

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