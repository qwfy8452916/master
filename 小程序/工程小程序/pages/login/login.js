// pages/login/login.js
const app = getApp()
let apiUrl = app.getApiUrl();

function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText:"确定",
    cancelColor:"",
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
    phonemessage:"请联系管理员",
    usernameval:"", //用户名
    passwordval:"", //密码
    passid:"",   //组织id
    wifiname:"",  //wifi名称
    wifipassword:"",  //wifi密码
    flag:undefined,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.getLocation();
  },


//获取位置
getLocation:function(){
  let that=this;
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
          wx.setStorageSync("passid", res.data.data.encryptedOrgId)
        },
        fail: function (error) {
          alertViewWithCancel("提示", error, function () {
          });
        }
      });

    }
  })
},


  hotel:function(){
    wx.navigateTo({
      url: '../hotel/hotel',
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
  forgetpassword:function(){
    let that=this;
    
    alertViewWithCancel("提示", that.data.phonemessage, function () {
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  Username:function(e){
    this.setData({
      usernameval: e.detail.value
    })
  }, 
  Password: function (e) {
    this.setData({
      passwordval: e.detail.value
    })
  },
  loginniu:function(e){
    let that=this;
    console.log(that.data.passid)
    if (that.data.passid){
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
          // url: 'http://192.168.1.121:9001/longan/api' + '/user/login/' + '01ced2a0',
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
              that.setData({
                flag: true
              })
              wx.hideLoading()
              let token = "Bearer" + res.data.data
              wx.setStorageSync("Token", token)
              wx.reLaunch({
                url: '../index/index',
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
            that.setData({
              flag: true
            })
            wx.hideLoading()
            alertViewWithCancel("提示", error, function () {
            });
          }
        })
      }
    }else{
      alertViewWithCancel("提示","请允许获取登录权限", function () {
        that.getPower();
      });
    }
    
  },
  
  //授权
  getPower:function(){
    let that=this;
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


  //获取wifi名及密码
  getwifi:function(){
    let that=this;
    wx.request({
      url: apiUrl + '/cabinet/qrcode',
      data: {
        qrcode:'22TBSK',
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          
          that.setData({
            wifiname: res.data.data.wifiSsid,
            wifipassword: res.data.data.wifiPassword
          })

          console.log(that.data.wifiname)
          console.log(that.data.wifipassword)
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
  },

  //点击链接
  connect: function () {
    let that = this;
    that.connectWifi()
    that.startWifi()
  },


  connectWifi: function () {

    var that = this;

    //检测手机型号

    wx.getSystemInfo({

      success: function (res) {

        var system = '';

        if (res.platform == 'android') system = parseInt(res.system.substr(8));

        if (res.platform == 'ios') system = parseInt(res.system.substr(4));

        if (res.platform == 'android' && system < 6) {

          wx.showToast({

            title: '手机版本不支持',

          })

          return

        }

        if (res.platform == 'ios' && system < 11.2) {

          wx.showToast({

            title: '手机版本不支持',

          })

          return

        }
      }
    })
  },


  //初始化 Wi-Fi 模块

  startWifi: function () {

    var that = this

    wx.startWifi({

      success: function (res) {
        console.log(res.errMsg)

        //请求成功连接Wifi

        that.Connected();

      },

      fail: function (res) {
        console.log(res)

        // this.setData({

        wx.showToast({

          title: '接口调用失败',

        })

        // });

      }

    })

  },


  // 连接已知Wifi

  Connected: function () {
    console.log(22)

    var that = this

    wx.connectWifi({

      // SSID: that.data.wifiname,

      // password: that.data.wifipassword,

      SSID: "360WiFi-61BF83",
      password: "",

      success: function (res) {

        wx.showToast({

          title: 'wifi连接成功',

        })

      },

      fail: function (res) {

        wx.showToast({

          title: 'wifi连接失败',

        })

      }

    })

  },


})