const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    hotelId: '',
    detailtype: false,
    storylist: [],
    //故事列表
    detailinfo: [] //故事详情

  },
  onLoad: function (options) {
    wx2my.showLoading({
      title: '加载中'
    });
    const that = this;
    that.setData({
      hotelId: app.globalData.hotelId
    });
    that.get_hotelstorylist();
  },
  get_hotelstorylist: function () {
    const that = this;
    let linkData = {
      hotelId: app.globalData.hotelId
    };
    wxrequest.getorderprodlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          storylist: resdatas
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
  detailfun: function (e) {
    //查看详情
    const that = this;
    wx2my.request({
      url: app.globalData.requestUrl + 'hotel/culture/' + e.currentTarget.dataset.id + '/details',
      header: {
        'content-type': 'application/json',
        // 默认值
        'Authorization': wx2my.getStorageSync("token")
      },
      method: "get",

      success(res) {
        let resdata = res.data;
        let resdatas = res.data.data;

        if (resdata.code == 0) {
          that.setData({
            detailinfo: resdatas,
            detailtype: true
          });
        }

        ;
      }

    });
  },
  closefun: function () {
    //关闭详情弹窗
    this.setData({
      detailtype: false
    });
  },
  move: function () {}
});