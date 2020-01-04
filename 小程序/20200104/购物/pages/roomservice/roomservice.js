const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    hotelId: '',
    isIpx: app.globalData.isIpx,
    isSupportEn: 0,//中英文开关：0关，1开
    mgtop: '',
    rmsvcImageDTOs: [],//banner图
    isSupportRmsvc: '',//客房服务 0 不支持，1 支持
    isSupportRoomAlloc: '',//客房协议价 0 不支持，1 支持
    isSupportDelivery: '',//是否支持商城 0 不支持，1 支持
    themecolor: '',//主题颜色
    roomservicelist: [],
 
    minibar: '',//迷你吧支持功能（0：不支持，1：展示，2：展示+下单）
    convenienceStore: '',//便利店支持功能（0：不支持，1：展示，2：展示+下单）
    roomService: '',//客房服务支持功能（0：不支持，1：展示，2：展示+下单）
    hotelFuncDTOS1: '',//功能区
    hotelFuncDTOS2: '',//功能区
    shareuser: '',//分享人信息
    shareUserAvatarUrl: '',
    shareUserNickName: '',
    redbagtype: '',
    shareObj: '',
    regbagact_type: '',
    act_newcomer: ''
  },
  onLoad: function (options) {
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    that.setData({
      hotelId: app.globalData.hotelId,
      shareuser: app.globalData.shareUser,
      shareUserAvatarUrl: app.globalData.shareUserAvatarUrl,
      shareUserNickName: app.globalData.shareUserNickName,
      regbagact_type: app.globalData.regbagact_type,
      shareObj: app.globalData.shareObj
    });
    wx.getStorage({
      key: 'minibar',
      success(res) {
        that.setData({
          minibar: res.data
        })
      }
    });
    wx.getStorage({
      key: 'convenienceStore',
      success(res) {
        that.setData({
          convenienceStore: res.data
        })
      }
    });
    wx.getStorage({
      key: 'roomDelivery',
      success(res) {
        that.setData({
          roomDelivery: res.data
        })
      }
    });
    wx.getStorage({
      key: 'roomService',
      success(res) {
        that.setData({
          roomService: res.data
        })
      }
    });
    wx.getStorage({
      key: 'isSupportEn',
      success(res) {
        that.setData({
          isSupportEn: res.data
        })
      }
    });
    wx.getStorage({
      key: 'isSupportRmsvc',
      success(res) {
        that.setData({
          isSupportRmsvc: res.data
        })
      }
    });
    wx.getStorage({
      key: 'rmsvcImageDTOs',
      success(res) {
        that.setData({
          rmsvcImageDTOs: res.data
        })
      }
    });
    wx.getStorage({
      key: 'isSupportRoomAlloc',
      success(res) {
        that.setData({
          isSupportRoomAlloc: res.data
        })
      }
    });
    wx.getStorage({
      key: 'isSupportDelivery',
      success(res) {
        that.setData({
          isSupportDelivery: res.data
        })
      }
    });
    wx.getStorage({
      key: 'themecolor',
      success(res) {
        that.setData({
          themecolor: res.data
        })
      }
    });
    setTimeout(function () {
      wx.getStorage({//功能区列表
        key: 'hotelFuncDTOS1',
        success(res) {
          that.setData({
            hotelFuncDTOS1: res.data
          });
        }
      });
      wx.getStorage({//功能区列表
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
    wx.hideHomeButton();
    const that = this;
    let redbagtype = 0;
    if(app.globalData.shareUserNickName){
      redbagtype = 1;
    }
    let act_newcomer_data = '';
    let actlistdata = app.globalData.actlistdata;
    let actindex = actlistdata.findIndex(item => {//判断数组中是否存在当前数据,无：-1，有：返回下标
      return item.actType == 1;
    });
    if(actindex != -1){
      act_newcomer_data = actlistdata[actindex];
    }
    that.setData({
      redbagtype: redbagtype,
      act_newcomer: act_newcomer_data
    });
    if(act_newcomer_data != ''){
      if(act_newcomer_data.isOpen == 0 && (app.globalData.shareObj != 3 || app.globalData.regbagact_type != 0)){
        actlistdata[actindex].isOpen = 1;
        app.globalData.actlistdata = actlistdata;
      }
      // else {
      //   actlistdata[actindex].isOpen = 0;
      //   app.globalData.actlistdata = actlistdata;
      // }
    }
    app.globalData.regbagact_type = 1;
  },
  getroomservicelist: function (hotelId) {//获取客房服务列表
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
        wx.hideLoading();
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      console.log(err)
    });
  },
  roomservicetype: function(e){//跳转到具体某个客房服务列表
    wx.navigateTo({
      url: '../roomservicetype/roomservicetype?id=' + e.currentTarget.dataset.id
    })
  },
  index: function () {//首页
    wx.redirectTo({
      url: '../index/index'
    })
  },
  mypage: function () {//我的
    wx.redirectTo({
      url: '../my/my'
    })
  },
  hotelmall: function (e) {//功能区跳转
    wx.redirectTo({
      url: '../specialty/specialty?id=' + e.currentTarget.dataset.id
    })
  },
  reservation: function () {//客房协议价
    wx.redirectTo({
      url: '../reservation/reservation'
    })
  },
  characteristic: function () {//客房设施
    wx.redirectTo({
      url: '../characteristic/characteristic'
    })
  },
  isLanding: function (e) {//判断是否授权登陆 typenum: 1-购物车，2-分类
    const that = this;
    let edata = e.currentTarget.dataset;
    that.dialog = that.selectComponent("#dialog");
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {// 已经授权，可以直接调用 getUserInfo 获取头像昵称          
          if (edata.typenum == 1) {
            wx.navigateTo({
              url: '../shoppingcart/shoppingcart'
            });
          } else {
            let id = edata.id;//获取自定义属性
            wx.navigateTo({
              url: '../roomservicetype/roomservicetype?rmsvcHotelId=' + id
            })
          }
        } else {
          that.dialog.showDialog();
        }
      }
    })
  },
  redirectfun: function (e) {//监听组件传回的userid
    const that = this;
  }
})