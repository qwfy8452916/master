// pages/restMoney/restMoney.js
const app =  getApp();
import wxrequest from '../../request/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rplist:[],
    balance:'',
    showType:{
      '1': '红包',
      '2': '红包',
      '3': '推广奖',
      '4': '团队奖',
      '5': '升级奖励',
      '6': '提现',
      '7': '购买扣款',
    },
    statuslist:{
      '0':'处理中',
      '1':'提现成功',
      '2':'提现失败返额',
      '-1':'提现失败'
    },
    ifshow:false,
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
        let resdata = res.data.data.fsBalanceDetailDTOS.map(item => {
          return {
            rptype: this.data.showType[item.detailType],
            rptime: item.transTime,
            rpmoney: item.amount.toFixed(2)>0?'+'+item.amount.toFixed(2):item.amount.toFixed(2),
            rpexplain: item.detailType == 6?`（${this.data.statuslist[item.status]}）`:''
          }
        })
        this.setData({
          balance: res.data.data.balance.toFixed(2),
          rplist: resdata
        })
        if(!resdata[0]){
          this.setData({
            ifshow:true
          })
        }
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