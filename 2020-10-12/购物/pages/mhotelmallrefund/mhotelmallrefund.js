const app = getApp();
import wxrequest from '../../request/api'
var utils = require('../../utils/util.js')
Page({
  data: {
    hotelBookingPhone: '',  //客服电话
    refundsubtype: true,    //是否已提交申请
    rebateState: '',        //退款说明
    customerId: '',
    orderid: '',//订单id（实际是配送单id）
    prodinfo: ''            //商品信息
  },
  onLoad: function (options) {
    const that =this;
    that.setData({
      customerId: app.globalData.userId,
      prodinfo: JSON.parse(options.prodinfo),
      orderid: options.orderid
    });
    wx.getStorage({
      key: 'hotelBookingPhone',
      success: function (res) {
        that.setData({
          hotelBookingPhone: res.data
        })
      },
    });
    if (options.prodstate == 0){
      wx.setNavigationBarTitle({
        title: '申请退款'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '退款详情'
      })
    }
  },
  reasonfun: function (e) {//退款说明
    this.setData({
      rebateState: e.detail.value
    })
  },
  refundsub: function(){//提交退款申请
    const that =this;
    that.setData({
      refundsubtype: false
    });
    if (that.data.rebateState == '') {
      that.setData({
        refundsubtype: true
      });
      wx.showToast({
        title: '请填写退款说明',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    let linkData = {
      customerId: that.data.customerId,
      orderDeliveryDetailId: that.data.prodinfo.id,
      orderDeliveryId: that.data.prodinfo.orderDeliveryId,
      orderDetailId: that.data.prodinfo.orderDetailId,
      orderId: that.data.prodinfo.orderId,
      rebateState: that.data.rebateState,
      totalAmount: that.data.prodinfo.actualPay
    };
    wxrequest.postaftersale(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (res.statusCode == 200){
        if (resdata.code == 0) {
          if (res.data.data) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '退款申请成功！',
              success(res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 1
                  });
                }
              }
            })
          }
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '订单状态已变更，请返回查看订单详情',
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                });
              }
            }
          })
        }
      } else {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: res.data.msg,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              });
            }
          }
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  kefun: function () {//联系客服
    const that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.hotelBookingPhone
    })
  }
})