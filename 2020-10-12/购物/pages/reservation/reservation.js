const app = getApp();
import wxrequest from '../../request/api'
let util = require("../../utils/util.js");
Page({
  data: {
    global_Data: '',
    adtype: 1,
    convenienceStore: '',
    showtype: 0,
    shareCode: '',
    isIpx: app.globalData.isIpx,
    isSupportEn: 0,//中英文开关：0关，1开
    hotelAddImagesfirst: '',//第一张banner
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
    hotelContactsMobile: '',//联系电话
    hotelAddress: '',//酒店地址
    isHasPark: '',//是否有停车位
    themecolor: '',//主题颜色
    isvirtual: '',//fales:虚拟柜
    isSupportRoomAlloc: '',//是否支持客房协议价 0 不支持，1 支持
    timedataval: '5',//凌晨时间
    starTime: '',//入住时间
    starweek: '',//入住-星期
    day: '',//入住几晚
    endTime: '',//离店时间
    endweek: '',//离店-星期
    roominfo: [],//房型房源信息
    minibar: '',//迷你吧支持功能（0：不支持，1：展示，2：展示+下单）
    roomService: '',//客房服务支持功能（0：不支持，1：展示，2：展示+下单）
    hotelFuncDTOS1: '',//功能区
    hotelFuncDTOS2: '',//功能区
    cabCode: '',
    shareuser: '', //分享人信息
    shareUserAvatarUrl: '',
    shareUserNickName: '',
    redbagtype: '',
    shareObj: '',
    regbagact_type: '',
    act_newcomer: '',
    redPacketShowFlag: '',
    shareFlag: '',
    spotpurchaseflag: '',
    sharenum: -1,
    sharecontant: '',
    posterid: '',
    posterurl: '',
    certificationname: '',
    isShowTitle: '',
    isShowTop: '',
    funcBannerImages: '',
    funcBannerImagesFirst: '',
    certificationtel: '',
    bookPageLayout: '',
    iscertification: '',
    funcid: '',
    hotelLongitude: '',
    ifshowRules:false,
    ifshowSpecial:false,
    ruleData:{},
  },
  onReady(){
    this.coupon = this.selectComponent("#couponlist");
  },
  onLoad: function (options) {
    const that = this;
    wx.hideShareMenu();
    wx.showLoading({
      title: '加载中',
    });
    console.log(options)
    that.setData({
      funcid: options.funcId?options.funcId:wx.getStorageSync('funcAreaId'),
      global_Data: app.globalData,
      adtype: app.globalData.adtype,
      hotelid: app.globalData.hotelId,
      shareuser: app.globalData.shareUser,
      shareUserAvatarUrl: app.globalData.shareUserAvatarUrl,
      shareUserNickName: app.globalData.shareUserNickName,
      regbagact_type: app.globalData.regbagact_type,
      shareObj: app.globalData.shareObj,
      redPacketShowFlag: app.globalData.redPacketShowFlag,
      shareFlag: app.globalData.shareFlag,
      spotpurchaseflag: app.globalData.spotpurchaseflag,
      iscertification: app.globalData.authFlagMobile
    });
    wx.setStorageSync('funcAreaId',this.data.funcid)
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
    that.initialization(app.globalData.hotelId);
    wx.getStorage({
      key: 'CabCode',
      success: function (res) {
        that.setData({
          cabCode: res.data
        })
      },
    });
    wx.getStorage({
      key: 'themecolor',
      success: function (res) {
        that.setData({
          themecolor: res.data
        })
      },
    });
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
    wx.getStorage({//客房服务
      key: 'isSupportRmsvc',
      success(res) {
        that.setData({
          roomService: res.data
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
      key: 'isvirtual',
      success(res) {
        that.setData({
          isvirtual: res.data
        })
      }
    });

    that.get_hotelinfo(app.globalData.hotelId);//获取酒店信息
    that.get_funcinfo(this.data.funcid);//获取功能区详情
    that.get_shareactivity();
  },
  onShow: function() {
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
  get_funcinfo: function(id){//获取功能区详情
    let linkData = {
      cabId: app.globalData.cabId,
      enterStyle: app.globalData.enterStyle
    };
    wxrequest.getfuncdetail(id, linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      console.log(resdatas)
      if (resdata.code == 0) {
        this.setData({
          bookPageLayout: resdatas.bookPageLayout,
          isShowTitle: resdatas.isShowTitle,
          isShowTop: resdatas.isShowTop,
          funcBannerImages: resdatas.funcBannerImages,
          funcBannerImagesFirst: resdatas.funcBannerImages[0],
        });
        this.data.funcBannerImages.splice(0,1)
        this.setData({
          funcBannerImages: this.data.funcBannerImages
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
  mabview: function () {//地图
    const that = this;
    let hotelLongitude = that.data.hotelLongitude;
    let hotelLatitude = that.data.hotelLatitude;
    let hotelName = that.data.hotelName;
    wx.navigateTo({
      url: '../map/map?hotelLongitude=' + hotelLongitude + '&hotelLatitude=' + hotelLatitude + '&hotelName=' + hotelName
    })
  },
  getRules(){
    wx.showLoading({
      title: '加载中',
      mask:true
    });
    let params = {
      hotelId: this.data.hotelid
    };
    wxrequest.getRedpackRules(params).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      let resdatas = res.data.data;
      if(resdata.code == 0){
        this.setData({
          ifshowRules: true,
          ruleData: resdatas
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  closeRule(){
    this.setData({
      ifshowRules: false
    })
  },
  initialization: function (hotelid) {//初始化 入住-离店时间
    const that = this;
    let time = util.formatDate(new Date());
    let dateweek = util.getDates(2, time);
    that.setData({
      starTime: dateweek[0].time,//入住时间
      starweek: dateweek[0].week,//入住-星期
      day: 1,
      endTime: dateweek[1].time,//离店时间
      endweek: dateweek[1].week,//离店-星期
    });
    that.getroominfo(dateweek[0].time, dateweek[1].time, hotelid, 1);//获取酒店房型房源信息
  },
  getroominfo: function (startime, endtime, hotelid, day) {//获取酒店房型房源信息
    const that = this;
    if (startime == '' || endtime == '') {
      return;
    }
    let linkData = {
      hotelId: hotelid,
      funcId: this.data.funcid,
      startDate: startime,
      endDate: endtime,
      days: day
    };
    wxrequest.getFuncRooms(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data.map(item => {
        item.redPacketFlag = 0;
        item.couponFlag = 0;
        if(item.bookRoomResourceDTOS.length != 0){
          item.bookRoomResourceDTOS.map(subitem => {
            if(subitem.redPacketFlag == 1){
              item.redPacketFlag = 1;
            }
            if(subitem.couponFlag == 1){
              item.couponFlag = 1;
            }
            return subitem;
          })
        }
        return item;
      });
      if (resdata.code == 0) {
        for (let i = 0; i < resdatas.length; i++) {
          resdatas[i].type = false;
        }
        that.setData({
          roominfo: resdatas
        });
        wx.hideLoading();
      } else {
        wx.hideLoading();
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  get_shareactivity: function () {
    const that = this;
    let linkData = {
      hotelId: app.globalData.hotelId,
      modelId: -1,
      modelType: 2,
      shareType: 1,
      isNewVersion: 1
    };
    wxrequest.getshareactivity(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          sharenum: resdatas
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
  selecttimefun: function () {//选择 入住-离店时间
    const that = this;
    that.rili = that.selectComponent("#rili");
    let starTime = '';
    let starweek = '';
    let day = '';
    let endTime = '';
    let endweek = '';
    that.rili.xianShi({
      data: function (res) {
        if (res != null) {
          if (res.length == 1) {
            starTime = res[0].data;
          }
          else if (res.length == 2) {
            starTime = res[0].data;
            endTime = res[1].data;
            day = res[1].chaDay;
            let data1 = util.getDates(1, starTime);
            let data2 = util.getDates(1, endTime);
            starweek = data1[0].week;
            endweek = data2[0].week;
          }
        } else {
          that.initialization(that.data.hotelid);//初始化 入住-离店时间
          return;
        }
        that.setData({
          starTime: starTime,//入住时间
          starweek: starweek,//入住-星期
          day: day,
          endTime: endTime,//离店时间
          endweek: endweek,//离店-星期
        });
        that.getroominfo(starTime, endTime, that.data.hotelid, day);//获取酒店房型房源信息
      }
    })
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
          isSupportEn: resdatas.isSupportEn,
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
          hotelContactsMobile: resdatas.hotelContactsMobile,//酒店联系电话
          hotelLatitude: resdatas.hotelLatitude,//酒店纬度
          hotelLongitude: resdatas.hotelLongitude,//酒店经度
          isInvoice: resdatas.isSupportRoomInvoice,//是否支持酒店房费发票
          themecolor: JSON.parse(resdatas.hotelThemeDTO.themeDescription)//主题
        });
        wx.hideLoading();
      } else {
        wx.hideLoading();
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
  togglebtm: function (e) {//显示、隐藏房间信息
    const that = this;
    let roominfo = that.data.roominfo;
    let indexnum = e.currentTarget.dataset.indexnum;
    let type = e.currentTarget.dataset.type;
    for (let i = 0; i < roominfo.length; i++) {
      roominfo[i].type = false;
    }
    roominfo[indexnum].type = !type;
    that.setData({
      roominfo: roominfo,
      ifshowSpecial: !this.data.ifshowSpecial
    })
  },
  detailfun: function (e) {//查看详情
    const thatdata = this.data;
    wx.navigateTo({
      url: '../reservationdetail/reservationdetail?id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.type + '&starTime=' + thatdata.starTime + '&starweek=' + thatdata.starweek + '&day=' + thatdata.day + '&endTime=' + thatdata.endTime + '&endweek=' + thatdata.endweek + '&price=' + e.currentTarget.dataset.price + '&fullflag=' + e.currentTarget.dataset.fullflag + '&redPacketFlag=' + e.currentTarget.dataset.redpacketflag + '&couponFlag=' + e.currentTarget.dataset.couponflag
    })
  },
  formfun: function (e) {//预定
    const thatdata = this.data;
    wx.navigateTo({
      url: '../reservationform/reservationform?id=' + e.currentTarget.dataset.id + '&starTime=' + thatdata.starTime + '&starweek=' + thatdata.starweek + '&day=' + thatdata.day + '&endTime=' + thatdata.endTime + '&endweek=' + thatdata.endweek + '&roomtypeid=' + e.currentTarget.dataset.roomtypeid + '&funcid=' + this.data.funcid
    });
  },
  index: function () {//首页
    wx.reLaunch({
      url: '../index/index'
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
  mypage: function () {//我的
    wx.reLaunch({
      url: '../my/my'
    })
  },
  hotelstoryfun: function () {//酒店文化故事
    wx.navigateTo({
      url: '../hotelstorylist/hotelstorylist'
    })
  },
  move: function () {},
  isLanding: function (e) {//判断是否授权登陆
    const that = this;
    const thatdata = this.data;
    that.dialog = that.selectComponent("#dialog");
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {// 已经授权，可以直接调用 getUserInfo 获取头像昵称          
          wx.navigateTo({
            url: '../reservationform/reservationform?id=' + e.currentTarget.dataset.id + '&starTime=' + thatdata.starTime + '&starweek=' + thatdata.starweek + '&day=' + thatdata.day + '&endTime=' + thatdata.endTime + '&endweek=' + thatdata.endweek
          });
        } else {
          that.dialog.showDialog();
        }
      }
    })
  },
  redirectfun: function (e) {//监听组件传回的userid
    const that = this;
  },
  sharefun: function (e) {//获取分享码
    const that = this;
    const share_num = that.data.sharenum;
    let linkData = {
      cabCode: that.data.cabCode,
      hotelId: app.globalData.hotelId,
      bookFuncId: this.data.funcid,
      funcId: this.data.funcid,
      shareObj: 2,
      shareObjId: -1,
      shareUserId: app.globalData.userId,
      shareUserType: 2,
      shareType: 1,//1：列表，2：单项，3：分类
      shareCode: app.globalData.sharecode
    };
    wxrequest.postsharecode(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          shareCode: resdatas.shareCode,
          posterid: resdatas.id
        });
        if(share_num == 0 || share_num == 1){
          that.sharefun1();
        } else {
          that.setData({
            showtype: 1
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
  closefun: function () {//关闭分享窗口
    this.setData({
      showtype: 0
    })
  },
  sharefun1: function () {//好友分享
    this.closefun();
    wx.navigateTo({
      url: '../employeeshare/employeeshare?employee=' + this.data.shareCode
    })
  },
  get_poster: function(){//朋友圈分享获取海报
    const that = this;
    wxrequest.getposter(that.data.posterid).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          posterurl: resdatas,
          showtype: 2
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
  saveimg: function(){
    const that = this;
    wx.showToast({
      icon: 'loading',
      title: '正在保存图片',
      duration: 1000
    })
    let imgUrl = that.data.posterurl;
    wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
      url: imgUrl,
      success: function (res) {
        // 下载成功后再保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
          success: function (res) {
            wx.showToast({
              title: '成功保存到相册',
              icon: 'success'
            })
          }
        })
      },
      fail: function (err) {
        if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
          wx.showModal({
            title: '提示',
            content: '需要您授权保存相册',
            showCancel: false,
            success:modalSuccess=>{
              wx.openSetting({
                success(settingdata) {
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    wx.showModal({
                      title: '提示',
                      content: '获取权限成功,再次点击保存图片按钮即可保存',
                      showCancel: false,
                    })
                  } else {
                    wx.showModal({
                      title: '提示',
                      content: '获取权限失败，将无法保存到相册哦~',
                      showCancel: false,
                    })
                  }
                },
                fail(failData) {
                  console.log("failData",failData)
                },
                complete(finishData) {
                  console.log("finishData", finishData)
                }
              })
            }
          })
        }
      }
    })
  },
  previewImg: function () {
    const that = this;
    let imglist = [];
    imglist.push(that.data.posterurl);
    wx.previewImage({
      current: imglist[0],     //当前图片地址
      urls: imglist               //所有要预览的图片的地址集合 数组形式
    })
  },
  certificationNo: function () {//直接分享
    const that = this;
    const share_num = that.data.sharenum;
    if(share_num == 0 || share_num == 1){
      that.sharefun1();
    } else {
      that.setData({
        showtype: 1
      });
    }
  },
  getPhoneNumber: function (e) {//点击获取手机号码按钮
    const that = this;
    wx.login({
      success: res => {// 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.getcheckSession(res.code, e);
      }
    });
  },
  getcheckSession: function (code, e) {
    const that = this;
    wx.checkSession({
      success: function () {
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {//取消认证，手输手机号
          that.setData({
            showtype: 4
          });
        } else {//同意授权
          let flag = 1;
          let name = '';
          let phone = '';
          that.post_userphonenumber(code, e.detail.iv, e.detail.encryptedData, flag, name, phone);
        }
      },
      fail: function () {
        that.getPhoneNumber();
      }
    });
  },
  post_userphonenumber: function(code, iv, encryptedData, flag, name, phone){//获取微信绑定的手机号
    const that = this;
    const linkData = {
      code: code,
      iv: iv,
      encryptedData: encryptedData,
      flag: flag,
      nickName: name,
      phoneNumber: phone,
      hotelId: app.globalData.hotelId
    }
    wxrequest.postuserphonenumber(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if(resdatas.mobile){
          that.setData({
            showtype: 0,
            iscertification: 1
          });
          app.globalData.authFlagMobile = 1;
          that.isLanding();
        } else {//获取手机号失败，手输手机号
          that.setData({
            showtype: 4
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
  put_certification: function(certificationname, certificationtel){//保存认证手机号
    const that = this;

    let flag = 0;
    let iv = '';
    let code = '';
    let encryptedData = '';
    that.post_userphonenumber(code, iv, encryptedData, flag, certificationname, certificationtel);

    let fatherUserId = '';
    let fatherUserType = '';
    if(that.data.shareuser != ''){
      fatherUserId = that.data.shareuser.id;
      fatherUserType = that.data.shareuser.type;
    }
    const linkData = {
      fatherUserId: fatherUserId,
      fatherUserType: fatherUserType,
      hotelId: app.globalData.hotelId,
      mobile: certificationtel,
      name: certificationname,
      shareCodeId: that.data.posterid,
      bindShareCode: app.globalData.sharecode
    }
    wxrequest.putcertification(linkData).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        console.log('成功');
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
  certificationnamefun: function(e){//认证称呼
    this.setData({
      certificationname: e.detail.value
    })
  },
  certificationtelfun: function(e){//认证手机
    this.setData({
      certificationtel: e.detail.value
    })
  },
  certificationfun: function(){//确认提交认证信息
    const that = this;
    const certification_name = that.data.certificationname;
    const certification_tel = that.data.certificationtel;
    if(certification_name == ''){
      wx.showToast({
        title: '请填写您的称呼',
        icon: 'none',
        duration: 2000
      });
      return false;
    } else if(certification_tel == '' || !/^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(certification_tel)){
      wx.showToast({
        title: '请正确填写您的手机号码',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else {
      that.put_certification(certification_name, certification_tel);
    }
  },
  isLanding: function () {//判断是否授权登陆
    const that = this;
    const share_num = that.data.sharenum;
    that.dialog = that.selectComponent("#dialog");
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {// 已经授权，可以直接调用 getUserInfo 获取头像昵称
          if(share_num == 0 || share_num == 1){
            that.sharefun1();
          } else {
            that.setData({
              showtype: 1
            });
          }
        } else {
          that.dialog.showDialog();
        }
      }
    })
  },
  redirectfun: function (e) {//监听组件传回的userid
    const that = this;
    const share_num = that.data.sharenum;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        if(share_num == 0 || share_num == 1){
          that.sharefun1();
        } else {
          that.setData({
            showtype: 1
          });
        }
      }
    });
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
      shareCode: app.globalData.sharecode,
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
  },
  get_couponlist: function (e) {//获取优惠券列表
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    const edata = e.currentTarget.dataset.proddata;
    let linkData = {
      userId: app.globalData.userId,
      couponRange: 2,
      hotelId: app.globalData.hotelId,
      roomResourceId: edata.id,
      drawWay: 2
    };
    wxrequest.getcouponlist(linkData).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        let resdatas = res.data.data.map(item => {
          item.batchStartTime = item.batchStartTime.substring(0,10);
          item.batchEndTime = item.batchEndTime.substring(0,10);
          return item;
        });
        that.setData({
          coupon_list: resdatas
        });
        this.coupon.showlist(edata);
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
})