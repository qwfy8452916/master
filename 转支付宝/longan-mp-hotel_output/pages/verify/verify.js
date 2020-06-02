const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
// pages/verify/verify.js
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

Page({
  /**
   * 页面的初始数据
   */
  data: {
    defaultdata: [{
      authz: 'M:MH_CAB_INSTALL',
      path: "/pages/cabinetlist/cabinetlist?tabindex=" + 0,
      id: 0
    }, {
      authz: 'M:MH_REPL_RESTOCK',
      path: "/pages/housematterlist/housematterlist?tabindex=" + 1,
      id: 1
    }, {
      authz: 'M:MH_DELIV_DELIVERY',
      path: "/pages/deliveredlist/deliveredlist?tabindex=" + 2,
      id: 2
    }, {
      authz: 'M:MH_USER_MY_RESTOCK',
      path: "/pages/personalcenter/personalcenter?tabindex=" + 3,
      id: 3
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx2my.showLoading({title:"加载中"});
    let that = this; //获取登录凭证code

    wx.login({
      success(res) {
        if (res.code) {
          wx2my.request({
            url: apiUrl + '/user/check/binTang',
            data: {
              appletType: 'HOTEL_APPLET',
              code: res.code,
              appId: 'wx_hotel_app_id',
              appSecret: 'wx_hotel_app_secret'
            },
            header: {
              'content-type': 'application/json'
            },
            method: "POST",
            success: function (resdata) {
              if (resdata.data.code == 0) {
                if (resdata.data.data != null) {
                  //验证通过
                  if (resdata.data.data.loginType == 3) {
                    let token = "Bearer" + resdata.data.data.token;
                    wx2my.setStorageSync("username", resdata.data.empName);
                    wx2my.setStorageSync("empid", resdata.data.data.empId);
                    wx2my.setStorageSync("userid", resdata.data.data.hotelDTO.adminEmpId);
                    wx2my.setStorageSync("Token", token);
                    wx2my.setStorageSync("hotelid", resdata.data.data.hotelDTO.id);
                    wx2my.setStorageSync("organizationid", resdata.data.data.hotelDTO.encryptedOrgId);
                    wx2my.setStorageSync("empIsBind", resdata.data.data.empIsBind);
                    that.getauthzbtn(token);
                    that.getauthztabbar(token);
                  } else {
                    alertViewWithCancel("提示", '不是酒店类型用户!', function () {
                      wx2my.redirectTo({
                        url: '../login/login'
                      });
                    });
                  }
                } else {
                  //验证不通过
                  wx2my.setStorageSync("empIsBind", 0);
                  wx2my.redirectTo({
                    url: '../login/login'
                  });
                }
              } else {
                alertViewWithCancel("提示", resdata.data.msg, function () {});
              }

              wx2my.hideLoading();
            },
            fail: function (error) {
              wx2my.hideLoading();
              alertViewWithCancel("提示", error, function () {});
            }
          });
        } else {
          wx2my.hideLoading();
          wx2my.showToast({
            title: '登录失败，' + res.errMsg,
            icon: 'none',
            duration: 2000
          });
        }
      }

    });
  },

  getauthzbtn(token) {
    let that = this;
    wx2my.request({
      url: apiUrl + '/authz/perm/emp/map',
      data: {
        resType: 3
      },
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
          alertViewWithCancel(res.data.msg, error, function () {});
        }
      },
      fail: function (error) {
        alertViewWithCancel(res.data.msg, error, function () {});
      }
    });
  },

  getauthztabbar(token) {
    let that = this;
    wx2my.request({
      url: apiUrl + '/authz/perm/emp/map',
      data: {
        resType: 1
      },
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
              url: "/pages/personalcenter/personalcenter?tabindex=" + 3
            });
          }
        } else {
          alertViewWithCancel(res.data.msg, error, function () {});
        }
      },
      fail: function (error) {
        alertViewWithCancel(res.data.msg, error, function () {});
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
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx2my.hideLoading();
  },

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