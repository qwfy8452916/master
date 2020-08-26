// pages/transferRecord/transferRecord.js
const app=getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    pageNum:1,
    giveRecordData:[], //转赠记录数据
    sizejudge:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.giveRecord()
  },

  //获取转赠记录
  giveRecord:function(){
    let that=this;
    let tempDataSet=[];
    let linkData={
      vouId:that.data.id,
      pageNo: that.data.pageNum,
      pageSize: 20,
    }
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.giveRecord(linkData).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      if(resdata.code==0){
        if (0 < resdata.data.records && resdata.data.records<20){
            that.setData({
              sizejudge:0
            })
         }else{
              that.setData({
                sizejudge: 1
              })
         }
        if (that.data.pageNum>1){
          tempDataSet = that.data.giveRecordData.concat(resdata.data.records)
         }else{
          tempDataSet = resdata.data.records
         }
        let nowtempDataSet=tempDataSet.map(item=>{
          item.firstGetTimedate = item.firstGetTime.split(" ")[0]
          item.firstGetTime = item.firstGetTime.split(" ")[1]
          item.givedTimedate = item.givedTime.split(" ")[0]
          item.givedTime = item.givedTime.split(" ")[1]
          return item
         })
         that.setData({
           giveRecordData: tempDataSet
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
    let that=this;
    let nowpageNum = that.data.pageNum;
    if(that.data.sizejudge){
      that.setData({
        pageNum: ++nowpageNum
      })
      that.giveRecord();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})