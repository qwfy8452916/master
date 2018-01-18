//index.js
//获取应用实例
let app = getApp();
let apiUrl = app.getApiUrl();

Page({
    data: {
        userInfo: {},
        markInfoAll: [],
        lookInfoAll: [],
        isHide: false,
        userInfo: null,
        markHide: false,
        lookHide: false,
        userId:'',
        login:''
    },
    onLoad: function () {
    },
    onShow: function () {
        var that = this;
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            // 判断是否拒绝登录
            that.setData({ userId: userInfo.userId})
            if (!userInfo.userId) {
                that.setData({ isHide: true, userInfo: userInfo, login: '登录'})
            } else if (userInfo.userId) {
                that.setData({ userInfo: userInfo });
                wx.request({
                    url: apiUrl + '/zxjt/likestore',
                    data: {
                        uid: userInfo.userId,// userInfo.userId 用户ID
                        limit: 1
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        if (res.data.data.length > 0) {
                            that.setData({ markInfoAll: res.data.data, markHide: false })
                        } else {
                            that.setData({ markInfoAll: [], markHide: true })
                        }
                    }
                });
            }
        });
        // 获取已经浏览过缓存id
        let arrInfo = app.getNewStorage('arrInfoKey');
        if (arrInfo && arrInfo.length > 0) {
            that.setData({ lookInfoAll: arrInfo, lookHide: false })
        } else {
            that.setData({ lookInfoAll: [], lookHide: true })
        }
    },
    /**
     * 用户点击我的收藏模块跳转到收藏详情页
     */
    toUserMark: function () {
        wx.navigateTo({
            url: '../user_mark/user_mark',
        })
    },
    /**
     * 用户点击我的设置跳转到设置页面
     */
    delStorage: function () {
        wx.navigateTo({
            url: '../user_set/user_set',
        })
    },
    phoneCall:function(){
        wx.makePhoneCall({
            phoneNumber: '4008-659-600' //拨打400电话
        })
    },
    login:function(){
        let that = this;
        app.getLoginAgain(function (res) {
            console.log(res)
            that.setData({ userInfo: res, login: ''});
        })
    }
})
