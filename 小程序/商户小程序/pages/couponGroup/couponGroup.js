// pages/couponGroup/couponGroup.js
const app=getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    groupId:'', //分组id
    groupDetail:{}, //分组详情
    groupData: [], //分组数据
    groupName:'', //分组名
    shadowpd:false,
    pageNum:1, //当前页
    sizejudge:false,
    sureJudge:'', //判断新增编辑
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCouponGroupList();
  },

  //获取优惠券分组列表
  getCouponGroupList:function(){
    let that=this;
    let tempdata=[];
    let linkData={
      pageNo: this.data.pageNum,
      pageSize: 20,
      orgAs: 3,
      groupName:''
    }
    wxrequest.getCouponGroupList(linkData).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
         if (resdata.data.records.length > 0 && resdata.data.records.length <20){
           
            that.setData({
              sizejudge:false
            })
         }else{
           
           that.setData({
             sizejudge: true
           })
         }
         if (that.data.pageNum>1){
           tempdata = that.data.groupData.concat(resdata.data.records);
         }else{
           tempdata = resdata.data.records
         }
         that.setData({
           groupData: tempdata
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

  //修改分组
  editGroup:function(e){
   let id=e.currentTarget.dataset.id;
    this.checkCouponGroup(id);
   this.setData({
     shadowpd: true,
     groupId:id,
     sureJudge: e.currentTarget.dataset.judge
   })
  },

  //获取分组详情
  checkCouponGroup(id){
    let that=this;
    wxrequest.checkCouponGroup(id).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
         that.setData({
           groupName: resdata.data.groupName
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

  //是否删除
  deleGroup:function(e){
    let that=this;
    let id=e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定删除该分组？',
      success(res){
        if(res.confirm){
          that.suredeleGroup(id);
        }
      }
    })
  },

  //删除分组
  suredeleGroup:function(id){
    let that=this;
    wxrequest.delCouponGroup(id).then(res=>{
       let resdata=res.data;
      if (resdata.code==0){
         wx.showToast({
           title: '操作成功',
           icon:'none',
           duration:2000
         })
        that.getCouponGroupList();
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

  //分组名
  groupput:function(e){
    this.setData({
      groupName:e.detail.value
    })
  },


  //确定
  sureBtn: function () {
    if (this.data.sureJudge == '1') {
      this.addbtn();
    } else if (this.data.sureJudge == '2') {
      this.editCouponGroup();
    }
  },

  //修改分组
  editCouponGroup(){
    let that=this;
    if (this.data.groupName.toString().length<1) {
      wx.showToast({
        title: '请填写分组名',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    let linkData={
      groupName: that.data.groupName
    }
    wxrequest.editCouponGroup(linkData, that.data.groupId).then(res=>{
       let resdata=res.data;
      if (resdata.code==0){
        that.setData({
          shadowpd: false,
          })
         wx.showToast({
           title: '操作成功',
           icon:'none',
           duration:2000
         })
        that.getCouponGroupList();
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

  //新增分组
  fenzu:function(e){
    this.setData({
      shadowpd:true,
      groupName:'',
      sureJudge: e.currentTarget.dataset.judge
    })
  },


 

  //确定新增分组
  addbtn:function(){
    let that=this;
    if (this.data.groupName.toString().length<1){
      wx.showToast({
        title: '请填写分组名',
        icon:'none',
        duration:2000
      })
      return false;
    }
    let linkData={
      groupOwnerOrgKind: 3,
      groupName: this.data.groupName
    }
    wxrequest.addCouponGroup(linkData).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
        that.setData({
          shadowpd: false,
        })
         wx.showToast({
           title: '操作成功',
           icon:'none',
           duration:2000
         })
         
        that.getCouponGroupList();
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
      shadowpd: false,
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
    let nowpageNum = this.data.pageNum;
    if(this.data.sizejudge){
      this.setData({
        pageNum: ++nowpageNum
      })
      that.getCouponGroupList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})