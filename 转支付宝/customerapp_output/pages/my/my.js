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
    userInfo: {},
    hotelId: '',
    userid: '',
    oprInvoiceSup: '',
    //运营商是否支持开票 0 不支持，1 支持
    isInvoice: '',
    //是否支持酒店房费发票 0 不支持，1 支持
    isvirtual: '',
    //fales:虚拟柜
    isSupportRmsvc: '',
    //是否支持客房服务 0 不支持，1 支持
    isSupportDelivery: '',
    //是否支持商城 0 不支持，1 支持
    isSupportRoomAlloc: '',
    //是否支持客房协议价 0 不支持，1 支持
    themecolor: '',
    //主题颜色
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
    userbalancedata: '',
    shareuser: '',
    //分享人信息
    spotpurchaseflag: ''
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      hotelId: app.globalData.hotelId,
      userid: app.globalData.userId,
      shareuser: app.globalData.shareUser,
      spotpurchaseflag: app.globalData.spotpurchaseflag
    });
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
      key: 'isSupportEn',

      success(res) {
        that.setData({
          isSupportEn: res.data
        });
      }

    });
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
        that.setData({
          roomDelivery: res.data
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
    wx2my.getStorage({
      key: 'isSupportRmsvc',

      success(res) {
        that.setData({
          isSupportRmsvc: res.data
        });
      }

    });
    wx2my.getStorage({
      key: 'isSupportDelivery',

      success(res) {
        that.setData({
          isSupportDelivery: res.data
        });
      }

    });
    wx2my.getStorage({
      key: 'isSupportRoomAlloc',

      success(res) {
        that.setData({
          isSupportRoomAlloc: res.data
        });
      }

    });
    wx2my.getStorage({
      key: 'userInfo',

      success(res) {
        that.setData({
          userInfo: res.data
        });
      },

      fail: function () {
        let user_Info = {
          avatarUrl: '',
          nickName: ''
        };
        that.setData({
          userInfo: user_Info
        });
      }
    });
    wx2my.getStorage({
      key: 'themecolor',

      success(res) {
        that.setData({
          themecolor: res.data
        });
      }

    });
    wx2my.getStorage({
      key: 'isvirtual',

      success(res) {
        that.setData({
          isvirtual: res.data
        });
      }

    });
    that.getoprInvoiceSup(app.globalData.hotelId); //检查酒店所属运营商是否支持开商品发票

    that.getisInvoice(app.globalData.hotelId); //检查是否支持酒店房费发票
  },
  onShow: function () {
    // wx.hideHomeButton();
    this.getbalancedata(); //获取余额
  },
  getoprInvoiceSup: function (hotelId) {
    //检查酒店所属运营商是否支持开商品发票
    const that = this;
    let linkData = {
      hotelId: hotelId
    };
    wxrequest.getfininvcheck(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          oprInvoiceSup: resdatas
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
  getisInvoice: function (hotelId) {
    //检查是否支持酒店房费发票
    const that = this;
    let linkData = {
      hotelId: hotelId
    };
    wxrequest.gethotelinvtype(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          isInvoice: resdatas
        });
        wx2my.setStorage({
          key: 'isInvoice',
          data: resdatas
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
  getbalancedata: function () {
    //获取用户余额、收支明细
    const that = this;
    wxrequest.getuserbalance(app.globalData.userId).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          userbalancedata: resdatas
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
  index: function () {
    //首页
    wx2my.reLaunch({
      url: '../index/index'
    });
  },
  orderlist: function () {
    //商品订单列表
    wx2my.navigateTo({
      url: '../prodOrder/prodOrder?typeindex=all'
    });
  },
  reservation: function () {
    //客房协议价
    wx2my.reLaunch({
      url: '../reservation/reservation'
    });
  },
  roomservice: function () {
    //客房服务
    wx2my.reLaunch({
      url: '../roomservice/roomservice'
    });
  },
  hotelmall: function (e) {
    //功能区跳转
    wx2my.reLaunch({
      url: '../specialty/specialty?id=' + e.currentTarget.dataset.id
    });
  },
  billingfun: function () {
    //开票管理
    wx2my.navigateTo({
      url: '../billing/billing?isinvoice=' + this.data.isInvoice + '&oprinvoicesup=' + this.data.oprInvoiceSup
    });
  },
  livedhotelfun: function () {
    //住过的酒店
    wx2my.navigateTo({
      url: '../livedhotel/livedhotel'
    });
  },
  hotelafter: function () {
    //酒店退款/售后
    wx2my.navigateTo({
      url: '../mhotelmallrefundlist/mhotelmallrefundlist'
    });
  },
  mycoupon: function () {
    //我的优惠券
    wx2my.navigateTo({
      url: '../mycoupon/mycoupon'
    });
  },
  myredbag: function () {
    //我的红包
    wx2my.navigateTo({
      url: '../myredbag/myredbag'
    });
  },
  couponcenter: function () {
    //领券中心
    wx2my.navigateTo({
      url: '../couponcenter/couponcenter'
    });
  },
  business: function () {
    wx2my.navigateTo({
      url: '../business/business'
    });
  },
  investment: function () {
    //我要投资
    wx2my.navigateToMiniProgram({
      appId: 'wxec071a236e409d79',
      path: 'pages/smartCab/smartCab',
      envVersion: 'trial',

      success(res) {
        // 打开成功
        console.log('打开成功');
      }

    });
  },
  isLanding: function (e) {
    //判断是否授权登陆
    const that = this;
    let typenum = e.currentTarget.dataset.typenum;
    // that.dialog = that.selectComponent("#dialog");
    wx2my.getSetting({
      success(res) {
        // if (res.authSetting['scope.userInfo']) {
          if (res.authSetting['userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称          
          if (typenum == 1) {
            //订单列表 or 商城订单
            that.orderlist();
          } else if (typenum == 2) {
            //住过的酒店
            that.livedhotelfun();
          } else if (typenum == 3) {
            //酒店退款/售后
            that.hotelafter();
          } else if (typenum == 4) {
            //开票管理
            that.billingfun();
          } else if (typenum == 5) {
            //我的优惠券
            that.mycoupon();
          } else if (typenum == 6) {
            //我的红包
            that.myredbag();
          } else if (typenum == 7) {
            //领券中心
            that.couponcenter();
          } else if (typenum == 8) {
            //我的余额
            that.balancefun();
          }
        } else {
          that.counter.showDialog();
        }
      }

    });
  },

  saveRef(ref) {
    this.counter = ref;
  },

  redirectfun: function (e) {
    console.log(e)
    //监听组件传回的userid
    const that = this;
    wx2my.getStorage({
      key: 'userInfo',

      success(res) {
        that.setData({
          userInfo: res.data
        });
      }

    });
  },
  balancefun: function () {
    //余额
    wx2my.navigateTo({
      url: '../mybalance/mybalance'
    });
  }
});