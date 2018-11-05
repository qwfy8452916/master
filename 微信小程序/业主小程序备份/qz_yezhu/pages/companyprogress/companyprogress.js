// pages/companyprogress/companyprogress.js
const app = getApp()
let apiUrl = app.getApiUrl();
let storagehc = app.globalData.token;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrehide:[false,true,true],
    zxjindu:null,
    designtugao:null,
    zsteam:null,
    orderhao:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options)
    that.setData({
      orderhao: options.order_no
    })
    wx.request({
      url: apiUrl + '/v1/buildplan',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token
      },
      method: "POST",
      data: { orderid: options.order_no, tel: app.globalData.usertel},
      success: function (res) {
        console.log(res)
        that.setData({
          zxjindu:res.data.data.build,
          designtugao: res.data.data.house_design,
          zsteam:res.data.data.team,
        })
        console.log(that.data.zxjindu)
      }
    }); 





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
  tabqiehuan:function(e){
    let index = e.currentTarget.dataset.index,
      that = this,
      arr = [true, true, true];
    arr[index] = false;
    that.setData({ arrehide: arr });
  },
  gereninfo:function(){
    wx.navigateTo({
      url:"../information/information"
    })
  },
  shigongteam:function(){
    wx.navigateTo({
      url:"../constructionteam/constructionteam"
    })
  },
  myfeedback:function(){
    var that=this;
    wx.navigateTo({
      url: "../feedback/feedback?orderhao=" + that.data.orderhao
    })
  },
  yanshou:function(){
    wx.navigateTo({
      url:"../yanshou/yanshou"
    })
  }
})