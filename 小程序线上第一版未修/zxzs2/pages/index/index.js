//index.js
//获取应用实例
const app = getApp()
let apiUrl = app.getApiUrl(),
    oImgUrl = app.getImgUrl();
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ").replace('/', '-').replace('/', '-').split(' ')[0];
}
Page({
    data: {
        imgUrl: oImgUrl,
        bannerList: [],
        articleList: [],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        count :5,
        loadBool:true
    },
    onLoad(){
        let that = this,
            json = [],
            prevJson = [],
            cityJson = [],
            areaJson = [],
            cityUrl,
            bannerList,
            articleList;
        /**
         * 获取首页数据
         */
        bannerList = app.getNewStorage('bannerList');
        articleList = app.getNewStorage('articleList');
        if (bannerList){
            that.setData({ bannerList: bannerList });
        }else{
            wx.request({
                url: apiUrl+'/appletcarousel/banner',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that.setData({bannerList:res.data.bannerList});
                    app.setNewStorage('bannerList', res.data.bannerList, 8000)
                }
            });
        }
        if (articleList){
            that.setData({ articleList: articleList });
        }else{
            wx.request({
                url: apiUrl+'/appletcarousel/article',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    let i=0,
                        getArticleList = res.data.articleList,
                        len = getArticleList.length;
                    for (let i = 0; i < len;i++){
                        getArticleList[i].addtime = getLocalTime(getArticleList[i].addtime);
                    }
                    that.setData({ articleList: getArticleList });
                    app.setNewStorage('articleList', getArticleList,8000)
                }
            });
        }
        /**
         * 获取城市缓存数据
         */
        wx.getStorage({
            key: 'cityJson',
            success: function (res) {
                if (!res.data) {
                    wx.request({
                        url: apiUrl + '/zxjt/getcityurl',
                        header: {
                            'content-type': 'application/json'
                        },
                        success: function (res) {
                            cityUrl = res.data.data.replace("/common/js", "");
                            let cityUrlArr = cityUrl.split(':');
                            let host = cityUrlArr[1].split('.');
                            host[0] = host[0] + 's';
                            cityUrlArr[1] = host.join('.');
                            let cityUrlStr = cityUrlArr[0] + 's:' + cityUrlArr[1]
                            wx.request({
                                url: cityUrlStr, // + 'common/js/rlpca20170721143503.js',
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: function (res) {
                                    let str = res.data.replace("var rlpca = ", "");
                                    json = JSON.parse(str), prevJson = [], cityJson = [], areaJson = [];
                                    json.shift();
                                    // 删除空省份/城市/区域
                                    for (let i = 0; i < json.length; i++) {
                                        json[i].children.shift()
                                        for (var j = 0; j < json[i].children.length; j++) {
                                            json[i].children[j].children.shift()
                                        }
                                    };
                                    // 筛选省份名称+id
                                    for (let i = 0; i < json.length; i++) {
                                        prevJson.push({ id: json[i].id, text: json[i].text });
                                    }
                                    // 筛选第一省的第一个城市名称+id
                                    for (let j = 0; j < json[0].children.length; j++) {
                                        cityJson.push({ id: json[0].children[j].id, text: json[0].children[j].text })
                                    }
                                    // 筛选第一省/第一个城市/第一个区域名称+id
                                    for (let k = 0; k < json[0].children[0].children.length; k++) {
                                        areaJson.push({ id: json[0].children[0].children[k].id, text: json[0].children[0].children[k].text })
                                    }
                                    wx.setStorage({
                                        key: 'cityJson',
                                        data: { prev: prevJson, city: cityJson, area: areaJson, json: json },
                                    })
                                }
                            })
                        }
                    })
                }

            },
            // 获取缓存失败
            fail: function () {
                // ajax请求数据并且数据本地缓存存储
                wx.request({
                    url: apiUrl + '/zxjt/getcityurl',
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        
                        cityUrl = res.data.data.replace("/common/js", "");
                        let cityUrlArr = cityUrl.split(':');
                        let host = cityUrlArr[1].split('.');
                        host[0] = host[0] + 's';
                        cityUrlArr[1] = host.join('.');
                        let cityUrlStr = cityUrlArr[0] + 's:' + cityUrlArr[1]
                        wx.request({
                            url: cityUrlStr, // + 'common/js/rlpca20170721143503.js',
                            header: {
                                'content-type': 'application/json'
                            },
                            success: function (res) {
                                let str = res.data.replace("var rlpca = ", "");
                                json = JSON.parse(str), prevJson = [], cityJson = [], areaJson = [];
                                json.shift();
                                // 删除空省份/城市/区域
                                for (let i = 0; i < json.length; i++) {
                                    json[i].children.shift()
                                    for (var j = 0; j < json[i].children.length; j++) {
                                        json[i].children[j].children.shift()
                                    }
                                };
                                // 筛选省份名称+id
                                for (let i = 0; i < json.length; i++) {
                                    prevJson.push({ id: json[i].id, text: json[i].text });
                                }
                                // 筛选第一省的第一个城市名称+id
                                for (let j = 0; j < json[0].children.length; j++) {
                                    cityJson.push({ id: json[0].children[j].id, text: json[0].children[j].text })
                                }
                                // 筛选第一省/第一个城市/第一个区域名称+id
                                for (let k = 0; k < json[0].children[0].children.length; k++) {
                                    areaJson.push({ id: json[0].children[0].children[k].id, text: json[0].children[0].children[k].text })
                                }
                                wx.setStorage({
                                    key: 'cityJson',
                                    data: { prev: prevJson, city: cityJson, area: areaJson, json: json },
                                })
                            }
                        })
                    }
                })
            }
        });
    },
    articleDet: function (e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../shouyexq/shouyexq?id='+id
        })
    },

    changeIndicatorDots: function (e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function (e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function (e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function (e) {
        this.setData({
            duration: e.detail.value
        })
    },
    /**
     * 跳转到装修设计页面
     */
    toSheji(){
        wx.navigateTo({
            url: '../zhuangxiusj/zhuangxiusj'
        })
    },
    /**
     * 跳转到装修报价页面
     */
    toBaojia() {
        wx.navigateTo({
            url: '../zhuangxiubj/zhuangxiubj'
        })
    },
    /**
     * 
     */
    downLoad(){
        let that = this,
            count = that.data.count;
            
        if(that.data.loadBool){
            wx.showToast({
                title: '数据加载中...',
                icon: 'loading'
            });
            let len = that.data.articleList.length;
            count += 5;
            wx.request({
                url: apiUrl + '/appletcarousel/article',
                data: {
                    count: count
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    if (len == res.data.articleList.length){
                        that.setData({ loadBool: false });
                    }else{
                        let i = 0,
                            getArticleList = res.data.articleList,
                            len = getArticleList.length;
                        for (let i = 0; i < len; i++) {
                            getArticleList[i].addtime = getLocalTime(getArticleList[i].addtime);
                        }
                        that.setData({ articleList: getArticleList, count: count, loadBool: true });
                    }
                    
                }
            });
        }else{
            wx.showToast({
                title: '没有更多了',
                icon: 'success'
            });
        }
        
    },
    toPage(e){
        let pageUrl = e.currentTarget.dataset.urlname;
        wx.reLaunch({
            url: '../' + pageUrl +'/'+pageUrl,
            fail:function(){
                // wx.showToast({
                //     title: '此页面不存在',
                //     icon: 'loading'
                // });
            }
        });
    }
})
