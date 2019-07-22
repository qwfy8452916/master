//app.js
App({
  data: {
    requestUrl: 'http://api.kefangbao.com.cn/longan/api/',
  },
  onLaunch: function (options) {
    // console.log(options);

    wx.setStorage({
      key: 'scene',
      // data: options.scene,
      data: 1011,
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log("code值=" + res.code);
        wx.setStorage({
          key: 'code',
          data: res.code
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // wx.setStorage({
              //   key: 'AlluserInfo',
              //   data: res
              // });
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
                // wx.setStorage({
                //   key: 'AlluserInfo',
                //   data: res
                // });
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})