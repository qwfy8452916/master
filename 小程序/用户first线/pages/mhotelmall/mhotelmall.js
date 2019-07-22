const app = getApp()
Page({
  data: {
    datanull: true,
    customerId: '',
    hotelId: '',
    isvirtual: '',//fales:虚拟柜
    themecolor: '',//主题颜色
    typeindex: '1',
    waitpaydata: '',//待支付数据
    listdata: ''//列表数据
  },
  onLoad: function (options) {
    const that = this;
    const index = options.typeindex;
    that.setData({
      typeindex: index,
      customerId: options.userid,
      hotelId: options.hotelId
    });
    
    wx.getStorage({
      key: 'themecolor',
      success(res) {
        that.setData({
          themecolor: res.data
        })
      }
    });
    wx.getStorage({
      key: 'isvirtual',
      success(res) {
        that.setData({
          isvirtual: res.data
        })
      }
    });
  },
  onShow: function(){
    const that =this;
    setTimeout(function(){
      if (that.data.typeindex == 'all') {//全部
        const index = '';
        that.getlistdata(that.data.customerId, index);
      } else if (that.data.typeindex == 0) {//待商家确认
        that.getlistdata(that.data.customerId, 0);
      } else if (that.data.typeindex == 1) {//已确认
        that.getlistdata(that.data.customerId, 1);
      } else if (that.data.typeindex == 2) {//已发货
        that.getlistdata(that.data.customerId, 2);
      } else if (that.data.typeindex == 3) {//待支付
        that.waitpayfun(that.data.customerId, that.data.hotelId);
      }
    },300);
    
  },
  smgw: function () {//扫码购物
    wx.redirectTo({
      url: '../orderlist/orderlist'
    })
  },
  kffw: function () {//客房服务
    wx.redirectTo({
      url: '../kffulist/kffulist?hotelId=' + this.data.hotelId + '&userid=' + this.data.customerId
    })
  },
  changetype: function(e){//类别切换
    const that = this;
    const index = e.currentTarget.dataset.index;
    that.setData({
      typeindex: index
    });
    if (that.data.typeindex == 'all') {//全部
      const index = '';
      that.getlistdata(that.data.customerId, index);
    } else if (that.data.typeindex == 0) {//待商家确认
      that.getlistdata(that.data.customerId,0);
    } else if (that.data.typeindex == 1) {//已确认
      that.getlistdata(that.data.customerId,1);
    } else if (that.data.typeindex == 2) {//已发货
      that.getlistdata(that.data.customerId,2);
    } else if (that.data.typeindex == 3) {//待支付
      that.waitpayfun(that.data.customerId, that.data.hotelId);
    }
  },
  getlistdata: function (customerId, index) {//获取列表数据
    wx.showToast({
      title: '请稍等',
      icon: 'loading',
      mask: true,
      duration: 6000
    });
    const that = this;
    wx.request({
      url: app.data.requestUrl + 'deliv/order/prod',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "get",
      data: {
        delivStatus: index,
        customerId: customerId
      },
      success(res) {
        let resdata = res.data;
        let resdatas = res.data.data.records;
        let type;
        if (resdata.code == '0') {
          if (resdatas.length > 0) {
            type = false;
          } else {
            type = true;
          }
          that.setData({
            listdata: resdatas,
            datanull: type
          });
          wx.hideToast();//隐藏加载动画
        };
      }
    });
  },
  waitpayfun: function (userid, hotelId) {//待支付列表
    wx.showToast({
      title: '请稍等',
      icon: 'loading',
      mask: true,
      duration: 60000
    });
    const that = this;
    wx.request({
      url: app.data.requestUrl + 'order/hShop/paying',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "get",
      data:{
        customerId: userid,
        hotelId: hotelId
      },
      success(res) {
        let resdata = res.data;
        let resdatas = res.data.data;
        let type;
        if (resdata.code == '0') {
          if (resdatas.length > 0 ){
            type = false;
          }else{
            type = true;
          }
          that.setData({
            waitpaydata: resdatas,
            datanull: type
          });
          wx.hideToast();//隐藏加载动画
        };
      }
    });
  },
  gopay: function(e){//去支付
    wx.showToast({
      title: '支付中,请稍等',
      icon: 'loading',
      mask: true,
      duration: 60000
    });
    const that = this;
    const orderid = e.currentTarget.dataset.orderid;
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
        if (res.statusCode != 200){
          wx.showToast({
            title: '订单异常，请重新提交',
            icon: 'none',
            duration: 2000
          });
          return;
        }else{
          if (resdata.code == 0){
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
  details: function (e) {//查看待支付详情
    wx.navigateTo({
      url: '../mhotelmalldetail/mhotelmalldetail?orderid=' + e.currentTarget.dataset.orderid + '&payendtime=' + e.currentTarget.dataset.payendtime
    })
  }
})