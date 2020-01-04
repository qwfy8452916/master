const app = getApp()
import wxrequest from '../../request/api'
Page({
  data: {
    edata: '',
    index: 0,
    envelopelist: ''
  },
  onLoad: function (options) {
    const that = this;
    let edata = JSON.parse(options.edata);
    let listdata = ['请选择红包数量'];
    for (let i = edata.fscabtypedto.redPacketMinCount; i <= edata.fscabtypedto.redPacketMaxCount; i++) {
      listdata.push(i);
    }
    that.setData({
      envelopelist: listdata,
      edata: edata
    });
  },
  bindPickerChange: function (e) {//选择红包数量
    this.setData({
      index: e.detail.value
    });
  },
  getsharecode: function () {//获取红包code
    const that = this;
    const edata = that.data.edata;
    const index = that.data.index;
    const envelopelist = that.data.envelopelist;
    const params = {
      amount: edata.fscabtypedto.redPacketAmout,
      investorCabnetId: edata.investorcabnetid,
      investorId: edata.investorid,
      orderId: edata.orderid,
      status: edata.status,
      totalCount: envelopelist[index]
    }
    wxrequest.postredPacket(params).then(res => {
      wx.hideLoading();
      if (res.data.code == 0) {
        wx.redirectTo({
          url: '../myenvelope/myenvelope?sharecode=' + res.data.data
        });
      } else if (res.data.code == 1) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    }).catch(err => {
      wx.hideLoading();
      console.log(err)
    })
  }  
})