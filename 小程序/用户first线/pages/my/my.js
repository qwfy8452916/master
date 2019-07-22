const app = getApp()
Page({
  data: {
    userInfo: {},
    hotelId: '',
    hotelId: '',
    isNewUser: '',
    isvirtual: '',//fales:虚拟柜
    isSupportRmsvc: '',//是否支持客房服务 0 不支持，1 支持
    isSupportDelivery: '',//是否支持商城 0 不支持，1 支持
    themecolor: ''//主题颜色
  },
  onLoad: function (options) {
    let that = this;
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
      key: 'userInfo',
      success(res) {
        that.setData({
          userInfo: res.data
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
      }
    });
    wx.getStorage({
      key: 'hotelId',
      success(res) {
        that.setData({
          hotelId: res.data
        })
      }
    });
  },
  index: function () {//首页
    wx.getStorage({
      key: 'CabCode',
      success(res) {
        wx.redirectTo({
          url: '../index/index?cabCode=' + res.data
        })
      }
    })
  },
  roomservice: function () {//客房服务
    wx.redirectTo({
      url: '../roomservice/roomservice'
    })
  },
  hotelmall: function () {//商城
    wx.getStorage({
      key: 'CabCode',
      success(res) {
        wx.redirectTo({
          url: '../hotelmall/hotelmall?cabCode=' + res.data
        })
      }
    })
  },
  orderlist: function () {//订单列表 or 商城订单
    if (this.data.isvirtual){
      wx.navigateTo({
        url: '../orderlist/orderlist'
      })
    }else{
      wx.navigateTo({
        url: '../mhotelmall/mhotelmall?typeindex=all&hotelId=' + this.data.hotelId + '&userid=' + this.data.userid
      })
    }
  },
  hotelafter: function () {//酒店退款/售后

  },
  tel: function () {
    let that = this;
    wx.makePhoneCall({
      phoneNumber: '15850008085'
    })
  }
})