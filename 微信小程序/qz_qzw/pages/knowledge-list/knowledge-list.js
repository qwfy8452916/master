//jubu.js
//获取应用实例
const app = getApp();
const navActive = require('../../utils/util.js');
const fadan = require('../../utils/fadan.js');
const apiUrl = app.getApiUrl();
const imgUrl = app.getImgUrl();

Page({
  data: {
    userid: "",
    imgUrl: imgUrl,
    currentPage: 1,
    hasData: 1,
    articleData:[],
    isUpdateScrollHeight: false,
    categoryNoData: 1, 
    scrollContainerHeight: '1455rpx',
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
        userid: res.userId
      });
    });
  },
  onLoad: function (options) {
    let userid = "";
    //从缓存里获取userid，获取不到就从服务器获取
    try {
      userid = wx.getStorageSync("userId");
      if (userid) {
        this.setData({
          userid: userid
        });
      } else {
        this.getUserid();
      }
    } catch (e) {
      this.getUserid();
    }
    //发单引用
    fadan.fadan.init(this, 2, {
      cityInput: true,
      addressInput: false,
      phoneInput: true,
      nameInput: true,
      areaInput: false,
      btnText: "马上获取"
    });
    var that= this;
    wx.request({
      url: apiUrl + '/qizuang/xiao/bai?',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      dataType: 'json',
      data: {
        p: that.data.currentPage,
        userid: that.data.userid,
        pagecount: 15,
      },
      success: function (res) {
        console.log(res)
        that.setData({
          articleData: res.data.list
        });
        wx.hideLoading();
      },
      fail: function () {
        console.log("error!!!!");
        wx.hideLoading();
      }
    })

  },
 
  onShow: function () {
    
  },
  //监听页面滚动
  onPageScroll: function (scrollObj) {
  },
  
  // 获取列表
  getContentList: function (e) {
    let id = "",
      cateType = "",
      category = "",
      that = this,
      tempDataSet = [];
    // 从data选项中获取数据，下拉加载时无法获取到事件e
    cateType = that.data.cateType;
    category = that.data.category;
    // 处理非点击加载数据的情况，如初次打开页面，下拉加载数据,此时没有事件参数
    if (e) {
      if (e.currentTarget.dataset.id) {
        cateType = e.currentTarget.dataset.type;
      }
      category = e.currentTarget.dataset.category;
      position = e.currentTarget.dataset.position;
    }
    wx.showLoading({
      title: "加载中"
    })
    // ajax获取内容列表
    wx.request({
      url: apiUrl + '/qizuang/xiao/bai?',
      data: {
        p: that.data.currentPage,
        pagecount: 15,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 点击选项卡的时候可能出现只有几条数据的情况，此时要更新scroll-view容器的高度，以免底线提示文字无法显示在可视区域
        that.data.isUpdateScrollHeight ? that.updateScrollHeight(res.data.data.length) : "";
        if (res.data.list.length > 0 && res.data.list.length < 15) {
          that.setData({
            hasData: 0
          });
        } else {
          that.setData({
            hasData: 1
          });
        }
        // 没有数据提示处理：只有查找的数据以及articleData中都没有数据，才能判定当前分类没有数据
        if (parseInt(res.data.list.length) == 0 && parseInt(that.data.articleData.length) == 0) {
          that.setData({
            categoryNoData: 0
          });
        } else {
          that.setData({
            categoryNoData: 1
          });
        }
        tempDataSet = that.data.articleData.concat(res.data.list);
        that.setData({
          articleData: tempDataSet
        });

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
    let page = this.data.currentPage;
    // 有数据就请求下一页，无数据就不再请求
    if (this.data.hasData) {
      this.setData({
        currentPage: ++page
      });
      this.getContentList();
    }
  },
  //跳转
  toSearch: function () {
    wx.navigateTo({
      url: '../search/index'
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
  toGetScheme: function () {
    wx.navigateTo({
      url: '../zhuangxiusj/zhuangxiusj',
    })
  },


})
