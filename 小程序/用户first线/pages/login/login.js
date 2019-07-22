//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cabCode: '',
    scene: '',
    isvirtual: ''
  },
  onLoad: function (options) { 
    let that = this;
    let cabCode = options.q;
    let cabCodenum = cabCode.substr(0,2);
    console.log(cabCode);
    // cabCode = cabCode.substring(2);
    let isvirtual;
    if (cabCodenum == '02') {//02虚拟柜
      isvirtual = false;
    } else {
      isvirtual = true;
    }
    wx.setStorage({
      key: 'isvirtual',
      data: isvirtual,
    });
    that.setData({
      cabCode: cabCode,
      isvirtual: isvirtual
    });
    wx.getStorage({
      key: 'scene',
      success: function(res) {
        that.setData({
          scene : res.data          
        })
      },
    })
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      that.redirectfun();
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        that.redirectfun();
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          that.redirectfun();
        },
        fail: res => {
          wx.showModal({
            title: '提示',
            content: '授权失败请重新授权登陆',
            showCancel: false
          });
        }
      })
    }
  },
  getUserInfo: function (e) {
    let that = this;
    let userInfo = e.detail.userInfo;
    let encryptedData = e.detail.encryptedData;
    let iv = e.detail.iv;
    if (userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      wx.setStorage({
        key: 'userInfo',
        data: userInfo
      });
      that.redirectfun(encryptedData, iv);
    } else {
      wx.showModal({
        title: '提示',
        content: '取消授权登陆将无法体验客房宝哟，请前往授权登陆吧！',
        showCancel: false
      });
    }
  },

  redirectfun: function (encryptedData, iv){
    let that = this;
    // if (that.data.scene == 1011){//判断进场方式  1011:扫码进入

    const aa = 1011;
    if (aa == 1011) {
      wx.getStorage({
        key: 'code',
        success: function (res) {
          let codeval = res.data;
          wx.request({
            url: app.data.requestUrl + 'user/customer/loginByWX',
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: "post",
            data: {
              code: codeval,
              encryptedData: encryptedData,
              iv: iv
            },
            success(res) {
              let resdata = res.data;
              let resdatas = res.data.data;
              wx.setStorageSync('token', resdatas.customerDTO.token);

              wx.setStorage({
                key: 'userid',
                data: resdatas.customerDTO.id
              })
              if (that.data.isvirtual){
                wx.redirectTo({
                  url: '../index/index?cabCode=' + that.data.cabCode + '&userid=' + resdatas.customerDTO.id
                })
              }else{
                wx.redirectTo({
                  url: '../hotelmall/hotelmall?cabCode=' + that.data.cabCode
                })
              }
            }
          })
        },
      })
      
    }else{

      wx.getStorage({
        key: 'code',
        success: function (res) {
          wx.request({
            url: app.data.requestUrl + 'user/customer/loginByWX',
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: "post",
            data: {
              code: res.data,
              encryptedData: encryptedData,
              iv: iv
            },
            success(res) {
              let resdata = res.data;
              let resdatas = res.data.data;
              if (resdata.code == 0){
                if (resdatas.customerDTO.isNewUser){
                  
                  wx.setStorage({
                    key: 'operatorImageList',
                    data: resdatas.operatorImageList
                  });
                  wx.redirectTo({
                    url: '../adview/adview'
                  })

                }else{
                  wx.setStorage({
                    key: 'userid',
                    data: resdatas.customerDTO.id
                  });
                  wx.setStorage({
                    key: 'isNewUser',
                    data: resdatas.customerDTO.isNewUser
                  })
                  console.log(resdatas.customerDTO.token);
                  wx.setStorageSync('token', resdatas.customerDTO.token);
                  if (that.data.isvirtual) {
                    wx.redirectTo({
                      url: '../index/index?cabCode=' + resdatas.cabinetQrcode + '&userid=' + resdatas.customerDTO.id
                    })
                  } else {
                    wx.redirectTo({
                      url: '../hotelmall/hotelmall?cabCode=' + that.data.cabCode
                    })
                  }
                }
              }
            }
          })
        }
      })
    }
  }

})
