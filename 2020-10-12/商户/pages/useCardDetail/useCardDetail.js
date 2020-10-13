// pages/useCardDetail/useCardDetail.js
const app=getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    id:'', //用户卡券id
    openstatus:true,
    detailData:{},
    cardRecordData:[], //卡券使用记录
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getUseCardticketDetail(options.id)
    this.getUseCardticketRecord();
  },


  //获取用户卡券详情
  getUseCardticketDetail:function(id){
    let that=this;
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.getUseCardticketDetail(id).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      if(resdata.code==0){
        that.setData({
          detailData:resdata.data
        })
      }else{
        wx.showToast({
          title: resdata.msg,
          icon:'none',
          duration:2000
        })
      }
    }).catch(err=>{
      wx.showToast({
        title: err,
        icon:'none',
        duration:2000
      })
    })
  },


  //获取卡券使用记录
  getUseCardticketRecord:function(){
    let that=this;
    let linkData={
      vouId:that.data.id
    }
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.getUseCardticketRecord(linkData).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      if(resdata.code==0){
         that.setData({
           cardRecordData: resdata.data
         })
      }else{
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err=>{
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon:'none',
        duration:2000
      })
    })
  },

  checkAll:function(){
    this.setData({
      openstatus: !this.data.openstatus
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