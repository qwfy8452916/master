const app = getApp()
Page({
  data: {
    commoditylist: [],
    usercode: '',
    userid: '',
    serviceid: '',
    cabCode: ''
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      serviceid: options.serviceid,
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
    wx.getStorage({
      key: 'CabCode',
      success(res) {
        that.setData({
          cabCode: res.data
        });
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
  backbtn: function () {
    wx.redirectTo({
      url: '../index/index?cabCode=' + this.data.cabCode
    })
  },
  lookdetails: function(){
    wx.navigateTo({
      url: '../orderdetails/orderdetails?serviceid=' + this.data.serviceid
    })
  },
})