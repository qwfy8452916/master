const app = getApp()
import wxrequest from '../../request/api'
Page({
  data: {
    redbox: '',
    amount: ''
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    console.log('businessCode='+wx.getStorageSync('businessCode'));
    const params = {
      redPacketCode: wx.getStorageSync('businessCode')
    };
    wxrequest.receiveenvelope(params).then(res => {
      if (res.data.code == 0) {
        wx.hideLoading();
        let amount = res.data.data.amount;
        amount = parseFloat(amount).toFixed(2);
        that.setData({
          redbox: res.data.data,
          amount: amount
        });
        if (res.data.data.code == 1){
          wx.showToast({
            title: '您已领取过啦！',
            icon: 'none',
            duration: 3000
          });
        } else if (res.data.data.code == 2){
          wx.showToast({
            title: '您来晚啦,红包已经全部领走啦！',
            icon: 'none',
            duration: 3000
          });
        }
      } else if (res.data.code == 1) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    }).catch(err => {
      console.log(err)
    });
    wx.setStorageSync('businessCode', '')
  },
  gobackfun: function () {//返回
    wx.switchTab({
      url: '/pages/smartCab/smartCab?ifback='+true
    })
  },
  seelist: function () {//查看我的红包记录		
    wx.navigateTo({
      url: '/pages/restMoney/restMoney'
    })
  }
})