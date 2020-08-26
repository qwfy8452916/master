// pages/funselect/funselect.js
const app=getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    funData:[], //功能区数据
    selectActive:[], //选择功能区样式
    selectFunData:[],  //选择功能区数据
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.getFunctionList();
    
  },

  //确定
  surebtn:function(){
    
    wx.setStorageSync('selectFunData', this.data.selectFunData)
    
    let pages = getCurrentPages(); 
    let prevPage = pages[pages.length - 2]; 
    prevPage.setData({
      funjudge:true,
      typejudge: false,
      prodjudge: false,
      groupjudge: false,
      roomjudge: false,
      scenejudge: false,
      drawWaysjudge: false,
    })
    wx.navigateBack({
      delta: 1 
    })

  },

  //选择功能区
  funitem: function (e) {
    let that=this;
    let index=e.currentTarget.dataset.index;
    let nowfunData = that.data.funData;
    let nowselectFunData = that.data.selectFunData;
    let flagIndex;
    if (nowselectFunData.length>0){
      let flag = nowselectFunData.some((item,valueindex) => {
        if (item.id == nowfunData[index].id) {
          flagIndex = valueindex
          return true
        }
      })
      if(flag){
        nowselectFunData.splice(flagIndex, 1)
      }else{
        nowselectFunData.push(nowfunData[index])
      }
      // if (JSON.stringify(nowselectFunData).indexOf(JSON.stringify(nowfunData[index]))==-1){
      //   nowselectFunData.push(nowfunData[index])
      // }else{
      //   for (var i = 0; i < nowselectFunData.length;i++){
      //     if (nowselectFunData[i].id == nowfunData[index].id){
      //       nowselectFunData.splice(i, 1)
      //     }
      //   }
      // }
    } else {
      nowselectFunData.push(nowfunData[index])
    }
    let nowIndex = "selectActive[" + index +"]";
    that.setData({
      selectFunData: nowselectFunData,
      [nowIndex]: !that.data.selectActive[index],
    })


  },

  //功能区列表
  getFunctionList:function(){
    let that=this;
    let linkData={
      funcName:'',
      hotelId: wx.getStorageSync("hotelId")
    }
    wxrequest.getCouponFunctionList(linkData).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
        let nowfunData=resdata.data.map(item=>{
          return {
            id:item.id,
            funcCnName: item.funcCnName,
            getTypeData: [],
            categoryIds: [],
          }
        })
        let nowselectActive=[];
        let nowselectFunData = wx.getStorageSync('selectFunData') ? wx.getStorageSync('selectFunData'):[];
        if (nowselectFunData && nowselectFunData.length>0){
          console.log("zou")
          
          for (let i = 0; i < nowfunData.length;i++){
            for (let j = 0; j < nowselectFunData.length;j++){
              if (nowfunData[i].id == nowselectFunData[j].id){
                nowselectActive[i]=true
                break;
               }else{
                nowselectActive[i] = false
               }
             }
          }
        }
        // let nowselectActive = this.data.selectActive;
        // for (let i = 0; i < nowfunData.length; i++) {
        //   nowselectActive[i] = false;
        // }
        this.setData({
          funData: nowfunData,
          selectActive: nowselectActive,
          selectFunData: nowselectFunData
        })
        // console.log(that.data.selectActive)
        // console.log(that.data.selectFunData)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})