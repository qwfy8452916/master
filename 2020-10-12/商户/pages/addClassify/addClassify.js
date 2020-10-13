// pages/addClassify/addClassify.js
const app=getApp();
import wxrequest from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    judge:'',
    id:'',
    funId:'', //功能区id
    funcCnName:'', //功能区名称
    categoryName:'', //分类名称
    sort:0, //排序
    isshow:1,
    allocId:'',
    subclausesDataModify:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that=this;
    if (options.judge==1){
      this.setData({
        funcCnName: options.funcCnName,
        funId: options.id,
        judge: options.judge,
        authzData: wx.getStorageSync("pageAuthority"),
      })
    } else if (options.judge == 2){
      this.setData({
        id: options.id,
        judge: options.judge,
        funcCnName: options.funcCnName,
        authzData: wx.getStorageSync("pageAuthority"),
      })
      this.functionClassifyDetail();
    }
  
  },

  //功能区分类-详情
  functionClassifyDetail:function(){
    let that=this;
    wxrequest.functionClassifyDetail(that.data.id).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
         that.setData({
           subclausesDataModify:resdata.data,
           categoryName: resdata.data.categoryName,
           sort: resdata.data.sort,
           isshow: resdata.data.isShow,
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


  surebtn:function(){
     if(this.data.judge==1){
       this.addsurebtn()
     } else if (this.data.judge == 2){
       this.editsurebtn();
     }
  },

  //新增一级分类

  addsurebtn:function(){
    let that=this;
    
    if (that.data.categoryName.toString().length<1){
       wx.showToast({
         title: '请输入分类名称',
         icon:'none',
         duration:2000
       })
       return false;
    }
    let linkData={
      hotelId: wx.getStorageSync('hotelId'),
      funcId: this.data.funId,
      parentId: 0,
      sort: that.data.sort,
      categoryName: that.data.categoryName,
      allocId: that.data.allocId,
      isShow: that.data.isshow,
      selectedIcon:'',
      notSelectedIcon:'',
    }
    wxrequest.functionClassifyAdd(linkData).then(res=>{
       let resdata=res.data;
      if (resdata.code==0){
         if(resdata.data!=null){
           wx.showToast({
             title: '操作成功',
             icon: 'none',
             durationa: 2000
           })
          wx.navigateBack({
            delta:1
          })
         }
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


  //修改一级分类

  editsurebtn: function () {
    let that = this;
    if (that.data.categoryName.toString().length < 1) {
      wx.showToast({
        title: '请输入分类名称',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    let linkData = {
      hotelId: wx.getStorageSync('hotelId'),
      funcId: that.data.subclausesDataModify.funcId,
      parentId: that.data.subclausesDataModify.parentId,
      sort: that.data.sort,
      categoryName: that.data.categoryName,
      allocId: that.data.subclausesDataModify.allocId,
      isShow: that.data.isshow,
      selectedIcon: that.data.subclausesDataModify.selectedIcon,
      notSelectedIcon: that.data.subclausesDataModify.notSelectedIcon,
    }
    wxrequest.functionClassifyModify(linkData,that.data.id).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        if (resdata.data != null) {
          wx.showToast({
            title: '操作成功',
            icon:'none',
            durationa:2000
          })
          wx.navigateBack({
            delta: 1
          })
        }
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  },

  //分类名称
  categoryName:function(e){
    this.setData({
      categoryName:e.detail.value
    })
  },

  //排序
  sort:function(e){
    this.setData({
      sort:e.detail.value
    })
  },

  //显示
  bindisshow:function(e){
    let isshow=e.detail.value?1:0;
    this.setData({
      isshow: isshow
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