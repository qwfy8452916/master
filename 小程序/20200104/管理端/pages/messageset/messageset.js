// pages/messageset/messageset.js
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
    isShowMsg: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let publicCodeSub = wx.getStorageSync("publicCodeSub");
    if (publicCodeSub == null){
      //未订阅
      this.setData({
        isSubscribe: false
      });
    }else{
      for (let i = 0; i < publicCodeSub.length; i++){
        if (publicCodeSub[i].businessSubType == 6){
          if (publicCodeSub[i].isSubscribe == 0){
            //未订阅
            this.setData({
              isSubscribe: false
            });
          }else{
            //已订阅
            this.setData({
              isSubscribe: true
            });
          }
        }
      }
    }
  },
  //订阅
  ensuremsg: function(){
    let that = this;
    //获取当前用户的unionId
    wx.request({
      url: apiUrl + '/user/subscribe/unionId',
      data: {
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
            //unionId获取成功
            that.getUserOpenid();
          }else{
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
  getUserOpenid: function(){
    let that = this;
    wx.request({
      url: apiUrl + '/user/subscribe/openId',
      data: {
        businessSubType: 6,
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
            that.setData({
              isSubscribe: true
            });
          } else {
            wx.hideLoading()
            //订阅失败
            let hintmsg = "订阅失败，请先关注[酒店客房宝服务号]公众号！";
            alertViewWithCancel("提示", hintmsg, function () {});
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
  userAuthLogin: function(){
    let that = this;
    that.setData({
      isShowModel: false
    });
    //获取登录凭证code
    wx.login({
      success(res){
        if(res.code){
          that.setData({
            logincode: res.code
          });
          wx.getSetting({
            success(authres){
              if (authres.authSetting['scope.userInfo']){
                //已授权用户信息
                that.authUserInfo();
              }else{
                //未授权用户信息
                wx.authorize({
                  scope: 'scope.userInfo',
                  success(){
                    that.authUserInfo();
                  },fail(err){
                    console.log(err);
                  }
                })
              }
            }
          })
        }else{
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
  authUserInfo: function(){
    let that = this;
    wx.getUserInfo({
      success: function(userres){
        wx.request({
          url: apiUrl + '/user/subscribe',
          data: {
            appId: 'wx_manage_app_id',
            appSecret: 'wx_manage_app_secret',
            appletType: 'MANAGE_APPLET',
            code: that.data.logincode,
            empId: wx.getStorageSync("empid"),
            encryptedData: userres.encryptedData,
            iv: userres.iv
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
              wx.hideLoading()
              alertViewWithCancel("提示", res.data.msg, function () {});
            }
          },
          fail: function (error) {
            wx.hideLoading()
            alertViewWithCancel("提示", error, function () {});
          }
        })
      },
      fail: function(usererr){
        console.log(usererr);
      }
    })
  },
  
  //取消订阅
  cancelmsg: function(){
    this.setData({
      isShowMsg: true
    });
  },
  //确定取消
  msgHintClose: function(){
    let that = this;
    wx.request({
      url: apiUrl + '/user/subscribe/cancel',
      data: {
        businessSubType: 6,
        empId: wx.getStorageSync("empid")
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      method: "PUT",
      success: function (res) {
        if (res.data.code == 0) {
          if (res.data.data){
            wx.hideLoading()
            that.setData({
              isSubscribe: false,
              isShowMsg: false
            });
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
  msgHintKeep: function(){
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