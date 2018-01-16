//app.js
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
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
                }
            }
        })
    },
    globalData: {
        userInfo: null
    },
    getApiUrl: function () {
        let scheme = 'https://';
        let host = 'wxapp.qizuang.com';
        let apiUrl = scheme + host;
        return apiUrl
    },
    getImgUrl: function () {
        let scheme = 'http://';
        let host = 'staticqn.qizuang.com/';
        let imgUrl = scheme + host;
        return imgUrl
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
    }
})