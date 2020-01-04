// pages/cabMarket/cabMarket.js
const app =  getApp();
import wxrequest from '../../request/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    soldCablist:[],
    phoneNum: '18963671730',
    ifshow:false,
    pageSize: 10,
    pageNo: 1
  },
  callNum(){
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNum
    })
  },
  purchase(){
    this.setData({
      ifshow: true
    })
  },
  hideWindow(){
    this.setData({
      ifshow: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getdata()
  },
  getdata(options){
    let data = {
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize
    }
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    wxrequest.cabMarket(data).then(res => {
      wx.hideLoading()
      if(res.data.code == 0){
        let soldCablist = res.data.data.records.map(item=>{
          return {
            hotleName: item.hotelName,
            roomId: item.roomCode,
            cabPrice: item.price.toFixed(2),
            allyHotelCabId: item.allyHotelCabId
          }
        })
        if(options){
          this.setData({
            soldCablist
          })
          wx.hideNavigationBarLoading();
          wx.stopPullDownRefresh();
        }else{
          this.setData({
            soldCablist: this.data.soldCablist.concat(soldCablist)
          })
        }
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    }).catch(err => {
      wx.hideLoading()      
      console.log(err)
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      pageNo: 1
    })
    this.getdata(true)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageNo: this.data.pageNo + 1
    })
    this.getdata()
  },
})