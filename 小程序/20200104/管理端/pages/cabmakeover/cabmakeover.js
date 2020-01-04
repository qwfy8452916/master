// pages/cabmakeover/cabmakeover.js
const app = getApp()
let apiUrl = app.getApiUrl();
function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      } else if (res) { }
    }
  });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotelId: '',
    hotelName: '',
    frCode: '',
    cId: '',
    makeoverData: {    //地址信息
      price: "",
      reason: ""
    },
    isSubmit: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hotelId: options.hotelid,
      hotelName: options.hotelname,
      frCode: options.frcode,
      cId: options.cid,
    });
  },
  //提交-转让
  makeoverSubmit: function(e){
    let that = this;
    let formData = e.detail.value;
    if (formData.price.replace(/\s+/g, '') == "") {
      wx.showToast({
        title: '请填写转让价格',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let pricePass = this.checkPriceNum(formData.price);
    if (pricePass){
      that.setData({
        isSubmit: true
      });
      if (that.data.isSubmit){
        //提交
        wx.request({
          url: apiUrl + '/ally/transfer',
          data: {
            allyHotelCabId: that.data.cId,
            hotelId: that.data.hotelId,
            price: parseFloat(formData.price).toFixed(2),
            reason: formData.reason
          },
          header: {
            'content-type': 'application/json',
            'Authorization': wx.getStorageSync("Token")
          },
          method: "POST",
          success: function (res) {
            if (res.data.code == 0) {
              wx.navigateBack({
                delta: 1
              })
            } else {
              that.setData({
                isSubmit: false
              });
              wx.hideLoading()
              alertViewWithCancel("提示", res.data.msg, function () {
              });
            }
          },
          fail: function (error) {
            that.setData({
              isSubmit: false
            });
            wx.hideLoading()
            alertViewWithCancel("提示", error, function () {
            });
          }
        })
      }
    }
  },
  //价格验证
  checkPriceNum: function (priceNum) {
    let str = /^\d+(\.\d+)?$/
    if (str.test(priceNum)) {
      return true
    } else {
      wx.showToast({
        title: '价格格式错误',
        icon: 'none',
        duration: 2000
      })
      return false
    }
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