const app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    themecolor: '',//主题颜色
    orderlist:[],
    datetime: '',
    userid: '',
    hotelId: ''
  },
  onLoad: function (options) {
    let that = this;
    let datetime = utils.formatDate(new Date());
    that.setData({
      datetime: datetime
    });
    wx.getStorage({
      key: 'userid',
      success(res) {
        that.setData({
          userid: res.data
        })
        wx.request({
          url: app.data.requestUrl + 'buy/cab/order/customOrder?customerId=' + res.data,
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
                orderlist: resdatas
              })
            };
          }
        });
      }
    });  
    wx.getStorage({
      key: 'hotelId',
      success(res) {
        that.setData({
          hotelId: res.data
        })
      }
    });
    wx.getStorage({
      key: 'themecolor',
      success(res) {
        that.setData({
          themecolor: res.data
        })
      }
    });
  },
  after: function(e){
    wx.navigateTo({
      url: '../aftersale/aftersale?cabId=' + e.currentTarget.dataset.cabid + '&orderCode=' + e.currentTarget.dataset.ordercode + '&orderId=' + e.currentTarget.dataset.orderid + '&prodid=' + e.currentTarget.dataset.prodid + '&back=2' + '&roomCode=' + e.currentTarget.dataset.roomcode
    })
  },
  kffw: function(){
    wx.redirectTo({
      url: '../kffulist/kffulist?hotelId=' + this.data.hotelId + '&userid=' + this.data.userid
    })
  },
  mhotelmall: function(){
    wx.redirectTo({
      url: '../mhotelmall/mhotelmall?typeindex=all&hotelId=' + this.data.hotelId + '&userid=' + this.data.userid
    })
  }
})