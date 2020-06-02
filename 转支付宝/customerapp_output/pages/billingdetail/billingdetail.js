const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    billingifo: '',
    invoicetype: '',
    //发票类型
    id: ''
  },
  onLoad: function (options) {
    const that = this;
    that.get_invoiceddetail(options);
  },
  get_invoiceddetail: function (options) {
    //获取开票详情
    const that = this;
    wxrequest.getinvoiceddetail(options.id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          billingifo: resdatas,
          invoicetype: options.invtype,
          id: options.id
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
  cancelfun: function () {
    //撤销开票申请
    const that = this;
    wx2my.showModal({
      title: '提示',
      content: '是否确认撤销开票申请？',

      success(res) {
        if (res.confirm) {
          wxrequest.putinvoicedlist(that.data.id).then(res => {
            let resdata = res.data;
            let resdatas = res.data.data;

            if (resdata.code == 0) {
              wx2my.showToast({
                title: '撤销成功',
                icon: 'none',
                duration: 1500
              });
              setTimeout(function () {
                wx2my.navigateBack({
                  delta: 1
                });
              }, 1500);
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
            wx2my.hideLoading();
            console.log(err);
          });
        }
      }

    });
  }
});