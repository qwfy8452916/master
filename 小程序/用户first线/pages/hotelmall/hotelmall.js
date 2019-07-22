const app = getApp()
Page({
  data: {
    bannerImageList: [
      "../../img/jdimg1.jpg",
      "../../img/jdimg2.jpg",
      "../../img/jdimg3.jpg",
    ],
    hotelId: '',//酒店id
    themecolor: '',//主题颜色
    commoditytype: true,
    typenum: 0,
    listcommodity: [],//分类
    commoditylist: [],//商品
    isScene: '',//进场方式
    isvirtual: '',//fales:虚拟柜
    isSupportRmsvc: '',//是否支持客房服务 0 不支持，1 支持
    isSupportDelivery: '',//是否支持商城 0 不支持，1 支持
    isNewUser: ''//新老用户
  },
  onLoad: function (options) {
    wx.showToast({
      icon: 'loading',
      mask: true,
      duration: 6000
    })
    let that = this;
    wx.getStorage({
      key: 'isNewUser',
      success(res) {
        that.setData({
          isNewUser: res.data
        })
      },
      fail: function () {
        that.setData({
          isNewUser: true
        })
      }
    });
    wx.getStorage({
      key: 'scene',
      success: function (res) {
        if (res.data == 1011) {
          that.setData({
            isScene: 1  //扫码进入
          })
        } else {
          that.setData({
            isScene: 0  //非扫码进入
          })
        }
      },
    });
    wx.getStorage({
      key: 'isvirtual',
      success(res) {
        that.setData({
          isvirtual: res.data
        })
      }
    });
    wx.getStorage({
      key: 'userid',
      success(res) {
        that.setData({
          userid: res.data
        })
        wx.request({//获取酒店信息
          url: app.data.requestUrl + 'buy/cab/order/hotel?CabCode=' + options.cabCode,
          header: {
            'content-type': 'application/json', // 默认值
            'Authorization': wx.getStorageSync("token")
          },
          method: "get",
          data: {
            CabCode: options.cabCode,
            customerId: res.data
          },
          success(res) {
            let resdata = res.data;
            let resdatas = res.data.data;
            if (resdata.code == '0') {
              wx.setStorage({
                key: 'CabCode',
                data: options.cabCode
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
              that.gettypelist(resdatas.id, resdatas.id);
              that.setData({
                hotelId: resdatas.id,
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
    
  },

  onShow: function (){
    const that = this;
    const deliverylist1 = [];//客房配送
    const deliverylist2 = [];//快递到家
    const orderlist1 = [];//订单-客房配送
    const orderlist2 = [];//订单-快递到家
    wx.showToast({
      icon: 'loading',
      mask: true,
      duration: 6000
    })
    setTimeout(function(){
      that.gettypelist(that.data.hotelId);
    },300);

    wx.getStorage({
      key: 'deliverylist1',
      fail: function (res) {
        wx.setStorage({
          key: 'deliverylist1',
          data: deliverylist1
        })
      }
    });
    wx.getStorage({
      key: 'deliverylist2',
      fail: function (res) {
        wx.setStorage({
          key: 'deliverylist2',
          data: deliverylist2
        })
      }
    });
    wx.getStorage({
      key: 'orderlist1',
      fail: function (res) {
        wx.setStorage({
          key: 'orderlist1',
          data: orderlist1
        })
      }
    });
    wx.getStorage({
      key: 'orderlist2',
      fail: function (res) {
        wx.setStorage({
          key: 'orderlist2',
          data: orderlist2
        })
      }
    });
  },

  gettypelist: function (hotelId){

    const that = this;
    wx.request({//获取商品市场分类列表
      url: app.data.requestUrl + 'hotel/prod/category/market',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "get",
      data:{
        hotelId: hotelId,
        orgAs: ''
      },
      success(res) {
        let resdata = res.data
        if (resdata.code == 0) {
          that.setData({
            listcommodity: resdata.data,
            typenum: 0
          })
          that.getcommoditylist(resdata.data[0].id, hotelId)
        }
      }
    })
  },

  index: function () {
    wx.getStorage({
      key: 'CabCode',
      success(res) {
        wx.redirectTo({
          url: '../index/index?cabCode=' + res.data
        })
      }
    })
  },
  roomservice: function () {
    wx.redirectTo({
      url: '../roomservice/roomservice'
    })
  },
  mypage: function () {
    wx.redirectTo({
      url: '../my/my'
    })
  },
  commodityfun: function () {//自有商品 or 周边商品
    let that = this;
    let commodity = that.data.commoditytype;
    that.setData({
      commoditytype: !commodity
    })
  },
  changeType: function(e){//切换分类
    let that = this;
    that.setData({
      typenum: e.currentTarget.dataset.num
    });
    that.getcommoditylist(e.currentTarget.dataset.id, that.data.hotelId);
  },
  details: function (e){//查看详情
    wx.navigateTo({ 
      url: '../hotelmalldetails/hotelmalldetails?hotelProdId=' + e.currentTarget.dataset.hotelprodid
    })
  },
  getcommoditylist: function (id, hotelId){//获取分类下所有商品
    let that = this;
    let isScene = that.data.isScene;
    wx.request({
      url: app.data.requestUrl + 'hotel/product/hshop/product',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      data: {
        marketCategoryId: id,
        hotelId: hotelId,
        isScan: isScene
      },
      method: "get",
      success(res) {
        let resdata = res.data;
        if (resdata.code == 0){
          that.setData({
            commoditylist: resdata.data
          })
          wx.hideToast();//隐藏加载动画
        }
      }
    })
  },
  buycarfun: function () {//跳转到购物车
    wx.navigateTo({
      url: '../hotelmallcar/hotelmallcar'
    })
  }
})