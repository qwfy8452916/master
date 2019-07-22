const app = getApp()
Page({
  data: {
    isSupportRmsvc: '',//是否支持客房服务 0 不支持，1 支持
    isSupportDelivery: '',//是否支持商城 0 不支持，1 支持
    themecolor: '',//主题颜色
    userid: '',
    hotelAddImagesfirst: '',//第一张banner
    hotelAddImages: [],
    autoplay: true,
    circular: true,
    interval: 3500,
    duration: 500,
    hotelStarLevel: '',
    hotelName: '',
    hotelDecorationYear: '',
    hotelStyle: '',
    isHasPark: '',
    hotelAddress: '',
    province: '',
    city: '',
    area: '',
    hotelHonor: '',
    hotelContactsMobile: '',
    hotelLatitude: '',
    hotelLongitude: '',
    commoditylist: [],
    id: '',
    usercode: '',
    CabCode: '',
    isNewUser: '',//新老用户：true:新用户  false:老用户
    isInvoice: '',//是否开票 0：不开票 1：开票 
    cabinetStatus: '',//柜子状态（0: 初始状态 1：正常 2：故障）
    wifiSsid: '',//wifi名称
    wifiPassword: ''//wifi密码
  },
  onLoad: function (options) {
    let that = this;
    let userid = '';
    console.log(options.cabCode);
    that.setData({
      CabCode: options.cabCode
    });
    wx.getStorage({
      key: 'code',
      success(res) {
        that.setData({
          usercode: res.data
        })
      }
    });
    wx.getStorage({
      key: 'isNewUser',
      success: function(res) {
        that.setData({
          isNewUser: res.data
        })
      },
      fail: function(){
        that.setData({
          isNewUser: true
        })
      }
    })
    wx.setStorage({
      key: 'CabCode',
      data: options.cabCode
    });
    wx.getStorage({
      key: 'userid',
      success(res) {
        that.setData({
          userid: res.data
        })
        wx.request({//获取酒店信息
          // url: app.data.requestUrl + 'buy/cab/order/hotel?CabCode=' + that.data.CabCode,
          url: app.data.requestUrl + 'buy/cab/order/hotel?CabCode=' + options.cabCode,
          header: {
            'content-type': 'application/json', // 默认值
            'Authorization': wx.getStorageSync("token")
          },
          method: "get",
          data: {
            customerId: res.data
          },
          success(res) {
            let resdata = res.data;
            let resdatas = res.data.data;
            if (resdata.code == '0'){
              const hotelAddImagesfirst = resdatas.hotelImageDTOs[0];
              const hotelAddImages = resdatas.hotelImageDTOs;
              hotelAddImages.splice(0, 1);
              that.setData({
                hotelAddImagesfirst: hotelAddImagesfirst,
                hotelAddImages: hotelAddImages,
                isInvoice: resdatas.isInvoice
              });
              wx.setStorage({
                key: 'isInvoice',
                data: resdatas.isInvoice
              });
              wx.setStorage({
                key: 'hotelId',
                data: resdatas.id
              });
              wx.setStorage({
                key: 'encryptedOrgId',
                data: resdatas.encryptedOrgId
              });
              wx.setStorage({
                key: 'encryptedOprOrgId',
                data: resdatas.encryptedOprOrgId
              });
              wx.setStorage({
                key: 'operatorId',
                data: resdatas.operatorId
              });
              wx.setStorage({
                key: 'roomCode',
                data: resdatas.roomCode
              });
              wx.setStorage({
                key: 'roomFloor',
                data: resdatas.roomFloor
              });
              wx.setStorage({
                key: 'hotelName',
                data: resdatas.hotelName
              });
              wx.setStorage({
                key: 'isSupportRmsvc',
                data: resdatas.isSupportRmsvc
              });
              wx.setStorage({
                key: 'isSupportDelivery',
                data: resdatas.isSupportDelivery
              });
              wx.setStorage({
                key: 'hotelBookingPhone',
                data: resdatas.hotelBookingPhone
              });
              that.setData({ 
                id: resdatas.id,
                hotelName : resdatas.hotelName,
                hotelStarLevel : resdatas.hotelStarLevel+1,
                hotelDecorationYear: resdatas.hotelContactsMobile,
                hotelStyle : resdatas.hotelStyle,
                isHasPark : resdatas.isHasPark,
                hotelAddress: resdatas.hotelAddress,
                city: resdatas.city.dictName,
                province: resdatas.province.dictName,
                area: resdatas.area.dictName,
                hotelHonor: resdatas.hotelHonor,
                hotelContactsMobile: resdatas.hotelContactsMobile,
                hotelLatitude: resdatas.hotelLatitude,
                hotelLongitude: resdatas.hotelLongitude,
                isSupportRmsvc: resdatas.isSupportRmsvc,
                isSupportDelivery: resdatas.isSupportDelivery,
                themecolor: JSON.parse(resdatas.hotelThemeDTO.themeDescription)
              });
              wx.setStorage({
                key: 'themecolor',
                data: JSON.parse(resdatas.hotelThemeDTO.themeDescription)
              });
            }
          }
        });

      }
    });
    wx.request({//获取商品信息
      // url: app.data.requestUrl + 'buy/cab/order/prod?CabCode=' + that.data.CabCode,
      url: app.data.requestUrl + 'buy/cab/order/prod?CabCode=' + options.cabCode,
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "get",
      success(res) {
        let resdata = res.data;
        let resdatas = res.data.data;
        if (resdata.code == '0') {
          let commoditylist = resdatas;
          for (let i = 0; i < commoditylist.length; i++){
            commoditylist[i].prodLogoPath = 'http://res.zhuniu.com/longan-test/' + commoditylist[i].prodLogoPath;
          }
          that.setData({
            commoditylist: commoditylist,
            cabinetStatus: resdatas[0].cabinetStatus
          });
        };
      }
    });
    
    wx.request({//获取wifi
      url: app.data.requestUrl + 'cabinet/qrcode',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      data:{
        qrcode: options.cabCode
      },
      method: "get",
      success(res) {
        let resdata = res.data;
        let resdatas = res.data.data;
        if (resdata.code == '0') {
          that.setData({
            wifiSsid: resdatas.wifiSsid,
            wifiPassword: resdatas.wifiPassword
          });
        }; 
      }
    });
  },
  mypage: function(){
    wx.redirectTo({
      url: '../my/my'
    })
  },
  roomservice: function () {
    wx.redirectTo({
      url: '../roomservice/roomservice'
    })
  },
  hotelmall: function(){
    wx.redirectTo({
      url: '../hotelmall/hotelmall?cabCode=' + this.data.CabCode
    })
  },
  details: function(e){
    let that = this;
    let productId = e.currentTarget.dataset.prodid;//获取自定义属性
    let latticeId = e.currentTarget.dataset.latticeid;//获取自定义属性
    let cabId = e.currentTarget.dataset.cabid;
    let latticeCode = e.currentTarget.dataset.latticecode;
    wx.navigateTo({
      url: '../details/details?productId=' + productId + '&hotelId=' + that.data.id + "&CabCode" + that.data.CabCode + "&latticeId=" + latticeId + '&cabId=' + cabId + '&latticeCode=' + latticeCode
    })
  },
  tel: function(){
    let that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.hotelContactsMobile
    })
  },
  mabview: function(){
    let that = this;
    let hotelLongitude = that.data.hotelLongitude;
    let hotelLatitude = that.data.hotelLatitude;
    let hotelName = that.data.hotelName;
    wx.navigateTo({
      url: '../map/map?hotelLongitude=' + hotelLongitude + '&hotelLatitude=' + hotelLatitude + '&hotelName=' + hotelName
    })
  },
  purchase: function (e){

    let that = this;

    setTimeout(function(){


    wx.showToast({
      title: '请稍等',
      icon: 'loading',
      mask: true,
      duration: 60000
    })
    let isfree = e.currentTarget.dataset.isfree;
    let usercode = that.data.usercode;
    let customerId = that.data.userid;
    let hotelId = that.data.id;
    let latticeId = e.currentTarget.dataset.latticeid;
    let money = e.currentTarget.dataset.money.toFixed(2);
    let productId = e.currentTarget.dataset.prodid;
    let latticeCode = e.currentTarget.dataset.latticecode;
    let cabId = e.currentTarget.dataset.cabid;
    // console.log(that.data.userid);
    wx.request({
      url: app.data.requestUrl + 'buy/cab/order',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "post",
      data: {
        customerId: that.data.userid,
        hotelId: that.data.id,
        latticeId: e.currentTarget.dataset.latticeid,
        money: e.currentTarget.dataset.money.toFixed(2),
        productId: e.currentTarget.dataset.prodid
      },
      success(res) {
        // console.log(res);
        let countDown = res.data.data.countDown;  
        let orderCode = res.data.data.orderCode;
        let orderId = res.data.data.orderId;
        let roomCode = res.data.data.roomCode;
        // console.log("截至时间："+ res.data.data.countDown);
        // console.log("orderId="+ res.data.data.orderId);
        if (res.data.code==0){
          wx.hideToast();//隐藏加载动画
          // console.log(res.data.data.isSameUser);
          if (res.data.data.isSameUser){//判断是否是同一个人 true:同一个人 false: 不同的人
            if (isfree == 1) {
              wx.redirectTo({//免费商品
                url: '../paysuccess/paysuccess?latticeCode=' + latticeCode + "&hotelId=" + hotelId + "&latticeId=" + latticeId + '&cabId=' + cabId + '&orderCode=' + orderCode + "&orderId=" + res.data.data.orderId + "&prodid=" + productId + '&roomCode=' + roomCode
              })
            }else{
              wx.navigateTo({//付费商品
                url: '../payerror/payerror?latticeId=' + latticeId + "&prodid=" + productId + "&hotelId=" + hotelId + "&countDown=" + res.data.data.countDown + "&orderId=" + res.data.data.orderId + "&latticeCode=" + latticeCode + '&orderCode=' + orderCode + '&cabId=' + cabId
              })
            }
          }else{//不同的人
            if (res.data.data.msg != '' && res.data.data.msg != null) {//判断msg是否有值，有：弹框； 无：下单
              wx.showToast({
                title: res.data.data.msg,
                icon: "none",
                duration: 2000
              })
            }else{
              wx.showToast({
                title: '请稍等',
                icon: 'loading',
                mask: true,
                duration: 60000
              })
              // console.log(res.data.data.orderId);
              let countDown = res.data.data.countDown;
              let orderId = res.data.data.orderId;
              wx.request({
                url: app.data.requestUrl + 'buy/cab/order/buy',
                header: {
                  'content-type': 'application/json', // 默认值
                  'Authorization': wx.getStorageSync("token")
                },
                method: "post",
                data: {
                  customerId: customerId,
                  hotelId: hotelId,
                  latticeId: latticeId,
                  money: money,
                  productId: productId,
                  orderId: res.data.data.orderId
                },
                success(resbuy) {
                  if (resbuy.data.code == 0) {
                    wx.hideToast();//隐藏加载动画
                    wx.requestPayment({
                      appId: resbuy.data.data.appId,
                      timeStamp: resbuy.data.data.timeStamp,
                      nonceStr: resbuy.data.data.nonceStr,
                      package: resbuy.data.data.package,
                      signType: 'MD5',
                      paySign: resbuy.data.data.paySign,
                      success: function (res) {
                        if (res.errMsg === "requestPayment:ok") {
                          wx.redirectTo({
                            url: '../paysuccess/paysuccess?latticeCode=' + latticeCode + "&hotelId=" + hotelId + "&latticeId=" + latticeId + '&cabId=' + cabId + '&orderCode=' + resbuy.data.data.orderCode + "&orderId=" + resbuy.data.data.orderId + "&prodid=" + productId + '&roomCode=' + resbuy.data.data.roomCode
                          })
                        }
                      },
                      fail: function (res) {
                        wx.navigateTo({
                          url: '../payerror/payerror?latticeId=' + latticeId + "&prodid=" + productId + "&hotelId=" + hotelId + "&countDown=" + countDown + "&orderId=" + orderId + "&latticeCode=" + latticeCode + '&orderCode=' + orderCode + '&cabId=' + cabId
                        })
                      },
                      complete: function (res) {
                        console.log(res)
                      }
                    })
                  }
                }
              })
            }
          }
        }
      }
    });

    }, 800);

  },


  //点击链接
  connect: function () {
    let that = this;
    that.connectWifi();//检测手机型号
    that.startWifi();
  },
  //检测手机型号
  connectWifi: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {

        var system = '';

        if (res.platform == 'android') system = parseInt(res.system.substr(8));

        if (res.platform == 'ios') system = parseInt(res.system.substr(4));

        if (res.platform == 'android' && system < 6) {

          wx.showToast({

            title: '手机版本不支持',

          })

          return

        }

        if (res.platform == 'ios' && system < 11.2) {

          wx.showToast({

            title: '手机版本不支持',

          })

          return

        }
      }
    })
  },


  //初始化 Wi-Fi 模块

  startWifi: function () {

    var that = this

    wx.startWifi({

      success: function (res) {
        // console.log(res.errMsg)

        //请求成功连接Wifi

        that.Connected();

      },

      fail: function (res) {
        // console.log(res)

        // this.setData({

        wx.showToast({

          title: '接口调用失败',

        })

        // });

      }

    })

  },


  // 连接已知Wifi

  Connected: function () {
    var that = this

    wx.connectWifi({

      // SSID: that.data.wifiSsid,

      // password: that.data.wifiPassword,

      SSID: "360WiFi-61BF83",
      password: "",

      success: function (res) {

        wx.showToast({

          title: 'wifi连接成功',

        })

      },

      fail: function (res) {

        wx.showToast({

          title: 'wifi连接失败',

        })

      }

    })

  },
})
