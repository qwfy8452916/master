// pages/suerForm/suerForm.js
const app=getApp();
import wxrequest from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchJudge: true,
    identitydata: [{ asName: '全部', as: '' }, { asName: '酒店', as: '3' }, { asName: '供应商', as: '4' }],
    identitydata2:[],
    exform:[
      {type:'input',name:"优惠券名称",desc:"请输入优惠券名称"},
      { type: 'input',name: "卡券名称", desc: "请输入卡券名称"},
      { type: 'pick', name: "场景1", desc: "全部", nowindex: '', bindchange: 'bindchange', bindName:'bindName1'},
      { type: 'input',name: "红包名称", desc: "请输出红包名称"},
      { type: 'pick', name: "场景2", desc: "全部", nowindex: '', bindchange: 'bindchange', bindName: 'bindName2'}
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    let that = this;

    this.getUseScene()
    

    // let nowexform = this.data.exform.map(item => {
    //   if (item.name == "场景1" || item.name == "场景2") {
    //     item.data = that.data.identitydata
    //   }
    //   return item;
    // })
    // that.setData({
    //   exform: nowexform
    // })
    // console.log(this.data.exform)
    
    
  },


  //获取场景
  getUseScene: function (e) {
    let that = this;
    let linkData = {
      key: "VOU_USE_SCENE",
      orgId: '0'
    }
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.basicDataItems(linkData).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        let nowscenData = resdata.data;
        let allObj = {
          dictName: "全部",
          dictValue: "",
        }
        nowscenData.unshift(allObj)

        let nowexform = that.data.exform.map(item => {
          if (item.name == "场景1" || item.name == "场景2") {
            item.data = nowscenData
          }
          return item;
        })
        that.setData({
          exform: nowexform
        })
        console.log(that.data.exform)
        this.selectComponent('#zujian').init({
          ...this.data.data
        })
        
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  },


  onMyEvent:function(e){
    console.log(e)
  },


  dianji:function(){
    let val = this.selectComponent('#zujian').data.forminfo
    console.log(val)
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