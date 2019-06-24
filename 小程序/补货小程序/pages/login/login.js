
const app = getApp()
let apiUrl = app.getApiUrl();
let token = app.globalData.token
function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    cancelColor: "#ff9700",
    confirmColor: "#ff9700",
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}
function alerttishi(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    cancelColor: "#ff9700",
    confirmColor: "#ff9700",
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usernameval: "",
    passwordval: "",
    passid: '', //组织id
    flag:undefined,
    canIUse:undefined,
    code:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()

    let that = this;
    that.getLocation();

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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      flag:true
    })
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
  //获取位置
  getLocation: function () {
    let that = this;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        wx.request({
          url: apiUrl + '/hotel/condition',
          data: {
            hotelLongitude: res.longitude,
            hotelLatitude: res.latitude,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: "GET",
          success: function (res) {
            console.log(res.data.data.encryptedOrgId)
            that.setData({
              passid: res.data.data.encryptedOrgId
            })
            wx.setStorageSync("hotelid", res.data.data.id)
            wx.setStorageSync("organizationid", res.data.data.encryptedOrgId)
          },
          fail: function (error) {
            alertViewWithCancel("提示", error, function () {
            });
          }
        });

      }
    })
  },

  forgetpassword: function () {
    let that = this;
    alertViewWithCancel("","请联系管理员", function () {
    });
  },


  //授权
  getPower: function () {
    let that = this;
    wx.getSetting({
      success: function (res) {
        var statu = res.authSetting;
        if (!statu['scope.userLocation']) {
          wx.showModal({
            title: '是否授权',
            content: '需要获取您的地理位置，请确认授权，否则将无法正常登录',
            success: function (tip) {
              if (tip.confirm) {
                wx.openSetting({
                  success: function (data) {
                    if (data.authSetting["scope.userLocation"] === true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      that.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '调用授权窗口失败',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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

  //登录授权
   
   shouquanlogin:function(e){
     let that=this;
     if (!e.detail.userInfo) {
       console.log("没有授权")
       
     }else{
       console.log("授权了")
       app.getuserinfo(function (res) {
          console.log(res)
         that.loginniu()
         
       }) 
     }
   },


  loginniu: function (e) {
    let that = this;

    if (that.data.passid) {
      if (that.data.usernameval.length < 1) {
        alerttishi("提示", "请输入用户名", function () {
        });
        return;
      }
      if (that.data.passwordval.length < 1) {
        alerttishi("提示", "请输入密码", function () {
        });
        return;
      }
      if (that.data.flag){
        that.setData({
          flag:false
        })
        wx.showLoading({
          title: "登录中"
        });
        wx.request({
          url: apiUrl + '/user/login/' + that.data.passid,
          data: {
            account: that.data.usernameval,
            password: that.data.passwordval,
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
              let token = "Bearer" + res.data.data
              wx.setStorageSync("username", that.data.usernameval)
              wx.setStorageSync("Token", token)
              wx.navigateTo({
                url: '../housematterlist/housematterlist',
              })
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
      }
      
    } else {
      alertViewWithCancel("提示", "请允许获取登录权限", function () {
        that.getPower();
      });
    }
  }
})