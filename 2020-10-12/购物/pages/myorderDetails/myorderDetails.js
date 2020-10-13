const app = getApp();
import wxrequest from '../../request/api'
function alerttishi(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    cancelColor: "",
    confirmColor: "",
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}
Page({
  data: {
    orderid: '',//订单id
    orderinfo: '',//订单详情
    roomServerdata:[], //客房服务循环数据
    hotelBookingPhone:'',  //联系客服电话
  },
  onLoad: function (options) {
    const that=this;
    wx.getStorage({
      key: 'hotelBookingPhone',
      success: function (res) {
        that.setData({
          hotelBookingPhone: res.data
        })
      },
    });
    that.setData({
      orderid: options.orderid
    });
    that.getorderDetail(options.orderid);
  },
  onShow: function(){
    const that = this;
    if(that.data.orderid != ''){
      that.getorderDetail(that.data.orderid);
    }
  },
  getorderDetail: function (orderid) {//获取详情
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    wxrequest.getorderdetail2(orderid).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      let roomServerdata = that.data.roomServerdata;
      if (resdatas.delivType=='1'){
        roomServerdata = Object.values(resdatas.rmavcRecordsDto.orderDetailMap)[0]
      }
      if (resdata.code == 0) {
        that.setData({
          orderinfo: resdatas,
          roomServerdata: roomServerdata
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
  servicefun: function () {//联系客服
    const that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.hotelBookingPhone
    })
  },
  refundfun: function (e) {//申请退款、售后
    const e_data = e.currentTarget.dataset;
    let prodinfo = this.data.orderinfo.orderDeliveryDetailDTOList[e_data.index];
    let prodstatus = prodinfo.prodStatus
    prodinfo = JSON.stringify(prodinfo);
    if (this.data.orderinfo.status == 0) {
      wx.navigateTo({
        url: '../mhotelmallrefund/mhotelmallrefund?prodinfo=' + prodinfo + '&lgcstatus=' + this.data.orderinfo.lgcStatus
      })
    } else {
      wx.navigateTo({
        url: '../mhotelmallafter/mhotelmallafter?prodinfo=' + prodinfo + '&delivstatus=' + this.data.orderinfo.status + '&delivcode=' + this.data.orderinfo.delivCode + '&funcid=' + this.data.orderinfo.funcId + '&prodstatus=' + prodstatus + '&lgcstatus=' + this.data.orderinfo.lgcStatus
      })
    }
  },
  refreshfun: function (e) {
    const that = this;
    let orderinfo = that.data.orderinfo;
    wxrequest.getLogisticstype(e.currentTarget.dataset.delivcode).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.getorderDetail(that.data.orderid);
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
  }
})