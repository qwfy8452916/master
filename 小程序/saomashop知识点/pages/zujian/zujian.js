// pages/zujian/zujian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    awardsConfig:'子组件数据',
    getdata: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
  },


  //向外传的参
  passFather() {
    this.triggerEvent('myData', this.data.awardsConfig);// 向父组件传出当前决定的数组数据
    this.setData({
      getdata: ''
    })
  },

  //父页面控制的事件
  changeColor(e){
    // 接收父传递值
    console.log(e)
    this.setData({
      getdata:e
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