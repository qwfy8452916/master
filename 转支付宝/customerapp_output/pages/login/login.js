const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    type: '',
    qcode: '',
    sharefuncId: '',
    canIUse: wx2my.canIUse('button.open-type.getUserInfo'),
    cabCode: '',
    isSupportRmsvc: '',
    //客房服务是否支持
    isSupportRoomAlloc: '' //客房协议价是否支持

  },
  onLoad: function (options) {
    console.log(options)
    const that = this;
    wx2my.showLoading({
      title: '加载中'
    });
    that.changestorage();
    let type;
    let qcode;
    let qrUrl;

    if (options.sharecode) {
      qcode = options.sharecode;
      app.globalData.sharecode = options.sharecode;
      app.globalData.spotpurchaseflag = options.spotpurchaseflag;
      type = true;
    } else {
      // qrUrl = decodeURIComponent(options.q); //切换线上

      // qcode = that.getQueryString(qrUrl, 'c'); //切换线上
      qcode = options.c;//切换测试

      if (qcode != '' && qcode != null) {
        type = true;
      } else {
        type = false;
      }
    }

    that.setData({
      qcode: qcode,
      type: type
    });
    console.log(that.data.qcode)
    // wx.login({
    //   // 静默登录 
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     that.silentLogin(res.code);
    //   }
    // });

my.getAuthCode({
 scopes: 'auth_base',
  success (res) {
    if (res.authCode) {
      console.log(res.authCode)
      that.silentLogin(res.authCode);
      // that.lkshouquan(res.authCode)
      // wx2my.reLaunch({
      //       url: '../adview/adview'
      //     });
    } 
  }
})

  },
  onShow: function () {
    // wx.hideHomeButton();
  },


lkshouquan:function(code){
   wxrequest.shouquan(code).then(res => {
     console.log(res)
   }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    })
},


  silentLogin: function (code) {
    //静默登录
    const that = this;
    let linkData = {
      authCode: code,
      // code: "061RuNkr1Ev6hj0sCchr1oRQkr1RuNkX",
      // appId: app.globalData.appId,
      // appSecret: app.globalData.appSecret
    };
    wxrequest.postsilentlogin(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        app.globalData.userId = resdatas.id;
        app.globalData.regbagact_type = 0;
        wx2my.setStorageSync('token', resdatas.token);
        that.getuserinfo(resdatas.id);
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
  getuserinfo: function (customerId) {
    //获取用户进场历史信息
    const that = this;
    let linkData = {
      customerId: customerId
    };
    wxrequest.getlicedhotel(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        if (resdatas) {
          that.goin(resdatas.cabinetQrcode);
        } else {
          that.goin();
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
  goin: function (cabinetQrcode) {
    //进场
    const that = this;
    const qcode = that.data.qcode;
    const type = that.data.type;

    if (type) {
      that.getcabcodefun(qcode, 0);
    } else {
      that.checkfun(cabinetQrcode);
    }
  },
  getcabcodefun: function (code, typenum) {
    //获取cabcode、shareUser
    const that = this;
    let linkData = {
      code: code
    };
    wxrequest.getcabcode(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          shareObj: resdatas.shareObj,
          sharefuncId: resdatas.funcId,
          cabCode: resdatas.cabCode
        });

        if (resdatas.shareUser != null && resdatas.shareUser != '') {
          let share_info = resdatas.shareUser;

          if (share_info.emp) {
            share_info.type = 1; //员工
          } else {
            share_info.type = 2; //顾客
          }

          app.globalData.shareUser = share_info;
        } else {
          app.globalData.shareUser = '';
        }

        wx2my.setStorage({
          key: 'CabCode',
          data: resdatas.cabCode
        });

        if (resdatas.redPacketShowFlag) {
          app.globalData.redPacketShowFlag = resdatas.redPacketShowFlag;
        } else {
          app.globalData.redPacketShowFlag = 0;
        }

        app.globalData.spotpurchaseflag = resdatas.spotpurchaseFlag;
        app.globalData.shareObjectId = resdatas.shareObjectId;
        app.globalData.cabCode = resdatas.cabCode;

        if (resdatas.shareObj) {
          app.globalData.shareObj = resdatas.shareObj;
        } else {
          app.globalData.shareObj = '';
        }

        if (resdatas.shareUserNickName && resdatas.shareObj == 3) {
          app.globalData.shareUserAvatarUrl = resdatas.shareUserAvatarUrl;
          app.globalData.shareUserNickName = resdatas.shareUserNickName;
          app.globalData.shareredbag_code = resdatas.code;
        } else {
          app.globalData.shareUserAvatarUrl = '';
          app.globalData.shareUserNickName = '';
          app.globalData.shareredbag_code = '';
        }

        if (typenum == 1) {
          app.globalData.spotpurchaseflag = 0;
          app.globalData.shareUser = '';
        }

        that.get_cabtype(resdatas.cabCode);
      } else {
        wx2my.showToast({
          title: resdata.msg + ',请重新扫码',
          icon: 'none',
          duration: 5000
        });
        setTimeout(function () {
          wx2my.reLaunch({
            url: '../adview/adview'
          });
        }, 5000);
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  },
  checkfun: function (cabinetQrcode) {
    //校验用户历史记录 
    const that = this;
    const cab_code = cabinetQrcode;

    if (cab_code == '') {
      wx2my.reLaunch({
        url: '../adview/adview'
      });
    } else {
      that.getcabcodefun(cab_code, 1);
    }
  },
  get_cabtype: function (cabCode) {
    //根据柜子类型获取柜子类型配置详情
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
        that.get_hotelinfo(resdatas.hotelId, cabCode, resdatas); //获取酒店信息
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
  setuserinfo: function (cabId, hotelId) {
    //存储用户进场信息
    const that = this;
    let linkData = {
      cabId: cabId,
      hotelId: hotelId,
      customerId: app.globalData.userId
    };
    wxrequest.postuserinfo(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {} else {
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
  get_Actlist: function (hotelId) {
    //获取用户可参与的活动
    let linkData = {
      hotelId: hotelId
    };
    wxrequest.getActlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        app.globalData.actlistdata = resdatas;
        let actindex = resdatas.findIndex(item => {
          //判断数组中是否存在当前数据,无：-1，有：返回下标
          return item.actType == 3;
        });

        if (actindex == -1) {
          app.globalData.shareFlag = 0;
        } else {
          app.globalData.shareFlag = resdatas[actindex].shareFlag; //1：购物，2：订房，3：都支持
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
  get_hotelinfo: function (hotelId, cabCode, cabresdatas) {
    //获取酒店信息
    const that = this;
    wxrequest.gethotelinfo(hotelId).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        wx2my.setStorage({
          //是否支持酒店房费发票
          key: 'isInvoice',
          data: resdatas.isSupportRoomInvoice
        });
        wx2my.setStorage({
          key: 'hotelId',
          data: resdatas.id
        });
        wx2my.setStorage({
          //运营商组织id
          key: 'operatorId',
          data: resdatas.operatorId
        });
        wx2my.setStorage({
          key: 'hotelName',
          data: resdatas.hotelName
        });
        wx2my.setStorage({
          key: 'rmsvcImageDTOs',
          data: resdatas.rmsvcImageDTOs
        });
        wx2my.setStorage({
          //是否支持客房服务
          key: 'isSupportRmsvc',
          data: resdatas.isSupportRmsvc
        });
        wx2my.setStorage({
          //是否支持便利店
          key: 'isSupportStore',
          data: resdatas.isSupportStore
        });
        wx2my.setStorage({
          //是否支持客房协议价
          key: 'isSupportRoomAlloc',
          data: resdatas.isSupportRoomAlloc
        });
        wx2my.setStorage({
          //酒店订房电话
          key: 'hotelBookingPhone',
          data: resdatas.hotelBookingPhone
        });
        wx2my.setStorage({
          //酒店联系电话
          key: 'hotelContactsMobile',
          data: resdatas.hotelContactsMobile
        });
        wx2my.setStorage({
          //酒店联系人
          key: 'hotelContactsName',
          data: resdatas.hotelContactsName
        });
        wx2my.setStorage({
          //中英文开关
          key: 'isSupportEn',
          data: resdatas.isSupportEn
        });
        wx2my.setStorage({
          key: 'themecolor',
          data: JSON.parse(resdatas.hotelThemeDTO.themeDescription)
        });
        let isSupportRmsvc = resdatas.isSupportRmsvc; //是否支持客房服务0：不支持 1：支持

        let isSupportRoomAlloc = resdatas.isSupportRoomAlloc; //是否支持客房协议价0：不支持 1：支持

        let isSupportStore = resdatas.isSupportStore; //是否支持便利店0：不支持 1：支持

        wx2my.setStorage({
          //迷你吧支持功能
          key: 'minibar',
          data: cabresdatas.minibar
        });
        wx2my.setStorage({
          //是否是虚拟柜
          key: 'isvirtual',
          data: cabresdatas.virtualFlag
        });
        wx2my.setStorage({
          //功能区id(默认为首页的功能页)
          key: 'funcAreaId',
          data: cabresdatas.funcAreaId
        });
        wx2my.setStorage({
          key: 'roomCode',
          data: cabresdatas.roomCode
        });
        wx2my.setStorage({
          key: 'roomFloor',
          data: cabresdatas.roomFloor
        });
        let hotelFuncDTOS = cabresdatas.hotelFuncDTOS;
        let hotelFuncDTOS1 = [];
        let hotelFuncDTOS2 = [];
        let tabnum = 1;

        if (cabresdatas.roomService == 0 || isSupportRmsvc == 0) {
          //客房服务支持功能
          tabnum = tabnum + 1;
          wx2my.setStorage({
            key: 'roomService',
            data: 0
          });
        } else {
          wx2my.setStorage({
            key: 'roomService',
            data: cabresdatas.roomService
          });
        }

        if (cabresdatas.convenienceStore == 0 || isSupportStore == 0) {
          //便利店支持功能
          if (cabresdatas.minibar == 0) {
            //迷你吧支持功能
            tabnum = tabnum + 1;
          }

          wx2my.setStorage({
            key: 'convenienceStore',
            data: 0
          });
        } else {
          wx2my.setStorage({
            key: 'convenienceStore',
            data: cabresdatas.convenienceStore
          });
        }

        if (resdatas.isSupportRoomAlloc == 0) {
          //是否支持客房协议价
          tabnum = tabnum + 1;
        }

        if (hotelFuncDTOS) {
          for (let i = 0; i < tabnum && i < hotelFuncDTOS.length; i++) {
            hotelFuncDTOS1.push(hotelFuncDTOS[i]);
          }

          if (hotelFuncDTOS.length - tabnum > 0) {
            for (let j = tabnum; j < hotelFuncDTOS.length; j++) {
              hotelFuncDTOS2.push(hotelFuncDTOS[j]);
            }
          }

          wx2my.setStorage({
            key: 'hotelFuncDTOS1',
            data: hotelFuncDTOS1
          });
          wx2my.setStorage({
            key: 'hotelFuncDTOS2',
            data: hotelFuncDTOS2
          });
        } else {
          wx2my.setStorage({
            key: 'hotelFuncDTOS1',
            data: ''
          });
          wx2my.setStorage({
            key: 'hotelFuncDTOS2',
            data: ''
          });
        }

        that.routejump(cabresdatas.homePage, cabresdatas.funcAreaId); //路由跳转
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
  routejump: function (homePage, funcAreaId) {
    //路由跳转
    const that = this;
    const share_Obj = that.data.shareObj; //0：员工分享二维码分享，1：好物分享，2：房源分享，3：红包分享

    const sharefuncId = that.data.sharefuncId;
    let linkurl = '';

    if (share_Obj == 1 || share_Obj == 2) {
      app.globalData.num = 1;
      wx2my.setStorage({
        //功能区id(默认为首页的功能页)
        key: 'funcAreaId',
        data: sharefuncId
      });

      if (share_Obj == 1) {
        //特产商城
        linkurl = '../specialty/specialty';
      } else if (share_Obj == 2) {
        //客房协议价
        linkurl = '../reservation/reservation';
      }
    } else {
      if (homePage == 1) {
        //迷你吧
        linkurl = '../index/index';
      } else if (homePage == 2) {
        //客房服务
        linkurl = '../roomservice/roomservice';
      } else if (homePage == 3) {
        //功能区
        if (funcAreaId == 2) {
          linkurl = '../index/index';
        } else {
          linkurl = '../specialty/specialty';
        }
      } else if (homePage == 4) {
        //客房协议价
        linkurl = '../reservation/reservation';
      } else if (homePage == 5) {
        //客房服务
        linkurl = '../my/my';
      }
    }

    wx2my.reLaunch({
      url: linkurl
    });
  },
  getQueryString: function (url, name) {
    //解析链接方法
    var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i');
    var r = url.substr(1).match(reg);

    if (r != null) {
      return r[2];
    }

    return null;
  },
  changestorage: function () {
    //清空购物车
    let kong = [];
    wx2my.setStorage({
      key: 'deliverylist1',
      data: kong
    });
    wx2my.setStorage({
      key: 'deliverylist2',
      data: kong
    });
    wx2my.setStorage({
      key: 'deliverylist3',
      data: kong
    });
    wx2my.setStorage({
      key: 'orderlist1',
      data: kong
    });
    wx2my.setStorage({
      key: 'orderlist2',
      data: kong
    });
    wx2my.setStorage({
      key: 'orderlist3',
      data: kong
    });
    wx2my.setStorage({
      key: 'buylist',
      data: kong
    });
  }
});