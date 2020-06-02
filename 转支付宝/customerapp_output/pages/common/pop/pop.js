const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
const app = getApp();
import wxrequest from '../../../request/api';
Page({
  data: {},
  data: {
    canIUse: wx2my.canIUse('button.open-type.getUserInfo'),
    isShow: false
  },

  hideDialog() {
    //隐藏弹框 
    this.setData({
      isShow: false
    });
  },

  showDialog() {
    //展示弹框 
    this.setData({
      isShow: true
    });
    this.triggerEvent('showDialog', {
      userid: this.properties.userid
    });
  },

  _getUserInfo: function (e) {
    //授权登陆
    const that = this;
    let userInfo = e.detail.userInfo;
    let encryptedData = e.detail.encryptedData;
    let iv = e.detail.iv;

    if (userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      wx2my.setStorage({
        key: 'userInfo',
        data: userInfo
      });
      wx.login({
        // 登录 
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          that.redirectfun(encryptedData, iv, res.code);
        }
      });
    } else {
      wx2my.showModal({
        title: '提示',
        content: '取消授权登陆将无法体验客房宝哟，请授权登陆吧！',
        showCancel: false
      });
    }

    ;
  },
  redirectfun: function (encryptedData, iv, code) {
    const that = this;
    let linkData = {
      code: code,
      encryptedData: encryptedData,
      iv: iv,
      appId: app.globalData.appId,
      appSecret: app.globalData.appSecret
    };
    wxrequest.postloginByWX(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        wx2my.setStorageSync('token', resdatas.token);
        var myEventDetail = {
          // detail对象，提供给事件监听函数
          userid: resdatas.id
        };
        var myEventOption = {}; // 触发事件的选项

        that.triggerEvent('redirectfun', myEventDetail, myEventOption);
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
});

