// pages/package/pages/plateProdSlect/plateProdSlect.js
const app=getApp();
import wxrequest from '../../../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    funcId:'', //功能区id
    prodData:[], //商品数据
    selectprodData:[], //选中的商品数据
    selectActive:[], //选中的商品样式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectprodData:JSON.parse(options.selectprodData),
      funcId:options.funcId,
      prodjudge:options.prodjudge,
      prodScopeType:options.prodScopeType,
    })
    this.getProdList();
  },

  //确定
  surebtn:function(){
    
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      selectprodData:this.data.selectprodData,
      prodjudge: true,
      typejudge:false,
      roomjudge:false

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
    let prodScopeType=that.data.prodScopeType;
    let nowactive;

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
        nowactive=false
        nowselectprodData.splice(flagIndex, 1)
      } else {
        if(prodScopeType!=1){
          nowactive=true
          nowselectprodData.push(nowprodData[index])
        }
      }
    } else {
      nowselectprodData.push(nowprodData[index])
      nowactive=true
    }
    let nowIndex = "selectActive[" + index + "]";
    that.setData({
      selectprodData: nowselectprodData,
      [nowIndex]: nowactive,
    })

  },


  //商品列表
  getProdList:function(){
    let that=this;
    let linkData={
      hotelId:wx.getStorageSync('hotelId'),
      funcId:this.data.funcId,
      prodCode:'',
    }
    wxrequest.functionProdList(linkData).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
         let nowprodData = that.data.prodData;
         nowprodData = resdata.data.records.map(item => {
           return {
             id: item.id,
             prodCode: item.prodCode,
             prodProductDTO: item.hotelProduct.prodProductDTO,
             prodName: item.hotelProduct.prodName,
             prodShowName: item.hotelProduct.prodShowName,
             prodKindName: item.hotelProduct.prodKindName,
             prodOwnerOrgName: item.hotelProduct.prodOwnerOrgName,
           }
         })

         let nowselectActive = [];
         let nowselectprodData = that.data.selectprodData
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
         console.log(that.data.prodData)
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