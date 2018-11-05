// pages/dec-knowledge/knowledge.js
//获取应用实例
const app = getApp();
const navActive = require('../../utils/util.js');
const fadan = require('../../utils/fadan.js');
const apiUrl = app.getApiUrl();
const imgUrl = app.getImgUrl();
function getLocalTime(nS) {
  Date.prototype.toLocaleString = function () {
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + "  " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
  };
  var d = new Date(nS * 1000);
  var t = d.toLocaleString();
  return t;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: "",
    imgUrl: imgUrl,
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    tabChange: [true, false,false],
    currentTab: '',
    videoArr: [],
    dataPage:1,
    indexDataList:[],
    scrollHeight: 0,
    timeNum:[],
    typeTab: [
      {
        name: "小白必读",
        imgSrc: "../../img/xiaobai.png",
        href: "../knowledge-list/knowledge-list?p=1"
      }, {
        name: "局部装修",
        imgSrc: "../../img/jubu.png",
        href: "../jubu/jubu?position=106&p=1" 
      }, {
        name: "风格搭配",
        imgSrc: "../../img/fengge.png",
        href: "../fengge/fengge?style=122&p=1"
      }, {
        name: "家居软装",
        imgSrc: "../../img/jiaju.png",
        href: "../jiaju/jiaju?jj=145&p=1"
      }, {
        name: "家电购买",
        imgSrc: "../../img/jiadian.png",
        href: "../jiadian/jiadian?jd=162&p=1"
      }, {
        name: "家居风水",
        imgSrc: "../../img/fengshui-small.png",
        href: "../fengshui/fengshui?fs=115&p=1"
      }
    ],
    scrollTab:[[
      {
        name: "收房验房",
        imgSrc: "../../img/shoufang.png",
        href: "../zhuangxiulc/index?lc=89&id=0&category=shoufang&userid="
      }, {
        name: "找装修公司",
        imgSrc: "../../img/company.png",
        href: "../zhuangxiulc/index?lc=90&id=1&category=gongsi&userid="
      }, {
        name: "设计与预算",
        imgSrc: "../../img/sheji-yusuan.png",
        href: "../zhuangxiulc/index?lc=91&id=2&category=shejiyusuan&userid="
      }, {
        name: "装修选材",
        imgSrc: "../../img/zx-xc.png",
        href: "../zhuangxiulc/index?lc=92&id=3&category=xuancai&userid="
      }, {
        name: "拆改",
        imgSrc: "../../img/chaigaismall.png",
        href: "../zhuangxiulc/index?lc=94&id=4&category=chagai&userid="
      }],[
      {
        name: "水电",
        imgSrc: "../../img/shuidiansmall.png",
        href: "../zhuangxiulc/index?lc=95&id=5&category=shuidian&userid="
      }, {
        name: "防水",
        imgSrc: "../../img/fangshui.png",
        href: "../zhuangxiulc/index?lc=96&id=6&category=fangshui&userid="
      }, {
        name: "泥瓦",
        imgSrc: "../../img/niwa.png",
        href: "../zhuangxiulc/index?lc=97&id=7&category=niwa&userid="
      }, {
        name: "木工",
        imgSrc: "../../img/mugong.png",
        href: "../zhuangxiulc/index?lc=98&id=8&category=mugong&userid="
      }, {
        name: "油漆",
        imgSrc: "../../img/youqi.png",
        href: "../zhuangxiulc/index?lc=99&id=9&category=youqi&userid="
      }
    ],[
      {
        name: "检测验收",
        imgSrc: "../../img/jiance.png",
        href: "../zhuangxiulc/index?lc=102&id=10&category=jianche&userid="
      }, {
        name: "后期配饰",
        imgSrc: "../../img/houqi.png",
        href: "../zhuangxiulc/index?lc=103&id=11&category=peishi&userid="
      }, {
        name: "装修保养",
        imgSrc: "../../img/baoyang.png",
        href: "../zhuangxiulc/index?lc=104&id=12&category=baoyang&userid="
      }, {
        name: "家居生活",
        imgSrc: "../../img/jiajusmall.png",
        href: "../zhuangxiulc/index?lc=141&id=13&category=jjsh&userid="
      }, 
    ]]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //发单引用
    fadan.fadan.init(this, 2, {
      cityInput: true,
      addressInput: false,
      phoneInput: true,
      nameInput: true,
      areaInput: false,
      btnText: "马上获取",
    });
    let that = this;  
    
    app.getUserInfo(function (res) {//授权
      wx.setStorage({
        key: 'userId',
        data: res.userId,
      });
    });

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight * 2
        })

      }
    });
    wx.showLoading({
      title: '数据加载中',
    });
    wx.request({
      url: apiUrl + '/qizuang/study/',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

          that.setData({
            videoArr:res.data.vides
          })
        wx.hideLoading()
      }
    })
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
  lower: function () {
    this.geDataList();
  },
  geDataList: function () {
    let that = this;
    wx.showLoading({
      title: '数据加载中',
    });
    wx.request({
      url: apiUrl + "/qizuang/study/list?", 
      data: { "p": this.data.dataPage },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let arr = [];
        for (let i = 0; i < res.data.video_list.length; i++) {
          that.data.timeNum[i] = getLocalTime(res.data.video_list[i].time);
          arr[i] = {
            "timeNum": that.data.timeNum[i]
          }
          res.data.video_list[i].timeNum = arr[i].timeNum;
        }

        let article = res.data.gonglue_list;
        let video = res.data.video_list;
  

        // 挨个添加类型
        for (let m = 0; m < article.length; m++) {
          article[m].type = 10
        }
        for (let m = 0; m < video.length; m++) {
          video[m].type = 11
        }

        for (let i = 0; i < video.length; i++) {
          article.splice((2 * i + i + 2), 0, video[i]);
        }

        let gloabaLength = that.data.indexDataList.length;
        let insertDataList = article.length;
        for (let k = gloabaLength; k < (gloabaLength + insertDataList); k++) {
          let pushData = "indexDataList[" + k + "]";
          that.setData({
            [pushData]: article[k % 15]
          });
        }
        that.setData({
          dataPage: that.data.dataPage + 1,
          scrollHeight: that.data.scrollHeight + 650
        });
        wx.hideLoading()

      }
    })

  },
  toSearch: function () {
    wx.navigateTo({
      url: '../zxzs_search/index'
    })
  },
  bindChange1: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  changTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },
  
  more:function(e){
    wx.navigateTo({
      url: '../play/play?id=1',
    })
  },
  toArticleDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article-detail/index?id=' + id
    })
    //将当前查看的文章id缓存起来，页面返回时需要更新该文章的pv以及收藏情况
    wx.setStorage({
      key: 'viewArticleId',
      data: id,
    })
  },
  toPlayDetail:function (e) {
    let passid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../play_detail/play_detail?id=" + passid
    })

    //将当前查看的文章id缓存起来，页面返回时需要更新该文章的pv以及收藏情况
    wx.setStorage({
      key: 'viewArticleId',
      data: passid,
    })
  }
})