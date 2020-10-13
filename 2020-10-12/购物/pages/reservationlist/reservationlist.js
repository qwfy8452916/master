const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    isvirtual: '',//fales:虚拟柜
    themecolor: '',//主题颜色
    orderlist: '',
    minibar: '',//迷你吧支持功能（0：不支持，1：展示，2：展示+下单）
    roomDelivery: '',//酒店配送支持功能（1：展示，2：展示+下单）
    roomService: '',//客房服务支持功能（0：不支持，1：展示，2：展示+下单）
    isSupportRoomAlloc: ''
  },
  onLoad: function (options) {
    const that = this;
    wx.showLoading({
      title: '加载中',
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
    wx.getStorage({
      key: 'minibar',
      success(res) {
        that.setData({
          minibar: res.data
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
      key: 'isSupportRoomAlloc',
      success(res) {
        that.setData({
          isSupportRoomAlloc: res.data
        })
      }
    });
    that.get_dflist();
  },
  onShow: function () {
    this.get_dflist();
    wx.hideHomeButton();
  },
  get_dflist: function () {
    const that = this;
    let linkData = {
      customerId: app.globalData.userId,
      hotelId: app.globalData.hotelId
    };
    wxrequest.getdflist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          orderlist: resdatas
        })
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
  detailsfun: function (e) {//详情页
    wx.navigateTo({
      url: '../reservationdetails/reservationdetails?id=' + e.currentTarget.dataset.id + '&redcode=-1&type=0'
    })
  },
  kffw: function () {//客服服务
    wx.redirectTo({
      url: '../kffulist/kffulist'
    })
  },
  smgw: function () {//扫码购物
    wx.redirectTo({
      url: '../prodOrder/prodOrder?typeindex=all'
    })
  }
})