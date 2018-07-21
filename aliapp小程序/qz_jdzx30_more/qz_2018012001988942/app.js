var config = require('./config')

App({
    globalData: {
        userInfo: null,
        // userInfo : {
        //     avatar:"https://tfs.alipayobjects.com/images/partner/T1hF4aXa4dXXXXXXXX",
        //     nickName:"470211273@qq.com",
        //     userId : 1000
        // },
        again:null,
        //局部小程序配置 ⑥ 配置推广渠道标识
        sourceMark: config.service.sourceMark
    },
    getApiUrl: function () {
        let apiUrl = config.service.host_api;
        return apiUrl
    },
    getImgUrl: function () {
        let imgUrl = config.service.host_img;
        return imgUrl
    },
    getAPPid:function(){
      //局部小程序配置: ① 修改appid
      let appid = config.service.appid;
      return appid
    },
    getAppTitle : function(){
        let title = config.service.xcxtitle;
        return title;
    },
    getUserInfo: function (callback) {
        let that = this;
        let apiUrl = that.getApiUrl();

        if (this.globalData.userInfo && this.globalData.userInfo.userId) {
            typeof callback == "function" && callback(this.globalData.userInfo)
        } else {
            //调用用户信息接口
            my.getAuthCode({
                scopes : "auth_user",
                //用户同意授权
                success : function(res){
                     my.getAuthUserInfo({
                         //成功获取到用户信息
                        success : function(userInfo){
                            if(res.authCode){
                                // 这里的作用是拿到用户在齐装网的userId，进而调出该用户的收藏
                                my.httpRequest({
                                    url: apiUrl + '/login/alipay',
                                    data: {
                                        appid: that.getAPPid(),
                                        code: res.authCode,
                                        name: userInfo.nickName,
                                        logo: userInfo.avatar
                                    },
                                    header: {
                                        'content-type': 'application/x-www-form-urlencoded'
                                    },
                                    method: "POST",
                                    dataType: 'json',
                                    //登录成功
                                    success: function (res) {
                                        if(res.data.data){
                                            //请求成功并获取到userId
                                            userInfo.userId = res.data.data;
                                            that.globalData.userInfo = userInfo;
                                            
                                            typeof callback == "function" && callback(that.globalData.userInfo);
                                        }else{
                                            //请求成功但未获取到userId
                                           my.alert({
                                               content : "网络忙，请稍后重试！"
                                           });
                                        }                                        
                                    },
                                    //授权登录失败
                                    fail : function(){
                                        my.alert({
                                            content : "网络忙，请稍后重试！"
                                        });
                                        userInfo.error = 'error';
                                        userInfo.userId = "";
                                        that.globalData.userInfo = userInfo;
                                        typeof callback == "function" && callback(that.globalData.userInfo);
                                    }
                                });
                            };

                        },
                        //获取不到用户信息
                        fail : function(){
                            that.globalData.userInfo = { error: 'error',nickName: '游客' };
                        }
                    });
                },
                //用户拒绝授权
                fail : function(){
                    that.globalData.userInfo = { error: 'error',nickName: '游客' };
                }
            });
        }
    },
    getLoginAgain: function (callback){
        let that = this;
        let apiUrl = that.getApiUrl();
        if (this.globalData.userInfo.error !='error'){
            typeof callback == "function" && callback(this.globalData.userInfo)
        }else{
            //调用用户信息接口
            my.getAuthCode({
                scopes : "auth_user",
                success : function(res){
                    my.getAuthUserInfo({
                        success : function(userInfo){
                            if(res.authCode){
                                // 这里的作用是拿到用户在齐装网的userId，进而调出该用户的收藏
                                my.httpRequest({
                                    url: apiUrl + '/login/alipay',
                                    data: {
                                        appid: that.getAPPid(),
                                        code: res.authCode,
                                        name: userInfo.nickName,
                                        logo: userInfo.avatar
                                    },
                                    header: {
                                        'content-type': 'application/x-www-form-urlencoded'
                                    },
                                    method: "POST",
                                    dataType: 'json',
                                    success: function (res) {
                                        if(res.data.data){
                                            userInfo.userId = res.data.data;
                                            that.globalData.userInfo = userInfo;
                                            typeof callback == "function" && callback(that.globalData.userInfo);
                                        }else{
                                            my.alert({
                                                content : "网络忙，请稍后重试！"
                                            });
                                        }                                        
                                    },
                                    fail : function(){
                                        my.alert({
                                            content : "网络忙，请稍后重试！"
                                        });
                                        userInfo.error = 'error';
                                        that.globalData.userInfo = userInfo;
                                        typeof callback == "function" && callback(that.globalData.userInfo);
                                    }
                                });
                            };
                        },
                        fail : function(){
                            that.globalData.userInfo = { error: 'error' };
                        }
                    });
                }
            });
        
        }
    },
    /**
     * 设置缓存方法
     * @params k 缓存key值
     * @params v 缓存值
     * @params t 缓存事件 单位毫秒，若为负值代表清除时间缓存
    */
  setNewStorage: function (k, v, t) {
      // 设置缓存数据
      my.setStorageSync({
        key : k,
        data : v
      });
      let s = t ? parseInt(t) : 604800;// 设置的缓存时间 s/秒，默认7天也就是604800
      if (s > 0) {
          let timestamp = Date.parse(new Date());// 系统当前时间
          timestamp = (timestamp / 1000) + s; //缓存到期时间点
          // 存储缓存时间
          my.setStorageSync({
              key : k + 'Time',
              data : timestamp + '',
          });
      } else {
          my.removeStorageSync({
            key : k + 'Time'
          });
      }
  },
  // 获取缓存方法
  getNewStorage: function (k) {
      let deadtime = "" , ret = null;
      deadtime = my.getStorageSync({key: k + 'Time'}).data;
      let nowTime = Date.parse(new Date()) / 1000;
      if (deadtime) {
          if (deadtime < nowTime) {// 当时间到期
              // console.log('过期了')
              console.log("过期了");
              return;
          } else {
              // console.log('未过期')
              ret = my.getStorageSync({key : k});
              if(ret){
                  return ret.data;
              }else{
                  return ;
              }
          }
        } else {// 如果没有设置缓存时间
            ret = my.getStorageSync({key : k});
            if(ret){
                return ret.data;
            }else{
                return ;
            }
      }
  },
  aliGetUserInfo: function (callback) {
        let that = this;
        let apiUrl = that.getApiUrl();
        
        if (this.globalData.userInfo && this.globalData.userInfo.userId) {
            typeof callback == "function" && callback(this.globalData.userInfo)
        } else {
            
            //调用用户信息接口
            my.getAuthCode({
                scopes : "auth_user",
                //用户同意授权
                success : function(res){
                    my.httpRequest({
                        url: '', // 目标服务器 url,实现的功能是服务端拿到authcode去开放平台进行token验证
                        data: {
                            authcode: res.authcode
                        },
                        success: (res) => {
                            //请求成功返回userId，nickName，avatar
                            let userInfo = null;
                            userInfo.userId = res.userId;
                            userInfo.nickName = res.nickName;
                            userInfo.avatar = res.avatar;
                            that.globalData.userInfo = userInfo;
                            typeof callback == "function" && callback(that.globalData.userInfo);
                        },
                        fail : (res)=>{
                            that.globalData.userInfo = { error: 'error',nickName: '游客' };
                        }
                    });
                },
                //用户拒绝授权
                fail : function(){
                    that.globalData.userInfo = { error: 'error',nickName: '游客' };
                }
            });
        }
    },
    //把“A 安徽省 合肥 瑶海区”形式的城市转换成“安徽省,合肥,瑶海区”
    transformCity : function(s){
        let s1 = "",
            arr = [];
        if(typeof s !== "string"){
            return;
        }
        arr = s.split(" ");
        arr.forEach(function(item,index){
            if(index>0){
                s1+=(item+",");
            }
        });
        return s1.slice(0,s1.length-1);
    }
});
