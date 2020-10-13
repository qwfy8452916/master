const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    subtype: false,
    balance: '',
    money: ''
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      balance: options.balance
    });
  },
  changefun: function (e) {//修改提现金额
    const that = this;
    const balance = that.data.balance;
    const edata = e.detail.value;
    console.log(edata,balance)
    if(edata > balance){
      wx.showToast({
        title: '提现金额超出可提现金额，请重新输入',
        icon: 'none',
        duration: 2000
      });
      that.setData({
        subtype: false
      });
    } else {
      that.setData({
        subtype: true,
        money: e.detail.value
      });
    }
  },
  clearfun: function () {//清空提现金额
    this.setData({
      money: ''
    });
  },
  withdrawfun: function () {//提现
    const that = this;
    const money = that.data.money;
    that.setData({
      subtype: false
    });
    let linkData = {
      amount: money,
      customId: app.globalData.userId,
      hotelId: app.globalData.hotelId
    };
    wxrequest.newPostwithdraw(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (res.statusCode == 200 && resdata.code == 0) {
        wx.showToast({
          title: '提现成功',
          icon: 'success',
          duration: 3000
        });
        setTimeout(function (){
          wx.navigateBack({
            delta: 1
          });
        },3000)
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        });
        that.setData({
          money: '',
          subtype: false
        });
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  }
})