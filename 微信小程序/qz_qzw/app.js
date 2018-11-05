//app.js
var config = require('./config');

App({
  onLaunch: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    if(options.src){
      this.globalData.sourceMark = options.src;
    }
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
          that.globalData.userInfo = { error: 'error', nickName: '点击登录', userId: "", avatarUrl: "../../img/person.png"};
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

  // 设置缓存方法
  setNewStorage: function (k, v, t) {
    // 设置缓存数据
    wx.setStorageSync(k, v);
    let s = parseInt(t);// 设置的缓存时间 s/秒
    if (s > 0) {
      let timestamp = Date.parse(new Date());// 系统当前时间
      timestamp = (timestamp / 1000) + s; //缓存到期时间点
      // 存储缓存时间
      wx.setStorage({
        key: k + 'Time',
        data: timestamp + '',
      });
    } else {
      wx.removeStorageSync(k + 'Time');
    }
  },
  // 获取缓存方法
  getNewStorage: function (k, def) {
    let deadtime = parseInt(wx.getStorageSync(k + 'Time'));// 获取缓存的过期时间
    let nowTime = Date.parse(new Date()) / 1000;
    if (deadtime) {
      if (deadtime < nowTime) {// 当时间到期
        // console.log('过期了')
        if (def) {
          return def
        } else {
          return
        }
      } else {
        // console.log('未过期')
        let res = wx.getStorageSync(k);
        if (res) {
          return res;
        } else {
          return def;
        }
      }
    } else {// 如果没有设置缓存时间
      let res = wx.getStorageSync(k);
      if (res) {
        return res;
      } else {
        return def;
      }
    }
  },
  globalData: {
    sourceMark: config.service.sourceMark,
    userInfo: null,
    personNum: 851
  },
  getApiUrl: function () {
    let apiUrl = config.service.host_api;
    return apiUrl
  },
  getImgUrl: function () {
    let imgUrl = config.service.host_img;
    return imgUrl
  },
  getAPPid: function () {
    //局部小程序配置: ① 修改appid
    let appid = config.service.appid;
    return appid
  },
  changeTime: function (time) {
    let date = new Date(time * 1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let second = date.getSeconds();
    return year + "-" + month + "-" + day + "  " + hour + ":" + min + ":" + second;
  },
  getPVNum:function(){
    let time =new Date();
    let num = time.getFullYear()-900 + time.getMonth() + time.getDate() + time.getHours() + time.getMinutes() + time.getSeconds()+Math.ceil(Math.random()*100);
    return num;
  }, 
  getSq:function(){//授权引导
    let that = this;
    that.getUserInfo(function (res) {
      if (!res.userId) {
        wx.showModal({
          title: '授权登录',
          content: '允许齐装网获取您的登录授权',
          success: function (res) {
            if (res.confirm){
              wx.navigateTo({
                url: './../shouquan/index'
              })
            }
          }
        });
      }
    })
  },
  getScSq: function () {//授权引导
    let that = this;
    that.getUserInfo(function (res) {
      if (!res.userId) {
        wx.showModal({
          title: '授权登录',
          content: '允许齐装网获取您的登录授权',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: './../shouquan/index'
              })
            } else {
              wx.showToast({
                title: '收藏失败',
                icon: 'loading'
              })
            }
          }
        });
      }
    })
  },
  getPersonNum:function(){
    // 获取随机数的方法
    function GetRandomNum(Min, Max) {
      var Range = Max - Min;
      var Rand = Math.random();
      return (Min + Math.round(Rand * Range));
    }
    let personNum = GetRandomNum(300, 1000);;
    return personNum;
  }
})