// pages/restMoney/restMoney.js
const app =  getApp();
import wxrequest from '../../request/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    myCase:'',
    errorInfo:'',
    balanceId:'',
    drawCase:'',
    ifCandraw: false,
    isSubmit:true,
    inputCase:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  inputCase(e){
    this.setData({
      inputCase:e.detail.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3').replace(".", "$#$").replace(/\./g, "").replace("$#$", ".")
    })
    if(this.data.inputCase == '.'){
      this.setData({
        inputCase:'0.'
      })
    }
    if(Number(this.data.inputCase)){
      if(Number(this.data.inputCase)>Number(this.data.myCase)){
        this.setData({
          errorInfo:'超过可提现余额!',
          ifCandraw:false
        })
      }else{
        this.setData({
          errorInfo:'',
          ifCandraw:true
        })
      }
    }else{
      this.setData({
        ifCandraw:false
      })
    }
    this.setData({
      drawCase:this.data.inputCase
    })
  },
  withdraw(){
    const data = {
      amount: this.data.drawCase,
      balanceId: this.data.balanceId
    }
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    wxrequest.drawmyCase(data).then(res => {
      this.setData({
        isSubmit:false
      })
      wx.hideLoading()
      if(res.data.code == 0){
        wx.showToast({
          title: '提现成功!!',
          icon: 'success'
        })
        setTimeout(res=>{
          wx.navigateBack({
            delta:1
          })
        },1500)
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        this.setData({
          isSubmit:true
        })
      }
    }).catch(err => {
      wx.hideLoading()      
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    wxrequest.getmyCase().then(res => {
      wx.hideLoading()
      if(res.data.code == 0){
        this.setData({
          myCase: res.data.data.balance.toFixed(2),
          balanceId: res.data.data.id
        })
      }
    }).catch(err => {
      wx.hideLoading()      
      console.log(err)
    })
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