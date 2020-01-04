// pages/delivereddetail/delivereddetail.js

const app = getApp()
let apiUrl = app.getApiUrl();
let hotelid = app.globalData.hotelId
let token = app.globalData.token
let organizationid = app.globalData.organizationid
function alerttishi(title = "提示", content = "消息提示", confirm, confirm2) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "是",
    cancelText:"否",
    confirmColor: "#ff9700",
    cancelColor:"#ff9700",
    showCancel: true,
    success: function (res) {
      if (res.confirm) {
        confirm();
      } else if (res.cancel){
        confirm2()
      }
    }
  });
}
function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    confirmColor: "#ff9700",
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: wx.getStorageSync('buttondata'),
     delivereddata:'',
     id:'',
     delivType:'',  //配送类型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      delivtype: options.delivtype
    })
    this.getdetail();
  },

  testingniu:function(){
    let that=this;
    alerttishi("是否完成配送","请确认用户已收到所有商品",function(res){
      that.completedelive();
    },function(res){
      
    })
  },
  
  //获取详情
  getdetail:function(){
    let that=this;
    wx.request({
      url: apiUrl + '/order/delivery/'+that.data.id,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
  
        if (res.data.code == 0) {
          that.setData({
            delivereddata: res.data.data
          })
          console.log(res.data.data)
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }

      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },

  //完成配送
  completedelive: function () {
    let that = this;
    wx.request({
      url: apiUrl + '/order/delivery/consignment',
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      data:{
        deliveryId: that.data.id,
      },
      method: "PUT",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          alertViewWithCancel("提示", '操作成功', function () {
            wx.redirectTo({
              url: '../deliveredlist/deliveredlist',
            })
          });
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }

      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      authzData: wx.getStorageSync('buttondata'),
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})