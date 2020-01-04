//app.js
App({
  onLaunch: function () {
    var wxUpgrade = require("./upGrade/upGrade")
    wxUpgrade.getGolabalData(this.globalData.updataObj)
    wxUpgrade.autoUpdate()
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    wx.login({
      success: res => {
        let that = this
        wx.request({
          url: that.globalData.apiUrl + '/fs/investor/loginByWX', //仅为示例，并非真实的接口地址
          method: 'POST',
          data: {code: res.code},
          header: {'content-type': 'application/json'},
          success (res) {
            wx.hideLoading()
            if(res.data.code == 0){
              let resData = res.data.data.fsInvestorDTO
              console.log(resData)
              console.log(resData)
              console.log(resData)
              wx.setStorageSync('userAuth', {
                openid: resData.openId,
                id: resData.id
              })
              wx.setStorageSync('token',resData.token)
              wx.setStorageSync('isMember',resData.isMember)
              that.globalData.islogin = true;
              that.globalData.loginInfo = resData;
              if(resData.isSalesman){
                if (that.isSalesmanCallback){
                  that.isSalesmanCallback(res);
                }
              }
              if(resData.upperShareCode){
                if (that.upperShareCodeCallback){
                  that.upperShareCodeCallback(res);
                }
              }
              if(that.loginReturnBack){
                that.loginReturnBack(res)
              }
              if(that.shareReturnBack){
                that.shareReturnBack(res)
              }
            }
          },
          fail: function() {
            wx.hideLoading();
            console.log(err)
          }
        })
      },
      fail: function() {
        wx.showToast({
          title:'网络连接断开，请检查网络或稍后重试！',
          icon:'none'
        })
      }
    })
    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
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
          console.log('fail')
        }
      }
    })
  },
  
  globalData: {
    userInfo: null,
    islogin:false,
    // apiUrl:'http://172.16.200.89:9001/longan/api',
    // apiUrl:'http://192.168.1.83:9001/longan/api',
    // apiUrl:'http://192.168.1.121:9001/longan/api',
    // apiUrl:'https://api.kefangbao.com.cn/longan/api',
    apiUrl:'https://api.kefangbao.com.cn/longan/api',
    loginInfo:{},
    updataObj:{
      ifForce: true
    }
  }
}) 