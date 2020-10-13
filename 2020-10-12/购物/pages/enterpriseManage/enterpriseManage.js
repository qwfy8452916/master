// pages/enterpriseManage/enterpriseManage.js
const app = getApp();
import wxrequest from '../../request/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifShowcode:false,
    dateValue:'',
    EnterpriseCode:'',
    chooseTime:'',
    ifhasNone:false,
    alldata: {},
    EnterpriseCodeList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllEnterpriseCode()
  },
  ensureChange(){
    let params = {
      rootLicense: app.globalData.license,
      licenseType: this.data.alldata.licenseType,
      useTimeEnd: this.data.chooseTime
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wxrequest.changeEnterpriseCode(params,this.data.alldata.id).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        this.setData({
          ifShowcode: false,
        })
        wx.showToast({
          title: '修改成功',
          icon: 'success'
        })
        setTimeout(() => {
          this.getAllEnterpriseCode()
        }, 1500);
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    })
  },
  cancelCode(e){
    var addressId = e.currentTarget.dataset.id
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否确认删除此授权码？',
      cancelText:'取消',
      confirmText:'确认',
      success(res){
        if(res.confirm){
          wx.showLoading({
            title: '加载中',
            mask: true
          })
          wxrequest.cancelEnterpriseCode(addressId).then(res => {
            wx.hideLoading()
            if (res.data.code == 0){
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              })
              setTimeout(() => {
                that.getAllEnterpriseCode()
              }, 1500);
            }else{
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          }).catch(err => {
            wx.hideLoading()
            console.log(err)
          })
        }
      }
    })
  },
  unbindCode(e){
    var addressId = e.currentTarget.dataset.license
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否确认解绑此授权码？',
      cancelText:'取消',
      confirmText:'确认',
      success(res){
        if(res.confirm){
          wx.showLoading({
            title: '加载中',
            mask: true
          })
          wxrequest.unbindEnterpriseCode(addressId).then(res => {
            wx.hideLoading()
            if (res.data.code == 0){
              wx.showToast({
                title: '解绑成功',
                icon: 'success'
              })
              setTimeout(() => {
                that.getAllEnterpriseCode()
              }, 1500);
            }else{
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          }).catch(err => {
            wx.hideLoading()
            console.log(err)
          })
        }
      }
    })
  },
  switch1idChange(e){
    var id = e.currentTarget.dataset.id
    var status = e.currentTarget.dataset.status?1:0
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wxrequest.EnterpriseCodeStatus(id,status).then(res => {
      wx.hideLoading()
      if (res.data.code == 0){
        wx.showToast({
          title: status?'已关闭':'已启用',
          icon: 'success'
        })
        setTimeout(() => {
          that.getAllEnterpriseCode()
        }, 1500);
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  handleChange(e) {
    if(new Date(e.detail.dateString).valueOf()<new Date().valueOf()){
      wx.showToast({
        title: '预约时间要大于当前时间哦！',
        icon: 'none',
        duration: 2000
      })
      return ;
    }
    this.setData({
      chooseTime: e.detail.dateString
    })
    // this.gotoOrder(e.detail.dateString)
  },
  closeCode(){
    this.setData({
      ifShowcode: false
    })
  },
  getNowTime(){
    this.setData({
      dateValue: this.data.chooseTime,
    })
  },
  getAllEnterpriseCode(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let rootLicense = app.globalData.license
    wxrequest.getAllEnterpriseCode(rootLicense).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        resdatas.forEach(item => {
          item.status = item.status?false:true
        })
        this.setData({
          EnterpriseCodeList: resdatas,
          ifhasNone: resdatas.length == 0?true:false
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    })
  },
  changeTime(e){
    this.setData({
      ifShowcode: true,
      chooseTime: e.currentTarget.dataset.item.useTimeEnd,
      alldata: e.currentTarget.dataset.item 
    })
  },
  creatCode(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let params = {
      rootLicense: app.globalData.license,
      licenseType: 1,
    }
    wxrequest.createEnterpriseCode(params).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '已生成授权码',
          icon: 'success'
        })
        setTimeout(() => {
          this.getAllEnterpriseCode()
        }, 1500);
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    })
  },
  returnTap(){},
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