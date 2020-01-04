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
    orderinfo: '',//订单详情
    loadingfun: '',//倒计时
    orderid: '',//订单id
    pagetype: '',
    timer: '',
    customerId: ''
  },
  onLoad: function (options) {
    const that=this;
    this.setData({
      loadingfun: options.payendtime,
      orderid: options.orderid,
      pagetype: options.pagetype,
      customerId: app.globalData.userId
    });
    this.getorderDetail();
  },
  getorderDetail:function(){
    const that=this;
    wxrequest.gettobepaiddetail(that.data.orderid).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let loadingfun = that.data.loadingfun;//倒计时
        that.setData({
          loadingfun: setInterval(function () {
            that.countdownfun(loadingfun)
          }, 1000)
        })
        that.setData({
          orderinfo: resdatas
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      console.log(err)
    });
  },
  gopay: function () {//去支付
    wx.showLoading({
      title: '支付中,请稍等',
    })
    const that = this;
    const orderid = that.data.orderid;
    let linkData = {
      id: orderid,
      appletType: app.globalData.appletType
    };
    wxrequest.postprodpay(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (res.statusCode != 200) {
        wx.showToast({
          title: '订单异常，请重新提交',
          icon: 'none',
          duration: 2000
        });
        return;
      } else {
        if (resdata.code == 0) {
          wx.requestPayment({
            appId: resdatas.appId,
            timeStamp: resdatas.timeStamp,
            nonceStr: resdatas.nonceStr,
            package: resdatas.package,
            signType: 'MD5',
            paySign: resdatas.paySign,
            success: function (res) {
              wx.hideToast();//隐藏加载动画
              if (res.errMsg === "requestPayment:ok") {
                that.confirmfun(that.data.orderinfo.orderId, that.data.orderinfo.orderCode);
              }
            },
            fail: function (res) {
              wx.hideToast();//隐藏加载动画
              wx.showToast({
                title: '支付失败请重新支付',
                icon: 'none',
                duration: 4000
              });
              return;
            }
          })
        } else {
          wx.hideToast();//隐藏加载动画
          wx.showToast({
            title: resdata.msg,
            icon: 'none',
            duration: 4000
          });
          return;
        }
      }
    })
    .catch(err => {
      console.log(err)
    });
  },
  cancel: function () {//取消订单
    const that = this;
    wx.showModal({
      title: '提示',
      content: '您确定取消此订单吗？',
      success(res) {
        if (res.confirm) {
          let linkData = {
            customerId: that.data.customerId
          };
          wxrequest.putcancelorder2(that.data.orderid, linkData).then(res => {
            let resdata = res.data;
            let resdatas = res.data.data;
            if (resdata.code == 0) {
              wx.navigateBack({
                delta: 1
              })
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
      }
    })
  },
  countdownfun: function (datatime) {//倒计时
    wx.hideToast();//隐藏加载动画
    const that = this;
    let loadingfun = that.data.loadingfun;
    let pastDate = datatime;
    let nowPastTime = new Date(pastDate.replace(/-/g, '/')).getTime();
    let now = new Date().getTime();
    let secs = (nowPastTime - now) / 1000;
    let mesc = that.dateformate(secs);
    if (mesc == "00:00:00" || mesc == '') {
      mesc == "00:00:00"
      clearInterval(loadingfun);
      wx.navigateBack({
        delta: 1
      })
    }
    that.setData({
      timer: mesc
    })
  },
  dateformate(micro_second) {
    var second = micro_second; //总的秒数
    // 天数位   
    var day = Math.floor(second / 3600 / 24);
    var dayStr = day.toString();
    if (dayStr.length == 1) dayStr = '0' + dayStr;
    // 小时位   
    //var hr = Math.floor(second / 3600 % 24);
    var hr = Math.floor(second / 3600); //直接转为小时 没有天 超过1天为24小时以上
    var hrStr = hr.toString();
    if (hrStr.length == 1) hrStr = '0' + hrStr;
    // 分钟位  
    var min = Math.floor(second / 60 % 60);
    var minStr = min.toString();
    if (minStr.length == 1) minStr = '0' + minStr;
    // 秒位  
    var sec = Math.floor(second % 60);
    var secStr = sec.toString();
    if (secStr.length == 1) secStr = '0' + secStr;

    if (hrStr < 0 || minStr < 0 || secStr < 0) {
      let air = '';
      return air;
    } else {
      return hrStr + ":" + minStr + ":" + secStr;
    }
  },
  confirmfun: function (orderid, ordercode, customerId) {//确认支付状态
    const that = this;
    let linkData = {
      orderCode: ordercode
    };
    wxrequest.getpaytype(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if (resdatas.result == 'SUCCESS') {
          wx.redirectTo({
            url: '../hotelmallsuccess/hotelmallsuccess?orderid=' + orderid + '&ishasmnb=1' + '&redcode=' + resdatas.redCode
          })
        } else {
          wx.hideToast();//隐藏加载动画
          wx.showToast({
            title: resdata.msg,
            icon: 'none',
            duration: 2000
          });
          return;
        }
      } else {
        wx.hideToast();//隐藏加载动画
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        });
        return;
      }
    })
    .catch(err => {
      console.log(err)
    });
  }
})