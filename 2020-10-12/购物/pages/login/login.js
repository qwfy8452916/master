const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cabCode: '',
    shareObj: '',
    sharefuncId: '',
    type: '',
    qcode: '',
    employee: '',
    funcidval: '',
    ispaymentcode: '',
    bookFuncId: '',
    enterStyle: ''//1：正常进场，2：分享进场，10：会议活动进场
  },
  onLoad: function (options) {
    // return
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    that.changestorage();
    let type;
    let qcode;
    let qrUrl;
    let openLink = '';
    let openWay = 3;
    let lastvisitId = '';
    app.globalData.Approachtype = 2;
    if(options.lastvisitid) {//历史记录
      lastvisitId = options.lastvisitid;
      qcode = options.historycode;
      openWay = 5;
    } else if(options.sharecode) {//分享进入
      qcode = options.sharecode;
      app.globalData.sharecode = options.sharecode;
      app.globalData.spotpurchaseflag = options.spotpurchaseflag;
      type = true;
      openLink = 'pages/login/login?sharecode=' + options.sharecode;
      openWay = 2;
    } else if (options.public) {//公众号进入
      qcode = options.public;
      type = true;
      openLink = 'pages/login/login?public=' + options.public;
      openWay = 4;
    } else if (options.employee) {//员工分享进入
      that.setData({
        employee: options.employee
      });
      app.globalData.employee = options.employee;
      openLink = 'pages/login/login?employee=' + options.employee;
      openWay = 4;
    } else if (options.relate) {//导航
      // lastvisitId = options.lastvisitid;
      qcode = options.relate;
      openWay = 5;
    } else {
      qrUrl = decodeURIComponent(options.q);
      openLink = qrUrl;
      openWay = 1;
      qcode = that.getQueryString(qrUrl, 'c');
      let func_idval = that.getQueryString(qrUrl, 'funcid');
      let is_paymentcode = that.getQueryString(qrUrl, 'ispaymentcode');
      if(func_idval && is_paymentcode) {
        that.setData({
          funcidval: func_idval,
          ispaymentcode: is_paymentcode
        });
        wx.setStorage({
          key: 'funcAreaId',
          data: func_idval
        });
      }
      if(qcode != '' && qcode != null){
        type = true;
      } else {
        type = false;
      }
      app.globalData.Approachtype = 1;
    }
    that.setData({
      qcode: qcode,
      type: type,
      openWay: openWay,
      openLink: openLink,
      lastvisitId: lastvisitId
    });
    wx.login({// 静默登录 
      success: res => {// 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.get_userconfiguration(res.code, qcode, openWay, openLink, lastvisitId);
      }
    });
  },
  onShow: function () {
    wx.hideHomeButton();
  },
  get_userconfiguration: function (wxCode, cabCode, openWay, openLink, lastvisitId) {//登陆
    const that = this;
    let linkData = {
      wxCode: wxCode,
      mpCode: app.globalData.mpCode,
      cabCode: cabCode,
      openWay: openWay,
      openLink: openLink,
      lastvisitId: lastvisitId
    };
    wxrequest.postsilentloginnew(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        app.globalData.token = resdatas.token;
        if(resdatas.hasError == 1) {
          wx.showToast({
            title: resdatas.errorMsg,
            icon: 'none',
            duration: 3000
          })
        }
        if(resdatas.checkCodeResult == '' || resdatas.checkCodeResult == null) {
          setTimeout(function(){
            wx.reLaunch({
              url: '../adview/adview'
            })
          }, 3000);
        } else {
          that.dealwithfun(resdatas);
        }
      } else {
        if(res.data.msg) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        } else {
          const thatdata = this.data;
          wx.login({// 静默登录 
            success: res => {// 发送 res.code 到后台换取 openId, sessionKey, unionId
              that.get_userconfiguration(res.code, thatdata.qcode, thatdata.openWay, thatdata.openLink, thatdata.lastvisitId);
            }
          });
        }        
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  dealwithfun: function (dealwith_data) {//处理数据、逻辑
    const that = this;
    const userinfo = dealwith_data.userCustomerDTO;
    const userinfoCom = dealwith_data.userCustomerDTO.userCustomerCommonDTO;
    const userHotelinfo = dealwith_data.userCustomerDTO.userCustomerHotelDTO;
    const checkCodeinfo = dealwith_data.checkCodeResult;
    const cabTypeinfo = dealwith_data.cabTypeSettingWithEnterSettingBean;
    const hotelinfo = dealwith_data.hotelDTO;
    app.globalData.userInfodata = userinfoCom;
    app.globalData.code = checkCodeinfo.code;
    app.globalData.categoryId = checkCodeinfo.categoryId;
    app.globalData.FuncListVal = cabTypeinfo.cabEnterSettingDTO.cabEnterSettingFuncAreaDTOS;
    app.globalData.isDefault = cabTypeinfo.cabEnterSettingDTO.isDefault;
    app.globalData.lastActIds = [];
    wx.setStorage({
      key: 'userInfo',
      data: userinfoCom
    });
    let spotpurchaseflag = 1;
    // app.globalData.requestUrl = dealwith_data.mpConfig.API_PREFIX;
    app.globalData.imgurldata = dealwith_data.mpConfig.CLOUD_URL_PREFIX;
    app.globalData.QRurllink = dealwith_data.mpConfig.QR_PREFIX;
    app.globalData.hotelInfo = hotelinfo;
    //静默登录
    app.globalData.userId = userinfo.id;
    app.globalData.commonId = userinfo.id;
    app.globalData.regbagact_type = 0;
    app.globalData.memberLevel = userHotelinfo.memberLevel;
    app.globalData.authFlagMobile = userinfoCom.authFlagMobile;
    app.globalData.authFlag = userinfoCom.authFlag;
    //获取cabcode、shareUser
    app.globalData.settleShareCode = checkCodeinfo.settleShareCode;
    app.globalData.visitRecordId =  checkCodeinfo.visitRecordId;
    if(checkCodeinfo.cabinetDTO && checkCodeinfo.cabinetDTO.bindAreaFlag) {
      app.globalData.bindAreaFlag = checkCodeinfo.cabinetDTO.bindAreaFlag;
    } else {
      app.globalData.bindAreaFlag = '';
    }
    that.setData({
      shareObj: checkCodeinfo.shareObj,
      sharefuncId: checkCodeinfo.funcId,
      bookFuncId: checkCodeinfo.bookFuncId,
      cabCode: checkCodeinfo.cabCode,
      enterStyle: checkCodeinfo.enterStyle
    });
    app.globalData.enterStyle = checkCodeinfo.enterStyle;
    if(checkCodeinfo.shareStyle){
      app.globalData.shareStyle = checkCodeinfo.shareStyle;
    }
    if(checkCodeinfo.shareObj){
      app.globalData.sharecode = checkCodeinfo.code;
    }
    if(checkCodeinfo.shareUser != null && checkCodeinfo.shareUser != ''){
      let share_info = checkCodeinfo.shareUser;
      if(share_info.emp){
        share_info.type = 1;//员工
      } else {
        share_info.type = 2;//顾客
      }
      app.globalData.shareUser = share_info;
    } else {
      app.globalData.shareUser = '';
    }
    wx.setStorage({
      key: 'CabCode',
      data: checkCodeinfo.cabCode
    });
    if(checkCodeinfo.redPacketShowFlag){
      app.globalData.redPacketShowFlag = checkCodeinfo.redPacketShowFlag;
    } else {
      app.globalData.redPacketShowFlag = 0;
    }
    spotpurchaseflag = checkCodeinfo.spotpurchaseFlag;
    app.globalData.shareObjectId = checkCodeinfo.shareObjectId;
    if(checkCodeinfo.shareObjectId == null || checkCodeinfo.shareObjectId == -1){
      app.globalData.num = 0;
    } else {
      app.globalData.num = 1;
    }
    app.globalData.cabCode = checkCodeinfo.cabCode;
    let shareObjval = '';
    if(checkCodeinfo.shareObj){
      shareObjval = checkCodeinfo.shareObj;
    }
      app.globalData.shareObj = shareObjval;
    if(checkCodeinfo.code && checkCodeinfo.shareObj == 10){
      app.globalData.shareUserAvatarUrl = checkCodeinfo.shareUserAvatarUrl;
      app.globalData.shareUserNickName = checkCodeinfo.shareUserNickName;
      app.globalData.shareredbag_code = checkCodeinfo.code;
      app.globalData.businessCode = checkCodeinfo.businessCode;
      app.globalData.num = 0;
    } else {
      app.globalData.shareUserAvatarUrl = '';
      app.globalData.shareUserNickName = '';
      app.globalData.shareredbag_code = '';
    }
    if(dealwith_data.useLastAccessHistory == 1) {
      spotpurchaseflag = 0;
      app.globalData.shareUser = '';
    }
    app.globalData.spotpurchaseflag = spotpurchaseflag;
    //根据柜子类型获取柜子类型配置详情
    if(cabTypeinfo.cabId){
      app.globalData.cabId = cabTypeinfo.cabId;
    }else{
      app.globalData.cabId = '';
    }
    app.globalData.hotelId = cabTypeinfo.hotelId;
    let cabIdval = '';
    if(cabTypeinfo.cabId) {
      cabIdval = cabTypeinfo.cabId;
    }
    that.get_Actlist(cabTypeinfo.hotelId, cabIdval, shareObjval, checkCodeinfo.enterStyle);
    //酒店信息
    app.globalData.hotelLongitude = hotelinfo.hotelLongitude,
    app.globalData.hotelLatitude = hotelinfo.hotelLatitude,
    wx.setStorage({//是否支持酒店房费发票
      key: 'isInvoice',
      data: hotelinfo.isSupportRoomInvoice
    });
    wx.setStorage({
      key: 'hotelId',
      data: hotelinfo.id
    });
    wx.setStorage({//运营商组织id
      key: 'operatorId',
      data: hotelinfo.operatorId
    });
    wx.setStorage({
      key: 'hotelName',
      data: hotelinfo.hotelName
    });
    wx.setStorage({
      key: 'rmsvcImageDTOs',
      data: hotelinfo.rmsvcImageDTOs
    });
    wx.setStorage({//酒店订房电话
      key: 'hotelBookingPhone',
      data: hotelinfo.hotelBookingPhone
    });
    wx.setStorage({//酒店联系电话
      key: 'hotelContactsMobile',
      data: hotelinfo.hotelContactsMobile
    });
    wx.setStorage({//酒店联系人
      key: 'hotelContactsName',
      data: hotelinfo.hotelContactsName
    });
    wx.setStorage({//中英文开关
      key: 'isSupportEn',
      data: hotelinfo.isSupportEn
    });
    wx.setStorage({
      key: 'themecolor',
      data: JSON.parse(hotelinfo.hotelThemeDTO.themeDescription)
    });
    wx.setStorage({
      key: 'roomCode',
      data: cabTypeinfo.roomCode
    });
    wx.setStorage({
      key: 'roomFloor',
      data: cabTypeinfo.roomFloor
    });
    wx.setStorage({//是否是虚拟柜
      key: 'isvirtual',
      data: cabTypeinfo.virtualFlag,
    });
    wx.setStorage({//迷你吧支持功能
      key: 'minibar',
      data: cabTypeinfo.cabEnterSettingDTO.minibar,
    });
    let isSupportStore = 0;
    if(hotelinfo.isSupportStore == 1 && cabTypeinfo.cabEnterSettingDTO.converienceStore != 0){
      isSupportStore = cabTypeinfo.cabEnterSettingDTO.converienceStore;
    }
    wx.setStorage({//是否支持便利店
      key: 'isSupportStore',
      data: isSupportStore
    });
    let isSupportRmsvc = 0;
    if(hotelinfo.isSupportRmsvc == 1 && cabTypeinfo.cabEnterSettingDTO.roomService != 0 && spotpurchaseflag != 0) {
      isSupportRmsvc = cabTypeinfo.cabEnterSettingDTO.roomService;
    }
    wx.setStorage({//是否支持客房服务
      key: 'isSupportRmsvc',
      data: isSupportRmsvc
    });
    let isSupportRoom_Alloc = 0;
    if(hotelinfo.isSupportRoomAlloc == 1 && cabTypeinfo.cabEnterSettingDTO.roomBook != 0) {
      isSupportRoom_Alloc = cabTypeinfo.cabEnterSettingDTO.roomBook;
    }
    wx.setStorage({//是否支持客房协议价
      key: 'isSupportRoomAlloc',
      data: isSupportRoom_Alloc
    });
    wx.setStorage({//功能区id(默认为首页的功能页)
      key: 'funcAreaId',
      data: cabTypeinfo.cabEnterSettingDTO.funcAreaId,
    });
    let tabnum = 1;
    if (isSupportRmsvc == 0) {//客房服务支持功能
      tabnum = tabnum + 1;
    }
    if (isSupportStore == 0 ) {//便利店支持功能
      if (cabTypeinfo.cabEnterSettingDTO.minibar == 0) {//迷你吧支持功能
        tabnum = tabnum + 1;
      }
    }
    if (isSupportRoom_Alloc == 0) {//是否支持客房协议价
      tabnum = tabnum + 1;
    }
    let hotelFuncDTOS = cabTypeinfo.hotelFuncDTOS;
    let hotelFuncDTOS1 = [];
    let hotelFuncDTOS2 = [];
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
    that.routejump(cabTypeinfo.cabEnterSettingDTO);//路由跳转
  },
  get_Actlist: function (hotelId, cabId, shareObjval, enterStyle) {//获取用户可参与的活动
    let linkData = {
      hotelId: hotelId,
      cabId: cabId,
      type: 2,
      lastActId: '',
      enterStyle: enterStyle
    };
    wxrequest.getActlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        app.globalData.actlistdata = resdatas;
        let val = 0;
        console.log(shareObjval+'红包')
        if(shareObjval == '' || shareObjval != 10){
          app.globalData.regbagact_type = 1;
        } else {
          app.globalData.regbagact_type = 0;
        }
        app.globalData.shareFlag = 3;
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
  routejump: function (cabEnterSettingDTO) {//路由跳转
    const that = this;
    console.log(cabEnterSettingDTO);
    const share_Obj = that.data.shareObj;//0：员工分享二维码分享，1：好物分享，2：房源分享，3：红包分享
    const sharefuncId = that.data.sharefuncId;
    let homePage = cabEnterSettingDTO.homePage
    let funcType = cabEnterSettingDTO.funcAreaType
    let funcAreaId = cabEnterSettingDTO.funcAreaId
    let linkurl = '';
    let linkname = '';
    if(that.data.employee != ''){
      linkurl = '../employeeshare/employeeshare?employee=' + that.data.employee;
      linkname = 'employeeshare';
    } else {
      if(share_Obj == 1 || share_Obj == 2){
        wx.setStorage({//功能区id(默认为首页的功能页)
          key: 'funcAreaId',
          data: sharefuncId,
        });
        if (share_Obj == 1) {//特产商城
          linkurl = '../specialty/specialty';
          if(app.globalData.shareUser != '' && app.globalData.shareUser.id != '0' && app.globalData.num == 1 && app.globalData.shareObjectId != null){
            linkname = 'hotelmalldetails';
          } else {
            linkname = 'specialty';
          }
        } else if (share_Obj == 2) {//客房协议价
          linkurl = '../reservation/reservation?funcId=' + sharefuncId;
          linkname = 'reservation';
        }
      } else if(share_Obj == 99){//领取卡券
        linkurl = '../receivevoucher/receivevoucher';
        linkname = 'receivevoucher';
      } else {
        if(that.data.ispaymentcode) {
          linkurl = '../foodpay/foodpay?funcid=' + that.data.funcidval;
          linkname = 'paymentcode';
        } else if (homePage == 3) {//功能区
            console.log(funcAreaId)
            wx.setStorageSync('funcType', funcType)
            if(funcType == 1){
              linkurl = '/pages/index/index?funcId=' + funcAreaId;
              linkname = 'index';
            }else if(funcType == 2){
              linkurl = '/pages/reservation/reservation?funcId=' + funcAreaId;
              linkname = 'reservation';
            }else if(funcType == 3){
              linkurl = '/pages/roomservice/roomservice?funcId=' + funcAreaId;
              linkname = 'roomservice';
            }else{
              linkurl = '/pages/specialty/specialty?id=' + funcAreaId;
              linkname = 'specialty';
            }
        } else if (homePage == 5) {//我的
          linkurl = '../my/my';
          linkname = 'my';
        }
      }
    }
    app.globalData.jumpurl = linkurl;
    if (that.data.enterStyle == 10) {//会议进场
      linkurl = '../conference/conference';
      linkname = 'conference';
    }
    that.get_Pages(linkname);
    app.globalData.linkUrl = linkurl;
    setTimeout(function () {
      wx.reLaunch({
        url: linkurl
      })
    }, 500);
  },
  get_Pages: function (page) {
    let linkData = {
      enterPage: page
    };
    wxrequest.getpages(linkData).then(res => {
      let resdata = res.data;
      if (resdata.code != 0) {
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
  getQueryString: function (url, name) {//解析链接方法
    var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i');
    var r = url.substr(1).match(reg);
    if (r != null) {
      return r[2];
    }
    return null;
  },
  changestorage: function () {//清空购物车
    let kong = [];
    let kong2 = '';
    wx.setStorage({
      key: 'prodvouIds',
      data: kong,
    });
    wx.setStorage({
      key: 'moneyvouId',
      data: kong2,
    });
    wx.setStorage({
      key: 'deliverylist1',
      data: kong,
    });
    wx.setStorage({
      key: 'deliverylist2',
      data: kong,
    });
    wx.setStorage({
      key: 'deliverylist3',
      data: kong,
    });
    wx.setStorage({
      key: 'deliverylist4',
      data: kong,
    });
    wx.setStorage({
      key: 'deliverylist5',
      data: kong,
    });
    wx.setStorage({
      key: 'orderlist1',
      data: kong,
    });
    wx.setStorage({
      key: 'orderlist2',
      data: kong,
    });
    wx.setStorage({
      key: 'orderlist3',
      data: kong,
    });
    wx.setStorage({
      key: 'orderlist4',
      data: kong,
    });
    wx.setStorage({
      key: 'orderlist5',
      data: kong,
    });
    wx.setStorage({
      key: 'buylist',
      data: kong,
    });
    wx.setStorage({
      key: 'shopcartvoucherlist',
      data: kong,
    });
    wx.setStorage({
      key: 'money',
      data: 0.00,
    });
  }
})