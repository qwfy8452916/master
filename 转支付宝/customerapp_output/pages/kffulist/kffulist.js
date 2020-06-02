const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    themecolor: '',
    //主题颜色
    userid: '',
    hotelId: '',
    pageNo: 1,
    pages: '',
    orderlist: []
  },
  onLoad: function (options) {
    const that = this;
    wx2my.getStorage({
      key: 'themecolor',

      success(res) {
        that.setData({
          themecolor: res.data
        });
      }

    });
    that.setData({
      userid: app.globalData.userId,
      hotelId: app.globalData.hotelId
    });
    wx2my.showLoading({
      title: '加载中'
    });
    that.getlistdata(app.globalData.userId, app.globalData.hotelId, 1);
  },
  getlistdata: function (customerId, hotelId, pageNo) {
    //获取客房服务订单列表
    const that = this;
    let linkData = {
      customerId: customerId,
      hotelId: hotelId,
      pageNo: pageNo,
      pageSize: 10
    };
    wxrequest.getkffworderlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      let datalist1 = that.data.orderlist;
      const datalist2 = that.data.orderlist;

      if (resdata.code == 0) {
        if (datalist2.length == 0) {
          datalist1 = resdatas.records;
        } else {
          datalist1 = datalist2.concat(resdatas.records);
        }

        that.setData({
          orderlist: datalist1,
          pages: resdatas.pages
        });
        wx2my.hideNavigationBarLoading(); // 隐藏导航栏加载框

        wx2my.stopPullDownRefresh(); // 停止下拉动作

        wx2my.hideLoading();
      } else {
        that.setData({
          searchLoadingComplete: false
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
      wx2my.hideNavigationBarLoading(); // 隐藏导航栏加载框

      wx2my.stopPullDownRefresh(); // 停止下拉动作

      wx2my.hideLoading(); // 隐藏加载框

      console.log(err);
    });
  },
  smgw: function () {
    wx2my.redirectTo({
      url: '../prodOrder/prodOrder?&typeindex=all'
    });
  },
  detials: function (e) {
    wx2my.navigateTo({
      url: '../orderdetails/orderdetails?serviceid=' + e.currentTarget.dataset.id
    });
  },
  reservation: function () {
    wx2my.redirectTo({
      url: '../reservationlist/reservationlist'
    });
  },
  onPullDownRefresh: function () {
    //下拉刷新
    const that = this;
    that.setData({
      pageNum: 1,
      orderlist: []
    });
    that.getlistdata(that.data.userid, that.data.hotelId, 1);
  },
  onReachBottom: function () {
    //上拉加载
    var that = this;
    let pageNo = that.data.pageNo;
    let pages = that.data.pages;

    if (pages > pageNo) {
      wx2my.showLoading({
        // 显示加载图标
        title: '玩命加载中'
      });
      pageNo = pageNo + 1; // 页数+1

      that.setData({
        pageNo: pageNo
      });
      that.getlistdata(that.data.userid, that.data.hotelId, pageNo);
    }
  }
});