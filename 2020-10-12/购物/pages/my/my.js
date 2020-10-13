const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    global_Data: '',
    adtype: 1,
    convenienceStore: '',
    isIpx: app.globalData.isIpx,
    isSupportEn: 0,//中英文开关：0关，1开
    userInfo: {},
    hotelId: '',
    userid: '',
    oprInvoiceSup: '',//运营商是否支持开票 0 不支持，1 支持
    isInvoice: '',//是否支持酒店房费发票 0 不支持，1 支持
    isvirtual: '',//fales:虚拟柜
    isSupportRmsvc: '',//是否支持客房服务 0 不支持，1 支持
    isSupportDelivery: '',//是否支持商城 0 不支持，1 支持
    isSupportRoomAlloc: '',//是否支持客房协议价 0 不支持，1 支持
    themecolor: '',//主题颜色
    minibar: '',//迷你吧支持功能（0：不支持，1：展示，2：展示+下单）
    roomDelivery: '',//酒店配送支持功能（1：展示，2：展示+下单）
    roomService: '',//客房服务支持功能（0：不支持，1：展示，2：展示+下单）
    hotelFuncDTOS1: '',//功能区
    hotelFuncDTOS2: '',//功能区
    userbalancedata: '',
    shareuser: '', //分享人信息
    spotpurchaseflag: '',
    mycommunitytype: 0,
    couponsize: 0,
    cardcouponlength: '',//卡券数量
    authFlag: '',
    enterpriseCode: '',
    isshowicon: true,
    ifhasInput:true,
    ifRootCode:false,
    ifhasBind:false,
    license:'',
    funcid:-1,
    licenseID:'',
    contractedEnterpriseName:'',
    authFlagMobile_data: '',//手机号是否认证
    memberLevel_val: '',//是否是会员
    balanceData: 0.00,
    ifshowCode: false,//是否显示授权码输入框
  },
  onLoad: function (options) {
    const that = this;
    setTimeout(function(){
      that.setData({
        isshowicon: false
      });
      app.globalData.isshowicon = false;
    },5000);
    let memberLevel_data = 0;
    if(app.globalData.memberLevel == 1) {
      memberLevel_data = 1;
    } else if(app.globalData.authFlagMobile == 1 && app.globalData.userInfodata.nickName) {
      memberLevel_data = 1;
      that.becomememberfun();
    }
    if(app.globalData.license){
      this.setData({
        ifhasInput: true
      })
    }else{
      this.setData({
        ifhasInput: false
      })
    }
    that.setData({
      userInfo: app.globalData.userInfodata,
      isshowicon: app.globalData.isshowicon,
      global_Data: app.globalData,
      adtype: app.globalData.adtype,
      hotelId: app.globalData.hotelId,
      userid: app.globalData.userId,
      shareuser: app.globalData.shareUser,
      spotpurchaseflag: app.globalData.spotpurchaseflag,
      memberLevel_val: memberLevel_data
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
    wx.getStorage({
      key: 'isSupportEn',
      success(res) {
        that.setData({
          isSupportEn: res.data
        })
      }
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
      key: 'isSupportStore',
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
      key: 'isSupportRmsvc',
      success(res) {
        that.setData({
          roomService: res.data
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
      key: 'isSupportDelivery',
      success(res) {
        that.setData({
          isSupportDelivery: res.data
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
      key: 'userInfo',
      success(res) {
        that.setData({
          userInfo: res.data
        });
      },
      fail: function(){
        let user_Info = { avatarUrl: '', nickName: ''}
        that.setData({
          userInfo: user_Info
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
    wx.getStorage({
      key: 'isvirtual',
      success(res) {
        that.setData({
          isvirtual: res.data
        })
      }
    });
    that.get_mycommunitylist();//获取我的社群成员
    that.getoprInvoiceSup(app.globalData.hotelId);//检查酒店所属运营商是否支持开商品发票
    that.getisInvoice(app.globalData.hotelId);//检查是否支持酒店房费发票
    that.getMyEnterpriseCode(app.globalData.hotelId)
    if(options.type == 0){//卡券
      that.mycardcoupon();
    } else if(options.type == 1){//商品
      wx.navigateTo({
        url: '../prodOrder/prodOrder?typeindex=3'
      })
    } else if(options.type == 2){//优惠券
      wx.navigateTo({
        url: '../mycoupon/mycoupon'
      })
    }
  },
  onShow: function () {
    wx.hideHomeButton();
    const that = this;
    that.getcouponlist();//获取优惠券列表
    that.get_voucherlist();
    that.getBalancefun();//获取余额
  },
  inputCode(){
    this.setData({
      ifshowCode: true
    })  
  },
  bindKeyInput(e){
    this.setData({
      enterpriseCode: e.detail.value
    })
  },
  ensureCode(){
    const that = this;
    let linkData = {
      licence: this.data.enterpriseCode
    };
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wxrequest.inputEnterpriseCode(linkData).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        this.setData({
          ifshowCode: false,
          ifhasInput: true
        })
        app.globalData.license = resdatas.license
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
    })
  },
  cancelCode(){
    this.setData({
      ifshowCode: false
    })
  },
  getMyEnterpriseCode(hotelId){
    const that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wxrequest.getMyEnterpriseCode(hotelId).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if(resdatas){
          this.setData({
            ifhasBind: resdatas.bindFlag?true:false,
            licenseID: resdatas.id,
            ifhasInput: true,
            contractedEnterpriseName: resdatas.contractedEnterpriseName,
            ifRootCode: resdatas.bindFlag?resdatas.licenseType?false:true:false
          })
          app.globalData.license = resdatas.license
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
      wx.hideLoading();
      console.log(err)
    });
  },
  getoprInvoiceSup: function (hotelId) {//检查酒店所属运营商是否支持开商品发票
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
  getisInvoice: function (hotelId) {//检查是否支持酒店房费发票
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
        wx.setStorage({
          key: 'isInvoice',
          data: resdatas,
        })
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
  //小程序---获取用户(员工或顾客)可提现余额
  getBalancefun: function () {
    const that = this;
    let data = {
      userType: 2,
      userId: app.globalData.userId
    }
    wxrequest.getBalance(data).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          balanceData: resdatas
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
  getbalancedata: function () {//获取用户余额、收支明细
    const that = this;
    wxrequest.getuserbalance(app.globalData.userId).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          userbalancedata: resdatas
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
  index: function () {//首页
    wx.reLaunch({
      url: '../index/index'
    })
  },
  orderlist: function () {//商品订单列表
    wx.navigateTo({
      url: '../prodOrder/prodOrder?typeindex=all'
    })
  },
  reservation: function () {//客房协议价
    wx.reLaunch({
      url: '../reservation/reservation'
    })
  },
  roomservice: function () {//客房服务
    wx.reLaunch({
      url: '../roomservice/roomservice'
    })
  },
  hotelmall: function (e) {//功能区跳转
    wx.reLaunch({
      url: '../specialty/specialty?id=' + e.currentTarget.dataset.id
    })
  },
  billingfun: function () {//开票管理
    wx.navigateTo({
      url: '../billing/billing?isinvoice=' + this.data.isInvoice + '&oprinvoicesup=' + this.data.oprInvoiceSup
    })
  },
  livedhotelfun: function () {//住过的酒店/足迹
    wx.navigateTo({
      url: '../livedhotel/livedhotel'
    })
  },
  hotelafter: function () {//酒店退款/售后
    wx.navigateTo({
      url: '../mhotelmallrefundlist/mhotelmallrefundlist'
    })
  },
  mycoupon: function () {//我的优惠券
    wx.navigateTo({
      url: '../mycoupon/mycoupon'
    })
  },
  myredbag: function () {//我的红包
    wx.navigateTo({
      url: '../myredbag/myredbag'
    })
  },
  couponcenter: function(){//领券中心
    wx.navigateTo({
      url: '../couponcenter/couponcenter'
    })
  },
  couponcenterlist(){
    wx.navigateTo({
      url: '../couponcenterlist/couponcenterlist'
    })
  },
  business: function () {
    wx.navigateTo({
      url: '../business/business'
    })
  },
  reservationlist: function () {//客房预定列表
    wx.navigateTo({
      url: '../reservationlist/reservationlist'
    })
  },
  kffw: function () {//客房服务
    wx.navigateTo({
      url: '../kffulist/kffulist'
    })
  },
  myintegral: function () {//积分
    wx.navigateTo({
      url: '../myintegral/myintegral'
    })
  },
  mycardcoupon: function () {//卡券
    wx.navigateTo({
      url: '../mycardcoupon/mycardcoupon?nickname=' + this.data.userInfo.nickName
    })
  },
  investment: function () {//我要投资
    wx.navigateToMiniProgram({
      appId: 'wxec071a236e409d79',
      path: 'pages/smartCab/smartCab',
      envVersion: 'trial',
      success(res) {// 打开成功
        console.log('打开成功')
      }
    });
  },
  mycommunity: function () {//我的下级
    wx.navigateTo({
      url: '../community/community'
    })
  },
  shareTotal: function () {//我的汇总
    wx.navigateTo({
      url: '../shareTotal/shareTotal'
    })
  },
  isLanding: function (e) {//判断是否授权登陆
    const that = this;
    let typenum = e.currentTarget.dataset.typenum;
    let typeid = e.currentTarget.dataset.typeid;
    that.dialog = that.selectComponent("#dialog");
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo'] && that.data.userInfo.nickName != '' && that.data.userInfo.nickName != null) {// 已经授权，可以直接调用 getUserInfo 获取头像昵称          
          if (typenum == 1) {
            if(typeid == 1) {//商品订单
              that.orderlist();
            } else if(typeid == 2){//客房协议价订单
              that.reservationlist();
            } else if(typeid == 3){//客房服务订单
              that.kffw();
            }
          } else if (typenum == 2) {//住过的酒店/足迹
            that.livedhotelfun();
          } else if (typenum == 3) {//酒店退款/售后
            that.hotelafter();
          } else if (typenum == 4) {//开票管理
            that.billingfun();
          } else if (typenum == 5) {//我的优惠券
            that.mycoupon();
          } else if (typenum == 6) {//我的红包
            that.myredbag();
          } else if (typenum == 7) {//领券中心
            that.couponcenter();
          } else if (typenum == 8) {//我的余额
            that.balancefun();
          } else if (typenum == 9) {//我的社群
            that.mycommunity();
          } else if (typenum == 10) {//我的积分
            that.myintegral();
          } else if (typenum == 11) {//我的卡券
            that.mycardcoupon();
          } else if (typenum == 12) {//分销汇总统计
            that.shareTotal();
          } else if (typenum == 13) {//领券记录
            that.couponcenterlist();
          }
        } else {
          that.dialog.showDialog();
        }
      }
    })
  },
  redirectfun: function (e) {//监听组件传回的userid
    const that = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          userInfo: res.data
        })
      }
    });
    if(e.detail.memberlevelval == 1) {
      that.becomememberfun();
    }
  },
  balancefun: function() {//余额
    wx.navigateTo({
      url: '../mybalance/mybalance'
    })
  },
  get_mycommunitylist: function () {//获取我的社群成员
    const that = this;
    let linkData = {
      hotelId: app.globalData.hotelId
    };
    wxrequest.getmycommunitylist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      let mycommunity_type = 0;
      if (resdata.code == 0) {
        if(resdatas.isCaptain == 1){
          mycommunity_type = 2;
        } else {
          mycommunity_type = 1;
        }
      } else {
        mycommunity_type = 0;
      }
      that.setData({
        mycommunitytype: mycommunity_type
      });
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  getcouponlist: function (){//获取优惠券列表
    const that = this;
    let linkData = {
      cusId: app.globalData.userId,
      couponState: 0,
      hotelId: app.globalData.hotelId,
      cabCode: app.globalData.cabCode
    };
    wxrequest.getcouponlist2(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          couponsize: resdatas.length
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
  nofun: function () {
    wx.showToast({
      title: '暂未开放，敬请期待',
      icon: 'none',
      duration: 2000
    })
  },
  get_voucherlist:function(){//取用户卡券列表（已使用，未使用，已失效）
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    let linkData = {
      vouState: 0,
      cusId: app.globalData.userId,
      hotelId: app.globalData.hotelId
    };
    wxrequest.getvoucherlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          cardcouponlength: resdatas.length
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
  adfun: function() {
    wx.navigateTo({
      url: '../adimg/adimg',
    })
  },
  getPhoneNumber: function (e) {//点击获取手机号码按钮
    const that = this;
    wx.login({
      success: res => {
        that.getcheckSession(res.code, e, 1);
      }
    });
  },
  getcheckSession: function (code, e, typenum) {
    const that = this;
    wx.checkSession({
      success: function () {
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {//取消认证，手输手机号
          that.setData({
            iscertification: 0
          });
        } else {//同意授权
          console.log(e.detail);
          if(typenum == 2) {
            that.post_userphonenumber(code, e.detail.iv, e.detail.encryptedData);
          } else {
            that.getcheckSession(code, e, 2);
          }
          
        }
      },
      fail: function () {
        that.getPhoneNumber();
      }
    });
  },
  post_userphonenumber: function(code, iv, encryptedData){//获取微信绑定的手机号
    const that = this;
    const linkData = {
      code: code,
      iv: iv,
      encryptedData: encryptedData,
      flag: 1,
      nickName: '',
      phoneNumber: '',
      hotelId: app.globalData.hotelId
    }
    wxrequest.postuserphonenumber(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if(resdatas.mobile){
          that.setData({
            iscertification: 1
          });
          app.globalData.authFlag = 1;
          that.becomememberfun();
        } else {//获取手机号失败，手输手机号
          that.setData({
            iscertification: 0
          });
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
      wx.hideLoading();
      console.log(err)
    });
  },
  hideiconfun: function () {
    this.setData({
      isshowicon: false
    });
    app.globalData.isshowicon = false;
  },
  becomememberfun: function () {//成为会员
    wxrequest.getbecomemember(app.globalData.hotelId).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        app.globalData.memberLevel = 1;
        this.setData({
          memberLevel_val: 1
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
  }
})