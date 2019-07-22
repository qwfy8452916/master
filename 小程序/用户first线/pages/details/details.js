const app = getApp()
Page({
  data: {
    themecolor: '',
    bannerImageList: [],
    imgheights: [],
    current: 0,
    descImageList: [],
    autoplay: true,
    circular: true,
    interval: 3500,
    duration: 500,
    prodRetailPrice: '',
    prodShowName: '',
    prodId: '',
    isFree: '',
    latticeCode: '',
    latticeId: '',
    usercode: '',
    hotelId: '',
    isEmpty: '',
    cabId: '',
    userid: '',
    isNewUser: '',//新老用户：true:新用户  false:老用户
  },
  onLoad: function (options) {
    let that = this;
    // console.log(options);
    that.setData({
      hotelId: options.hotelId,
      productId: options.productId,
      latticeId: options.latticeId,
      cabId: options.cabId,
      latticeCode: options.latticeCode,
    })
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
      success: function (res) {
        that.setData({
          isNewUser: res.data
        })
      },
      fail: function () {
        that.setData({
          isNewUser: true
        })
      }
    })
    wx.getStorage({
      key: 'userid',
      success(res) {
        that.setData({
          userid: res.data
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
    wx.request({
      url: app.data.requestUrl + 'buy/cab/order/prodDetails',
      data: {
        hotelId: that.data.hotelId,
        productId: that.data.productId,
        latticeId: that.data.latticeId,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "get",
      success(res) {
        let resdata = res.data;
        let resdatas = res.data.data;
        if (resdata.code == '0') {
          if (resdatas.bannerImageList == null) {
            that.setData({
              bannerImageList: [
                '../../img/nullimg.jpg'
              ]
            });
          } else {
            that.setData({
              bannerImageList: resdatas.bannerImageList
            })
          };
          if (resdatas.descImageList == null) {
            that.setData({
              descImageList: [
                '../../img/nullimg.jpg'
              ]
            });
          } else {
            that.setData({
              descImageList: resdatas.descImageList
            })
          };
          that.setData({
            prodRetailPrice: resdatas.prodRetailPrice,
            prodShowName: resdatas.prodShowName,
            prodId: resdatas.prodId,
            latticeCode: resdatas.latticeCode,
            isEmpty: resdatas.isEmpty,
            isFree: resdatas.isFree
          });
        };
      }
    });
  },
  purchase: function (e) {
    let that = this;

    setTimeout(function () {
      wx.showToast({
        title: '请稍等',
        icon: 'loading',
        mask: true,
        duration: 60000
      })
      let isfree = e.currentTarget.dataset.isfree;
      let usercode = that.data.usercode;
      let customerId = that.data.userid;
      let hotelId = that.data.hotelId;
      let latticeId = that.data.latticeId;
      let money = e.currentTarget.dataset.money.toFixed(2);
      let productId = e.currentTarget.dataset.prodid;
      let latticeCode = e.currentTarget.dataset.latticecode;
      let cabId = that.data.cabId;
      // console.log(e.currentTarget.dataset);
      // console.log("isfree:" + isfree + ";usercode:" + usercode + ";customerId:" + customerId + ";hotelId:" + hotelId + ";latticeId:" + latticeId + ";money:" + money + ";productId:" + productId + ";latticeCode:" + latticeCode + ";cabId:" + cabId);
      wx.request({
        url: app.data.requestUrl + 'buy/cab/order',
        header: {
          'content-type': 'application/json', // 默认值
          'Authorization': wx.getStorageSync("token")
        },
        method: "post",
        data: {
          customerId: that.data.userid,
          hotelId: that.data.hotelId,
          latticeId: that.data.latticeId,
          money: e.currentTarget.dataset.money.toFixed(2),
          productId: e.currentTarget.dataset.prodid
        },
        success(res) {
          // console.log(res);
          let countDown = res.data.data.countDown;
          let orderCode = res.data.data.orderCode;
          let orderId = res.data.data.orderId;
          let roomCode = res.data.data.roomCode;
          // console.log("截至时间：" + res.data.data.countDown);
          // console.log("orderId=" + res.data.data.orderId);
          if (res.data.code == 0) {
            wx.hideToast();//隐藏加载动画
            // console.log(res.data.data.isSameUser);
            if (res.data.data.isSameUser) {//判断是否是同一个人 true:同一个人 false: 不同的人
              if (isfree == 1) {
                wx.redirectTo({//免费商品
                  url: '../paysuccess/paysuccess?latticeCode=' + latticeCode + "&hotelId=" + hotelId + "&latticeId=" + latticeId + '&cabId=' + cabId + '&orderCode=' + orderCode + "&orderId=" + res.data.data.orderId + "&prodid=" + productId + '&roomCode=' + roomCode
                })
              } else {
                wx.navigateTo({//付费商品
                  url: '../payerror/payerror?latticeId=' + latticeId + "&prodid=" + productId + "&hotelId=" + hotelId + "&countDown=" + res.data.data.countDown + "&orderId=" + res.data.data.orderId + "&latticeCode=" + latticeCode + '&orderCode=' + orderCode + '&cabId=' + cabId
                })
              }
            } else {//不同的人
              if (res.data.data.msg != '' && res.data.data.msg != null) {//判断msg是否有值，有：弹框； 无：下单
                wx.showToast({
                  title: res.data.data.msg,
                  icon: "none",
                  duration: 2000
                })
              } else {
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
  imageLoad: function (e) {
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
})