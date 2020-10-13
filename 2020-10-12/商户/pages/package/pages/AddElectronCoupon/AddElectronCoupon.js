// pages/package/pages/AddElectronCoupon/AddElectronCoupon.js
const app = getApp();
import wxrequest from '../../../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addCoujudge:false,
    eleCouponsData:{
      couponType: '', //类型
      couponTypeName:'', //类型名称
      couponId: '',  //名称id
      couponName:'', //名称
      couponCount: 1, //数量
      couponSort: 0,  //排序
    }, //电子券数据
    typeData:[
      {name:'卡券',id:1},
      { name: '优惠券', id: 2 },
    ], //类型数据
    typeIndex:'',
    yCouponList:[], //优惠券数据
    cCouponList:[], //卡券数据
    couponList:[], //名称数据
    couponIndex:'', 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })

    this.getProdCouponList();
    this.getHotelCouponList();
  },

  //选择类型
  bindPickerType: function (e) {
    let that = this;
    let index = e.detail.value;
    let nowcouponList = this.data.couponList;
    if (that.data.typeData[index].id==1){
      nowcouponList = that.data.cCouponList
    }else{
      nowcouponList = that.data.yCouponList
    }
    this.setData({
      typeIndex: index,
      'eleCouponsData.couponType': that.data.typeData[index].id,
      'eleCouponsData.couponTypeName': that.data.typeData[index].name,
      couponList: nowcouponList
    })
  },

  //优惠券列表
  getProdCouponList:function(){
    let that=this;
    wxrequest.getProdCouponList().then(res=>{
     let resdata=res.data;
     if(resdata.code==0){
       let nowyCouponList = that.data.yCouponList;
       nowyCouponList=resdata.data.map(item=>{
         return {
           id: item.id,
           couponName: item.couponBatchName
         }
       })
       that.setData({
         yCouponList: nowyCouponList
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

  //获取卡券列表
  getHotelCouponList:function(){
    let that=this;
    wxrequest.getHotelCouponList().then(res=>{
       let resdata=res.data;
      if (resdata.code==0){
        let nowcCouponList = that.data.cCouponList;
        nowcCouponList=resdata.data.map(item=>{
          return {
            id: item.id,
            couponName: item.vouName
          }
        })
        that.setData({
          cCouponList: nowcCouponList
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

  //选择名称
  bindPickerCoupon:function(e){
    let that=this;
    let index=e.detail.value;
    this.setData({
      couponIndex:index,
      'eleCouponsData.couponId': that.data.couponList[index].id,
      'eleCouponsData.couponName': that.data.couponList[index].couponName
    })
  },

  //数量
  couponCount:function(e){
    let value=e.detail.value;
    this.setData({
      'eleCouponsData.couponCount': value
    })
  },

  //排序
  couponSort:function(e){
    let value = e.detail.value;
    this.setData({
      'eleCouponsData.couponSort': value
    })
  },




  //确定
  surebtn: function () {
    let that = this;
    let noweleCouponsData = this.data.eleCouponsData;

    if (noweleCouponsData.couponType == '') {
      wx.showToast({
        title: '请选择类型',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (noweleCouponsData.couponId == '') {
      wx.showToast({
        title: '请选择名称',
        icon: 'none',
        duration: 2000
      })
      return false;
    }


    let eleCouponsAdd = {
      couponType: noweleCouponsData.couponType,
      couponTypeName: noweleCouponsData.couponTypeName,
      couponId: noweleCouponsData.couponId, 
      couponName: noweleCouponsData.couponName,
      couponCount: noweleCouponsData.couponCount,
      couponSort: noweleCouponsData.couponSort,
    }
    let pages=getCurrentPages();
    let prevPage = pages[pages.length - 2]; 
    prevPage.setData({
      addCoujudge: true,
      eleCouponsAdd: eleCouponsAdd
    })
    wx.navigateBack({
      delta:1
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