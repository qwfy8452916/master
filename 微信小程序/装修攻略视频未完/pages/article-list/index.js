//index.js
//获取应用实例
const app = getApp();
const navActive = require('../../utils/util.js');
const fadan = require('../../utils/fadan.js');
const apiUrl = app.getApiUrl();
const imgUrl = app.getImgUrl();

let data = [
  {
    id: 1,
    title: "1现如今智能产品已经深入到我们日常生活中",
    desc: "简介：现如今智能产品已经深入到我们日常生活中",
    pv: 1354,
    is_collect: 0
  },
  {
    id: 2,
    title: "2现如今智能产品已经深入到我们日常生活中",
    desc: "简介：现如今智能产品已经深入到我们日常生活中",
    pv: 1154,
    is_collect: 1
  }
]

Page({
  data: {
    title : "",
    articleData : [],
    fa: "",
    imgUrl: imgUrl,
    hasData: 1, //是否还有数据标识
    categoryNoData: 1, //该分类下是否有数据
    scrollContainerHeight: "3600rpx",
    currentPage: 1, //当前页码
    vid: "", //用户当前查看的文章id，用户返回时更新pv和收藏情况
  },
  onLoad: function (options) {
    let type = options.title,
        userid = "";
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

    this.setData({
      title : type
    });
    this.getContentList();
    //发单引用
    fadan.fadan.init(this);
  },
  // 用于某个文章pv和收藏更新
  onShow: function () {
    let viewArticleId = "";
    try {
      viewArticleId = wx.getStorageSync("viewArticleId");
      if (viewArticleId) {
        this.setData({
          vid: viewArticleId
        });

        wx.removeStorage({
          key: 'viewArticleId'
        })

        this.updateArticle();
      }
    } catch (e) {
      console.log(e);
    }
  },
  onReady : function(){
    wx.setNavigationBarTitle({
      title : this.data.title
    });
  },
  // 获取攻略列表
  getContentList: function (e) {
    let id = "",
      cateType = "",
      category = "",
      that = this,
      tempDataSet = [];
    // 处理非点击加载数据的情况，如初次打开页面，下拉加载数据,此时没有事件参数
    if (e) {
      if (e.currentTarget.dataset.id) {
        cateType = e.currentTarget.dataset.type;
      }
      category = e.currentTarget.dataset.category;
    }
    wx.showLoading({
      title: "加载中"
    })
    // ajax获取内容列表
    wx.request({
      url: apiUrl + '/appletgonglue/getGonglueList',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      dataType: 'json',
      data: {
        title: that.data.title,
        page: that.data.currentPage,
        userid : that.data.userid
      },
      success: function (res) {
        // 只有请求的数据量大于0小于15条才能显示有底线
        if (res.data.data.length < 15 && res.data.data.length > 0) {
          that.setData({
            hasData: 0
          });
        } else {
          that.setData({
            hasData: 1
          });
        }
        // 只有查找的数据以及articleData中都没有数据，才能判定当前分类没有数据
        if (parseInt(res.data.data.length) == 0 && parseInt(that.data.articleData.length) == 0) {
          that.setData({
            categoryNoData: 0
          });
        } else {
          that.setData({
            categoryNoData: 1
          });
        }
        tempDataSet = that.data.articleData.concat(res.data.data);
        that.setData({
          articleData: tempDataSet
        });
        wx.hideLoading();
      },
      fail: function () {
        console.log("error!!!!");
      }
    })
  },
  // 更新文章查看后返回的pv及收藏状态
  updateArticle: function () {
    let vid = this.data.vid,
      articleList = this.data.articleData,
      pv = "",
      isCollect = 0,
      that = this,
      len = articleList.length;
    wx.request({
      url: apiUrl + '/appletcarousel/details',
      data: {
        userid: that.data.userid,
        id: this.data.vid,
        classtype: '10'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.article) {
          pv = res.data.article.pv;
          isCollect = res.data.article.is_collect;
          for (let i = 0; i < len; i++) {
            if (articleList[i].id == vid) {
              articleList[i].pv = pv;
              articleList[i].is_collect = isCollect;
            }
          }
          that.setData({
            articleData: articleList
          });
        }
      },
      fail: function () {
        console.log("error!!!");
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
    });
    //将当前查看的文章id缓存起来，页面返回时需要更新该文章的pv以及收藏情况
    wx.setStorage({
      key: 'viewArticleId',
      data: id,
    })
  },
  // 收藏和取消收藏
  collectAction: function (e) {
    let id = e.currentTarget.dataset.id,
        index = e.currentTarget.dataset.index,
        articleData = this.data.articleData;
    articleData[index].is_collect = 1;
    // 发送ajax请求添加收藏
    this.sendCollectToServer(id, 0);

    // 更改收藏状态
    this.setData({
      articleData: articleData
    });

  },
  cancelCollectAction: function (e) {
    let id = e.currentTarget.dataset.id,
        index = e.currentTarget.dataset.index,
        articleData = this.data.articleData;
    articleData[index].is_collect = 0;
    // 发送ajax请求取消收藏
    this.sendCollectToServer(id, 1);

    // 更改收藏状态
    this.setData({
      articleData: articleData
    });
  },
  sendCollectToServer: function (id, flag) {
    let ajaxMethod = "POST",
      collectMsg = "收藏成功";
    if (flag) {
      ajaxMethod = "GET";
      collectMsg = "你已取消收藏";
    }
    // 收藏取消收藏发送到服务器
    wx.request({
      url: apiUrl + '/appletcarousel/editcollect',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: ajaxMethod,
      data: {
        userid: this.data.userid,
        classtype: 10,
        classid: id
      },
      success: function (res) {
        wx.showToast({
          title: collectMsg,
          icon: 'success',
          duration: 1500
        })
      },
      fail: function () {
        wx.alert({
          title: "网络异常，请稍后重试"
        });
      }
    })
  }
})
