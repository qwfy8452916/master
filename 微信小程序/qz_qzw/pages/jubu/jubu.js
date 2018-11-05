//jubu.js
//获取应用实例
const app = getApp();
const navActive = require('../../utils/util.js');
const fadan = require('../../utils/fadan.js');
const apiUrl = app.getApiUrl();
const imgUrl = app.getImgUrl();
let levelOneNav = [{ id: 0, text: "客厅", cate: "keting", position: 106 }, { id: 1, text: "卧室", cate: "woshi", position: 107 }, { id: 2, text: "厨房", cate: "chufang", position: 108 }, { id: 3, text: "卫浴", cate: "weiyu", position: 109 }, { id: 4, text: "阳台", cate: "yangtai", position: 110 }, { id: 5, text: "餐厅", cate: "canting", position: 111 }, { id: 6, text: "书房", cate: "shufang", position: 112 }, { id: 7, text: "儿童房", cate: "ertongfang", position: 113 }, { id: 8, text: "空间利用", cate: "kongjian", position: 134 }, { id: 9, text: "色彩搭配", cate: "sediao", position: 135 }];

Page({
  data: {
    userid: "",
    levelOneNav: null,
    levelTwoNav: null,
    currentlevelOneIndex: 0, // 用于控制一级分类选中状态
    currentlevelTwoIndex: 0, // 用于控制二级分类选中状态
    currentPage: 1, //当前页码
    articleData: [],
    hasData: 1, //是否还有数据标识
    categoryNoData: 1, //该分类下是否有数据
    cateType: "", // 一级分类标识
    category: "", // 二级分类标识
    fa: "",
    imgUrl: imgUrl,
    vid: "", //用户当前查看的文章id，用户返回时更新pv和收藏情况
    scrollContainerHeight: "3600rpx",
    isUpdateScrollHeight: false, //当前选项数据不足15条时要更新scrollContainerHeight的值，好让“有底线显示出来”
    isFixed: false, // 用户标签选项卡设置固定定位,false标识不需要，true表示需要
    scrollTop: "",
    scrollLeft: "", // 滚动选项横向定位
    leftView: "", // 定位的id
    isHide:false,
    position:106
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

    // 设置一级分类并请求数据
    this.setData({
      levelOneNav: levelOneNav
    });

    this.setTab(null, options);

    // this.getContentList();
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
  //监听页面滚动
  onPageScroll: function (scrollObj) {
  },
  scroll: function (e) {

    if (e.detail.scrollTop > 2) {
      this.setData({
        isFixed: true
      });
    } else {
      this.setData({
        isFixed: false
      });
    }
  },
  // 设置当前栏目选中状态，一级类目点击，二级类目点击都分发到这里
  setTab: function (e, options) {

    let id = e ? e.currentTarget.dataset.id : options.id,
      cate = e ? e.currentTarget.dataset.type : options.type,
      category = e ? e.currentTarget.dataset.category : options.category,
      position = e ? e.currentTarget.dataset.position : options.position;
    // 从首页点击进来的时候需要定位到目标选项卡位置，定位是通过id来确定的
    if (options) {
      this.setData({
        leftView: category,
        //scrollLeft:id*60
      });
    }

    if (parseInt(cate) == 1) {
      //设置一级栏目选中状态并清除二级栏目的选中状态
      this.setData({
        currentlevelOneIndex: id,
        currentlevelTwoIndex: 0
      });
      // e ? this.getLevelTwoNav(e) : this.getLevelTwoNav(options);
    } else {
      //设置二级栏目选中状态
      this.setData({
        currentlevelTwoIndex: id
      });
    }
    // 因为前台需要拼接数据，因此点击选项卡之后要清空数据列表，以免其他选项的数据被拼接
    this.setData({
      articleData: [],
      currentPage: 1,
      cateType: cate,
      category: category,
      isUpdateScrollHeight: true,
      hasData: 1,
      scrollContainerHeight: "3600rpx",
      position:position
    });

    //处理一级分类，“热门”选项卡的情况
    if (parseInt(cate) == 1 && parseInt(id) == 0) {
      this.setData({
        cateType: "",
      });
    }
    wx.pageScrollTo({
      scrollTop: 0
    })
    this.getContentList(e);
  },
  // 获取二级栏目
  menu: function (e) {

    // 填充二级栏目
    this.setData({
      isHide:true
    });
  },
  cancel: function (e) {
    this.setData({
      isHide: false
    })
  },
  // 获取列表
  getContentList: function (e) {
    let id = "",
      cateType = "",
      category = "",
      that = this,
      tempDataSet = [],
      position = that.data.position;

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
      url: apiUrl + '/qizuang/ju/bu?',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      dataType: 'json',
      data: {
        position:position,
        // category: category,
        p: that.data.currentPage,
        userid: that.data.userid
      },
      success: function (res) {

        // 点击选项卡的时候可能出现只有几条数据的情况，此时要更新scroll-view容器的高度，以免底线提示文字无法显示在可视区域
        that.data.isUpdateScrollHeight ? that.updateScrollHeight(res.data.list.length) : "";
        // 底线提示处理：只有请求的数据量大于0小于15条才能显示有底线
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
          //pv = res.data.article.pv;
          isCollect = res.data.article.is_collect;
          for (let i = 0; i < len; i++) {
            if (articleList[i].id == vid) {
              //articleList[i].pv = pv;
              articleList[i].pv++;
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
  // 更新scrollContainerHeight的值
  updateScrollHeight: function (size) {
    if (size < 15) {
      this.setData({
        scrollContainerHeight: size * 240
      });
    }
    this.setData({
      isUpdateScrollHeight: false
    });
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
