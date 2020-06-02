const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
const app = getApp();
import wxrequest from '../../../request/api';
Page({
  data: {
    actImageUrl: {
      type: String,
      value: ''
    },
    actId: {
      type: Number,
      value: ''
    },
    actAdImageUrl: {
      type: String,
      value: ''
    }
  },
  data: {
    showtype: true,
    newcomertype: 0,
    listdata: ''
  },
  closefun: function () {
    //关闭活动
    this.setData({
      showtype: false
    });
  },
  openfun: function () {
    //打开红包
    const that = this;
    wx2my.showLoading({
      title: '加载中'
    });
    let linkData = {
      actId: that.properties.actId,
      hotelId: app.globalData.hotelId
    };
    wxrequest.putActNewcomer(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          newcomertype: 1,
          listdata: resdatas
        });
        wx2my.hideLoading();
      } else {
        wx2my.hideLoading();
        that.setData({
          showtype: false
        });
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
      console.log(err);
    });
  }
});