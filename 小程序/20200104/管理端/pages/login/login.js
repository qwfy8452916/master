// pages/login/login.js
const app = getApp()
let apiUrl = app.getApiUrl();
let token = app.globalData.token
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
    usernameval:'',
    passwordval:'',
    flag: true,
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 订阅消息
  subscribeMsg: function(){
    let that = this;
    wx.requestSubscribeMessage({
      tmplIds: ['99jFw_Z9HmAe78f-vlNOI9MDDopnnwMqAWWAnYf75bw'],
      success(res) { 
        console.log(res);
      },
      fail(error){
        console.log(error);
      }
    })
  },



  shouquanlogin: function (e) {
    let that = this;


    if (!e.detail.userInfo) {
      console.log("没有授权")

    } else {
      console.log("授权了")
      app.getuserinfo(function (res) {
        console.log(res)
        that.login()

      })
    }
  },
  Username: function (e) {
    this.setData({
      usernameval: e.detail.value
    })
  },
  Password: function (e) {
    this.setData({
      passwordval: e.detail.value
    })
  },
  login: function (e) {
    let that = this;
    // if (that.data.passid) {
    if (that.data.usernameval.length < 1) {
      alertViewWithCancel("提示", "请输入用户名", function () {
      });
      return;
    }
    if (that.data.passwordval.length < 1) {
      alertViewWithCancel("提示", "请输入密码", function () {
      });
      return;
    }
    if (that.data.flag) {
      that.setData({
        flag: false
      })
      wx.showLoading({
        title: "登录中"
      });
      //获取登录凭证code
      wx.login({
        success(resdata) {
          if (resdata.code) {
            wx.request({
              url: apiUrl + '/user/login',
              data: {
                appId: 'wx_manage_app_id',
                appSecret: 'wx_manage_app_secret',
                appletType: 'MANAGE_APPLET',
                code: resdata.code,
                account: that.data.usernameval,
                password: that.data.passwordval,
                orgTypes: [2, 6, 7, 8]
              },
              header: {
                'content-type': 'application/json'
              },
              method: "POST",
              success: function (res) {
                if (res.data.code == 0) {

                  wx.hideLoading()
                  that.setData({
                    flag: true
                  })
                  let loginT = res.data.data.loginType;
                  console.log(loginT)
                  if (loginT == 2 || loginT == 6 || loginT == 7 || loginT == 8) {
                    let token = "Bearer" + res.data.data.token
                    wx.setStorageSync("username", that.data.usernameval)
                    wx.setStorageSync("empid", res.data.data.empId)
                    wx.setStorageSync("orgAs", res.data.data.loginType)
                    wx.setStorageSync("allyId", res.data.data.allyId)
                    wx.setStorageSync("Token", token)
                    wx.setStorageSync("accountType", res.data.data.accountType)
                    wx.setStorageSync("publicCodeSub", res.data.data.subRespBeanList)
                    wx.setStorageSync("empIsBind", res.data.data.empIsBind)

                    wx.redirectTo({
                      url: '../user/user',
                    })
                    // app.jurisdiction(function (res) {
                    //   console.log(res)
                    // })
                    // return false

                    // that.getauthztabbar(token);
                    // that.getauthzbtn(token);


                    // wx.navigateTo({
                    //   url: '../housematterlist/housematterlist',
                    // })
                  } else {
                    alertViewWithCancel("提示", '不是合作伙伴账号!', function () {
                    });
                  }


                } else {
                  wx.hideLoading()
                  that.setData({
                    flag: true
                  })
                  alertViewWithCancel("提示", res.data.msg, function () {
                  });
                }
              },
              fail: function (error) {
                wx.hideLoading()
                that.setData({
                  flag: true
                })
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
    }

    // } else {
    //   alertViewWithCancel("提示", "请允许获取登录权限", function () {
    //     that.getPower();
    //   });
    // }
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