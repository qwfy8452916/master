const app = getApp()
Page({
  data: {
    orderinfo: '',//订单详情
    deliverytype1: '',//客房配送显示状态
    deliverytype2: '',//快递到家显示状态
    orderlist1: [],//客房配送数据
    orderlist2: [],//快递到家数据
    consignee: '',//收件人
    consigneePhone: '',//收件人电话
    addressAll: '',//收件人地址

    customerId: '',
    orderid: '',//订单id

    loadingfun: '',//倒计时
    timer: ''
  },
  onLoad: function (options) {
    wx.showToast({
      title: '请稍等',
      icon: 'loading',
      mask: true,
      duration: 60000
    });
    const that = this;
    const orderid = options.orderid;

    wx.getStorage({
      key: 'userid',
      success: function(res) {
        that.setData({
          customerId: res.data
        })
      },
    })

    that.setData({
      orderid: orderid
    })

    wx.request({
      url: app.data.requestUrl + 'order/hShop/' + orderid,
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "get",
      success(res) {
        const resdata = res.data;
        const resdatas = res.data.data;
        let orderlist1 = [];//客房配送数据
        let orderlist2 = [];//快递到家数据
        if (resdata.code == 0) {
          const orderProdDTOS = resdatas.orderProdDTOS;
          for (let i = 0; i < orderProdDTOS.length; i++) {
            if (orderProdDTOS[i].deliveryWay == 1) {
              orderlist1.push(orderProdDTOS[i])
            } else {
              orderlist2.push(orderProdDTOS[i])
            }
          }
          let deliverytype1;
          let deliverytype2;
          let consignee;//收件人
          let consigneePhone;//收件人电话
          let addressAll;//收件人地址

          if (orderlist1.length > 0) {//客房配送
            deliverytype1 = true;
          } else {
            deliverytype1 = false;
          }

          if (orderlist2.length > 0) {//快递到家
            deliverytype2 = true;
            consignee = orderlist2[0].expressPerson;
            consigneePhone = orderlist2[0].expressPhone;
            addressAll = orderlist2[0].expressAddress;
            
          } else {
            deliverytype2 = false;
            consignee = '';
            consigneePhone = '';
            addressAll = '';
          }

          let loadingfun = that.data.loadingfun;//倒计时
          that.setData({
            loadingfun: setInterval(function () {
              that.countdownfun(options.payendtime)
            }, 1000)
          })

          that.setData({
            orderinfo: resdatas,
            deliverytype1: deliverytype1,
            deliverytype2: deliverytype2,
            orderlist1: orderlist1,
            orderlist2: orderlist2,
            consignee: consignee,//收件人
            consigneePhone: consigneePhone,//收件人电话
            addressAll: addressAll,//收件人地址
          });
          
        };
      }
    });
  },
  cancel: function(){//取消订单

    const that = this;
    wx.showModal({
      title: '提示',
      content: '您确定取消此订单吗？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.data.requestUrl + 'order/hShop/cancel/' + that.data.orderid,
            header: {
              'content-type': 'application/json', // 默认值
              'Authorization': wx.getStorageSync("token")
            },
            method: "PUT",
            data: {
              customerId: that.data.customerId
            },
            success(res) {
              const resdata = res.data;
              if (resdata.code == 0) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }
      }
    })
  },
  gopay: function () {//去支付
    wx.showToast({
      title: '支付中,请稍等',
      icon: 'loading',
      mask: true,
      duration: 60000
    });
    const that = this;
    const orderid = that.data.orderid;
    wx.request({
      url: app.data.requestUrl + 'order/hShop/pay',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "POST",
      data: {
        customerId: that.data.customerId,
        id: orderid
      },
      success(res) {
        const resdata = res.data;
        const resdatas = res.data.data;
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
                  wx.redirectTo({
                    url: '../hotelmallsuccess/hotelmallsuccess?orderid=' + orderid
                  })
                }
              },
              fail: function (res) {
                wx.hideToast();//隐藏加载动画
                wx.showToast({
                  title: '支付失败请重新支付',
                  icon: 'none',
                  duration: 2000
                });
                return;
              }
            })
          }
        }
      }
    })
  },
  countdownfun: function (datatime) {//倒计时
    wx.hideToast();//隐藏加载动画
    let that = this;
    let loadingfun = that.data.loadingfun;
    let pastDate = datatime;
    let nowPastTime = new Date(pastDate.replace(/-/g, '/')).getTime();
    let now = new Date().getTime();
    let secs = (nowPastTime - now) / 1000;
    let mesc = that.dateformate(secs);
    if (mesc == "00:00:00") {
      clearInterval(loadingfun);
      wx.navigateBack({
        delta: 1
      })
    } else {
      that.setData({
        timer: mesc
      })
    }
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
    return hrStr + ":" + minStr + ":" + secStr;
  }
})