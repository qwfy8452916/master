const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    isvirtual: '',
    //fales:虚拟柜
    themecolor: '',
    //主题颜色
    orderlist: '',
    minibar: '',
    //迷你吧支持功能（0：不支持，1：展示，2：展示+下单）
    roomDelivery: '',
    //酒店配送支持功能（1：展示，2：展示+下单）
    roomService: '' //客房服务支持功能（0：不支持，1：展示，2：展示+下单）

  },
  onLoad: function (options) {
    const that = this;
    wx2my.showLoading({
      title: '加载中'
    });
    wx2my.getStorage({
      key: 'themecolor',

      success(res) {
        that.setData({
          themecolor: res.data
        });
      }

    });
    wx2my.getStorage({
      key: 'isvirtual',

      success(res) {
        that.setData({
          isvirtual: res.data
        });
      }

    });
    wx2my.getStorage({
      key: 'minibar',

      success(res) {
        that.setData({
          minibar: res.data
        });
      }

    });
    wx2my.getStorage({
      key: 'roomDelivery',

      success(res) {
        that.setData({
          roomDelivery: res.data
        });
      }

    });
    wx2my.getStorage({
      key: 'roomService',

      success(res) {
        that.setData({
          roomService: res.data
        });
      }

    });
    that.get_dflist();
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
        });
        wx2my.hideLoading();
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
  detailsfun: function (e) {
    //详情页
    wx2my.navigateTo({
      url: '../reservationdetails/reservationdetails?id=' + e.currentTarget.dataset.id + '&redcode=-1&type=0'
    });
  },
  kffw: function () {
    //客服服务
    wx2my.redirectTo({
      url: '../kffulist/kffulist'
    });
  },
  smgw: function () {
    //扫码购物
    wx2my.redirectTo({
      url: '../prodOrder/prodOrder?typeindex=all'
    });
  }
});