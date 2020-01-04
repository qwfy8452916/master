const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    convenienceStore: '',
    isIpx: app.globalData.isIpx,
    isSupportEn: 0,//中英文开关：0关，1开
    rmsvcImageDTOs: [],
    hotelId: '',
    isSupportRmsvc: '',//客房服务 0 不支持，1 支持
    isSupportRoomAlloc: '',//客房协议价 0 不支持，1 支持
    isSupportDelivery: '',//是否支持商城 0 不支持，1 支持
    themecolor: '',//主题颜色
    _num: '',
    typelist: [],
    characteristiclist: [],
    minibar: '',//迷你吧支持功能（0：不支持，1：展示，2：展示+下单）
    roomDelivery: '',//酒店配送支持功能（1：展示，2：展示+下单）
    roomService: '',//客房服务支持功能（0：不支持，1：展示，2：展示+下单）
    hotelFuncDTOS1: '',//功能区
    hotelFuncDTOS2: '',//功能区
    shareuser: '' //分享人信息
  },
  onLoad: function (options) {
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    that.setData({
      hotelId: app.globalData.hotelId,
      shareuser: app.globalData.shareUser
    });
    setTimeout(function () {
      wx.getStorage({//功能区列表
        key: 'hotelFuncDTOS1',
        success(res) {
          that.setData({
            hotelFuncDTOS1: res.data
          });
        }
      });
      wx.getStorage({//功能区列表
        key: 'hotelFuncDTOS2',
        success(res) {
          that.setData({
            hotelFuncDTOS2: res.data
          });
        }
      });
    }, 500);
    wx.getStorage({
      key: 'isSupportEn',
      success(res) {
        that.setData({
          isSupportEn: res.data
        })
      }
    });
    wx.getStorage({
      key: 'minibar',
      success(res) {
        that.setData({
          minibar: res.data
        })
      }
    });
    wx.getStorage({
      key: 'convenienceStore',
      success(res) {
        that.setData({
          convenienceStore: res.data
        })
      }
    });
    wx.getStorage({
      key: 'roomDelivery',
      success(res) {
        that.setData({
          roomDelivery: res.data
        })
      }
    });
    wx.getStorage({
      key: 'roomService',
      success(res) {
        that.setData({
          roomService: res.data
        })
      }
    });
    wx.getStorage({
      key: 'isSupportRmsvc',
      success(res) {
        that.setData({
          isSupportRmsvc: res.data
        })
      }
    });
    wx.getStorage({
      key: 'isSupportRoomAlloc',
      success(res) {
        that.setData({
          isSupportRoomAlloc: res.data
        })
      }
    });
    wx.getStorage({
      key: 'rmsvcImageDTOs',
      success(res) {
        that.setData({
          rmsvcImageDTOs: res.data
        })
      }
    });
    wx.getStorage({
      key: 'isSupportDelivery',
      success(res) {
        that.setData({
          isSupportDelivery: res.data
        })
      }
    });
    that.get_typename();//获取所有分类
    wx.getStorage({
      key: 'themecolor',
      success(res) {
        that.setData({
          themecolor: res.data
        })
      }
    });
  },
  onShow: function () {
    wx.hideHomeButton();
  },
  typechange: function (e) {//分类切换
    const that = this;
    let typeid = e.currentTarget.dataset.id;//获取自定义属性
    that.setData({
      _num: typeid
    });
    that.getTypeList(typeid);
  },
  get_typename: function (hotel_Id) {//获取分类名称
    const that = this;
    let linkData = {
      hotelId: app.globalData.hotelId
    };
    wxrequest.gettypename(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          typelist: res.data.data.records
        });
        if (res.data.data.records.length != 0){
          that.setData({
            _num: res.data.data.records[0].id
          });
          that.getTypeList(res.data.data.records[0].id);////获取分类列表
        }
        wx.hideLoading();
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
  getTypeList: function (listid) {//获取分类列表
    const that = this;
    let linkData = {
      featureHotelId: listid
    };
    wxrequest.gettypeList(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          characteristiclist: resdatas.records
        });
        wx.hideLoading();
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
  details: function (e) {//查看详情
    wx.navigateTo({
      url: '../characteristicdetails/characteristicdetails?id=' + e.currentTarget.dataset.id
    })
  },
  index: function () {//首页
    wx.redirectTo({
      url: '../index/index'
    })
  },
  roomservice: function () {//客房服务
    wx.redirectTo({
      url: '../roomservice/roomservice'
    })
  },
  mypage: function () {//我的
    wx.redirectTo({
      url: '../my/my'
    })
  },
  hotelmall: function (e) {//功能区跳转
    wx.redirectTo({
      url: '../specialty/specialty?id=' + e.currentTarget.dataset.id
    })
  },
  reservation: function () {//客房协议价
    wx.redirectTo({
      url: '../reservation/reservation'
    })
  },
})