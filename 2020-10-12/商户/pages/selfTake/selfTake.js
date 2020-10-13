// pages/selfTake/selfTake.js
const app = getApp();
let apiUrl = app.globalData.requestUrl;
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
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    backwalljudge:true,
    sweepcardcode:'', //扫码信息
    cardDetail:{},  //详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
     this.setData({
       sweepcardcode: options.sweepcardcode
     })

    this.getCardDetail();
  },


  //获取卡券详情
  getCardDetail: function () {
    let that = this;
    wx.showLoading()
    wx.request({
      url: apiUrl + 'order/delivery/pick/up',
      method: "GET",
      data: {
        pointVerifiedCode: that.data.sweepcardcode
        // pointVerifiedCode: 'POINT:91:1:iVEb'
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.statusCode)
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }

        if (res.data.code == 0) {
          that.setData({
            cardDetail: res.data.data
          })
          console.log(that.data.cardDetail)
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
             wx.redirectTo({
               url: '../faceServer/faceServer',
             })
          });
        }
      },
      fail: function (error) {
        console.log(res.statusCode)
        wx.hideLoading()
        alertViewWithCancel("提示", error, function () {
          wx.redirectTo({
            url: '../faceServer/faceServer',
          })
        });
      }
    })

  },

  hexiaobtn:function(){
    this.setData({
      backwalljudge:false
    })
  },


  cancelBtn:function(){
    this.setData({
      backwalljudge: true
    })
  },

  sureBtn:function(){
    let that = this;
    

    wx.showLoading()
    wx.request({
      url: apiUrl + 'order/delivery/verify',
      method: "PUT",
      data: {
        pointVerifiedCode: that.data.sweepcardcode,
        hotelId: wx.getStorageSync("hotelId")
        // pointVerifiedCode: 'POINT:91:1:iVEb'
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.statusCode)
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }

        if (res.data.code == 0) {
          that.setData({
            backwalljudge: true
          })
          wx.navigateTo({
            url: '../hexiaosuccess/hexiaosuccess',
          })
        } else {
          wx.redirectTo({
            url: '../hexiaofail/hexiaofail?failStatus=' + res.data.data,
          })
        }
      },
      fail: function (error) {
        console.log(res.statusCode)
        wx.hideLoading()
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