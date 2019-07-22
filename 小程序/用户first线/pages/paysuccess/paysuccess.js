const app = getApp()
Page({
  data: {
    latticeCode: '',
    latticeId: '',
    commoditylist: [],
    // usercode: '',
    hotelId: '',
    userid: '',
    cabId: '1',//柜子id
    orderCode: '',//订单号
    orderId: '',//订单id
    prodid: '',//商品id
    isInvoice: '',//是否开票 0：不开票 1：开票 
    roomCode: '',//房间号
    cabCode: '',
  },
  onLoad: function (options) {
    let that = this;
    // wx.getStorage({ 
    //   key: 'code',
    //   success(res) {
    //     that.setData({
    //       usercode: res.data
    //     })
    //   }
    // });
    wx.getStorage({
      key: 'userid',
      success(res) {
        that.setData({
          userid: res.data
        })
      }
    });
    wx.getStorage({
      key: 'isInvoice',
      success(res) {
        that.setData({
          isInvoice: res.data
        })
      }
    });
    that.setData({
      latticeCode : options.latticeCode,
      latticeId: options.latticeId, 
      hotelId: options.hotelId,
      cabId: options.cabId,
      orderCode: options.orderCode,
      orderId: options.orderId,
      prodid: options.prodid,
      roomCode: options.roomCode
    }); 
    wx.getStorage({
      key: 'CabCode',
      success(res) {
        that.setData({
          cabCode: res.data
        })
        wx.request({
          url: app.data.requestUrl + 'buy/cab/order/prod?CabCode=' + res.data,
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
                commoditylist: resdatas
              });
            };
          }
        });
      }
    });
    
  },
  backbtn:function(){
    wx.redirectTo({
      url: '../index/index?cabCode=' + this.data.cabCode
    })
  },
  openfail:function(){
    let that = this;
    wx.navigateTo({
      url: '../aftersale/aftersale?cabId=' + that.data.cabId + '&orderCode=' + that.data.orderCode + '&orderId=' + that.data.orderId + '&prodid=' + that.data.prodid + '&back=1' + '&roomCode=' + that.data.roomCode + '&latticeCode=' + that.data.latticeCode + '&latticeId=' + that.data.latticeId + '&hotelId=' + that.data.hotelId 
    })
  },
  invoicebtn: function(){
    wx.navigateTo({
      url: '../invoicebtn/invoicebtn?orderCode=' + this.data.orderCode + '&orderId=' + this.data.orderId + '&customerId=' + this.data.userid + '&hotelId=' + this.data.hotelId 
    })
  }
})