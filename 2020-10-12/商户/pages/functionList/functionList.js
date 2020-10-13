// pages/functionList/functionList.js
const app=getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    functionData:[], //功能区数据
    pageNum:1, //当前页
    sizejudge:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      authzData: wx.getStorageSync("pageAuthority"),
    })
  },

  //酒店功能区列表
  hotelFunctionList:function(){
    let that=this;
    let linkData={
      isNotNeedDef: 1,
      hotelId: wx.getStorageSync('hotelId'),
      funcName: '',
      funcType: '',
      isShow: '',
      pageNo: this.data.pageNum,
      pageSize: 20,
    };
    let tempData=[];
    wxrequest.hotelFunctionList(linkData).then(res=>{
       let resdata=res.data;
      if (resdata.code==0){
        if (resdata.data.records.length > 0 && resdata.data.records.length<20){
           that.setData({
             sizejudge:0
           })
         }else{
          that.setData({
            sizejudge:1
          })
         }
        if (that.data.pageNum==1){
          tempData = resdata.data.records
         }else{
          tempData = that.data.functionData.concat(resdata.data.records)
         }
        
        that.setData({
          functionData: tempData
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

  //功能区详情
  funcDetail:function(e){
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../functionDetail/functionDetail?id='+id,
    })
  },

  //分类管理
  classifyManage:function(e){
    let id=e.currentTarget.dataset.id;
    let hotelId = e.currentTarget.dataset.hotelid;
    let funcCnName = e.currentTarget.dataset.funccnname;
    wx.navigateTo({
      url: '../classifyManage/classifyManage?id=' + id + '&hotelId=' + hotelId + '&funcCnName=' + funcCnName,
    })
  },

  //修改功能区
  editFunction:function(e){
    let that=this;
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../editFunction/editFunction?id='+id,
    })
  },

  //删除功能区
  delFun:function(e){
   let that=this;
   let id=e.currentTarget.dataset.id;
   wx.showModal({
     title: '提示',
     content: '确定删除该功能区吗',
     success(res){
       if(res.confirm){
         that.suredelFun(id);
       }
     },
   })
  },

  //确定删除
  suredelFun:function(id){
    let that=this;
    wxrequest.hotelFunctionDelete(id).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
         that.setData({
           pageNum:1
         })
         wx.showToast({
           title: '删除功能区成功',
           icon:'none',
           duration:2000
         })
         that.hotelFunctionList()
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    that.setData({
      functionData: [],
      pageNum:1
    })
    that.hotelFunctionList();
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
        pageNum: nowpageNum+1
      })
      this.hotelFunctionList();
    } 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})