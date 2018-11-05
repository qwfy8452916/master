//index.js
//获取应用实例
const app = getApp()
const apiUrl = app.getApiUrl();
const fadan = require('../../utils/fadan.js');
var config = require('../../config');
Page({
  data: {
    imgUrls:"",
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    getImgUrl: app.getImgUrl(),
    dataPage:1,
    indexDataList:[],
    scrollHeight:0,
    fd:"",
    underLine:false,
    bannerUrl:["../zhuangxiusj/zhuangxiusj","../jsq/jsq","../company/company"]
  },
  onLoad: function () {
    app.getSq();
    let that=this;
     wx.getSystemInfo({
      success: function (res) {
          that.setData({
            scrollHeight: res.windowHeight*2
          })
        }
      });
    this.getBannerList();
    this.geDataList();
    //发单引用
      fadan.fadan.init(this, 2, {
        cityInput: true,
        addressInput: false,
        phoneInput: true,
        nameInput: true,
        areaInput: false,
        btnText: "马上获取"
      });
      
  },
  getBannerList:function(){
    let _that=this;
    wx.request({
        url: apiUrl + "/appletcarousel/banner?count=7", //仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res)
          _that.setData({
            imgUrls:res.data.bannerList
          });
        }
      })
  },
  lower: function () {
    this.geDataList();
  },
  geDataList:function(){
    let that=this;
    wx.showLoading({
      title: "数据正在加载",
    });
    wx.request({
      url: apiUrl + "/index/list",
      data:{"p":this.data.dataPage},
      method:"GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        let article = res.data.article;
        let video = res.data.video;
        let xgt = res.data.meitu;
        // 挨个添加类型
        for (let m = 0; m < article.length;m++){
          article[m].type=10
        }
        for (let m = 0; m < video.length; m++) {
          video[m].time = app.changeTime(video[m].time);
          video[m].type = 11
        }
        for (let m = 0; m < xgt.length; m++) {
          xgt[m].type = 4
        }
        for (let i = 0; i < video.length; i++){

          article.splice((2 * i + i + 2), 0, video[i]);
        }
        for(let j=0; j<xgt.length;j++){
          article.splice((3 * j + j + 3), 0, xgt[j]);
        }
       
        let gloabaLength = that.data.indexDataList.length;
        let insertDataList = article.length;
        if (article.length<15){
          that.setData({
            underLine: true
          });
        }
        
        for (let k = gloabaLength; k < (gloabaLength + insertDataList);k++){
          let pushData ="indexDataList["+k+"]";
          that.setData({
            [pushData]: article[k%12]
          });
        }
        that.setData({
          dataPage:that.data.dataPage+1,
          scrollHeight: that.data.scrollHeight+650
        });
        wx.hideLoading();
        
      }
    })

  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  tocompany:function(e){
    let url = e.currentTarget.dataset.url;
    console.log(e)
    wx.switchTab({
      url: url
    }) 
  }
})
