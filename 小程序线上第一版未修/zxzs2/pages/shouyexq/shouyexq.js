// pages/shouyexq/shouyexq.js
const app = getApp(),
      apiUrl = app.getApiUrl(),
      oImgUrl = app.getImgUrl();
var WxParse = require('../../wxParse/wxParse.js');
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ").replace('/', '-').replace('/', '-').split(' ')[0];
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrl: oImgUrl,
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        dianji: false,
        details:{},
        articleList:[],
        dianzansl: 766
    },

    zxsjym1: function () {
        wx.navigateTo({
            url: '../zhuangxiusj/zhuangxiusj'
        })
    },

    dianjizan: function () {
        let that = this;
        let user = app.getNewStorage('user');
        let details = that.data.details;
        let bool = true;
        if (user){
            for (let i = 0; i < user.length; i++) {
                if (user[i] == details.id){
                    bool = false;
                    break;
                }else{
                    bool = true;
                }
            }
            if (bool) {
                wx.request({
                    url: apiUrl+'/appletcarousel/like',
                    data:{
                        id: details.id
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success:function(res){
                        if(res.data.state === 1){
                            details.likes = parseInt(details.likes) + 1;
                            that.setData({ details: details });
                            user.push(details.id)
                            app.setNewStorage('user', user);
                        }
                    }
                });
            } else {
                wx.showModal({
                    title: '您已经点赞了',
                    showCancel: false,
                    success: function (res) {

                    }
                });
            }
        }else{
            let user = [];
            wx.request({
                url: apiUrl + '/appletcarousel/like',
                data: {
                    id: details.id
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    if (res.data.state === 1) {
                        details.likes = parseInt(details.likes) + 1;
                        that.setData({ details: details });
                        user.push(details.id)
                        app.setNewStorage('user', user);
                    }
                }
            });
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function (options) {
        let _this = this;
        wx.request({
            url: apiUrl+'/appletcarousel/details',
            data: { id: options.id},
            header: {
                'content-type': 'application/json'
            },
            success:function(res){
                res.data.article.addtime = getLocalTime(res.data.article.addtime);
                let content = res.data.article.content;
                console.log(content)
                console.log(WxParse.wxParse('article', 'html', content, _this));
                _this.setData({ details: res.data.article});
                wx.setNavigationBarTitle({
                    title: res.data.article.title
                })
            }
        });
        wx.request({
            url: apiUrl + '/appletcarousel/article',
            data: { order: 'realview',count:'9' },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                _this.setData({ articleList: res.data.articleList});
                console.log(res.data.articleList)
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    articleDet: function (e) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../shouyexq/shouyexq?id=' + id
        })
    }
})