const app = getApp()
Page({
  data: {
    showView: false,
    orderlist: [],
    customerName: '',
    mobile: '',
    roomCode: '',
    arrivedAt: '',
    createdAt: '',
    remark: '',
    serviceid: '',
    userremark: '',
    status: '',
    type: '',
    userid: '',
    hotelId: ''
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      serviceid: options.serviceid,
      type: options.type
    });
    wx.getStorage({
      key: 'userid',
      success(res) {
        that.setData({
          userid: res.data
        });
      }
    });
    wx.getStorage({
      key: 'hotelId',
      success(res) {
        that.setData({
          hotelId: res.data
        });
      }
    });
    wx.request({
      url: app.data.requestUrl + 'rmsvc/records/' + options.serviceid,
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
            orderlist: resdatas.dtos,
            customerName: resdatas.customerName,
            mobile: resdatas.mobile,
            roomCode: resdatas.roomCode,
            arrivedAt: resdatas.arrivedAt,
            createdAt: resdatas.createdAt,
            remark: resdatas.remark,
            status: resdatas.status
          })
        };
      }
    });
  },
  cancelorderdetails(){
    let that = this;
    let remark=that.data.userremark;
    if (remark == ''){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入您取消订单的原因'
      });
      return;
    }
    wx.request({
      url: app.data.requestUrl + 'rmsvc/records/' + that.data.serviceid, 
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "PUT",
      data:{
        cancelReason: remark
      },
      success(res) {
        let resdata = res.data;
        let resdatas = res.data.data;
        if (resdata.code == '0') {
          that.setData({
            showView: !that.data.showView
          });
          if(that.data.type == 1){
            wx.redirectTo({
              url: '../kffulist/kffulist?hotelId=' + that.data.hotelId + '&userid=' + that.data.userid
            })
          }else{
            wx.redirectTo({
              url: '../roomservice/roomservice'
            })
          }
        };
      }
    });
  },
  boxshow(){
    this.setData({
      showView: !this.data.showView
    })
  },
  userremark:function(e){
    this.setData({
      userremark: e.detail.value
    })
  }
})