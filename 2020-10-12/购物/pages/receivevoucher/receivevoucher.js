const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    shareUserNickName: '',
    voucherdata: '',
    shareUserId: ''
  },
  onLoad: function (options) {
    const that = this;
    app.globalData.num = 0;
    that.get_vouchercode();
    that.setData({
      shareUserNickName: app.globalData.shareUserNickName,
      shareUserId: app.globalData.shareUser.id
    });
  },
  onShow: function () {
    wx.hideHomeButton();
  },
  get_vouchercode: function () {
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    wxrequest.getvouchercode(app.globalData.shareObjectId).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          voucherdata: resdatas
        });
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
  receivefun: function(e){//是否接受转赠
    const that = this;
    const edata = e.currentTarget.dataset;
    if(edata.type == 0) {
      that.routejump();
    } else {
      wxrequest.receivevoucher(that.data.shareUserId, edata.id).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data;
        if (resdata.code == 0) {
          wx.showToast({
            title: "领取成功",
            icon: 'none',
            duration: 2000
          });
          that.routejump();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          });
          that.routejump();
        }
      })
      .catch(err => {
        wx.hideLoading();
        console.log(err)
      });
    }
  },
  routejump: function(){
    setTimeout(function(){
      wx.reLaunch({
        url: '../my/my?type=' + 0
      })
    }, 2000);
    
  }
})