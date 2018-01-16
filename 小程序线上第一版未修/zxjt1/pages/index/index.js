// index.js
let app = getApp();
let apiUrl = app.getApiUrl();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    infoList:[],
    topImg: '',
    itemId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 验证登录
    app.getUserInfo(function (userInfo) {});
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
    let that = this;
    // 首页设置缓存
    let indexInfo = app.getNewStorage('indexInfo');
    if (indexInfo) {
      that.setData({ infoList: indexInfo, topImg: indexInfo[0].img, itemId: indexInfo[0].id })
    } else {
      wx.request({
        url: apiUrl + '/zxjt/index',
        header: {
          'content-type': 'application/json'
        },
        dataType: 'json',
        success: function (res) {
          app.setNewStorage('indexInfo', res.data.videoList, 864000);
          that.setData({ infoList: res.data.videoList, topImg: res.data.videoList[0].img, itemId: res.data.videoList[0].id })
        }
      });
    }
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
  /**
   * 滑动切换banner
   */
  EventHandle:function(event){
    var count = event.detail.current;

    this.data.topImg = this.data.infoList[count].img

    this.setData({ topImg: this.data.topImg, itemId: this.data.infoList[count].id})
    
  },
  /**
   * 跳转到搜索页面
   */
  toSearchPage:function(){
    wx.navigateTo({
      url: '../search/search'
    })
  },

  /**
   * 点击跳转到播放详情页
   */
  toDetailPlay: function () {
    wx.navigateTo({
      url: '../detail_play/detail_play?id='+this.data.itemId,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})