// pages/reback/reback.js
const app = getApp()
import wxrequest from '../../request/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cabList:[],
    selected: '',
    cabNum:1,
    cabMax:'',
    warning:false,
    ifshow:false
  },
  radioChange(e){
    this.setData({
      selected: e.detail.value,
    })
    this.data.cabList.forEach(item=>{
      if(item.id == e.detail.value){
        this.setData({
          cabMax: item.noDraw
        })
      }
    })
    if(this.data.cabMax>=this.data.cabNum && this.data.cabNum!=0){
      this.setData({
        warning: false,
      })
    }else{
      this.setData({
        warning: true,
      })
    }
  },
  sureNum(e){
    if(e.detail.value > this.data.cabMax || e.detail.value==0){
      this.setData({
        warning: true,
        cabNum: e.detail.value
      })
    }else{
      this.setData({
        warning: false,
        cabNum: e.detail.value
      })
    }
  },
  submit(){
    let params = {
      refoundCount: this.data.cabNum,
      typeId: this.data.selected
    }
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    wxrequest.rebackMoney(params).then(res => {
      wx.hideLoading()
      if(res.data.code == 0){
        this.setData({
          ifshow:true
        })
        wx.navigateTo({
          url: '/pages/rebackSuccess/rebackSuccess'
        })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    wxrequest.getUserCabinetAll().then(res => {
      wx.hideLoading()
      if(res.data.code == 0){
        const resData = res.data.data
        let cabList = [];
        resData.forEach(item => {
          if(item.unFortuneCount){
            cabList.push({
              typeName:item.typeName,
              noDraw:item.unFortuneCount,
              id:item.typeId
            })
          }
        })
        this.setData({
          cabList,
          selected:cabList[0].id,
          cabMax: cabList[0].noDraw
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

  },
})