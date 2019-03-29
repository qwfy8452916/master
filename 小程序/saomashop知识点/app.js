//app.js
App({
  onLaunch: function () {
    console.log("加载")
    var that=this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取回调缓存01
    this.globalData.callback = wx.getStorageSync("backdata") || []
    console.log(this.globalData.callback)

    // 获取回调缓存02 执行获取缓存函数
    this.gethuancun(function(res){
      that.globalData.callback02=res.data
    })

    //直接在这里加载处获取缓存不通过回调函数 把回调函数中的获取缓存写在此处



    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log("授权")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          console.log("没有授权")
        }
      }
    })
  },

  getUserInfo: function (cb) {
    let that = this;
    let apiUrl = that.getApiUrl();
    let appid = that.getAPPid();
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
      if (typeof (this.globalData.userInfo.userId) == 'undefined') {
        //调用登录接口
        wx.getUserInfo({
          withCredentials: false,
          success: function (res) {
            res.userInfo.error = 'ok';
            let info = res.userInfo;
            wx.login({
              success: function (res) {
                if (res.code) {
                  wx.request({
                    url: apiUrl + '/login',
                    data: {
                      appid: appid,
                      code: res.code,
                      name: info.nickName,
                      logo: info.avatarUrl
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: "POST",
                    dataType: 'json',
                    success: function (res) {
                      info.userId = res.data.data;
                      that.globalData.userInfo = info;
                      typeof cb == "function" && cb(that.globalData.userInfo);
                    }
                  });
                }
              }
            });
          },
          fail: function (res) {
            console.log(res);
            that.globalData.userInfo = { error: 'error', nickName: '点击登录', userId: "" };
            typeof cb == "function" && cb(that.globalData.userInfo);
          }
        });
      }
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          res.userInfo.error = 'ok';
          let info = res.userInfo;
          wx.login({
            success: function (res) {
              if (res.code) {
                wx.request({
                  url: apiUrl + '/login',
                  data: {
                    appid: appid,
                    code: res.code,
                    name: info.nickName,
                    logo: info.avatarUrl
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  method: "POST",
                  dataType: 'json',
                  success: function (res) {
                    info.userId = res.data.data;
                    that.globalData.userInfo = info;
                    typeof cb == "function" && cb(that.globalData.userInfo);
                  }
                });
              }
            }
          });

        },
        fail: function (res) {
          that.globalData.userInfo = { error: 'error', nickName: '点击登录', userId: "", avatarUrl: "../../img/person.png" };
          typeof cb == "function" && cb(that.globalData.userInfo);
        }
      });
    }
  },
  getLoginAgain: function (cb) {

    let that = this;
    let apiUrl = that.getApiUrl();
    let apid = that.getAPPid();
    if (this.globalData.userInfo.error != 'error') {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.openSetting({
        success: function (res) {
          wx.getSetting({
            success: function (res) {
              wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                  res.userInfo.error = 'ok';
                  let info = res.userInfo;
                  wx.login({
                    success: function (res) {
                      if (res.code) {
                        wx.request({
                          url: apiUrl + '/login',
                          data: {
                            appid: apid,
                            code: res.code,
                            name: info.nickName,
                            logo: info.avatarUrl
                          },
                          header: {
                            'content-type': 'application/x-www-form-urlencoded'
                          },
                          method: "POST",
                          dataType: 'json',
                          success: function (res) {
                            info.userId = res.data.data;
                            that.globalData.userInfo = info;
                            typeof cb == "function" && cb(that.globalData.userInfo);
                          }
                        });
                      }
                    }
                  });

                },
                fail: function (res) {
                  that.globalData.userInfo = { error: 'error', nickName: '游客登录' };
                }
              });
            }
          })
        }
      })
    }
  },

  // 获取获取缓存的函数
  gethuancun:function(fn){
    var that=this;
    wx.getStorage({
      key: 'backdata02',
      success: function(res) {
        fn(res)
      },
    })
  },

  globalData: {
    userInfo: null,
    sign: "yanse01",
    callback:null,
    callback02: null,
  }
})