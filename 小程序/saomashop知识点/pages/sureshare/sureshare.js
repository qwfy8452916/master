// pages/sureshare/sureshare.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autokey:false, 
    tcinput:true,
    tipstitle:'', //修改标题内容
    suretitle:'你的好友向你推荐北京烤鸭'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }, 

  edittitlebtn:function(){
    this.setData({
      tcinput:false,
      tipstitle:'',
      autokey:true,
    })
  },

  cancelbtn:function(){
    this.setData({
      tcinput: true,
      autokey: false,
    })
  },

  confirnbtn: function () {
    this.setData({
      tcinput: true,
      autokey: false,
      suretitle: this.data.tipstitle
    })
  },

  inputcontent:function(e){
   this.setData({
     tipstitle: e.detail.value
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
  onShareAppMessage: function (e) {
    let that=this;
    console.log("有分享")
    console.log(e)
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    let shareCode = '分享001'
    return {
      title: that.data.suretitle,
      imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583567939069&di=e630f17406c1f2b6884d6fa7de92a3c7&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F0dd7912397dda144dac4acc9b2b7d0a20df486f8.jpg',
      path: '/pages/myshare/myshare?shareCode=' + shareCode,
    }

  },
})