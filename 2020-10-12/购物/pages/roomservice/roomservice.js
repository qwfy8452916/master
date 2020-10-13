const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    adtype: 1,
    global_Data: '',
    hotelId: '',
    isIpx: app.globalData.isIpx,
    isSupportEn: 0,//中英文开关：0关，1开
    mgtop: '',
    rmsvcImageDTOs: [],//banner图
    themecolor: '',//主题颜色
    roomservicelist: [],
    minibar: '',//迷你吧支持功能（0：不支持，1：展示，2：展示+下单）
    convenienceStore: '',//便利店支持功能（0：不支持，1：展示，2：展示+下单）
    roomService: '',//客房服务支持功能（0：不支持，1：展示，2：展示+下单）
    isSupportRoomAlloc: '',//客房协议价 0 不支持，1 支持
    hotelFuncDTOS1: '',//功能区
    hotelFuncDTOS2: '',//功能区
    shareuser: '',//分享人信息
    shareUserAvatarUrl: '',
    shareUserNickName: '',
    redbagtype: '',
    shareObj: '',
    regbagact_type: '',
    act_newcomer: '',
    redPacketShowFlag: '',
    funcid: '',
    spotpurchaseflag: '',

    autoplay: true,
    circular: true,
    interval: 3500,
    duration: 500,
    hotelName: '',
    hotelStarLevel: '',
    hotelDecorationYear: '',
    isHasPark: '',
    windowHeight: '',
    hotelStyle: '',
    hotelAddImagesfirst: {},//第一张banner
    hotelAddImages: [],
  },
  onLoad: function (options) {
    const that = this;
    wx.hideShareMenu();
    wx.showLoading({
      title: '加载中',
    });
    // let resdatas = JSON.parse(options.resdatas);
    let flagtype = '';
    let funcIdval = '';
    if(funcIdval){
      funcIdval = options.funcId;
    } else {
      funcIdval = wx.getStorageSync('funcAreaId');
    }
    if(app.globalData.isDefault == 1) {
      flagtype = 2;
    } else {
      app.globalData.FuncListVal.forEach(item=>{
        if(item.funcAreaId == funcIdval) {
          flagtype = item.flag;
        }
      });
    }
    wx.setStorage({
      key: 'flagroomservice',
      data: flagtype
    })
    that.setData({
      funcid: options.funcId?options.funcId:wx.getStorageSync('funcAreaId'),
      global_Data: app.globalData,
      adtype: app.globalData.adtype,
      hotelId: app.globalData.hotelId,
      shareuser: app.globalData.shareUser,
      shareUserAvatarUrl: app.globalData.shareUserAvatarUrl,
      shareUserNickName: app.globalData.shareUserNickName,
      regbagact_type: app.globalData.regbagact_type,
      shareObj: app.globalData.shareObj,
      redPacketShowFlag: app.globalData.redPacketShowFlag,
      spotpurchaseflag: app.globalData.spotpurchaseflag,
      roomService: flagtype
    });
    wx.setStorageSync('funcAreaId',this.data.funcid)
    wx.getStorage({//迷你吧
      key: 'minibar',
      success(res) {
        that.setData({
          minibar: res.data
        })
      }
    });
    wx.getStorage({//便利店
      key: 'isSupportStore',
      success(res) {
        that.setData({
          convenienceStore: res.data
        })
      }
    });
    wx.getStorage({//客房协议价
      key: 'isSupportRoomAlloc',
      success(res) {
        that.setData({
          isSupportRoomAlloc: res.data
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
    that.get_hotelinfo(app.globalData.hotelId);//获取酒店信息
    that.get_funcinfo(this.data.funcid);//获取功能区详情
    that.getroomservicelist(app.globalData.hotelId);
  },
  get_funcinfo: function(id){//获取功能区详情
    let linkData = {
      cabId: app.globalData.cabId,
      enterStyle: app.globalData.enterStyle
    };
    wxrequest.getfuncdetail(id, linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      console.log(resdatas)
      let hotelAddImagesfirst = '';
      let hotelAddImages;
      if (resdata.code == 0) {
        if (resdatas.funcBannerImages != null && resdatas.funcBannerImages.length != 0) {
          hotelAddImagesfirst = resdatas.funcBannerImages[0];
          hotelAddImages = resdatas.funcBannerImages;
          hotelAddImages.splice(0, 1);
        } else {
          hotelAddImagesfirst = '';
          hotelAddImages = '';
        }
        this.setData({
          hotelAddImagesfirst: hotelAddImagesfirst,//酒店第一张banner
          hotelAddImages: hotelAddImages,//酒店banner
        });
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  get_hotelinfo: function (hotelid) {//获取酒店信息
    const that = this;
    wxrequest.gethotelinfo(hotelid).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let hotelDecorationYear = resdatas.hotelDecorationYear.substring(0, 4);
        let area = '';
        if (resdatas.area) {//区
          area = resdatas.area.dictName;
        }
        that.setData({
          isSupportEn: resdatas.isSupportEn,//中英文开关：0关，1开
          hotelName: resdatas.hotelName,//酒店名称
          hotelStarLevel: resdatas.hotelStarLevel + 1,//酒店星级
          hotelDecorationYear: hotelDecorationYear,//酒店装修时间
          hotelStyle: resdatas.hotelStyle,//酒店装修风格
          isHasPark: resdatas.isHasPark,//是否有停车场
          hotelAddress: resdatas.hotelAddress,//酒店详细地址
          province: resdatas.province.dictName,//省
          city: resdatas.city.dictName,//市
          area: area,//区
          hotelHonor: resdatas.hotelHonor,//酒店荣誉
          hotelBookingPhone: resdatas.hotelBookingPhone,//酒店订房电话
          hotelLatitude: resdatas.hotelLatitude,//酒店纬度
          hotelLongitude: resdatas.hotelLongitude,//酒店经度
          isInvoice: resdatas.isSupportRoomInvoice,//是否支持酒店房费发票
          isShowInvoiceReminder: resdatas.isShowInvoiceReminder,//酒店设置是否显示滚动字幕
          themecolor: JSON.parse(resdatas.hotelThemeDTO.themeDescription)//主题
        });
        // that.getoprInvoiceSup(hotelid);//检查酒店所属运营商是否支持开商品发票
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  hotelstoryfun: function () {//酒店文化故事
    wx.navigateTo({
      url: '../hotelstorylist/hotelstorylist'
    })
  },
  onShow: function () {
    wx.hideHomeButton();
    const that = this;
    if(app.globalData.typeval == 0) {
      let redbagtype = 0;
      if(app.globalData.shareUserNickName){
        redbagtype = 1;
      }
      let act_newcomer_data = '';
      let actlistdata = app.globalData.actlistdata;
      if(actlistdata.length > 0) {
        act_newcomer_data = actlistdata[0];
      }
      that.setData({
        redbagtype: redbagtype,
        act_newcomer: act_newcomer_data
      });
      if(act_newcomer_data != '' && app.globalData.regbagact_type != 0){
        if(act_newcomer_data.isOpen == 0 && (app.globalData.redPacketShowFlag == 0 || app.globalData.shareObj != 3)){
          app.globalData.actlistdata = [];
        }
      }
      app.globalData.regbagact_type = 1;
    } else {
      that.setData({
        act_newcomer: ''
      })
    }
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
      wx.hideLoading();
      console.log(err)
    });
  },
  roomservicetype: function(e){//跳转到具体某个客房服务列表
    wx.navigateTo({
      url: '../roomservicetype/roomservicetype?id=' + e.currentTarget.dataset.id
    })
  },
  index: function () {//首页
    wx.reLaunch({
      url: '../index/index'
    })
  },
  mypage: function () {//我的
    wx.reLaunch({
      url: '../my/my'
    })
  },
  hotelmall: function (e) {//功能区跳转
    wx.reLaunch({
      url: '../specialty/specialty?id=' + e.currentTarget.dataset.id
    })
  },
  reservation: function () {//客房协议价
    wx.reLaunch({
      url: '../reservation/reservation'
    })
  },
  characteristic: function () {//客房设施
    wx.reLaunch({
      url: '../characteristic/characteristic?id='+this.data.funcid
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
  },
  adfun: function() {
    wx.navigateTo({
      url: '../adimg/adimg',
    })
  },
  onShareAppMessage: function (options) {
    const that = this;
    that.setData({
      showtype: false
    });
    this.post_sharehistory()
    return {
      title: that.data.global_Data.shareUser.username?that.data.global_Data.shareUser.username+'给你发了一个现金红包，领取后可提入微信零钱':'好友给你发了一个现金红包，领取后可提入微信零钱',
      path: 'pages/login/login?sharecode=' + that.data.global_Data.sharecode,  // 路径，传递参数到指定页面。
      imageUrl: that.data.global_Data.imgurldata + 'shareimg.png', // 分享的封面图
      success: function (res) {// 转发成功

      },
      fail: function (res) {// 转发失败
        if (res.errMsg == 'shareAppMessage:fail cancel') {//用户取消转发
          console.log('用户取消转发');
        } else if (res.errMsg == 'shareAppMessage:fail') {//转发失败，其中detail message为详细失败信息
          console.log('转发失败');
        }
      }
    }
  },
  post_sharehistory: function(){//新增酒店分享记录
    const that = this;
    const linkData = {
      shareCode: app.globalData.sharecode
    }
    wxrequest.postsharehistory(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {} else {
        console.log(err)
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  }
})