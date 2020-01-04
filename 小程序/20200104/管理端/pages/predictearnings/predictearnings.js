// pages/predictearnings/predictearnings.js
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
    hname: '',
    promptHide: false,
    hotelList: [],
    setInter: '',   //定时器
    listDataLength: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gethotellist(this.data.hname);
    this.refreshtimer();
  },
  //获取酒店列表
  gethotellist: function (hname) {
    let that = this;
    wx.request({
      url: apiUrl + '/fin/monitor/calc/warn',
      data: {
        hotelName: hname
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          wx.hideLoading()
          if (res.data.data.length > that.data.listDataLength){
            that.audioremind();
          }
          that.setData({
            hotelList: res.data.data,
            listDataLength: res.data.data.length
          });
        } else {
          wx.hideLoading()
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        wx.hideLoading()
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },
  //搜索酒店
  inputhotelname: function (e) {
    this.setData({
      hname: e.detail.value
    });
  },
  searchhotel: function () {
    let hname = this.data.hname;
    this.gethotellist(hname);
  },
  //关闭提示
  promptclose: function(){
    this.setData({
      promptHide: true
    });
  },
  //定时刷新
  refreshtimer: function(){
    let that = this;
    that.data.setInter = setInterval(
      function(){
        that.gethotellist(that.data.hname)
      }, 5000);
  },
  //语音提醒
  audioremind: function(){
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = 'http://172.16.200.90/longan/opr/hint.mp3'
    // innerAudioContext.onPlay(() => {
    //   console.log('开始播放')
    // })
    // innerAudioContext.onError((res) => {
    //   console.log(res.errMsg)
    //   console.log(res.errCode)
    // })
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
    clearInterval(this.data.setInter);
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