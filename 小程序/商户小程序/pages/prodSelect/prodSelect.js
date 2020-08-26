// pages/prodSelect/prodSelect.js
const app=getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    prodData:[], //商品数据
    selectprodData:[], //选中的商品数据
    selectActive:[], //选中的商品样式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProdList();
  },

  //确定
  surebtn:function(){

    wx.setStorageSync('selectprodData', this.data.selectprodData);
    
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      prodjudge: true,
      funjudge: false,
      typejudge: false,
      groupjudge: false,
      roomjudge: false,
      scenejudge: false,
      drawWaysjudge: false,
    })
    wx.navigateBack({
      delta: 1
    })

  },

  //选择商品
  selectProd:function(e){
    let that=this;
    let index = e.currentTarget.dataset.index;
    let nowprodData = that.data.prodData;

    let nowselectprodData = that.data.selectprodData;
    let flagIndex;
    if (nowselectprodData.length > 0) {
      
      let flag = nowselectprodData.some((item, valueindex) => {
        if (item.id == nowprodData[index].id) {
          flagIndex = valueindex
          return true
        }
      })
      if (flag) {
        nowselectprodData.splice(flagIndex, 1)
      } else {
        nowselectprodData.push(nowprodData[index])
      }

      // if (JSON.stringify(nowselectprodData).indexOf(JSON.stringify(nowprodData[index])) == -1) {
      //   nowselectprodData.push(nowprodData[index])
      // } else {
      //   for (var i = 0; i < nowselectprodData.length; i++) {
      //     if (nowselectprodData[i].id == nowprodData[index].id) {
      //       nowselectprodData.splice(i, 1)
      //     }
      //   }
      // }
    } else {
      nowselectprodData.push(nowprodData[index])
    }
    let nowIndex = "selectActive[" + index + "]";
    that.setData({
      selectprodData: nowselectprodData,
      [nowIndex]: !that.data.selectActive[index],
    })

  },


  //商品列表
  getProdList:function(){
    let that=this;
    let linkData={
      hotelId: wx.getStorageSync('hotelId'),
      prodCode: '',
      orgAs: 3,
    }
    wxrequest.getAppointProd(linkData).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
         let nowprodData = that.data.prodData;
         nowprodData = resdata.data.map(item => {
           return {
             id: item.id,
             prodCode: item.prodCode,
             prodProductDTO: item.prodProductDTO,
             prodName: item.prodName,
             prodShowName: item.prodShowName,
             prodKindName: item.prodKindName,
             prodOwnerOrgName: item.prodOwnerOrgName,
           }
         })

         let nowselectActive = [];
         let nowselectprodData = wx.getStorageSync('selectprodData') ? wx.getStorageSync('selectprodData') : [];
         if (nowselectprodData && nowselectprodData.length > 0) {

           for (let i = 0; i < nowprodData.length; i++) {
             for (let j = 0; j < nowselectprodData.length; j++) {
               if (nowprodData[i].id == nowselectprodData[j].id) {
                 nowselectActive[i] = true
                 break;
               } else {
                 nowselectActive[i] = false
               }
             }
           }
         }

         that.setData({
           prodData: nowprodData,
           selectActive: nowselectActive,
           selectprodData: nowselectprodData
         })
       }else{
         wx.showToast({
           title: resdata.msg,
           icon: 'none',
           duration: 2000
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