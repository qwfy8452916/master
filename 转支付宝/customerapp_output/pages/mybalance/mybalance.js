const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    userbalancedata: ''
  },
  onShow: function () {
    this.getbalancedata();
  },
  getbalancedata: function () {
    //获取用户余额、收支明细
    const that = this;
    wxrequest.getuserbalance(app.globalData.userId).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          userbalancedata: resdatas
        });
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
  gowithdraw: function () {
    //提现
    wx2my.navigateTo({
      url: '../mywithdraw/mywithdraw?balance=' + this.data.userbalancedata.balance
    });
  }
});