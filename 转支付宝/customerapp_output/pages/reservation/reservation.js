const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';

let util = require("../../utils/util.js");

Page({
  data: {
    convenienceStore: '',
    showtype: false,
    shareCode: '',
    isIpx: app.globalData.isIpx,
    isSupportEn: 0,
    //中英文开关：0关，1开
    hotelAddImagesfirst: '',
    //第一张banner
    hotelAddImages: [],
    autoplay: true,
    circular: true,
    interval: 3500,
    duration: 500,
    hotelid: '',
    hotelStarLevel: '',
    hotelName: '',
    hotelDecorationYear: '',
    hotelStyle: '',
    province: '',
    city: '',
    area: '',
    hotelHonor: '',
    hotelLatitude: '',
    hotelContactsMobile: '',
    //联系电话
    hotelAddress: '',
    //酒店地址
    isHasPark: '',
    //是否有停车位
    themecolor: '',
    //主题颜色
    isvirtual: '',
    //fales:虚拟柜
    isSupportRmsvc: '',
    //是否支持客房服务 0 不支持，1 支持
    isSupportDelivery: '',
    //是否支持商城 0 不支持，1 支持
    isSupportRoomAlloc: '',
    //是否支持客房协议价 0 不支持，1 支持
    timedataval: '5',
    //凌晨时间
    starTime: '',
    //入住时间
    starweek: '',
    //入住-星期
    day: '',
    //入住几晚
    endTime: '',
    //离店时间
    endweek: '',
    //离店-星期
    roominfo: [],
    //房型房源信息
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
    cabCode: '',
    shareuser: '',
    //分享人信息
    shareUserAvatarUrl: '',
    shareUserNickName: '',
    redbagtype: '',
    shareObj: '',
    regbagact_type: '',
    act_newcomer: '',
    redPacketShowFlag: '',
    shareFlag: '',
    spotpurchaseflag: ''
  },
  onLoad: function (options) {
    const that = this;
    wx2my.showLoading({
      title: '加载中'
    });
    that.setData({
      hotelid: app.globalData.hotelId,
      shareuser: app.globalData.shareUser,
      shareUserAvatarUrl: app.globalData.shareUserAvatarUrl,
      shareUserNickName: app.globalData.shareUserNickName,
      regbagact_type: app.globalData.regbagact_type,
      shareObj: app.globalData.shareObj,
      redPacketShowFlag: app.globalData.redPacketShowFlag,
      shareFlag: app.globalData.shareFlag,
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
    that.initialization(app.globalData.hotelId);
    wx2my.getStorage({
      key: 'CabCode',
      success: function (res) {
        that.setData({
          cabCode: res.data
        });
      }
    });
    wx2my.getStorage({
      key: 'themecolor',
      success: function (res) {
        that.setData({
          themecolor: res.data
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
      key: 'isvirtual',

      success(res) {
        that.setData({
          isvirtual: res.data
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
    that.get_hotelinfo(app.globalData.hotelId); //获取酒店信息
  },
  onShow: function () {
    my.hideShareMenu();
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
  initialization: function (hotelid) {
    //初始化 入住-离店时间
    const that = this;
    let time = util.formatDate(new Date());
    let dateweek = util.getDates(2, time);
    that.setData({
      starTime: dateweek[0].time,
      //入住时间
      starweek: dateweek[0].week,
      //入住-星期
      day: 1,
      endTime: dateweek[1].time,
      //离店时间
      endweek: dateweek[1].week //离店-星期

    });
    that.getroominfo(dateweek[0].time, dateweek[1].time, hotelid, 1); //获取酒店房型房源信息
  },
  getroominfo: function (startime, endtime, hotelid, day) {
    //获取酒店房型房源信息
    const that = this;

    if (startime == '' || endtime == '') {
      return;
    }

    let linkData = {
      hotelId: hotelid,
      startDate: startime,
      endDate: endtime,
      days: day
    };
    wxrequest.getroominfo(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        for (let i = 0; i < resdatas.length; i++) {
          resdatas[i].type = false;
        }

        that.setData({
          roominfo: resdatas
        });
        wx2my.hideLoading();
      } else {
        wx2my.hideLoading();
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
  
  saveRef(ref) {
    this.counter = ref;
  },

  selecttimefun: function () {
    //选择 入住-离店时间
    const that = this;
    let starTime = '';
    let starweek = '';
    let day = '';
    let endTime = '';
    let endweek = '';
    this.counter.xianShi({
      data: function (res) {
        if (res != null) {
          if (res.length == 1) {
            starTime = res[0].data;
          } else if (res.length == 2) {
            starTime = res[0].data;
            endTime = res[1].data;
            day = res[1].chaDay;
            let data1 = util.getDates(1, starTime);
            let data2 = util.getDates(1, endTime);
            starweek = data1[0].week;
            endweek = data2[0].week;
          }
        } else {
          that.initialization(that.data.hotelid); //初始化 入住-离店时间

          return;
        }

        that.setData({
          starTime: starTime,
          //入住时间
          starweek: starweek,
          //入住-星期
          day: day,
          endTime: endTime,
          //离店时间
          endweek: endweek //离店-星期

        });
        that.getroominfo(starTime, endTime, that.data.hotelid, day); //获取酒店房型房源信息
      }
    });
  },
  get_hotelinfo: function (hotelid) {
    //获取酒店信息
    const that = this;
    wxrequest.gethotelinfo(hotelid).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        let hotelAddImagesfirst;
        let hotelAddImages;

        if (resdatas.hshopImageDTOs != null || resdatas.hshopImageDTOs.length != 0) {
          hotelAddImagesfirst = resdatas.roomAllocImageDTOs[0];
          hotelAddImages = resdatas.roomAllocImageDTOs;
          hotelAddImages.splice(0, 1);
        } else {
          hotelAddImagesfirst = '';
          hotelAddImages = '';
        }

        let hotelDecorationYear = resdatas.hotelDecorationYear.substring(0, 4);
        let area = '';

        if (resdatas.area) {
          //区
          area = resdatas.area.dictName;
        }

        that.setData({
          isSupportEn: resdatas.isSupportEn,
          hotelAddImagesfirst: hotelAddImagesfirst,
          //酒店第一张banner
          hotelAddImages: hotelAddImages,
          //酒店banner
          hotelName: resdatas.hotelName,
          //酒店名称
          hotelStarLevel: resdatas.hotelStarLevel + 1,
          //酒店星级
          hotelDecorationYear: hotelDecorationYear,
          //酒店装修时间
          hotelStyle: resdatas.hotelStyle,
          //酒店装修风格
          isHasPark: resdatas.isHasPark,
          //是否有停车场
          hotelAddress: resdatas.hotelAddress,
          //酒店详细地址
          province: resdatas.province.dictName,
          //省
          city: resdatas.city.dictName,
          //市
          area: area,
          //区
          hotelHonor: resdatas.hotelHonor,
          //酒店荣誉
          hotelContactsMobile: resdatas.hotelContactsMobile,
          //酒店联系电话
          hotelLatitude: resdatas.hotelLatitude,
          //酒店纬度
          hotelLongitude: resdatas.hotelLongitude,
          //酒店经度
          isSupportRmsvc: resdatas.isSupportRmsvc,
          //是否支持客房服务
          isSupportDelivery: resdatas.isSupportHshop,
          //是否支持酒店商城
          isInvoice: resdatas.isSupportRoomInvoice,
          //是否支持酒店房费发票
          isSupportRoomAlloc: resdatas.isSupportRoomAlloc,
          //是否支持客房协议价
          themecolor: JSON.parse(resdatas.hotelThemeDTO.themeDescription) //主题

        });
        wx2my.hideLoading();
      } else {
        wx2my.hideLoading();
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
  togglebtm: function (e) {
    //显示、隐藏房间信息
    const that = this;
    let roominfo = that.data.roominfo;
    let indexnum = e.currentTarget.dataset.indexnum;
    let type = e.currentTarget.dataset.type;

    for (let i = 0; i < roominfo.length; i++) {
      roominfo[i].type = false;
    }

    roominfo[indexnum].type = !type;
    that.setData({
      roominfo: roominfo
    });
  },
  detailfun: function (e) {
    //查看详情
    const thatdata = this.data;
    wx2my.navigateTo({
      url: '../reservationdetail/reservationdetail?id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.type + '&starTime=' + thatdata.starTime + '&starweek=' + thatdata.starweek + '&day=' + thatdata.day + '&endTime=' + thatdata.endTime + '&endweek=' + thatdata.endweek + '&price=' + e.currentTarget.dataset.price + '&fullflag=' + e.currentTarget.dataset.fullflag
    });
  },
  formfun: function (e) {
    //预定
    const thatdata = this.data;
    wx2my.navigateTo({
      url: '../reservationform/reservationform?id=' + e.currentTarget.dataset.id + '&starTime=' + thatdata.starTime + '&starweek=' + thatdata.starweek + '&day=' + thatdata.day + '&endTime=' + thatdata.endTime + '&endweek=' + thatdata.endweek
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
  hotelmall: function (e) {
    //功能区跳转
    wx2my.reLaunch({
      url: '../specialty/specialty?id=' + e.currentTarget.dataset.id
    });
  },
  mypage: function () {
    //我的
    wx2my.reLaunch({
      url: '../my/my'
    });
  },
  hotelstoryfun: function () {
    //酒店文化故事
    wx2my.navigateTo({
      url: '../hotelstorylist/hotelstorylist'
    });
  },
  move: function () {},
  isLanding: function (e) {
    //判断是否授权登陆
    const that = this;
    const thatdata = this.data;
    that.dialog = that.selectComponent("#dialog");
    wx2my.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称          
          wx2my.navigateTo({
            url: '../reservationform/reservationform?id=' + e.currentTarget.dataset.id + '&starTime=' + thatdata.starTime + '&starweek=' + thatdata.starweek + '&day=' + thatdata.day + '&endTime=' + thatdata.endTime + '&endweek=' + thatdata.endweek
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
  },
  sharefun: function () {
    //获取分享码
    const that = this;
    let linkData = {
      cabCode: that.data.cabCode,
      hotelId: app.globalData.hotelId,
      funcId: -1,
      shareObj: 2,
      shareObjId: -1,
      shareUserId: app.globalData.userId,
      shareUserType: 2
    };
    wxrequest.postsharecode(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          shareCode: resdatas.shareCode,
          showtype: true
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
  closefun: function () {
    //关闭分享窗口
    this.setData({
      showtype: false
    });
  },
  onShareAppMessage: function (options) {
    const that = this;
    that.setData({
      showtype: false
    });
    return {
      title: '推荐一家酒店给你，' + that.data.hotelName,
      path: 'pages/login/login?sharecode=' + that.data.shareCode,
      // 路径，传递参数到指定页面。
      imageUrl: that.data.hotelAddImagesfirst.url,
      // 分享的封面图
      success: function (res) {
        // 转发成功
        console.log('用户取消转发');
      },
      fail: function (res) {
        // 转发失败
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          //用户取消转发
          console.log('用户取消转发');
        } else if (res.errMsg == 'shareAppMessage:fail') {
          //转发失败，其中detail message为详细失败信息
          console.log('转发失败');
        }
      }
    };
  }
});