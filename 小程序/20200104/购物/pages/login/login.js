const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    type: '',
    qcode: '',
    sharefuncId: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cabCode: '',
    isSupportRmsvc: '',//客房服务是否支持
    isSupportRoomAlloc: ''//客房协议价是否支持
  },
  onLoad: function (options) {
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    let type;
    let qcode;
    let qrUrl;
    if(options.sharecode){
      qcode = options.sharecode;
      type = true;
    } else {
      qrUrl = decodeURIComponent(options.q);//切换线上
      qcode = that.getQueryString(qrUrl, 'c');//切换线上
      // qcode = options.c;//切换测试
      if(qcode != '' && qcode != null){
        type = true;
      } else {
        type = false;
      }
    }
    that.setData({
      qcode: qcode,
      type: type
    });
    wx.login({// 静默登录 
      success: res => {// 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.silentLogin(res.code);
      }
    });
  },
  onShow: function () {
    wx.hideHomeButton();
  },
  silentLogin: function (code) {//静默登录
    const that = this;
    let linkData = {
      code: code,
      appId: app.globalData.appId,
      appSecret: app.globalData.appSecret,
      // appletType: app.globalData.appletType
    };
    wxrequest.postsilentlogin(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        app.globalData.userId = resdatas.id;
        app.globalData.regbagact_type = 0;
        wx.setStorageSync('token', resdatas.token);
        that.getuserinfo(resdatas.id);
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
  getuserinfo: function (customerId) {//获取用户进场历史信息
    const that = this;
    let linkData = {
      customerId: customerId
    };
    wxrequest.getlicedhotel(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if(resdatas){
          that.goin(resdatas.cabinetQrcode);
        } else {
          that.goin();
        }
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
  goin: function (cabinetQrcode) {//进场
    const that = this;
    const qcode = that.data.qcode;
    const type = that.data.type;
    if(type){
      that.getcabcodefun(qcode);
    } else {
      that.checkfun(cabinetQrcode);
    }
  },
  getcabcodefun: function (code) {//获取cabcode、shareUser
    const that = this;
    let linkData = {
      code : code
    };
    wxrequest.getcabcode(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          shareObj: resdatas.shareObj,
          sharefuncId: resdatas.funcId
        });
        if(resdatas.shareUser != null && resdatas.shareUser != ''){
          let share_info = resdatas.shareUser;
          if(share_info.emp){
            share_info.type = 1;//员工
          } else {
            share_info.type = 2;//顾客
          }
          app.globalData.shareUser = share_info;
        }
        that.setData({
          cabCode: resdatas.cabCode
        });
        wx.setStorage({
          key: 'CabCode',
          data: resdatas.cabCode
        });
        app.globalData.shareObjectId = resdatas.shareObjectId;
        app.globalData.cabCode = resdatas.cabCode;
        if(resdatas.shareObj){
          app.globalData.shareObj = resdatas.shareObj;
        }
        if(resdatas.shareUserNickName && resdatas.shareObj == 3){
          app.globalData.shareUserAvatarUrl = resdatas.shareUserAvatarUrl;
          app.globalData.shareUserNickName = resdatas.shareUserNickName;
          app.globalData.shareredbag_code = resdatas.code;
        }
        that.get_cabtype(resdatas.cabCode);
      } else {
        wx.showToast({
          title: resdata.msg + ',请重新扫码',
          icon: 'none',
          duration: 5000
        });
        setTimeout(function(){
          wx.redirectTo({
            url: '../adview/adview'
          })
        }, 5000);
      }
    })
    .catch(err => {
      console.log(err)
    });
  },
  checkfun: function (cabinetQrcode) {//校验用户历史记录 
    const that = this;
    const cab_code = cabinetQrcode;
    if(cab_code == '') {
      wx.redirectTo({
        url: '../adview/adview'
      })
    } else {
      app.globalData.shareUser = '0';
      that.getcabcodefun(cab_code);
    }
  },
  get_cabtype: function (cabCode) {//根据柜子类型获取柜子类型配置详情
    const that = this;
    let linkData = {
      cabCode: cabCode
    };
    wxrequest.getcabtype(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        app.globalData.cabId = resdatas.cabId;
        app.globalData.hotelId = resdatas.hotelId;
        that.setuserinfo(resdatas.cabId, resdatas.hotelId);
        that.get_Actlist(resdatas.hotelId);
        that.get_hotelinfo(resdatas.hotelId, cabCode, resdatas);//获取酒店信息
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
  setuserinfo: function (cabId, hotelId) {//存储用户进场信息
    const that = this;
    let linkData = {
      cabId: cabId,
      hotelId: hotelId,
      customerId: app.globalData.userId
    };
    wxrequest.postuserinfo(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
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
  get_Actlist: function (hotelId) {//获取用户可参与的活动
    let linkData = {
      hotelId: hotelId
    };
    wxrequest.getActlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        app.globalData.actlistdata = resdatas;
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
  get_hotelinfo: function (hotelId, cabCode, cabresdatas) {//获取酒店信息
    const that = this;
    wxrequest.gethotelinfo(hotelId).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        wx.setStorage({//是否支持酒店房费发票
          key: 'isInvoice',
          data: resdatas.isSupportRoomInvoice
        });
        wx.setStorage({
          key: 'hotelId',
          data: resdatas.id
        });
        wx.setStorage({//运营商组织id
          key: 'operatorId',
          data: resdatas.operatorId
        });
        wx.setStorage({
          key: 'hotelName',
          data: resdatas.hotelName
        });
        wx.setStorage({
          key: 'rmsvcImageDTOs',
          data: resdatas.rmsvcImageDTOs
        });
        wx.setStorage({//是否支持客房服务
          key: 'isSupportRmsvc',
          data: resdatas.isSupportRmsvc
        });
        wx.setStorage({//是否支持便利店
          key: 'isSupportStore',
          data: resdatas.isSupportStore
        });
        wx.setStorage({//是否支持客房协议价
          key: 'isSupportRoomAlloc',
          data: resdatas.isSupportRoomAlloc
        });
        wx.setStorage({//酒店订房电话
          key: 'hotelBookingPhone',
          data: resdatas.hotelBookingPhone
        });
        wx.setStorage({//酒店联系电话
          key: 'hotelContactsMobile',
          data: resdatas.hotelContactsMobile
        });
        wx.setStorage({//酒店联系人
          key: 'hotelContactsName',
          data: resdatas.hotelContactsName
        });
        wx.setStorage({//中英文开关
          key: 'isSupportEn',
          data: resdatas.isSupportEn
        });
        wx.setStorage({
          key: 'themecolor',
          data: JSON.parse(resdatas.hotelThemeDTO.themeDescription)
        });
        let isSupportRmsvc = resdatas.isSupportRmsvc;//是否支持客房服务0：不支持 1：支持
        let isSupportRoomAlloc = resdatas.isSupportRoomAlloc;//是否支持客房协议价0：不支持 1：支持
        let isSupportStore = resdatas.isSupportStore;//是否支持便利店0：不支持 1：支持

        wx.setStorage({//迷你吧支持功能
          key: 'minibar',
          data: cabresdatas.minibar,
        });
        wx.setStorage({//是否是虚拟柜
          key: 'isvirtual',
          data: cabresdatas.virtualFlag,
        });
        wx.setStorage({//功能区id(默认为首页的功能页)
          key: 'funcAreaId',
          data: cabresdatas.funcAreaId,
        });
        wx.setStorage({
          key: 'roomCode',
          data: cabresdatas.roomCode
        });
        wx.setStorage({
          key: 'roomFloor',
          data: cabresdatas.roomFloor
        });
        let hotelFuncDTOS = cabresdatas.hotelFuncDTOS;
        let hotelFuncDTOS1 = [];
        let hotelFuncDTOS2 = [];
        let tabnum = 1;
        if (cabresdatas.roomService == 0 || isSupportRmsvc == 0) {//客房服务支持功能
          tabnum = tabnum + 1;
          wx.setStorage({
            key: 'roomService',
            data: 0,
          });
        } else {
          wx.setStorage({
            key: 'roomService',
            data: cabresdatas.roomService,
          });
        }
        if (cabresdatas.convenienceStore == 0 || isSupportStore == 0 ) {//便利店支持功能
          if (cabresdatas.minibar == 0) {//迷你吧支持功能
            tabnum = tabnum + 1;
          }
          wx.setStorage({
            key: 'convenienceStore',
            data: 0,
          });
        } else {
          wx.setStorage({
            key: 'convenienceStore',
            data: cabresdatas.convenienceStore,
          });
        }
        if (resdatas.isSupportRoomAlloc == 0) {//是否支持客房协议价
          tabnum = tabnum + 1;
        }
        if(hotelFuncDTOS){
          for (let i = 0; i < tabnum && i < hotelFuncDTOS.length; i++) {
            hotelFuncDTOS1.push(hotelFuncDTOS[i]);
          }
          if (hotelFuncDTOS.length - tabnum > 0) {
            for (let j = tabnum; j < hotelFuncDTOS.length; j++) {
              hotelFuncDTOS2.push(hotelFuncDTOS[j]);
            }
          }
          wx.setStorage({
            key: 'hotelFuncDTOS1',
            data: hotelFuncDTOS1,
          });
          wx.setStorage({
            key: 'hotelFuncDTOS2',
            data: hotelFuncDTOS2,
          });
        } else {
          wx.setStorage({
            key: 'hotelFuncDTOS1',
            data: '',
          });
          wx.setStorage({
            key: 'hotelFuncDTOS2',
            data: '',
          });
        }
        that.routejump(cabresdatas.homePage, cabresdatas.funcAreaId);//路由跳转
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
  routejump: function (homePage, funcAreaId) {//路由跳转
    const that = this;
    const share_Obj = that.data.shareObj;//0：员工分享二维码分享，1：好物分享，2：房源分享，3：红包分享
    const sharefuncId = that.data.sharefuncId;
    let linkurl = '';
    if(share_Obj == 1 || share_Obj == 2){
      app.globalData.num = 1;
      wx.setStorage({//功能区id(默认为首页的功能页)
        key: 'funcAreaId',
        data: sharefuncId,
      });
      if (share_Obj == 1) {//特产商城
        linkurl = '../specialty/specialty';
      } else if (share_Obj == 2) {//客房协议价
        linkurl = '../reservation/reservation';
      }
    } else {
      if (homePage == 1) {//迷你吧
        linkurl = '../index/index';
      } else if (homePage == 2) {//客房服务
        linkurl = '../roomservice/roomservice';
      } else if (homePage == 3) {//功能区
        if(funcAreaId == 2){
          linkurl = '../index/index';
        }else{
          linkurl = '../specialty/specialty';
        }
      } else if (homePage == 4) {//客房协议价
        linkurl = '../reservation/reservation';
      } else if (homePage == 5) {//客房服务
        linkurl = '../my/my';
      }
    }
    wx.redirectTo({
      url: linkurl
    })
  },
  getQueryString: function (url, name) {//解析链接方法
    var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i');
    var r = url.substr(1).match(reg);
    if (r != null) {
      return r[2];
    }
    return null;
  }
})