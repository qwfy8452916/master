const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
// pages/personalcenter/personalcenter.js
const app = getApp();
let apiUrl = app.getApiUrl();
let token = app.globalData.token;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    authzData: wx2my.getStorageSync('buttondata'),
    userInfo: {},
    userInfojudge: null,
    //显示判断
    canIUse: wx2my.canIUse('button.open-type.getUserInfo'),
    Tabindex: '',
    isBind: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("执行");
    let that = this;


 if (options.tabindex) {
      that.setData({
        Tabindex: options.tabindex
      });
    } else {
      that.setData({
        Tabindex: 4
      });
    }


    // my.getAuthCode({

    //   scopes: ['auth_user'],
    //   success: (res) => {
    //     my.getAuthUserInfo({
          
    //       success: (res) => {
    //       console.log(res)
          
    //       }
        
    //     });
    //   },
    // });


    // my.getAuthCode({
        
    //       scopes: 'auth_user',
    //       // scopes: 'auth_base',
          
    //       success: (res) => { //获取用户信息
    //       console.log(res)
          
    //       my.getAuthUserInfo({
          
    //       success: (res) => {
    //       console.log(res)
          
    //       }
        
    //     });
    //       }
    // })
 

 






    if (wx2my.getStorageSync("empIsBind") == 1) {
      this.setData({
        isBind: true
      });
    }


    // app.getuserinfo(function (res) {
    //   console.log(res);

    //   if (res.nickName != "") {
    //     that.setData({
    //       userInfojudge: true,
    //       userInfo: res
    //     });
    //   } else {
    //     that.setData({
    //       userInfojudge: false
    //     });
    //   }
    // });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        userInfojudge: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx2my.getUserInfo({
        success: res => {
          console.log(res)
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }

    console.log(this.data.userInfo)

    // let popup = this.selectComponent("#tabbar");

    

    // popup.dabdata();
    // popup.tabzhixing(that.data.Tabindex);
  },
  //绑定
  bindfun: function () {
    let that = this; //获取登录凭证code

    wx.login({
      success(resdata) {
        if (resdata.code) {
          wx2my.request({
            url: apiUrl + '/emp/bind',
            data: {
              appletType: 'HOTEL_APPLET',
              code: resdata.code,
              empId: wx2my.getStorageSync("empid"),
              appId: 'wx_hotel_app_id',
              appSecret: 'wx_hotel_app_secret'
            },
            method: "POST",
            header: {
              'content-type': 'application/json',
              'Authorization': wx2my.getStorageSync("Token")
            },
            success: function (res) {
              if (res.data.code == 0) {
                wx2my.showToast({
                  title: '绑定成功',
                  icon: 'none',
                  duration: 2000
                });
                wx2my.setStorageSync("empIsBind", 1);
                that.setData({
                  isBind: true
                });
              } else {
                alertViewWithCancel("提示", res.data.msg, function () {});
              }
            },
            fail: function (error) {
              alertViewWithCancel("提示", error, function () {});
            }
          });
        } else {
          wx2my.showToast({
            title: '登录失败，' + resdata.errMsg,
            icon: 'none',
            duration: 2000
          });
        }
      }

    });
  },
  //修改密码
  goUpdatePWD: function () {
    wx2my.navigateTo({
      url: '../updatepwd/updatepwd'
    });
  },
  //信息维护
  goUpdateInfo: function () {
    wx2my.navigateTo({
      url: '../updateinfo/updateinfo'
    });
  },
  //我的二维码
  mycode: function () {
    wx2my.navigateTo({
      url: '../myqecode/myqecode'
    });
  },
  //消息设置
  settingmsg: function () {
    wx2my.navigateTo({
      url: '../setmessage/setmessage'
    });
  },
  jumpshouquan: function () {
    wx2my.redirectTo({
      url: '../shouquan/shouquan?sendid=' + 'user'
    });
  },
  getUserInfo: function (e) {
    let that = this;
    console.log(e);

    if (!e.detail.userInfo) {
      wx2my.showModal({
        title: '警告',
        content: '若不打开授权，则无法进行提现操作！',
        showCancel: false,
        success: function () {
          wx2my.openSetting({
            success: function (data) {
              if (data.authSetting["scope.userInfo"] === true) {
                wx2my.showToast({
                  title: '授权成功',
                  icon: 'success',
                  duration: 1000
                });
                wx.getUserInfo({
                  success(res) {
                    app.globalData.userInfo = res.userInfo;
                    that.setData({
                      userInfo: res.userInfo,
                      userInfojudge: true
                    });
                  }

                });
              } else {
                wx2my.showToast({
                  title: '授权失败',
                  icon: 'success',
                  duration: 1000
                });
                that.setData({
                  userInfojudge: false
                });
              }
            }
          });
        }
      });
    } else {
      wx2my.showModal({
        title: '提示',
        content: '授权成功！',
        showCancel: false
      });
      app.globalData.userInfo = e.detail.userInfo;
      that.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        userInfojudge: true
      });
    }
  },
  linkmycome: function () {
    wx2my.navigateTo({
      url: '../myincome/myincome'
    });
  },
  signout: function () {
    let that = this;
    wx2my.clearStorage();
    that.setData({
      userInfo: {},
      userInfojudge: false
    });
    wx2my.redirectTo({
      url: '../login/login'
    });
  },
  //获取当前登录用户消息订阅的所有状态
  getLoginStatus: function () {
    let that = this;
    wx2my.request({
      url: apiUrl + '/user/subscribe/msg/status',
      data: {
        empId: wx2my.getStorageSync("empid")
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx2my.getStorageSync("Token")
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == '0') {
          wx2my.setStorageSync("subRespBeanList", res.data.data);
        }
      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {});
      }
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
    this.getLoginStatus();
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