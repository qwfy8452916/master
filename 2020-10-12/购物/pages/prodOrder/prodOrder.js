const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    datanull: true,
    isvirtual: '',//fales:虚拟柜
    themecolor: '',//主题颜色
    typeindex: 'all',
    waitpaydata: [],//待支付数据
    listdata:[],   //订单
    miniOrderdata:2,  //迷你吧数据
    nowpage: 1,        //默认当前页 
    sizejudge: 0, 
    delistatus: '',
    customerId: '',
    hotelId: '',
    minibar: '',//迷你吧支持功能（0：不支持，1：展示，2：展示+下单）
    roomDelivery: '',//酒店配送支持功能（1：展示，2：展示+下单）
    isSupportRoomAlloc: '',//是否支持客房协议价 0 不支持，1 支持
    roomService: ''//客房服务支持功能（0：不支持，1：展示，2：展示+下单）
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      customerId: app.globalData.userId,
      hotelId: app.globalData.hotelId,
      typeindex: options.typeindex
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
    wx.getStorage({
      key: 'minibar',
      success(res) {
        that.setData({
          minibar: res.data
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
      key: 'isSupportRmsvc',
      success(res) {
        that.setData({
          roomService: res.data
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
  },
  onShow: function () {
    wx.hideHomeButton();
    const that = this;
    if (that.data.typeindex == 'all') {//全部
      const index = '';
      that.getlistdata(that.data.nowpage, 0);
    } else if (that.data.typeindex == 0) {//待商家确认
      that.getlistdata(that.data.nowpage, 0);
    } else if (that.data.typeindex == 1) {//已确认
      that.getlistdata(that.data.nowpage, 0);
    } else if (that.data.typeindex == 2) {//已发货
      that.getlistdata(that.data.nowpage, 0);
    } else if (that.data.typeindex == 3) {//待支付
      that.waitpayfun(that.data.nowpage, 0);
    }
  },
  reservation: function () {//客房预定列表
    wx.redirectTo({
      url: '../reservationlist/reservationlist'
    })
  },
  kffw: function () {//客房服务
    wx.redirectTo({
      url: '../kffulist/kffulist'
    })
  },
  changetype: function (e) {//类别切换
    const that = this;
    let num = e.currentTarget.dataset.num;
    let allnum;
    that.setData({
      listdata: [],
      waitpaydata:[],
      nowpage:1,
    })
    if (num=='all'){
       that.setData({
         delistatus:'',
       })
    }else{
      that.setData({
        delistatus: num,
      })
    }
    if (num == 'all') {//全部
      allnum=''
      num = 'all';
      that.getlistdata(that.data.nowpage, 0);
    } else if (num == 0) {//待商家确认
      that.getlistdata(that.data.nowpage, 0);
    } else if (num == 1) {//已确认
      that.getlistdata(that.data.nowpage, 0);
    } else if (num == 2) {//已发货
      that.getlistdata(that.data.nowpage, 0);
    } else if (num == 3) {//待支付
      that.waitpayfun(that.data.nowpage, 0);
    }
    that.setData({
      typeindex: num
    });
  },
  getlistdata: function (delipage, datatype) {//获取列表数据
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    let tempDataSet = [];
    let linkData = {
      pageSize:20,
      pageNo: delipage,
      status: that.data.delistatus,
      customerId: that.data.customerId,
      hotelId: that.data.hotelId
    };
    wxrequest.getorderlist2(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data.records;
      let type;
      if (resdata.code == 0) {
        if (delipage == '1'){
          if (resdatas.length > 0) {
            type = false;
          } else {
            type = true;
          }
        }
        if (resdatas.length < 20 && resdatas.length >= 0) {
          that.setData({
            sizejudge: 0
          })
        } else {
          that.setData({
            sizejudge: 1
          })
        }
        if (datatype == 0) {
          tempDataSet = resdatas;
        } else {
          tempDataSet = that.data.listdata.concat(resdatas);
        }
        that.setData({
          listdata: tempDataSet,
          datanull: type
        })
        wx.hideLoading()//隐藏加载动画
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
  },
  waitpayfun: function (delipage, datatype) {//待支付列表
    wx.showToast({
      title: '请稍等',
      icon: 'loading',
      mask: true,
      duration: 60000
    });
    const that = this;
    let tempDataSet = [];
    let linkData = {
      pageSize: 20,
      pageNo: delipage,
      customerId: that.data.customerId,
      hotelId: that.data.hotelId
    };
    wxrequest.gettobepaylist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data.records;
      let type;
      if (resdata.code == 0) {
        if (delipage == '1') {
          if (resdatas.length > 0) {
            type = false;
          } else {
            type = true;
          }
        }
        if (resdatas.length < 20 && resdatas.length > 0) {
          that.setData({
            sizejudge: 0
          })
        } else {
          that.setData({
            sizejudge: 1
          })
        }
        if (datatype == 0){
          tempDataSet = resdatas;
        } else {
          tempDataSet = that.data.waitpaydata.concat(resdatas);
        }
        that.setData({
          waitpaydata: tempDataSet,
          datanull: type
        })
        wx.hideToast();//隐藏加载动画
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
  },
  openagain: function (e) {//再次开门
    const that = this;
    let order_detailid = e.currentTarget.dataset.orderdetailid;
    wxrequest.getaginopen(order_detailid).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '柜门已开启，请取走您的商品',
          icon: 'none',
          duration: 3000
        });
        that.setData({
          opentype: false
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
  },
  after: function (e) {//申请售后
    wx.navigateTo({
      url: '../aftersale/aftersale?deliid=' + e.currentTarget.dataset.deliid + '&roomcode=' + e.currentTarget.dataset.roomcode + '&delivcode=' + e.currentTarget.dataset.delivcode + '&devidetailid=' + e.currentTarget.dataset.devidetailid + '&prodcode=' + e.currentTarget.dataset.prodcode
    })
  },
  postpj: function (e) {//发表评价
    wx.navigateTo({
      url: '../postevaluation/postevaluation?id=' + e.currentTarget.dataset.id
    })
  },
  checkDetails: function (e) {//查看详情
    wx.navigateTo({
      url: '../myorderDetails/myorderDetails?orderid=' + e.currentTarget.dataset.orderid + '&type=-1'
    });
  },
  waitpaydetails: function (e) {//查看待支付详情 
    wx.navigateTo({
      url: '../myorderDetail/myorderDetail?orderid=' + e.currentTarget.dataset.orderid + '&payendtime=' + e.currentTarget.dataset.payendtime + '&pagetype=2'
    })
  },
  onReachBottom: function () {//上拉加载
    const that = this;
    let page = that.data.nowpage;
    if (that.data.sizejudge) {
      that.setData({
        nowpage: ++page
      })
      if (that.data.delistatus == '3') {  //待支付
        that.waitpayfun(that.data.nowpage, 1);
      }else{
        that.getlistdata(that.data.nowpage, 1);
      }
    }
    wx.stopPullDownRefresh();
  },
  mycardcoupon: function (e) {//卡券
    wx.navigateTo({
      url: '../mycardcoupon/mycardcoupon?orderid=' + e.currentTarget.dataset.orderid
    })
  },
  selffun: function (e) {
    wx.navigateTo({
      url: '../selfmention/selfmention?orderid=' + e.currentTarget.dataset.orderid
    });
  },
  refreshfun: function (e) {
    const that = this;
    wxrequest.getLogisticstype(e.currentTarget.dataset.delivcode).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.onShow();
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
  },
  tspayfun: function (e) {
    wx.navigateTo({
      url: '../foodpay/foodpay?funcid=' + e.currentTarget.dataset.funcid
    });
  },
  mycoupon: function (e) {
    wx.navigateTo({
      url: '../mycoupon/mycoupon?orderid=' + e.currentTarget.dataset.orderid
    })
  }
})