const app = getApp()
Page({
  data: {
    themecolor: '',//主题颜色
    roomservicetype:[],
    shoppingbox: [],
    isNewUser: ''//新老用户
  },
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'isNewUser',
      success(res) {
        that.setData({
          isNewUser: res.data
        })
      },
      fail: function () {
        that.setData({
          isNewUser: true
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
    wx.getStorage({
      key: 'hotelId',
      success(res) {
        wx.request({
          url: app.data.requestUrl + 'rmsvc/hotel/routine?hotelId=' + res.data,
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
                roomservicetype: resdatas
              });
            };
          }
        });
      }
    });
  },
  onShow: function(){
    let that = this;
    let roomservicelist = [];
    // let roomservicelistlength = 0;
    wx.setStorage({
      key: 'roomservicelist',
      data: roomservicelist
    });
    // wx.setStorage({
    //   key: 'roomservicelistlength',
    //   data: roomservicelistlength
    // });
  },
  index: function () {
    wx.getStorage({
      key: 'CabCode',
      success(res) {
        wx.redirectTo({
          url: '../index/index?cabCode=' + res.data
        })
      }
    })
  },
  roomservice: function () {
    wx.redirectTo({
      url: '../roomservice/roomservice'
    })
  },
  mypage: function () {
    wx.redirectTo({
      url: '../my/my'
    })
  },
  hotelmall: function(){
    wx.getStorage({
      key: 'CabCode',
      success(res) {
        wx.redirectTo({
          url: '../hotelmall/hotelmall?cabCode=' + res.data
        })
      }
    })
  },
  details: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;//获取自定义属性
    wx.navigateTo({
      url: '../roomservicetype/roomservicetype?rmsvcHotelId=' + id
    })
  },
  shoppingcart: function(){
    wx.navigateTo({
      url: '../shoppingcart/shoppingcart'
    })
  },
  characteristic: function(){
    wx.redirectTo({
      url: '../characteristic/characteristic'
    })
  }
})