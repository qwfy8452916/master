const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    hotelId: '',
    isIpx: app.globalData.isIpx,
    isSupportEn: 0,
    //中英文开关：0关，1开
    mgtop: '',
    rmsvcImageDTOs: [],
    //banner图
    isSupportRmsvc: '',
    //客房服务 0 不支持，1 支持
    isSupportRoomAlloc: '',
    //客房协议价 0 不支持，1 支持
    isSupportDelivery: '',
    //是否支持商城 0 不支持，1 支持
    themecolor: '',
    //主题颜色
    roomservicelist: [],
    minibar: '',
    //迷你吧支持功能（0：不支持，1：展示，2：展示+下单）
    convenienceStore: '',
    //便利店支持功能（0：不支持，1：展示，2：展示+下单）
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
      regbagact_type: app.globalData.regbagact_type,
      shareObj: app.globalData.shareObj,
      redPacketShowFlag: app.globalData.redPacketShowFlag,
      spotpurchaseflag: app.globalData.spotpurchaseflag
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
      key: 'isSupportEn',

      success(res) {
        that.setData({
          isSupportEn: res.data
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
      key: 'rmsvcImageDTOs',

      success(res) {
        that.setData({
          rmsvcImageDTOs: res.data
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
      key: 'isSupportDelivery',

      success(res) {
        that.setData({
          isSupportDelivery: res.data
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
    that.getroomservicelist(app.globalData.hotelId);
  },
  onShow: function () {
    // wx.hideHomeButton();
    const that = this;
    let redbagtype = 0;

    if (app.globalData.shareUserNickName) {
      redbagtype = 1;
    }

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

    app.globalData.regbagact_type = 1;
  },
  getroomservicelist: function (hotelId) {
    //获取客房服务列表
    const that = this;
    let linkData = {
      hotelId: hotelId,
      isPage: 0,
      status: 'ENABLED'
    };
    wxrequest.getroomsercicelist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          roomservicelist: resdatas,
          hotelId: hotelId
        });
        wx2my.hideLoading();
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
  roomservicetype: function (e) {
    //跳转到具体某个客房服务列表
    wx2my.navigateTo({
      url: '../roomservicetype/roomservicetype?id=' + e.currentTarget.dataset.id
    });
  },
  index: function () {
    //首页
    wx2my.reLaunch({
      url: '../index/index'
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
  characteristic: function () {
    //客房设施
    wx2my.reLaunch({
      url: '../characteristic/characteristic'
    });
  },
  isLanding: function (e) {
    //判断是否授权登陆 typenum: 1-购物车，2-分类
    const that = this;
    let edata = e.currentTarget.dataset;
    that.dialog = that.selectComponent("#dialog");
    wx2my.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称          
          if (edata.typenum == 1) {
            wx2my.navigateTo({
              url: '../shoppingcart/shoppingcart'
            });
          } else {
            let id = edata.id; //获取自定义属性

            wx2my.navigateTo({
              url: '../roomservicetype/roomservicetype?rmsvcHotelId=' + id
            });
          }
        } else {
          that.dialog.showDialog();
        }
      }

    });
  },
  redirectfun: function (e) {
    //监听组件传回的userid
    const that = this;
  }
});