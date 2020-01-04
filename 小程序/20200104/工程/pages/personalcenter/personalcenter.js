// pages/personalcenter/personalcenter.js
const app = getApp()
let apiUrl = app.getApiUrl();
let token = app.globalData.token;
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
    authzData: wx.getStorageSync('buttondata'),
    userInfo: {},
    userInfojudge: null, //显示判断
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    Tabindex: '',
    isBind: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync("empIsBind") == 1) {
      this.setData({
        isBind: true
      });
    }

    console.log("执行")
    let that = this;
    app.getuserinfo(function (res) {
      console.log(res)
      if (res.nickName != "") {
        that.setData({
          userInfojudge: true
        })
      } else {
        that.setData({
          userInfojudge: false
        })
      }
    })


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        userInfojudge: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    let popup = this.selectComponent("#tabbar");
    if (options.tabindex) {
      that.setData({
        Tabindex: options.tabindex
      })
    } else {
      that.setData({
        Tabindex: 1
      })
    }
    // popup.dabdata()
    popup.tabzhixing(that.data.Tabindex)

  },
  //绑定
  bindfun: function(){
    let that = this;
    //获取登录凭证code
    wx.login({
      success(resdata) {
        if (resdata.code) {
          wx.request({
            url: apiUrl + '/emp/bind',
            data: {
              appId: 'wx_project_app_id',
              appSecret: 'wx_project_app_secret',
              appletType: 'PROJECT_APPLET',
              code: resdata.code,
              empId: wx.getStorageSync("empid")
            },
            method: "POST",
            header: {
              'content-type': 'application/json',
              'Authorization': wx.getStorageSync("Token"),
            },
            success: function (res) {
              if (res.data.code == 0) {
                wx.showToast({
                  title: '绑定成功',
                  icon: 'none',
                  duration: 2000
                })
                wx.setStorageSync("empIsBind", 1)
                that.setData({
                  isBind: true
                });
              } else {
                alertViewWithCancel("提示", res.data.msg, function () {
                });
              }
            },
            fail: function (error) {
              alertViewWithCancel("提示", error, function () {
              });
            }
          })
        } else {
          wx.showToast({
            title: '登录失败，' + resdata.errMsg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  //修改密码
  goUpdatePWD: function () {
    wx.navigateTo({
      url: '../updatepwd/updatepwd',
    })
  },
  //信息维护
  goUpdateInfo: function () {
    wx.navigateTo({
      url: '../updateinfo/updateinfo',
    })
  },

  jumpshouquan: function () {
    wx.redirectTo({
      url: '../shouquan/shouquan?sendid=' + 'user',
    })
  },

  getUserInfo: function (e) {
    let that = this;
    console.log(e)
    if (!e.detail.userInfo) {
      wx.showModal({
        title: '警告',
        content: '若不打开授权，则无法进行提现操作！',
        showCancel: false,
        success: function () {
          wx.openSetting({
            success: function (data) {
              if (data.authSetting["scope.userInfo"] === true) {
                wx.showToast({
                  title: '授权成功',
                  icon: 'success',
                  duration: 1000,
                })
                wx.getUserInfo({
                  success(res) {
                    app.globalData.userInfo = res.userInfo
                    that.setData({
                      userInfo: res.userInfo,
                      userInfojudge: true
                    })
                  }
                })
              } else {
                wx.showToast({
                  title: '授权失败',
                  icon: 'success',
                  duration: 1000
                })
                that.setData({
                  userInfojudge: false
                })
              }
            }
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '授权成功！',
        showCancel: false
      })
      app.globalData.userInfo = e.detail.userInfo
      that.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        userInfojudge: true
      })
    }

  },


  linkmycome: function () {
    wx.navigateTo({
      url: '../myincome/myincome',
    })
  },

  signout: function () {
    let that = this;
    wx.clearStorage()
    that.setData({
      userInfo: {},
      userInfojudge: false
    })
    wx.redirectTo({
      url: '../login/login',
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