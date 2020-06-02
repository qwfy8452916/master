const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
let apiUrl = app.getApiUrl();
let token = app.globalData.token;

function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx2my.showModal({
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
  wx2my.showModal({
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
    defaultdata: [{
      authz: 'M:MH_CAB_INSTALL',
      path: "/pages/cabinetlist/cabinetlist?tabindex=" + 1,
      id: 1
    }, {
      authz: 'M:MH_REPL_RESTOCK',
      path: "/pages/housematterlist/housematterlist?tabindex=" + 2,
      id: 2
    }, {
      authz: 'M:MH_DELIV_DELIVERY',
      path: "/pages/deliveredlist/deliveredlist?tabindex=" + 3,
      id: 3
    }, {
      authz: 'M:MH_USER_MY_RESTOCK',
      path: "/pages/personalcenter/personalcenter?tabindex=" + 4,
      id: 4
    }],
    usernameval: "",
    passwordval: "",
    passid: '',
    //组织id
    flag: true,
    canIUse: undefined,
    code: '',
    popup: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx2my.clearStorage();
    this.setData({
      flag: true,
      defaultdata: [{
        authz: 'M:MH_CAB_INSTALL',
        path: "/pages/cabinetlist/cabinetlist?tabindex=" + 1,
        id: 1
      }, {
        authz: 'M:MH_REPL_RESTOCK',
        path: "/pages/housematterlist/housematterlist?tabindex=" + 2,
        id: 2
      }, {
        authz: 'M:MH_DELIV_DELIVERY',
        path: "/pages/deliveredlist/deliveredlist?tabindex=" + 3,
        id: 3
      }, {
        authz: 'M:MH_USER_MY_RESTOCK',
        path: "/pages/personalcenter/personalcenter?tabindex=" + 4,
        id: 4
      }]
    });
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
  jumpquan: function () {
    let that = this;
    app.isautho(function (res) {
      if (res == '授权') {
        that.loginniu();
      } else if (res == '没有授权') {
        wx2my.redirectTo({
          url: '../shouquan/shouquan?sendid=' + 'login'
        });
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  //获取位置
  getLocation: function () {
    let that = this;
    wx2my.getLocation({
      type: 'wgs84',
      // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        wx2my.request({
          url: apiUrl + '/hotel/condition',
          data: {
            hotelLongitude: res.longitude,
            hotelLatitude: res.latitude
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: "GET",
          success: function (res) {
            console.log(res.data.data.encryptedOrgId);
            that.setData({
              passid: res.data.data.encryptedOrgId
            });
            wx2my.setStorageSync("hotelid", res.data.data.id);
            wx2my.setStorageSync("organizationid", res.data.data.encryptedOrgId);
          },
          fail: function (error) {
            alertViewWithCancel("提示", error, function () {});
          }
        });
      }
    });
  },
  forgetpassword: function () {
    let that = this;
    alertViewWithCancel("", "请联系管理员", function () {});
  },
  //授权
  getPower: function () {
    let that = this;
    wx2my.getSetting({
      success: function (res) {
        var statu = res.authSetting;

        if (!statu['scope.userLocation']) {
          wx2my.showModal({
            title: '是否授权',
            content: '需要获取您的地理位置，请确认授权，否则将无法正常登录',
            success: function (tip) {
              if (tip.confirm) {
                wx2my.openSetting({
                  success: function (data) {
                    if (data.authSetting["scope.userLocation"] === true) {
                      wx2my.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      });
                      that.getLocation();
                    } else {
                      wx2my.showToast({
                        title: '授权失败',
                        icon: 'success',
                        duration: 1000
                      });
                    }
                  }
                });
              }
            }
          });
        }
      },
      fail: function (res) {
        wx2my.showToast({
          title: '调用授权窗口失败',
          icon: 'success',
          duration: 1000
        });
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  Username: function (e) {
    this.setData({
      usernameval: e.detail.value
    });
  },
  Password: function (e) {
    this.setData({
      passwordval: e.detail.value
    });
  },
  //登录授权
  shouquanlogin: function (e) {
    let that = this;

    

    if (!e.detail.userInfo) {
      console.log("没有授权");
    } else {
      console.log("授权了");
      app.getuserinfo(function (res) {
        console.log(res);
        that.loginniu();
      });
    }
  },
  loginniu: function (e) {
    let that = this; // if (that.data.passid) {


    if (that.data.usernameval.length < 1) {
      alerttishi("提示", "请输入用户名", function () {});
      return;
    }

    if (that.data.passwordval.length < 1) {
      alerttishi("提示", "请输入密码", function () {});
      return;
    }

    if (that.data.flag) {
      that.setData({
        flag: false
      });
      wx2my.showLoading({
        title: "登录中"
      }); //获取登录凭证code

      my.getAuthCode({
        // scopes: ['auth_base'],
        success(resdata) {
          console.log(resdata.authCode)
          if (resdata.authCode) {
            wx2my.request({
              url: apiUrl + '/user/login',
              data: {
                appletType: 'HOTEL_APPLET',
                // code: resdata.authCode,
                account: that.data.usernameval,
                password: that.data.passwordval,
                orgTypes: [3],
                appId: 'wx_hotel_app_id',
                appSecret: 'wx_hotel_app_secret'
              },
              header: {
                'content-type': 'application/json'
              },
              method: "POST",
              success: function (res) {
                if (res.data.code == 0) {
                  wx2my.hideLoading();
                  that.setData({
                    flag: true
                  });

                  if (res.data.data.loginType == 3) {
                    let token = "Bearer" + res.data.data.token;
                    wx2my.setStorageSync("username", that.data.usernameval);
                    wx2my.setStorageSync("empid", res.data.data.empId);
                    wx2my.setStorageSync("userid", res.data.data.hotelDTO.adminEmpId);
                    wx2my.setStorageSync("Token", token);
                    wx2my.setStorageSync("hotelid", res.data.data.hotelDTO.id);
                    wx2my.setStorageSync("organizationid", res.data.data.hotelDTO.encryptedOrgId);
                    wx2my.setStorageSync("empIsBind", res.data.data.empIsBind);
                    wx2my.setStorageSync("subRespBeanList", res.data.data.subRespBeanList); // app.jurisdiction(function (res) {
                    //   console.log(res)
                    // })
                    // return false

                    that.getauthzbtn(token);
                    that.getauthztabbar(token); // wx.navigateTo({
                    //   url: '../housematterlist/housematterlist',
                    // })
                  } else {
                    alertViewWithCancel("提示", '不是酒店类型用户!', function () {});
                  }
                } else {
                  wx2my.hideLoading();
                  that.setData({
                    flag: true
                  });
                  alertViewWithCancel("提示", res.data.msg, function () {});
                }
              },
              fail: function (error) {
                wx2my.hideLoading();
                that.setData({
                  flag: true
                });
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
        },
        fail:function(error){
           wx2my.hideLoading();
           console.log("报错")
        },

      });
    } // } else {
    //   alertViewWithCancel("提示", "请允许获取登录权限", function () {
    //     that.getPower();
    //   });
    // }

  },

  getauthztabbar(token) {
    let that = this;
    wx2my.request({
      url: apiUrl + '/authz/perm/emp/map?resType=1',
      // data: {
      //   resType: 1
      // },
      header: {
        'content-type': 'application/json',
        'Authorization': token
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode);
          return false;
        }

        if (res.data.code == 0) {
          wx2my.setStorageSync("tabbardata", res.data.data);

          for (var i = 0; i < that.data.defaultdata.length; i++) {
            if (!res.data.data['M:MH_CAB_INSTALL'] && that.data.defaultdata[i].authz == 'M:MH_CAB_INSTALL') {
              that.data.defaultdata.splice(i, 1);
              that.setData({
                defaultdata: that.data.defaultdata
              });
            }

            if (!res.data.data['M:MH_REPL_RESTOCK'] && that.data.defaultdata[i].authz == 'M:MH_REPL_RESTOCK') {
              that.data.defaultdata.splice(i, 1);
              that.setData({
                defaultdata: that.data.defaultdata
              });
            }

            if (!res.data.data['M:MH_DELIV_DELIVERY'] && that.data.defaultdata[i].authz == 'M:MH_DELIV_DELIVERY') {
              that.data.defaultdata.splice(i, 1);
              that.setData({
                defaultdata: that.data.defaultdata
              });
            }

            if (!res.data.data['M:MH_USER_MY_RESTOCK'] && that.data.defaultdata[i].authz == 'M:MH_USER_MY_RESTOCK') {
              that.data.defaultdata.splice(i, 1);
              that.setData({
                defaultdata: that.data.defaultdata
              });
            }
          }

          console.log(that.data.defaultdata);

          if (that.data.defaultdata.length > 0) {
            wx2my.redirectTo({
              url: that.data.defaultdata[0].path
            });
          } else {
            wx2my.redirectTo({
              url: "/pages/personalcenter/personalcenter?tabindex=" + 4
            });
          }
        } else {
          alertViewWithCancel('', error, function () {});
        }
      },
      fail: function (error) {
        alertViewWithCancel('',error, function () {});
      }
    });
  },

  getauthzbtn(token) {
    let that = this;
    wx2my.request({
      url: apiUrl + '/authz/perm/emp/map?resType=3',
      // data: {
      //   resType: 3
      // },
      header: {
        'content-type': 'application/json',
        'Authorization': token
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode);
          return false;
        }

        if (res.data.code == 0) {
          wx2my.setStorageSync("buttondata", res.data.data);
        } else {
          alertViewWithCancel('', error, function () {});
        }
      },
      fail: function (error) {
        alertViewWithCancel('',error, function () {});
      }
    });
  }

});