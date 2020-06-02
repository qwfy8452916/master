const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    convenienceStore: '',
    isIpx: app.globalData.isIpx,
    isSupportEn: 0,
    //中英文开关：0关，1开
    hotelId: '',
    bannerImageList: [],
    imgheights: [],
    //banner图
    current: 0,
    sortlist: '',
    //侧边栏
    typelist: '',
    //分类
    sortype: 0,
    typenum: 0,
    isScene: '',
    isSupportRmsvc: '',
    //是否支持客房服务 0 不支持，1 支持
    isSupportDelivery: '',
    //是否支持商城 0 不支持，1 支持
    isSupportRoomAlloc: '',
    //客房协议价 0 不支持，1 支持
    themecolor: '',
    //主题颜色
    funcId: '',
    //功能区id
    pageNum: 1,
    //当前第几页
    pages: '',
    //总页数
    typeid: '',
    //分类id
    commoditylist: [],
    //商品list
    minibar: '',
    //迷你吧支持功能（0：不支持，1：展示，2：展示+下单）
    roomDelivery: '',
    //酒店配送支持功能（1：展示，2：展示+下单）
    roomService: '',
    //客房服务支持功能（0：不支持，1：展示，2：展示+下单）
    hotelFuncDTOS1: '',
    //功能区
    hotelFuncDTOS2: '',
    //功能区
    shareuser: '',
    //分享人信息
    shareUserAvatarUrl: '',
    shareUserNickName: '',
    redbagtype: '',
    shareObj: '',
    regbagact_type: '',
    act_newcomer: '',
    redPacketShowFlag: '',
    spotpurchaseflag: ''
  },
  onLoad: function (options) {
    const that = this;
    wx2my.showLoading({
      title: '加载中'
    });
    that.setData({
      hotelId: app.globalData.hotelId,
      shareuser: app.globalData.shareUser,
      shareUserAvatarUrl: app.globalData.shareUserAvatarUrl,
      shareUserNickName: app.globalData.shareUserNickName,
      shareObj: app.globalData.shareObj,
      regbagact_type: app.globalData.regbagact_type,
      redPacketShowFlag: app.globalData.redPacketShowFlag,
      spotpurchaseflag: app.globalData.spotpurchaseflag
    });

    if (options.id == undefined) {
      wx2my.getStorage({
        key: 'funcAreaId',
        success: function (res) {
          that.setData({
            funcId: res.data
          });
          that.get_funcinfo(res.data); //获取功能区详情
        }
      });
    } else {
      that.setData({
        funcId: options.id
      });
      that.get_funcinfo(options.id); //获取功能区详情
    }

    setTimeout(function () {
      wx2my.getStorage({
        //功能区列表
        key: 'hotelFuncDTOS1',

        success(res) {
          that.setData({
            hotelFuncDTOS1: res.data
          });
        }

      });
      wx2my.getStorage({
        //功能区列表
        key: 'hotelFuncDTOS2',

        success(res) {
          that.setData({
            hotelFuncDTOS2: res.data
          });
        }

      });
    }, 500);
    wx2my.getStorage({
      key: 'minibar',

      success(res) {
        that.setData({
          minibar: res.data
        });
      }

    });
    wx2my.getStorage({
      key: 'convenienceStore',

      success(res) {
        that.setData({
          convenienceStore: res.data
        });
      }

    });
    wx2my.getStorage({
      key: 'roomDelivery',

      success(res) {
        let isScenetype;

        if (res.data == 2) {
          isScenetype = 1; //扫码进入
        } else {
          isScenetype = 0; //非扫码进入
        }

        that.setData({
          roomDelivery: res.data,
          isScene: isScenetype
        });
      }

    });
    wx2my.getStorage({
      key: 'roomService',

      success(res) {
        that.setData({
          roomService: res.data
        });
      }

    });
    that.get_hotelinfo();
  },
  onShow: function () {
    // wx.hideHomeButton();
    const that = this;
    let redbagtype = 0;

    if (app.globalData.shareUserNickName) {
      redbagtype = 1;
    }

    if (app.globalData.shareUser != '' && app.globalData.shareuser != '0' && app.globalData.num == 1 && app.globalData.shareObjectId != null) {} else {
      let act_newcomer_data = '';
      let actlistdata = app.globalData.actlistdata;
      let actindex = actlistdata.findIndex(item => {
        //判断数组中是否存在当前数据,无：-1，有：返回下标
        return item.actType == 1;
      });

      if (actindex != -1) {
        act_newcomer_data = actlistdata[actindex];
      }

      that.setData({
        redbagtype: redbagtype,
        act_newcomer: act_newcomer_data
      });

      if (act_newcomer_data != '') {
        if (act_newcomer_data.isOpen == 0 && (app.globalData.redPacketShowFlag == 0 || app.globalData.shareObj != 3 || app.globalData.regbagact_type != 0)) {
          actlistdata[actindex].isOpen = 1;
          app.globalData.actlistdata = actlistdata;
        }
      }
    }

    app.globalData.regbagact_type = 1;
  },
  get_hotelinfo: function () {
    const that = this;
    wxrequest.gethotelinfo(app.globalData.hotelId).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.getsortlist(resdatas.id); //获取酒店市场分类一级目录

        that.setData({
          isSupportEn: resdatas.isSupportEn,
          isSupportRmsvc: resdatas.isSupportRmsvc,
          isSupportDelivery: resdatas.isSupportHshop,
          isSupportRoomAlloc: resdatas.isSupportRoomAlloc,
          themecolor: JSON.parse(resdatas.hotelThemeDTO.themeDescription)
        });
      } else {
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  },
  get_funcinfo: function (id) {
    //获取功能区详情
    const that = this;
    wxrequest.getfuncdetail(id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          bannerImageList: resdatas.funcBannerImages
        });
        wx2my.setNavigationBarTitle({
          title: resdatas.funcCnName + ' ' + resdatas.funcEnName
        });
      } else {
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  },
  getsortlist: function (hotelId) {
    //获取酒店市场分类一级目录
    const that = this;
    let linkData = {
      hotelId: hotelId,
      funcId: that.data.funcId,
      parentId: 0
    };
    wxrequest.gethotelclass(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        if (resdatas.length != 0) {
          that.setData({
            sortlist: resdatas,
            sortype: 0,
            typeid: resdatas[0].id
          });
          that.gettypelist(resdatas[0].id, hotelId);
        } else {
          that.setData({
            sortlist: '',
            typeid: ''
          });
          let typelistid = '';
          that.getcommoditylist(typelistid, hotelId, that.data.funcId, that.data.pageNum);
        }
      } else {
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  },
  gettypelist: function (parentId, hotelId) {
    //获取酒店市场分类二级目录
    const that = this;
    let funcId = that.data.funcId;
    let linkData = {
      hotelId: hotelId,
      funcId: funcId,
      parentId: parentId
    };
    wxrequest.gethotelclass(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        let typelistid;

        if (resdatas.length == 0) {
          typelistid = parentId;
        } else {
          typelistid = resdatas[0].id;
        }

        that.setData({
          typelist: resdatas,
          typenum: 0,
          typeid: typelistid
        });
        that.getcommoditylist(typelistid, hotelId, funcId, that.data.pageNum); //获取分类下所有商品
      } else {
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  },
  getcommoditylist: function (typelistid, hotelId, funcId, pageNum) {
    //获取分类下所有商品
    const that = this;
    wx2my.showLoading({
      title: '加载中'
    });
    let isScene = that.data.isScene;
    let roomDelivery = that.data.roomDelivery;
    let linkData = {
      categoryId: typelistid,
      //市场分类id
      funcId: funcId,
      //功能区id
      hotelId: hotelId,
      isStore: 0,
      //是否是便利店
      pageNo: pageNum,
      pageSize: 10
    };
    wxrequest.getbldprodlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        let commodity_list1 = that.data.commoditylist;
        const commodity_list2 = that.data.commoditylist;

        if (commodity_list1.length == 0) {
          commodity_list1 = resdata.data.records;
        } else {
          commodity_list1 = commodity_list2.concat(resdata.data.records);
        }

        that.setData({
          commoditylist: commodity_list1,
          pages: resdata.data.pages
        });
        wx2my.hideNavigationBarLoading(); // 隐藏导航栏加载框

        wx2my.stopPullDownRefresh(); // 停止下拉动作

        if (app.globalData.shareUser != '' && app.globalData.shareuser != '0' && app.globalData.num == 1 && app.globalData.shareObjectId != null) {
          wx2my.navigateTo({
            url: '../hotelmalldetails/hotelmalldetails?funcprodid=' + app.globalData.shareObjectId
          });
        }

        wx2my.hideLoading(); // 隐藏加载框
      } else {
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  },
  typechange: function (e) {
    //切换侧边栏
    const that = this;
    that.setData({
      sortype: e.currentTarget.dataset.num,
      typeid: e.currentTarget.dataset.id,
      pageNum: 1,
      commoditylist: []
    });
    that.gettypelist(e.currentTarget.dataset.id, that.data.hotelId);
  },
  changeType: function (e) {
    //切换二级分类
    const that = this;
    that.setData({
      typenum: e.currentTarget.dataset.num,
      typeid: e.currentTarget.dataset.id,
      pageNum: 1,
      commoditylist: []
    });
    that.getcommoditylist(e.currentTarget.dataset.id, that.data.hotelId, that.data.funcId, that.data.pageNum);
  },
  details: function (e) {
    //查看详情
    wx2my.navigateTo({
      url: '../hotelmalldetails/hotelmalldetails?funcprodid=' + e.currentTarget.dataset.funcprodid
    });
  },
  changetype: function (e) {
    //特产分类切换
    const that = this;
    let edata = e.currentTarget.dataset;
    that.setData({
      type: edata.type
    });
  },
  index: function () {
    //首页
    wx2my.reLaunch({
      url: '../index/index'
    });
  },
  roomservice: function () {
    //客房服务
    wx2my.reLaunch({
      url: '../roomservice/roomservice'
    });
  },
  mypage: function () {
    //我的
    wx2my.reLaunch({
      url: '../my/my'
    });
  },
  hotelmall: function (e) {
    //功能区跳转
    wx2my.reLaunch({
      url: '../specialty/specialty?id=' + e.currentTarget.dataset.id
    });
  },
  reservation: function () {
    //客房协议价
    wx2my.reLaunch({
      url: '../reservation/reservation'
    });
  },
  bindchange: function (e) {
    this.setData({
      current: e.detail.current
    });
  },
  imageLoad: function (e) {
    //banner图高度自适应
    var imgwidth = e.detail.width,
        imgheight = e.detail.height,
        //宽高比  
    ratio = imgwidth / imgheight; //计算的高度值  

    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights; //把每一张图片的对应的高度记录到数组里  

    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    });
  },
  goshopcar: function () {
    wx2my.navigateTo({
      url: '../hotelmallcar/hotelmallcar'
    });
  },
  isLanding: function () {
    //判断是否授权登陆
    const that = this;
    that.dialog = that.selectComponent("#dialog");
    wx2my.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称          
          wx2my.navigateTo({
            url: '../hotelmallcar/hotelmallcar'
          });
        } else {
          that.dialog.showDialog();
        }
      }

    });
  },
  redirectfun: function (e) {
    //监听组件传回的userid
    const that = this;
    wx2my.navigateTo({
      url: '../hotelmallcar/hotelmallcar'
    });
  },
  onPullDownRefresh: function () {
    //下拉刷新
    const that = this;
    that.setData({
      moretype: true,
      pageNum: 1,
      sortlist: [],
      typelist: [],
      commoditylist: []
    });
    that.getsortlist(that.data.hotelId); //获取酒店市场分类一级目录
  },
  onReachBottom: function () {
    //上拉加载
    var that = this;
    let pageNo = that.data.pageNum;
    let pages = that.data.pages;

    if (pageNo < pages) {
      wx2my.showLoading({
        // 显示加载图标
        title: '玩命加载中'
      });
      pageNo = pageNo + 1; // 页数+1

      that.setData({
        pageNum: pageNo
      });
      that.getcommoditylist(that.data.typeid, that.data.hotelId, that.data.funcId, pageNo);
    }
  }
});