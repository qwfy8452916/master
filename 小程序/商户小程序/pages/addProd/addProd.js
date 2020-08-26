// pages/addProd/addProd.js
const app=getApp();
import wxrequest from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    funcId: "",
    funcName: "",
    categoryList: [],   //市场分类
    categoryIndex:'',
    funProdData:{
      categoryId:'',
      prodCode:'',
      funcProdSpecId:'',
    },
    prodList: [],   //商品
    prodListIndex:'',
    specList: [],   //规格
    specListIndex:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.hotelOrderDetails(options.id);
  },

  //确定
  surebtn:function(){
    let that=this;
    let nowfunProdData = this.data.funProdData;
    
    if (nowfunProdData.categoryId==''){
      wx.showToast({
        title: '请选择市场分类',
        icon:'none',
        duration:2000
      })
      return false;
    }
    if (nowfunProdData.prodCode == '') {
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (nowfunProdData.funcProdSpecId == '' && that.data.specList.length>0) {
      wx.showToast({
        title: '请选择规格',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    console.log(nowfunProdData)
    let prodAdd={
      id: '',
      prodCode: nowfunProdData.prodCode,
      prodLogoUrl: nowfunProdData.prodLogoUrl,
      prodName: nowfunProdData.prodName,
      prodShowName: nowfunProdData.prodShowName,
      prodCount: nowfunProdData.prodCount,
      prodPrice: nowfunProdData.prodPrice,
      funcProdId: nowfunProdData.funcProdId,
      funcProdSpecId: nowfunProdData.funcProdSpecId,
      hotelProdId: nowfunProdData.hotelProdId,
      prodCategoryId: nowfunProdData.categoryId,
    }
    wx.setStorageSync('prodAdd', prodAdd)
    wx.redirectTo({
      url: '../foodOrderEdit/foodOrderEdit?prodAdd='+true+'&id='+that.data.id,
    })

  },


  //获取市场分类
  getCategoryList:function(){
    let that=this;
    let linkData={
      funcId: this.data.funcId,
      hotelId: wx.getStorageSync('hotelId'),
    }
    wxrequest.functionClassifyTree(linkData).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
         let nowcategoryList
         if(resdata.data.length!=0){
           nowcategoryList=resdata.data.map(item=>{
             return {
               id:item.id,
               categoryName: item.categoryName,
             }
           })
         }else{
           nowcategoryList=[];
         }
        that.setData({
          categoryList: nowcategoryList
        })
      }else{
        wx.showToast({
          title:resdata.msg,
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
  

  //获取详情
  hotelOrderDetails: function (id) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.hotelOrderDetails(id).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        that.setData({
          funcId: resdata.data.orderDetailDTOList[0].funcId,
          funcName: resdata.data.orderDetailDTOList[0].funcName,
        })
        that.getCategoryList();
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  },

  //选择市场分类
  bindPickerCategory(e){
    let nowcategoryList = this.data.categoryList;
    let index=e.detail.value;
    this.setData({
      categoryIndex: index,
      'funProdData.categoryId': nowcategoryList[index].id,
      'funProdData.prodCode': '',
      'funProdData.funcProdSpecId': '',
      prodListIndex: '',
      specListIndex: '',
    })
    this.getProdList();
  },

  //获取商品
  getProdList(){
    let that=this;
    let linkData={
      categoryId: that.data.funProdData.categoryId,
      hotelId: wx.getStorageSync('hotelId'),
    }
    wxrequest.getFuncProdList(linkData).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
          let nowprodList
          if(resdata.data.length!=0){
            nowprodList=resdata.data.map(item=>{
              return {
                id: item.prodCode,
                prodLogoUrl: item.prodLogoUrl,
                prodName: item.prodName,
                prodShowName: item.prodShowName,
                prodCount: 1,
                prodPrice: item.prodRetailPrice,
                funcProdId: item.funcProdId,
                hotelProdId: item.hotelProdId,
              }
            })
          }else{
            nowprodList=[];
          }
         that.setData({
           prodList: nowprodList
         })
       }else{
         wx.showToast({
           title: resdata.msg,
           icon:"none",
           duration:2000
         })
       }
    }).catch(err=>{
      wx.showToast({
        title: err,
        icon:"none",
        duration:2000
      })
    })

  },

  //选择商品
  bindPickerProd:function(e){
    let that=this;
    let nowprodList = this.data.prodList;
    let index=e.detail.value;
    let prodid = nowprodList[index].id;
    let prodInfo = nowprodList.find(item => item.id == prodid);

    this.setData({
      prodListIndex:index,
      'funProdData.prodCode': nowprodList[index].id,
      'funProdData.prodLogoUrl': prodInfo.prodLogoUrl,
      'funProdData.prodName': prodInfo.prodName,
      'funProdData.prodShowName': prodInfo.prodShowName,
      'funProdData.prodCount': prodInfo.prodCount,
      'funProdData.prodPrice': prodInfo.prodPrice,
      'funProdData.funcProdId': prodInfo.funcProdId,
      'funProdData.hotelProdId': prodInfo.hotelProdId,
      'funProdData.funcProdSpecId': '',
      specListIndex: '',
    })
    this.getProdSpecList(prodInfo.funcProdId);
  },

  //获取商品规格
  getProdSpecList: function (funcProdId){
    let that=this;
    let linkData={
        funcProdId: funcProdId,
    }
    wxrequest.funcProdSpecsList(linkData).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
         let nowspecList;
         if(resdata.data.length!=0){
           nowspecList=resdata.data.map(item=>{
             return {
               id:item.id,
               specName: item.specName,
             }
           })
          
         }else{
           nowspecList=[];
         }
         that.setData({
           specList: nowspecList
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

  //选择规格
  bindPickerSpec:function(e){
    let that=this;
    let nowspecList = this.data.specList;
    let index=e.detail.value;
    this.setData({
      specListIndex:index,
      'funProdData.funcProdSpecId': nowspecList[index].id,
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