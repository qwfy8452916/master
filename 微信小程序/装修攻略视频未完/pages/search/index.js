//index.js
//获取应用实例
const app = getApp();
const navActive = require('../../utils/util.js');
const fadan = require('../../utils/fadan.js');
const apiUrl = app.getApiUrl();
const imgUrl = app.getImgUrl();

let data = {
  articleData : [
    {
      id : 1,
      title: "1现如今智能产品已经深入到我们日常生活中",
      desc: "简介：现如今智能产品已经深入到我们日常生活中",
      pv : 1354,
      is_collect : 0
    },
    {
      id: 2,
      title: "2现如今智能产品已经深入到我们日常生活中",
      desc: "简介：现如今智能产品已经深入到我们日常生活中",
      pv: 1154,
      is_collect: 1
    }
  ],
  videoData : [
    {
      id: 1,
      title: "1装修视频",
      desc: "简介：现如今智能产品已经深入到我们日常生活中",
      pv: 1354,
      is_collect: 0
    },
    {
      id: 2,
      title: "2装修视频",
      desc: "简介：现如今智能产品已经深入到我们日常生活中",
      pv: 1154,
      is_collect: 1
    }
  ]
}

Page({
  data: {
    userid : "",
    imgUrl: imgUrl,
    category : true, //视频还是攻略,true攻略，false视频
    articleData: [], // 搜索出的攻略数据
    videoData: [], // 搜索出的视频数据
    fa : "",
    currentArticlePage : 1, // 当前攻略页码
    currentVideoPage: 1, // 当前视频页码
    size : 15, // 条数，攻略15，视频6，默认15
    type : 10, // 类型，攻略10，视频11
    kyw : "", // 搜索关键词
    oldKyw : "", // 存储上一次搜索词
    articleHasData : 1, // 攻略是否还有数据标识,0表示无数据，1表示有数据
    videoHasData: 1, // 视频是否还有数据标识
    categoryArticleNoData: 1, // 该搜索词是否有数据
    categoryVideoNoData: 1, // 该搜索词是否有数据
    scrollContainerHeight: "3600rpx"
  },

  // 获取userid
  getUserid: function () {
    let that = this;
    app.getUserInfo(function (res) {//授权
      wx.setStorage({
        key: 'userId',
        data: res.userId,
      });
      that.setData({
        //userid: res.userId
        userid: 1000
      });
    });
  },

  onLoad: function () {
    this.getUserid();
    //发单引用
    fadan.fadan.init(this);
  },

  switchCategory : function(){
    let bool = this.data.category;
    bool = !bool;
    this.setData({
      category : bool
    });

    
    if (this.data.category){
      this.setData({
        type : 10
      });
    }else{
      this.setData({
        type: 11
      });
    }

    // 判断切换选项卡时是否需要再次发送请求，只有第一次搜索及再次搜索的时候才需要请求数据
    this.switchGetContentList();

  },

  // 这里要判断切换选项卡时是否要请求数据，如当前处于视频选项卡，用户再次搜索数据，点攻略就要发送请求
  switchGetContentList : function(){
    let oldKyw = this.data.kyw,
        lock = false;
    if (!this.data.oldKyw){
      lock = !lock;
      this.getContentList();
    }
    if (this.data.kyw != this.data.oldKyw) {
      if(!lock){
        if (this.data.type == 10) {
          this.setData({
            articleData : []
          });
        } 
        if (this.data.type == 11) {
          this.setData({
            videoData: []
          });
        }
        console.log("执行getContentList");
        this.getContentList();
      }
    }
    // 同步kyw和oldKyw
    this.setData({
      oldKyw: oldKyw
    });

    console.log("oldKyw：" +this.data.oldKyw);
    console.log("articleData："+this.data.articleData.length);
    console.log("videoData：" + this.data.videoData.length);
  },

  // 实时更新输入的关键字
  bindKeyInput: function (e) {
    this.setData({
      kyw: e.detail.value.replace(/(^\s*)|(\s*$)/g,"")
    })
  },

  // 启动搜索
  search : function(){
    this.getContentList();
    // 清空数据
    this.setData({
      articleData : [],
      videoData : []
    });
  },

  // ajax获取数据
  getContentList : function(){
    let that = this,
        tempDataSet = null,
        currentPage = 1;
    currentPage = that.data.category ? that.data.currentArticlePage : that.data.currentVideoPage;
    wx.showLoading({
      title: "加载中"
    })
    // ajax获取内容列表
    wx.request({
      url: apiUrl + '/appletgonglue/homeSearch',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      dataType: 'json',
      data: {
        page: currentPage,
        userid: that.data.userid,
        type: that.data.type,
        keywords: that.data.kyw
      },
      success: function (res) {
        // 判断是否还有数据，用于判断是否还要下拉及是否显示未找到数据
        that.hasData(res.data.data.length);

        // 数据拼接，要注意凭借哪个数组
        if (that.data.type == 10){
          tempDataSet = that.data.articleData.concat(res.data.data);
          that.setData({
            articleData: tempDataSet
          });
        }else{
          tempDataSet = that.data.videoData.concat(res.data.data);
          that.setData({
            videoData: tempDataSet
          });
        }
        wx.hideLoading();
      },
      fail: function () {
        console.log("error!!!!");
        wx.hideLoading();
      }
    })
  },

  // 加载更多数据
  loadMoreData: function () {
    let currentPage = 1;

    currentPage = this.data.category ? this.data.currentArticlePage : this.data.currentVideoPage;
    // 有数据就请求下一页，无数据就不再请求
    if(this.data.type==10){
      if (this.data.articleHasData){
        this.setData({
          currentArticlePage: ++currentPage
        });
        this.getContentList();
      }
    }else{
      if (this.data.videoHasData) {
        this.setData({
          currentvideoPage: ++currentPage
        });
        this.getContentList();
      }
    }

  },

  // 判断请求的关键字是否还有数据，用于判断下拉时，是否要发送请求，攻略和视频要分开判断
  hasData : function(len){
    let hasData = "",
        size = 15;
    this.data.type == 10 ? size = 15 : size = 6;
    // 只有请求的数据量大于0小于15/6条才能显示有底线
    if (len < size && len > 0) {
      hasData = 0;
    } else {
      hasData = 1;
    }

    if(this.data.type == 10){
      // 判断是否要显示未查找到数据
      // 只有查找的数据以及articleData/videoData中都没有数据，才能判定当前分类没有数据，因为可能之前有数据，请求下一页时正好没数据
      if (parseInt(len) == 0 && parseInt(this.data.articleData.length) == 0){
        this.setData({
          categoryArticleNoData: 0
        });
      }else{
        this.setData({
          categoryArticleNoData: 1
        });
      }
      this.setData({
        articleHasData: hasData
      });
    }else{
      if (parseInt(len) == 0 && parseInt(this.data.articleData.length) == 0) {
        this.setData({
          categoryVideoNoData: 0
        });
      } else {
        this.setData({
          categoryVideoNoData: 1
        });
      }
      this.setData({
        videoHasData: hasData
      });
    }
    
  },

  //跳转
  back: function () {
    wx.navigateBack({
      url: '../index/index'
    })
  },
  toArticleDetail : function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article-detail/index?id='+id,
    })
  },
  toVideoDetail : function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../video-detail/index?id=' + id,
    })
  },
  toGetScheme : function(){
    wx.navigateTo({
      url: '../zhuangxiusj/zhuangxiusj',
    })
  }

})
