const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
// pages/replacerecord/replacerecord.js
const app = getApp();
let apiUrl = app.getApiUrl();
let hotelid = app.globalData.hotelId;
let passid = app.globalData.passId;
let token = app.globalData.token;

function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx2my.showModal({
    title: title,
    content: content,
    confirmText: "删除",
    confirmColor: "#e32121",
    showCancel: true,
    cancelColor: "#ff9700",
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}

function alerttishi(title = "提示", content = "消息提示", confirm) {
  wx2my.showModal({
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
    pagesize: 20,
    //每页展示条数
    nowpage: 1,
    //默认当前页 
    replarececorddata: [],
    //更换柜子记录列表
    pagejudge: 1,
    gaodu: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getreplacedatarecord();
  },
  // 获取更换柜子记录
  getreplacedatarecord: function () {
    let that = this;
    let tempDataSet = [];
    wx2my.request({
      url: apiUrl + '/cab/replace/myhistory',
      data: {
        pageSize: 20,
        pageNo: that.data.nowpage,
        hotelId: wx2my.getStorageSync("hotelid") // hotelOrgId: passid,

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
          wx2my.showLoading({
            title: "加载中",
            duration: 500
          });

          if (res.data.data.length < 20 && res.data.data.length > 0) {
            that.setData({
              pagejudge: 0
            });
          } else {
            that.setData({
              pagejudge: 1
            });
          }

          tempDataSet = that.data.replarececorddata.concat(res.data.data);
          that.setData({
            replarececorddata: tempDataSet
          });
          console.log(that.data.replarececorddata);
        }
      },
      fail: function (error) {
        alerttishi("提示", error, function () {});
      }
    });
  },
  downLoad: function () {
    let that = this;
    let page = that.data.nowpage;

    if (that.data.pagejudge) {
      that.setData({
        nowpage: ++page
      });
      that.getreplacedatarecord();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    wx2my.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight); //设置map高度，根据当前设备宽高满屏显示

        that.setData({
          gaodu: res.windowHeight * 2
        });
      }
    });
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