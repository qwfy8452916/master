// pages/getCashPri/getCashPri.js
const app = getApp()
let apiUrl = app.globalData.requestUrl;
let token = app.globalData.token
function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    confirmColor: "#ff9700",
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      } else if (res) { }
    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {},
    tishijudge: true,
    tijijudge: false,
    balance: 2000.00,
    jine: "",  //金额
    flag: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let jine = parseFloat(options.jine)
    this.setData({
      balance: jine,
      authzData: wx.getStorageSync('pageAuthority')
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

  inputevent: function (e) {
    let tijijudge = this.data.tijijudge;
    let tishijudge = this.data.tishijudge;
    let getjine = parseFloat(e.detail.value);

    console.log(getjine)
    if (getjine > 0) {
      tijijudge = true
    } else {
      tijijudge = false
    }
    if (getjine > this.data.balance) {
      tishijudge = false
    } else {
      tishijudge = true
    }
    getjine = Math.floor(getjine * 100) / 100;
    this.setData({
      tijijudge: tijijudge,
      tishijudge: tishijudge,
      jine: getjine
    })

  },



  carryapply: function () {
    let that = this;
    if (that.data.tijijudge == true && that.data.tishijudge == true && that.data.flag == true) {
      that.setData({
        flag: false
      })
      wx.request({
        url: apiUrl + 'fin/repl',
        data: {
          encryptedOrgId: wx.getStorageSync("organizationid"),
          empWithdrawalAmount: that.data.jine,
          // empId: 81,
          empAccount: wx.getStorageSync("userName"),
          hotelId: wx.getStorageSync("hotelId"),
        },
        header: {
          'content-type': 'application/json',
          'Authorization': wx.getStorageSync("token")
        },
        method: "POST",
        success: function (res) {
          that.setData({
            flag: true
          })
          if (res.statusCode == 401) {
            app.overtime(res.statusCode)
            return false;
          }
          if (res.statusCode == 404) {
            alertViewWithCancel("提示", res.data.message, function () {
            });
          }
          if (res.data.code == 0) {
            wx.redirectTo({
              url: '../getcashsuccess/getcashsuccess',
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:"none",
              duration:2000
            })
          }
        },
        fail: function (error) {
          that.setData({
            flag: true
          })
          alertViewWithCancel("提示", error, function () {
          });
        }
      })


    }

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