// pages/groupSelect/groupSelect.js
const app=getApp();
import wxrequest from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupList: [], //分组数据
    groupActive:[], //分组样式
    groupId:'', //选择分组id
    groupName:'', //选择分组名称
    shadowpd:false,
    groupValue:'', //新增分组名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      groupId: options.groupId
    })
    this.getAppointGroup();
  },


  //获取分组券分组列表
  getAppointGroup(){
    let that=this;
    wxrequest.getAppointGroup().then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
         
        let nowgroupActive = that.data.groupActive;
        for (let i = 0; i < resdata.data.length;i++){
          if (resdata.data[i].id == that.data.groupId){
            nowgroupActive[i] = true;
          }else{
            nowgroupActive[i] = false;
          }
          
         }

        that.setData({
          groupList: resdata.data,
          groupActive: nowgroupActive
        })
        console.log(that.data.groupActive)

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

  //选择分组
  groupItem:function(e){
    let that=this;
    let itemvalue = e.currentTarget.dataset.itemvalue;
    let index=e.currentTarget.dataset.index;
    let nowgroupActive=that.data.groupActive;
    for (let i = 0; i < nowgroupActive.length;i++){
      nowgroupActive[i] = false
    }
    nowgroupActive[index]=true;
    
    this.setData({
      groupActive: nowgroupActive,
      groupId: itemvalue.id,
      groupName: itemvalue.groupName
    })
    console.log(that.data.groupName)
  },

  //确定选择
  groupbtn:function(){
    let that=this;


    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      groupjudge: true,
      funjudge: false,
      typejudge: false,
      prodjudge: false,
      roomjudge: false,
      scenejudge: false,
      drawWaysjudge: false,
      groupId: that.data.groupId,
      groupName: that.data.groupName,
    })
    wx.navigateBack({
      delta: 1
    })
  },

  //获取分组
  groupput:function(e){
    this.setData({
      groupValue:e.detail.value
    })
  },

  //新增分组
  addbox:function(){
    this.setData({
      shadowpd: true,
      groupValue:'',
    })
  },

  //确定新增
  addbtn:function(){
    let that=this;
    let linkData={
      groupName: this.data.groupValue,
      groupOwnerOrgKind: 3,
    }
    wxrequest.addCouponGroup(linkData).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
          wx.showToast({
            title: '操作成功',
            icon:'none',
            duration:2000
          })
          that.setData({
            shadowpd:false,
          })
         that.getAppointGroup();
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

  //关闭
  closebtn:function(){
    this.setData({
      shadowpd: false
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