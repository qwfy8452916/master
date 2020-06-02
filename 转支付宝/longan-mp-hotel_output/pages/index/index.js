const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
//index.js
//获取应用实例
const app = getApp();
let apiUrl = app.getApiUrl();
let hotelid = app.globalData.hotelId;
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
      }
    }
  });
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    panduan: [true, false, true, false, true, true, false, true, false],
    guizicode: null,
    //柜子二维码
    guizinumber: null,
    //柜子出厂编号
    saomadata: null,
    //扫码数据
    flag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
  onShareAppMessage: function () {},
  addsao: function () {
    let that = this;
    wx2my.scanCode({
      success(res) {
        if (!res.result) {
          alertViewWithCancel("提示", "扫描失败", function () {});
          return false;
        }

        let nowsaomadata = res.result.substring(res.result.length - 12); // let nowsaomadata = JSON.parse(nowsaomadata)

        wx2my.request({
          url: apiUrl + '/cabinet/cabCode',
          header: {
            'content-type': 'application/json',
            'Authorization': wx2my.getStorageSync("Token")
          },
          method: "GET",
          dataType: 'json',
          data: {
            cabCode: nowsaomadata,
            cabId: ""
          },
          success: function (res) {
            if (res.statusCode == 401) {
              app.overtime(res.statusCode);
              return false;
            }

            console.log(res.data.message);

            if (res.data.data == 2) {
              alertViewWithCancel("提示", "柜子已被使用", function () {});
            }

            if (res.data.data == 0 || res.data.data == 1) {
              wx2my.navigateTo({
                url: '../bindcabinet/bindcabinet?guizicode=' + nowsaomadata
              });
            }
          },
          fail: function () {
            console.log("error!!!!");
          }
        });
      },

      fail: function (err) {
        console.log(err);
      }
    }); // wx.navigateTo({
    //   url: '../bindcabinet/bindcabinet',
    // })
  },
  // 加载
  addshujv: function () {
    let that = this;
    wx2my.showLoading({
      title: "加载中",
      duration: 500
    });
    wx2my.request({
      url: apiUrl + '/appletgonglue/getVideoList',
      header: {
        'content-type': 'application/json',
        'Authorization': wx2my.getStorageSync("Token")
      },
      method: "GET",
      dataType: 'json',
      data: {
        page: that.data.currentPage,
        pid: that.data.pid,
        cid: that.data.cid
      },
      success: function (res) {
        // if (res.data.data.length < 6 && res.data.data.length > 0) {
        //   that.setData({
        //     hasData: 0
        //   });
        // } else {
        //   that.setData({
        //     hasData: 1
        //   });
        // }
        console.log(res); // tempDataSet = that.data.listshujv.concat(res.data.data);
        // that.setData({
        //   listshujv: tempDataSet
        // })
      },
      fail: function () {
        console.log("error!!!!");
      }
    });
  }
});