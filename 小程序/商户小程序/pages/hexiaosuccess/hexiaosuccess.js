// pages/hexiaosuccess/hexiaosuccess.js
const app=getApp();
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    countDownNum: '3',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.jishi();
  },

  returnpage:function(){
    wx.redirectTo({
      url:'../dianhexiao/dianhexiao'
    })
  },

  jishi:function(){
    let that=this;
    let nowcountDownNum = this.data.countDownNum;
    that.setData({
      timer:setInterval(function(){
        nowcountDownNum--;
        that.setData({
          countDownNum: nowcountDownNum
        })
        if (nowcountDownNum == 0){
          clearInterval(that.data.timer)
          wx.redirectTo({
            url: '../faceServer/faceServer'
          })
        }
      },1000)
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