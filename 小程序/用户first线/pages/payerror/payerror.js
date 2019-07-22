const app = getApp()
Page({
  data: {
    usercode: '',
    userid: '',
    hotelId: '',//酒店id
    prodRetailPrice: '',//商品价格
    prodShowName: '',//商品名称
    prodId: '',//商品id
    latticeId: '',
    countDownM: '',//倒计时-分
    countDownS: '',//倒计时-秒
    loading: '',//倒计时
    timer: '',
    buytype: true,//是否可支付
    orderId: "",//订单id
    cabId: '',
    orderCode: '',
    latticeCode: '',
    cabCode: '' 
  },
  onLoad: function (options) {
    let that = this;
    // console.log(options);
    that.setData({
      hotelId: options.hotelId,
      prodid: options.prodid,
      latticeId: options.latticeId,
      orderId: options.orderId,
      latticeCode: options.latticeCode,
      orderCode: options.orderCode,
      cabId: options.cabId
    });

    wx.getStorage({
      key: 'CabCode',
      success(res) {
        that.setData({
          cabCode: res.data
        })
      }
    });
    wx.getStorage({
      key: 'code',
      success(res) {
        that.setData({
          usercode: res.data
        })
      }
    });
    wx.getStorage({
      key: 'userid',
      success(res) {
        that.setData({
          userid: res.data
        })
      }
    });
    wx.request({
      url: app.data.requestUrl + 'buy/cab/order/prodDetails',
      data: {
        hotelId: options.hotelId,
        productId: options.prodid,
        latticeId: options.latticeId,
      },
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "get",
      success(res) {
        let resdata = res.data;
        let resdatas = res.data.data;
        if (resdata.code == '0') {
          that.setData({
            prodRetailPrice: resdatas.prodRetailPrice,
            prodShowName: resdatas.prodShowName
          });
        };
      }
    });
    let loading = that.data.loading;
    that.setData({
      loading: setInterval(function(){
        that.countdownfun(options.countDown)
      },1000)
    })
  },
  onUnload: function () {
    let that = this;
    let loading = that.data.loading;
    clearInterval(loading)
  },
  countdownfun: function(datatime){
    let that = this;
    let loadingfun = that.data.loadingfun;
    let pastDate = datatime;
    let nowPastTime = new Date(pastDate.replace(/-/g, '/')).getTime();
    let now = new Date().getTime();
    let secs = (nowPastTime - now) / 1000;
    let mesc = that.dateformate(secs);
    if (mesc == "00:00:00") {
      clearInterval(loading);
      that.setData({
        countDownM: 0,
        countDownS: 0,
        buytype: false
      })
    } else {
      that.setData({
        timer: mesc
      })
    }
  },
  index: function(){//返回首页
    wx.redirectTo({
      url: '../index/index?cabCode=' + this.data.cabCode
    })
  },
  buyfun: function(){//去支付
    wx.showToast({
      title: '请稍等',
      icon: 'loading',
      mask: true,
      duration: 60000
    })
    let that = this;
    
    // console.log("orderId=" + that.data.orderId);
    wx.request({
      url: app.data.requestUrl + 'buy/cab/order/buy',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "post",
      data: {
        customerId: that.data.userid,
        orderId: that.data.orderId
        // hotelId: that.data.hotelId,
        // latticeId: that.data.latticeId,
        // money: that.data.prodRetailPrice,
        // productId: that.data.prodid,
      },
      success(resbuy) {
        if (resbuy.data.code == 0) {
          wx.hideToast();//隐藏加载动画
          wx.requestPayment({
            'appId': resbuy.data.data.appId,
            'timeStamp': resbuy.data.data.timeStamp,
            'nonceStr': resbuy.data.data.nonceStr,
            'package': resbuy.data.data.package,
            'signType': 'MD5',
            'paySign': resbuy.data.data.paySign,
            'success': function (res) {
              if (res.errMsg === "requestPayment:ok") {
                wx.redirectTo({
                  url: '../paysuccess/paysuccess?latticeCode=' + that.data.latticeCode + "&hotelId=" + that.data.hotelId + "&latticeId=" + that.data.latticeId + '&cabId=' + that.data.cabId + '&orderCode=' + resbuy.data.data.orderCode + "&orderId=" + resbuy.data.data.orderId + "&prodid=" + that.data.prodid + '&roomCode=' + resbuy.data.data.roomCode
                })
              }
            },
            'fail': function (res) {
              wx.showToast({
                title: "支付失败请重新支付",
                icon: "none",
                duration: 2000
              })
            },
            'complete': function (res) {
              console.log(res)
            }
          })
        }
      }
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
    return hrStr + ":" + minStr + ":" + secStr;
  }
  
})