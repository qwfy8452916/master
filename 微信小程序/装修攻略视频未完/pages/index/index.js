//index.js
//获取应用实例
const app = getApp();
const navActive = require('../../utils/util.js');
const fadan = require('../../utils/fadan.js');
const collect=require('../../utils/collectTool.js');
const apiUrl = app.getApiUrl();
Page({
  data: {
    currentUrl:"",
    navList:"",
    autoPlay:false,
    userid:"",
    underLine:false,
    imgUrls: [{
      imgSrc: '../../img/banner01.jpg',
      href:'../article-list/index'
    }, {
      imgSrc: '../../img/banner02.jpg',
      href: '../article-detail/index?id=' + 67257
    },{
      imgSrc: '../../img/banner03.jpg',
      href: '../article-detail/index?id=' + 60517
    }
    ],
    smallTab: [[
      {
        name: "准备阶段",
        imgSrc: "../../img/zbjd.png",
        href: "../article-list/index?title=准备阶段&page=1&userid="
      }, {
        name: "施工阶段",
        imgSrc: "../../img/sgjd.png",
        href: "../article-list/index?title=施工阶段&page=1&userid="
      }, {
        name: "入住阶段",
        imgSrc: "../../img/rzjd.png",
        href: "../article-list/index?title=入住阶段&page=1&userid="
      }, {
        name: "装修风格",
        imgSrc: "../../img/zxfg.png",
        href: "../article-list/index?title=装修风格&page=1&userid="
      }, {
        name: "局部装修",
        imgSrc: "../../img/jbzx.png",
        href: "../article-list/index?title=局部装修&page=1&userid=" 
      }, {
        name: "建材选购",
        imgSrc: "../../img/jcxg.png",
        href: "../article-list/index?title=建材选购&page=1&userid=" 
      }, {
        name: "软装选购",
        imgSrc: "../../img/rzxg.png",
        href: "../article-list/index?title=软装选购&page=1&userid="
      }, {
        name: "家具选购",
        imgSrc: "../../img/jjxg.png",
        href: "../article-list/index?title=家具选购&page=1&userid=" 
      }, {
        name: "电器选购",
        imgSrc: "../../img/dqxg.png",
        href: "../article-list/index?title=电器选购&page=1&userid=" 
      }, {
        name: "家居风水",
        imgSrc: "../../img/jjfs.png",
        href: "../article-list/index?title=家居风水&page=1&userid=" 
      }
    ], [{
      name: "设计",
      imgSrc: "../../img/sj.png",
      href: "../gongluelist/gongluelist?id=1",
    }, {
      name: "局部装修",
      imgSrc: "../../img/jbzx.png",
      href: "../gongluelist/gongluelist?id=2"
    }, {
      name: "装修扫盲",
      imgSrc: "../../img/zxsm.png",
      href: "../gongluelist/gongluelist?id=3"
    }, {
      name: "选材导购",
      imgSrc: "../../img/xcdg.png",
      href: "../gongluelist/gongluelist?id=4"
    }, {
      name: "其他",
      imgSrc: "../../img/qita.png",
      href:"../gongluelist/gongluelist?id=0"
    }]],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    tabChange:[true,false],
    startX:0,
    distanceX:0,
    moveFlag:0,
    outBoxWidth:0,
    hidden:false,
    pagationNum:[],
    sliderIndex:0,
    company_fadan:true,
    fd:"",
    dataList:[],
    pageNum:1,
    scrollHeight:0,
  },
  onLoad: function () {
    let that=this;
    app.getUserInfo(function (res) {//授权
      wx.setStorage({
        key: 'userId',
        data: res.userId,
      });
    });
    wx.currentUrl = getCurrentPages()[getCurrentPages().length-1].route;//获取当前页面url
    this.setData({
      navList: navActive.activeNav(wx.currentUrl)
    });
    let len = (this.data.smallTab[0].length / 5) > 1 ? (this.data.smallTab[0].length / 5) : 0;
    for (let j = 0; j <len; j++) {
      let pageNum = "pagationNum[" + j + "]";
      if (j == 0) {
        this.setData({
          [pageNum]: true
        });
      } else {
        this.setData({
          [pageNum]: false
        });
      }
    }
    fadan.fadan.init(this,0);//发单引用
    collect.collect.collectInit(this);//收藏引用
    let _this=this;
    setInterval(_this.autoPlayIcon,5000);
    this.getDataList(0);
   
  },
  //加载数据
  onShow:function(){
    
  },
  getDataList:function(pageNum){
    let that = this;
    app.getUserInfo(function (res) {//授权
      that.setData({
        userid:res.userId
      });
      wx.showLoading({
        title: '数据加载中',
      });
      wx.request({
        url: apiUrl + "/appletgonglue/articleandvideo?userid=" + res.userId + "&page=" + pageNum,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          let baseData = res.data.data.articleList;
          let insertData = res.data.data.videoList;
          let addHeight = baseData.length*167+insertData.length+229;
          if(baseData.length==0&&insertData.length==0){
            that.setData({
              underLine: true
            });
          }else{
            for (let n = 0; n < baseData.length; n++) {
              baseData[n].type = 10;
            }
            for (let m = 0; m < insertData.length; m++) {
              insertData[m].type = 11;
            }
            for (let i = 0; i < insertData.length; i++) {
              baseData.splice((2 * i + i + 2), 0, insertData[i]);
            }
            let baseLength = baseData.length;
            let gloabaLength = that.data.dataList.length;
            for (let k = gloabaLength; k < baseLength * (pageNum + 1); k++) {
              let pushItem = "dataList[" + k + "]";
              that.setData({
                [pushItem]: baseData[k % 15]
              });
            }
            that.setData({
              pageNum: that.data.pageNum + 1,
              scrollHeight: that.data.scrollHeight + addHeight
            });
            wx.hideLoading()
          }
        }
      });
    });
  },
  lower: function () {
    this.getDataList(this.data.pageNum);
  },
  changTab: function (e) {
    let num = e.currentTarget.dataset.id;
    this.setData({
      pagationNum: []
    });
    for (let i = 0; i < 2; i++) {
      let tabitem = "tabChange[" + i + "]";
      if (i == num) {
        this.setData({
          [tabitem]: true
        });
        let len = (this.data.smallTab[i].length / 5) > 1 ? this.data.smallTab[i].length / 5 : 0;
        for (let j = 0; j < len; j++) {
          let pageNum = "pagationNum[" + j + "]";
          if (j == 0) {
            this.setData({
              [pageNum]: true
            });
          } else {
            this.setData({
              [pageNum]: false
            });
          }
        }
      } else {
        this.setData({
          [tabitem]: false
        });
      }
    }
  },
  moveSlider: function (e) {
    let moveX = e.touches[0].pageX;
    let distance = moveX - this.data.startX;
    this.setData({
      distanceX: distance
    });
  },
  getStarX: function (e) {
    var starX = e.touches[0].pageX;
    this.setData({
      startX: starX
    });
  },
  getDistance: function (e) {
    let pageNum1 = "pagationNum[" + 0 + "]";
    let pageNum2 = "pagationNum[" + 1 + "]";
    if (Math.abs(this.data.distanceX) > 20) {
      if (this.data.distanceX > 0) {//向右滑
        this.setData({
          moveFlag: 0,
          [pageNum1]: true,
          [pageNum2]: false
        });
      } else {//向左滑
        this.setData({
          moveFlag: -(wx.getSystemInfoSync().windowWidth - 20),
          [pageNum1]: false,
          [pageNum2]: true
        });
      }
    }
  },
  autoPlayIcon() {
    let pageNum1 = "pagationNum[" + 0 + "]";
    let pageNum2 = "pagationNum[" + 1 + "]";
    if (this.data.autoPlay) {
      this.setData({
        moveFlag: -(wx.getSystemInfoSync().windowWidth - 20),
        [pageNum1]: false,
        [pageNum2]: true
      });
      this.setData({
        autoPlay: false
      });
    } else {
      this.setData({
        moveFlag: 0,
        [pageNum1]: true,
        [pageNum2]: false
      });
      this.setData({
        autoPlay: true
      });
    }
  },
  toSearch: function () {
    wx.navigateTo({
      url: '../search/index'
    })
  },
  toArticleList: function (e) {
    let type = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: '../article-list/index?title=' + type
    })
  },
  // shipin:function(){
  //   wx.navigateTo({
  //     url:'../play_detail/play_detail'
  //   })
  // },
})