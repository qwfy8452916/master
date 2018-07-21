const app = getApp(),
      apiUrl = app.getApiUrl();

Page({
  data: {
    userInfo : null,
    isHide : false,
    markInfoAll : null,
    markHide : false,
    loginText : ""
  },
  onLoad : function(){
    // my.showToast({
    //     type: 'none',
    //     content: '加载中...',
    //     duration: 2000,
    // });
  },
  onShow : function(){
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
        // 判断是否拒绝登录
        that.setData({
          userId: userInfo.userId
        })
        if (!userInfo.userId) {
            that.setData({ 
              isHide: true, 
              userInfo: userInfo,
              loginText: '点击登录'
            })
        } else if (userInfo.userId) {
            that.setData({ 
              userInfo: userInfo 
            });
            // my.httpRequest({
            //     url: apiUrl + '/zxjt/likestore',
            //     data: {
            //         uid: userInfo.userId,// userInfo.userId 用户ID
            //         limit: 1
            //     },
            //     header: {
            //         'content-type': 'application/json'
            //     },
            //     success: function (res) {
            //         if (res.data.data.length > 0) {
            //             that.setData({ 
            //               markInfoAll: res.data.data, 
            //               markHide: false 
            //             })
            //         } else {
            //             that.setData({ 
            //               markInfoAll: [], 
            //               markHide: true 
            //             })
            //         }
            //     }
            // });
            }
        });
        // 获取已经浏览过缓存id
        // let arrInfo = app.getNewStorage('arrInfoKey');
        // if (arrInfo && arrInfo.length > 0) {
        //     that.setData({ lookInfoAll: arrInfo, lookHide: false })
        // } else {
        //     that.setData({ lookInfoAll: [], lookHide: true })
        // }
    },
    toMyCollections : function(e){
        my.navigateTo({
            url: '../user-collects/index'
        })
    },
    toSetUp : function(e){
        my.navigateTo({
            url: '../user-set/index'
        })
    },
    register : function(){
        let that = this;
        app.getLoginAgain(function (res) {
            that.setData({
                userInfo: res,
                loginText: res.error == 'error' && res.userId ? "" : "点击登录"
            });
        })
    }
});
