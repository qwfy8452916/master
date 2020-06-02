const wx2my = require('./wx2my');
const Behavior = require('./Behavior');
//app.js
App({
  onLaunch: function () {
    var wxUpgrade = require("./upGrade/upGrade");

    wxUpgrade.getGolabalData(this.globalData.updataObj);
    wxUpgrade.autoUpdate(); // 展示本地存储能力

    // var logs = wx2my.getStorageSync('logs') || [];
    // logs.unshift(Date.now());
    // wx2my.setStorageSync('logs', logs);
    this.globalData.hotelId = wx2my.getStorageSync("hotelid");
    this.globalData.organizationid = wx2my.getStorageSync("organizationid");
    this.globalData.token = wx2my.getStorageSync("Token");
    this.getuserinfo(); // 登录

    // wx.login({
    //   success: res => {// 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // }); // 获取用户信息

    wx2my.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log("授权");
          
      //         my.getAuthCode({
            
      //         scopes: 'auth_user',
              
      //         success: (res) => { //获取用户信息
              
      //         my.getAuthUserInfo({
              
      //         success: (res) => {
      //         console.log(res)
              
      //         }
            
      //       });
      //     }
      // })


          // my.getAuthUserInfo({
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo; // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     console.log(res)
          //     // 所以此处加入 callback 以防止这种情况

          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res);
          //     }
          //   }
          // });
        } else {
          console.log("没有授权");
        }
      }
    });
  },
  // getuserinfo: function (cb) {
  //   let that = this;
  //   wx2my.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             this.globalData.userInfo = res.userInfo;
  //             wx.login({
  //               success: function (res) {
  //                 console.log(res.code);
  //                 that.globalData.code = res.code;
  //                 wx2my.setStorageSync("code", res.code);
  //                 that.globalData.userInfo.code = res.code;
  //                 typeof cb == "function" && cb(that.globalData.userInfo);
  //               }
  //             }); // 可以将 res 发送给后台解码出 unionId
  //             // typeof cb == "function" && cb(this.globalData.userInfo)
  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况

  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res);
  //             }
  //           }
  //         });
  //       } else {
  //         this.globalData.userInfo = {
  //           error: 'error',
  //           nickName: '',
  //           userId: ''
  //         };
  //         typeof cb == "function" && cb(this.globalData.userInfo);
  //       }
  //     }
  //   });
  // },

 getuserinfo: function (cb) {
    let that = this;
    wx2my.getSetting({
      success: res => {
        if (res.authSetting['userInfo']) {


          my.getAuthCode({
            
              scopes: 'auth_base',
              
              success: (res) => { //获取用户信息
              
              my.getAuthUserInfo({
              
              success: (res) => {
                typeof cb == "function" && cb(res); 
                console.log(res)
              
              }
            
            });
          }
        })


          // my.getAuthUserInfo({
 
          //   success: (res) => {
          //     console.log(res)
          //     this.globalData.userInfo=res;
          //     typeof cb == "function" && cb(res);           
          //    }          
          //   })


          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     this.globalData.userInfo = res.userInfo;
          //     wx.login({
          //       success: function (res) {
          //         console.log(res.code);
          //         that.globalData.code = res.code;
          //         wx2my.setStorageSync("code", res.code);
          //         that.globalData.userInfo.code = res.code;
          //         typeof cb == "function" && cb(that.globalData.userInfo);
          //       }
          //     }); // 可以将 res 发送给后台解码出 unionId
          //     // typeof cb == "function" && cb(this.globalData.userInfo)
          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况

          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res);
          //     }
          //   }
          // });
        } else {
          this.globalData.userInfo = {
            error: 'error',
            nickName: '',
            userId: ''
          };
          typeof cb == "function" && cb(this.globalData.userInfo);
        }
      }
    });
  },



  overtime: function () {
    wx2my.redirectTo({
      url: '../login/login'
    });
    wx2my.showToast({
      title: '登录超时,重新登录!',
      icon: 'none',
      duration: 1200
    });
  },
  isautho: function (cb) {
    wx2my.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log("授权");
          typeof cb == "function" && cb("授权");
        } else {
          typeof cb == "function" && cb("没有授权");
        }
      }
    });
  },
  getApiUrl: function () {
    //  let apiUrl = 'http://111.231.87.18/longan/api';
    // let apiUrl = 'https://api.kefangbao.com.cn/longan/api';
    // let apiUrl = 'http://172.16.200.165:9001/longan/api';
    // let apiUrl = 'http://172.16.200.89:9001/longan/api';
    let apiUrl = 'http://172.16.200.90:9001/longan/api'; 
    // let apiUrl = 'http://192.168.1.122:9001/longan/api';

    return apiUrl;
  },
  globalData: {
    userInfo: null,
    hotelId: "",
    organizationid: "",
    token: "",
    code: ""
  }
});