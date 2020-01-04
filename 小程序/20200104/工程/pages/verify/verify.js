// pages/verify/verify.js
const app = getApp()
let apiUrl = app.getApiUrl();
function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading();
    let that = this;
    //获取登录凭证code
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: apiUrl + '/user/check/binTang',
            data: {
              appId: 'wx_project_app_id',
              appSecret: 'wx_project_app_secret',
              appletType: 'PROJECT_APPLET',
              code: res.code
            },
            header: {
              'content-type': 'application/json',
            },
            method: "POST",
            success: function (resdata) {
              if (resdata.data.code == 0) {
                console.log(resdata.data.data);
                if (resdata.data.data != null) {
                  //验证通过
                  let loginT = resdata.data.data.loginType;
                  if (loginT == 2 || loginT == 6 || loginT == 7 || loginT == 8) {
                    let token = "Bearer" + resdata.data.data.token
                    wx.setStorageSync("username", resdata.data.empName)
                    wx.setStorageSync("empid", resdata.data.data.empId)
                    wx.setStorageSync("orgAs", resdata.data.data.loginType)
                    wx.setStorageSync("allyId", resdata.data.data.allyId)
                    wx.setStorageSync("Token", token)
                    wx.setStorageSync("accountType", resdata.data.data.accountType)
                    wx.setStorageSync("publicCodeSub", resdata.data.data.subRespBeanList)
                    wx.setStorageSync("empIsBind", resdata.data.data.empIsBind)

                    wx.redirectTo({
                      url: '../test/test',
                    })
                  } else {
                    alertViewWithCancel("提示", '不是合作伙伴账号!', function () {
                    });
                  }
                } else {
                  //验证不通过
                  wx.setStorageSync("empIsBind", 0)
                  wx.redirectTo({
                    url: '../login/login',
                  })
                }
              } else {
                wx.hideLoading();
                alertViewWithCancel("提示", resdata.data.msg, function () { });
              }
            },
            fail: function (error) {
              wx.hideLoading();
              alertViewWithCancel("提示", error, function () { });
            }
          })
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '登录失败，' + res.errMsg,
            icon: 'none',
            duration: 2000
          })
        }
      }
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