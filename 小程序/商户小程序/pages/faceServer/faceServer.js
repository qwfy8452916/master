// pages/faceServer/faceServer.js
const app=getApp();

app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      authzData: wx.getStorageSync("pageAuthority"),
    })
  },


  sweepCode:function(){
    wx.scanCode({
      success(res) {
        if (!res.result) {
          alertViewWithCancel("提示", "扫描失败", function () {
          });
          return false
        }
        let str = res.result;
        console.log(str)
        let ztreg = /[POINT]+[:]/;
        let kqreg = /[VOU]+[:]+[\d]+[:]+[\d]+[:]+[\w\d]{4}/;

        if (!ztreg.test(str) && !kqreg.test(str)) {
          wx.showToast({
            title: '不是核销二维码',
            icon:'none',
            duration:2000
          })
          return false
        }
        if (ztreg.test(str)){
          console.log("自提")
          wx.navigateTo({
            url: '../selfTake/selfTake?sweepcardcode=' + str,
          })
        }
        if (kqreg.test(str)){
          console.log("卡券")
          wx.navigateTo({
            url: '../hexCardTicket/hexCardTicket?sweepcardcode=' + str,
          })
        }


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

  },
  couponfun () {
    wx.navigateTo({
      url: '../couponlist/couponlist',
    })
  },
  mysharefun(){
    wx.navigateTo({
      url: '../myshare/myshare',
    })
  },
  writeofffun(){
    wx.navigateTo({
      url: '../writeoff/writeoff',
    })
  }
})