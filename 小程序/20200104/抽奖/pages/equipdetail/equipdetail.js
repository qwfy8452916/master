// pages/equipdetail/equipdetail.js
import wxrequest from '../../request/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    equipList:[],
    cabNumN:'',
    cabNumAll:'',
    cabList:[],
    ifExpand:false,
    ifshow: false
  },
  expand(){
    this.setData({
      ifExpand: !this.data.ifExpand
    })
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
    wxrequest.getUserCabinetAll().then(res => {
      wx.hideLoading()
      if(res.data.code == 0){
        const resData = res.data.data
        let equipList = [];
        let cabList = [];
        let cabNumY = 0;
        let cabNumN = 0;
        resData.forEach(item => {
          cabNumY += item.fortuneCount
          cabNumN += item.unFortuneCount
          item.fsInvestorCabinetDTOS.forEach(ele => {
            equipList.push({
              equipName: ele.hotelName,
              status: '正在投放中',
              typeName: item.typeName,
              cabinetId: ele.hotelCabNum
            })
          })
          cabList.push({
            typeName:item.typeName,
            cabNumN:item.unFortuneCount,
            cabNumAll:item.unFortuneCount+item.fortuneCount
          })
        })
        this.setData({
          equipList: equipList,
          cabNumAll: cabNumY + cabNumN,
          cabList,
          cabNumN
        })
        if(!resData[0]){
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