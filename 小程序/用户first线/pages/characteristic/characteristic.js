const app = getApp()
Page({
  data: {
    themecolor: '',//主题颜色
    _num: '',
    typelist: [],
    characteristiclist: [],
    isNewUser: ''//新老用户
  },
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'hotelId',
      success(res) {
        that.getTypeName(res.data);
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
  },
  roomservice: function(){
    wx.redirectTo({
      url: '../roomservice/roomservice'
    })
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
  hotelmall: function () {
    wx.getStorage({
      key: 'CabCode',
      success(res) {
        wx.redirectTo({
          url: '../hotelmall/hotelmall?cabCode=' + res.data
        })
      }
    })
  },
  typechange: function (e){//分类切换
    let that = this;
    let typeid = e.currentTarget.dataset.id;//获取自定义属性
    that.setData({
      _num: typeid
    });
    that.getTypeList(typeid);
  },
  details:function(e){
    let that = this;
    let detialid = e.currentTarget.dataset.detialid;//获取自定义属性
    wx.navigateTo({
      url: '../characteristicdetails/characteristicdetails?typeid=' + that.data._num + '&detialid=' + detialid
    })
  },
  getTypeName: function(typeid){//获取分类名称
    let that= this;
    wx.request({
      // url: 'http://192.168.1.46:9001/longan/api/hotel/feature/hotel',
      url: app.data.requestUrl + 'hotel/feature/hotel',
      header: {
        'content-type': 'application/json', // 默认值         
        'Authorization': wx.getStorageSync("token")
      },
      method: "get",
      data: {
        hotelId: typeid
      },
      success(res) {
        if (res.data.code == 0) {
          that.setData({
            typelist: res.data.data.records,
            _num: res.data.data.records[0].id
          });
          that.getTypeList(res.data.data.records[0].id);
        }
      }
    });
  },
  getTypeList: function (listid) {//获取分类列表
    let that = this;
    wx.getStorage({
      key: 'hotelId',
      success(res) {
        wx.request({
          // url: 'http://192.168.1.46:9001/longan/api/hotel/feature/detail/condition',
          url: app.data.requestUrl + 'hotel/feature/detail/condition',
          header: {
            'content-type': 'application/json', // 默认值         
            'Authorization': wx.getStorageSync("token")
          },
          method: "get",
          data: {
            featureHotelId: listid
          },
          success(res2) {
            if (res2.data.code == 0) {
              that.setData({
                characteristiclist: res2.data.data.records
              });
            }
          }
        });
      }
    });
  }
})