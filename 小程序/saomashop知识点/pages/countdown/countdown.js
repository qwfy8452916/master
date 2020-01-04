// pages/countdown/countdown.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: '',//倒计时
    timer: '',
    payEndTime:'2019-09-17 16:58:52',  //截止时间 大于当前时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let loading = that.data.loading;
    that.setData({
      loading: setInterval(function () {
        that.countdownfun(that.data.payEndTime);
      }, 1000)
    })
  },

  countdownfun: function (datatime1) {//计算倒计时
    let that = this;
    let loadingfun = that.data.loadingfun;
    let pastDate = datatime1;
    // let nowDate = datatime2;
    let nowPastTime = new Date(pastDate.replace(/-/g, '/')).getTime();//截止时间
    // let nowtime = new Date(nowDate.replace(/-/g, '/')).getTime();//当前时间
    let now = new Date().getTime();
    let secs = (nowPastTime - now) / 1000;
    let mesc = that.dateformate(secs);
    if (mesc == "00:00:00" || mesc == '') {
      clearInterval(loadingfun);
      mesc = "00:00:00";
      that.setData({
        buytype: false
      })
    }
    that.setData({
      timer: mesc
    })
  },



  dateformate(micro_second) {
    var second = micro_second; //总的秒数
    // 天数位   
    var day = Math.floor(second / 3600 / 24);
    var dayStr = day.toString();
    if (dayStr.length == 1) dayStr = '0' + dayStr;
    // 小时位   
    //var hr = Math.floor(second / 3600 % 24);
    //直接转为小时 没有天 超过1天为24小时以上
    var hr = Math.floor(second / 3600);
    var hrStr = hr.toString();
    if (hrStr.length == 1) hrStr = '0' + hrStr;
    // 分钟位  
    var min = Math.floor(second / 60 % 60);
    var minStr = min.toString();
    if (minStr.length == 1) minStr = '0' + minStr;
    // 秒位  
    var sec = Math.floor(second % 60);
    var secStr = sec.toString();
    if (secStr.length == 1) secStr = '0' + secStr;
    if (hrStr < 0 || minStr < 0 || secStr < 0) {
      let a = '';
      return a;
    } else {
      return hrStr + ":" + minStr + ":" + secStr;
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