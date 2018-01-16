//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function(cb) {
    let that = this;
    let apiUrl = that.getApiUrl();
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          res.userInfo.error='ok';
          let info = res.userInfo;
          wx.login({
            success: function (res) {
              if (res.code) {
                wx.request({
                  url: apiUrl+'/login',
                  data: {
                    appid:'wx1fffbddb6cfa309f',
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
                  }
                });
              }
            }
          });
          that.globalData.userInfo = info;
          typeof cb == "function" && cb(that.globalData.userInfo);
        },
        fail:function(res){
          that.globalData.userInfo = { error: 'error', nickName:'游客'};
        }
      });
    }
  },

  globalData: {
    userInfo: null
  },
  getApiUrl:function(){
    let scheme = 'http://';
    let host = 'wxapp.qizuang.com';
    let apiUrl = scheme + host;
    return apiUrl
  },
  getImgUrl:function(){
    let scheme = 'http://';
    let host = 'staticqn.qizuang.com/';
    let imgUrl = scheme + host;
    return imgUrl
  },
  getCityDataUrl:function(){
    let that = this;
    let apiUrl = that.getApiUrl();
    wx.request({
      url: apiUrl+'/zxjt/getcityurl',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        return res.data.data
      }
    })
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
        key: k + 't',
        data: timestamp + '',
      });
    } else {
      wx.removeStorageSync(k + 't');
    }
  },
  // 获取缓存方法
  getNewStorage: function (k, def) {
    let deadtime = parseInt(wx.getStorageSync(k + 't'));// 获取缓存的过期时间
    let nowTime = Date.parse(new Date()) / 1000;
    if (deadtime) {
      if (deadtime < nowTime) {// 当时间到期
        console.log('过期了')
        if (def) {
          return def
        } else {
          return
        }
      } else {
        console.log('未过期')
        let res = wx.getStorageSync(k);
        if (res) {
          return res;
        } else {
          return def;
        }
      }
    }else{// 如果没有设置缓存时间
      let res = wx.getStorageSync(k);
      if (res) {
        return res;
      } else {
        return def;
      }
    }
  }
})
