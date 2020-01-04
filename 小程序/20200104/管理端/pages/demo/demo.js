// pages/demo/demo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    judge:false,
    date: '2019-07-31',//默认起始时间  
    date2: '结束时间',//默认结束时间 
    hoteldata:[{name:'思思酒店',id:'001'},{name:'万豪酒店',id:'002'},{name:'香格里拉酒店',id:'003'}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindPickerChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      judge:true
    })
  },


  // 时间段选择  
  bindDateChange(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      date: e.detail.value,
    })
  },

  bindDateChange2(e) {
    console.log(e.detail.value)
    let that = this;
    that.setData({
      date2: e.detail.value,
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