const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    global_Data: '',
    adtype: 1,
    id: '',
    hotelName: '',
    showtype: 0,
    shareCode: '',
    cabCode: '',
    themecolor: '',//主题颜色
    starTime: '',
    starweek: '',
    day: '',
    endTime: '',
    endweek: '',
    price: '',
    fullflag: '',
    imgheights: [],//banner图
    current: 0,//第一张banner图
    bannerImageList: [],//详情信息
    type: '',//1: 房型信息，2：房源信息
    roomdetail: '',//信息详情
    shareFlag: '',
    sharenum: -1,
    sharecontant: '',
    posterid: '',
    posterurl: '',
    certificationname: '',
    certificationtel: '',
    isSupportRoomAlloc: '',
    iscertification: '',
    redPacketFlag: 0,   //红包
    couponFlag: 0,   //优惠券
    ifshowRules:false,
    ruleData:{},
  },
  onReady(){
    this.coupon = this.selectComponent("#couponlist");
  },
  getRules(){
    wx.showLoading({
      title: '加载中',
      mask:true
    });
    let params = {
      hotelId: app.globalData.hotelId
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
  onLoad: function (options) {
    const that = this;
    wx.hideShareMenu();
    wx.showLoading({
      title: '加载中',
    });
    that.setData({
      global_Data: app.globalData,
      adtype: app.globalData.adtype,
      shareuser: app.globalData.shareUser,
      id: options.id,
      starTime: options.starTime,
      starweek: options.starweek,
      day: options.day,
      endTime: options.endTime,
      endweek: options.endweek,
      price: options.price,
      fullflag: options.fullflag,
      shareFlag: app.globalData.shareFlag,
      iscertification: app.globalData.authFlagMobile,
      redPacketFlag: options.redPacketFlag,
      couponFlag: options.couponFlag,
    });
    wx.getStorage({
      key: 'themecolor',
      success: function (res) {
        that.setData({
          themecolor: res.data
        })
      },
    });
    wx.getStorage({
      key: 'CabCode',
      success: function (res) {
        that.setData({
          cabCode: res.data
        })
      },
    });
    wx.getStorage({
      key: 'hotelName',
      success: function (res) {
        that.setData({
          hotelName: res.data
        })
      },
    });
    wx.getStorage({//客房协议价
      key: 'isSupportRoomAlloc',
      success(res) {
        that.setData({
          isSupportRoomAlloc: res.data
        })
      }
    });
    if (options.type == 1) {//房型信息
      that.get_fxroominfo(options);
    } else {//房源信息
      that.get_fyroominfo(options);
    }
  },
  get_fyroominfo: function(options){//房源信息
    const that = this;
    wxrequest.getfyroominfo(options.id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let imglist = [];
        for (let i = 0; i < resdatas.imageDetailDTOS.length; i++) {
          imglist.push(resdatas.imageDetailDTOS[i].url);
        }
        resdatas.facilityDTOS.forEach(item => {
          item.facilityContent = item.facilityContent.split('，')
        })
        console.log(resdatas)
        that.setData({
          type: options.type,
          bannerImageList: imglist,
          roomdetail: resdatas
        });
        that.get_shareactivity(resdatas.actualShareId);
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
  get_fxroominfo: function(options){//房型信息
    const that = this;
    wxrequest.getfxroominfo(options.id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let imglist = [];
        for (let i = 0; i < resdatas.imageDetailDTOS.length; i++) {
          imglist.push(resdatas.imageDetailDTOS[i].url);
        }
        resdatas.facilityDTOS.forEach(item => {
          item.facilityContent = item.facilityContent.split('，')
        })
        console.log(resdatas)
        that.setData({
          type: options.type,
          bannerImageList: imglist,
          roomdetail: resdatas
        });
        that.get_shareactivity(resdatas.actualShareId);
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
  get_shareactivity: function (actualShareId) {
    const that = this;
    let linkData = {
      hotelId: app.globalData.hotelId,
      modelId: -1,
      modelType: 2,
      shareType: 2,
      shareObjId: actualShareId,
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
  imageLoad: function (e) {//banner图高度自适应
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
  bindchange: function (e) {
    this.setData({ current: e.detail.current })
  },
  formfun: function (e) {//预定
    const thatdata = this.data;
    wx.navigateTo({
      url: '../reservationform/reservationform?id=' + e.currentTarget.dataset.id + '&starTime=' + thatdata.starTime + '&starweek=' + thatdata.starweek + '&day=' + thatdata.day + '&endTime=' + thatdata.endTime + '&endweek=' + thatdata.endweek
    })
  },
  sharefun: function (e) {//获取分享码
    const that = this;
    const share_num = that.data.sharenum;
    let linkData = {
      cabCode: that.data.cabCode,
      hotelId: app.globalData.hotelId,
      funcId: -1,
      shareObj: 2,
      shareObjId: that.data.roomdetail.actualShareId,
      shareUserId: app.globalData.userId,
      shareUserType: 2,
      shareType: 2,//1：列表，2：单项，3：分类
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
  backfun: function () {
    wx.navigateBack({
      delta: 1
    })
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
  }
})