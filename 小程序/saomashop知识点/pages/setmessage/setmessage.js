// pages/setmessage/setmessage.js
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
    logincode: '',
    encrypteddata: '',
    useriv: '',
    isSubscribe: false,
    isShowModel: false,
    isShowMsg: false,
    businessSubType:'',
    msgjudge:{
      minMsg:false,
      sceneMsg: false,
      roomMsg: false,
      roombookMsg: false,
      replenishMsg: false,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let subRespBeanList = wx.getStorageSync("subRespBeanList");
    let nowmsgjudge = this.data.msgjudge;
    if (subRespBeanList != null) {
      for (var i = 0; i < subRespBeanList.length;i++){
        if (subRespBeanList[i].businessSubType == '1' && subRespBeanList[i].isSubscribe == '1'){
          nowmsgjudge.minMsg=true
        } else if (subRespBeanList[i].businessSubType == '2' && subRespBeanList[i].isSubscribe == '1'){
          nowmsgjudge.sceneMsg = true
        } else if (subRespBeanList[i].businessSubType == '3' && subRespBeanList[i].isSubscribe == '1') {
          nowmsgjudge.roomMsg = true
        } else if (subRespBeanList[i].businessSubType == '4' && subRespBeanList[i].isSubscribe == '1') {
          nowmsgjudge.roombookMsg = true
        } else if (subRespBeanList[i].businessSubType == '5' && subRespBeanList[i].isSubscribe == '1') {
          nowmsgjudge.replenishMsg = true
        }
      }
      //已订阅
      this.setData({
        msgjudge: nowmsgjudge
      });
    }
  },
  //订阅
  ensuremsg: function (e) {
    let that = this;
    console.log(e)
    let businessSubType = e.currentTarget.dataset.businesssubtype;
    that.setData({
      businessSubType: businessSubType
    })
    console.log(businessSubType)
    //获取当前用户的unionId
    wx.request({
      url: apiUrl + '/user/subscribe/unionId',
      data: {
        empId: wx.getStorageSync("empid"),
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          if (res.data.data) {
            //unionId获取成功
            that.getUserOpenid();
          } else {
            //unionId获取失败
            that.setData({
              isShowModel: true
            });
          }
        } else {
          wx.hideLoading()
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        wx.hideLoading()
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },
  //获取当前用户在公众号里唯一性openId
  getUserOpenid: function () {
    let that = this;
    wx.request({
      url: apiUrl + '/user/subscribe/openId',
      data: {
        businessSubType: that.data.businessSubType,
        empId: wx.getStorageSync("empid")
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          if (res.data.data) {
            // 订阅成功
            wx.hideLoading()
            wx.showToast({
              title: '订阅成功',
              icon: 'none',
              duration: 2000
            })
            let nowmsgjudge = this.data.msgjudge;
            if (that.data.businessSubType=='1'){
              nowmsgjudge.minMsg = true
            } else if (that.data.businessSubType == '2'){
              nowmsgjudge.sceneMsg = true
            } else if (that.data.businessSubType == '3') {
              nowmsgjudge.roomMsg = true
            } else if (that.data.roombookMsg == '4') {
              nowmsgjudge.roomMsg = true
            } else if (that.data.roombookMsg == '5') {
              nowmsgjudge.replenishMsg = true
            }
            that.setData({
              msgjudge: nowmsgjudge
            });
          } else {
            wx.hideLoading()
            //订阅失败
            let hintmsg = "订阅失败，请先关注[酒店客房宝服务号]公众号！";
            alertViewWithCancel("提示", hintmsg, function () { });
          }
        } else {
          wx.hideLoading()
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        wx.hideLoading()
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },
  //用户授权登录
  userAuthLogin: function () {
    let that = this;
    that.setData({
      isShowModel: false
    });
    //获取登录凭证code
    wx.login({
      success(res) {
        if (res.code) {
          console.log(res.code)
          that.setData({
            logincode: res.code
          });
          wx.getSetting({
            success(authres) {
              if (authres.authSetting['scope.userInfo']) {
                console.log("已授权1")
                //已授权用户信息
                that.authUserInfo();
              } else {
                //未授权用户信息
                console.log("未授权1")
                wx.authorize({
                  scope: 'scope.userInfo',
                  success() {
                    that.authUserInfo();
                  }, fail(err) {
                    console.log(err);
                  }
                })
              }
            }
          })
        } else {
          wx.showToast({
            title: '登录失败，' + res.errMsg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  //获取用户信息（用户已授权）
  authUserInfo: function () {
    let that = this;
    wx.getUserInfo({
      success: function (userres) {
        wx.request({
          url: apiUrl + '/user/subscribe',
          data: {
            appletType:'HOTEL_APPLET',
            code: that.data.logincode,
            empId: wx.getStorageSync("empid"),
            encryptedData: userres.encryptedData,
            iv: userres.iv,
            appId: 'wx_hotel_app_id',
            appSecret: 'wx_hotel_app_secret'
          },
          header: {
            'content-type': 'application/json',
            'Authorization': wx.getStorageSync("Token")
          },
          method: "POST",
          success: function (res) {
            
            if (res.data.code == 0) {
              if (res.data.data) {
                that.getUserOpenid();
              } else {
                wx.showToast({
                  title: '订阅失败，请先授权用户信息！',
                  icon: 'none',
                  duration: 2000
                })
              }
            } else {
              console.log(res.data.msg)
              wx.hideLoading()
              alertViewWithCancel("提示", res.data.msg, function () { });
            }
          },
          fail: function (error) {
            wx.hideLoading()
            alertViewWithCancel("提示", error, function () { });
          }
        })
      },
      fail: function (usererr) {
        console.log(usererr);
      }
    })
  },

  //取消订阅
  cancelmsg: function (e) {
    let businessSubType = e.currentTarget.dataset.businesssubtype;
    this.setData({
      isShowMsg: true,
      businessSubType: businessSubType
    });
  },
  //确定取消
  msgHintClose: function () {
    let that = this;
    wx.request({
      url: apiUrl + '/user/subscribe/cancel',
      data: {
        businessSubType: that.data.businessSubType,
        empId: wx.getStorageSync("empid"),
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      method: "PUT",
      success: function (res) {
        if (res.data.code == 0) {
          if (res.data.data) {
            wx.hideLoading()
            let nowmsgjudge = that.data.msgjudge;
            console.log(nowmsgjudge)
            if (that.data.businessSubType == '1') {
              nowmsgjudge.minMsg = false
            } else if (that.data.businessSubType == '2') {
              nowmsgjudge.sceneMsg = false
            } else if (that.data.businessSubType == '3') {
              nowmsgjudge.roomMsg = false
            } else if (that.data.roombookMsg == '4') {
              nowmsgjudge.roomMsg = false
            } else if (that.data.roombookMsg == '5') {
              nowmsgjudge.replenishMsg = false
            }
            that.setData({
              msgjudg: nowmsgjudge,
              isShowMsg: false
            });
            console.log(that.data.msgjudg)
            wx.showToast({
              title: '取消订阅成功',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          wx.hideLoading()
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        wx.hideLoading()
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },
  //取消
  msgHintKeep: function () {
    this.setData({
      isShowMsg: false
    });
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