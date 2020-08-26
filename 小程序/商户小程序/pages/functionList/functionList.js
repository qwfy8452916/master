// pages/functionList/functionList.js
const app=getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    functionData:[], //功能区数据
    pageNum:1, //当前页
    sizejudge:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let that=this;
     that.hotelFunctionList();
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
      pageNo: this.pageNum,
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
        tempData = that.data.functionData.concat(resdata.data.records)
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
    if(sizejudge){
      this.setData({
        pageNum: ++nowpageNum
      })
    }
    this.hotelFunctionList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})