// pages/package/pages/functionProdAdd/functionProdAdd.js
const app = getApp();
import wxrequest from '../../../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    functionProdData:{
      funcId: '',   //功能区id
      hotelProdId: '',  //商品id
      sort:0, //排序
    }, //功能区商品数据
    functionList: [],  //功能区
    functionIndex:'',
    typeData:[], //分类数据
    typeIdData:[], //分类id
    prodList:[], //商品列表
    prodIndex:'',
    opencloseJudge:false,
    isPickUp:false,  //自提区判断

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    this.getHotelFunctionList();
  },

  //添加
  sureBtn:function(){
    let that=this;
    if (this.data.functionProdData.funcId==''){
      wx.showToast({
        title: '请选择功能区',
        icon:'none',
        duration:2000
      })
      return false;
    }

    if (this.data.functionProdData.hotelProdId == '') {
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    let linkData={
      hotelId: wx.getStorageSync('hotelId'),
      funcId: this.data.functionProdData.funcId,
      hotelProdId: this.data.functionProdData.hotelProdId,
      marketCategoryIds: this.data.typeIdData,
      sort: this.data.functionProdData.sort,
    }
    wxrequest.functionProdAdd(linkData).then(res=>{
      let resdata=res.data;
      if (resdata.code==0){
         wx.showToast({
           title: '添加商品成功！',
           icon:'none',
           duration:2000
         })
         wx.navigateBack({
           delta:1
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

  //功能区
  getHotelFunctionList:function(){
    let that=this;
    let linkData={
      hotelId: wx.getStorageSync('hotelId')
    }
    wxrequest.getHotelFunctionList(linkData).then(res=>{
        let resdata=res.data;
        if(resdata.code==0){
          let nowfunctionList=resdata.data.map(item=>{
            return {
              id:item.id,
              funcCnName: item.funcCnName
            }
          })
          that.setData({
            functionList: nowfunctionList
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

  //功能区列表


  //功能区分类 - 树
  funClassifyTree:function(){
    let that=this;
    if (that.data.functionProdData.funcId==''){
       return false;
    }
    let linkdata={
      hotelId: wx.getStorageSync('hotelId'),
      funcId: that.data.functionProdData.funcId,
    }
    wxrequest.funClassifyTree(linkdata).then(res=>{
       let resdata=res.data;
      if (resdata.code==0){
        let nowtypeData = resdata.data;
        nowtypeData.map(item=>{
            item.oneJudge=false;
          item.closeJudge = true;
          if (item.childDtoList != null && item.childDtoList.length>0){
            item.childDtoList.map(cellitem=>{
              cellitem.twoJudge=false;
            })
          }
          return item
        })
           that.setData({
             typeData: nowtypeData
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

  //选择功能区
  bindPickerFun:function(e){
    let that=this;
    let index=e.detail.value;
    this.setData({
      'functionProdData.funcId': that.data.functionList[index].id,
      functionIndex:index
    })
    that.funClassifyTree();
    that.getProdList();
  },

  //选择分类
  oneType:function(e){
    let that=this;
    let index=e.currentTarget.dataset.index;
    let id=e.currentTarget.dataset.id;
    let nowtypeIdData = that.data.typeIdData;
    let nowtypeData = that.data.typeData;
   
    if (nowtypeIdData.indexOf(id)==-1){
      nowtypeIdData.push(id)
      nowtypeData[index].oneJudge=true
    }else{
      let delIndex = nowtypeIdData.indexOf(id)
      nowtypeIdData.splice(delIndex,1)
      nowtypeData[index].oneJudge = false
    }
    
    let nowchildDtoList = nowtypeData[index].childDtoList;
    let result;
    if (nowchildDtoList!=null){
      result = nowchildDtoList.some(item => {
        if (item.twoJudge) {
          return item
        }
      })
    }

    nowtypeData[index].closeJudge = result
    

    this.setData({
      typeData: nowtypeData,
      typeIdData: nowtypeIdData
    })
  },

  //选择二级分类
  twoType:function(e){
    let that=this;
    let id = e.currentTarget.dataset.twoid;
    let oneindex = e.currentTarget.dataset.oneindex;
    let twoindex = e.currentTarget.dataset.twoindex;
    let nowtypeIdData = that.data.typeIdData;
    let nowtypeData = that.data.typeData;
    if (nowtypeIdData.indexOf(id) == -1) {
      nowtypeIdData.push(id)
      nowtypeData[oneindex].childDtoList[twoindex].twoJudge = true
    } else {
      let delIndex = nowtypeIdData.indexOf(id)
      nowtypeIdData.splice(delIndex, 1)
      nowtypeData[oneindex].childDtoList[twoindex].twoJudge = false
    }
    this.setData({
      typeData: nowtypeData,
      typeIdData: nowtypeIdData
    })
  },

  //商品列表
  getProdList:function(){
    let that=this;
    if (that.data.functionProdData.funcId == '') {
      return false;
    }
    let linkdata = {
      hotelId: wx.getStorageSync('hotelId'),
      funcId: that.data.functionProdData.funcId,
    }
    wxrequest.getFunctionProdList(linkdata).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
         let nowprodList=resdata.data.map(item=>{
           return {
             id: item.id,
             prodName: item.prodProductDTO.prodName,
             prodShowName : item.prodProductDTO.prodShowName,
             prodTypeName : item.prodTypeName,
             prodKindName : item.prodKindName,
             prodSupplName : item.prodProductDTO.prodSupplName,
             delivWayNames : item.delivWayNames,
             prodWarrantyPeriod : item.prodProductDTO.prodWarrantyPeriod,
             prodUnitMeasure : item.prodProductDTO.prodUnitMeasure,
             prodSupplyPrice : item.prodSupplyPrice,
             prodRetailPrice : item.prodRetailPrice,
             prodMarketPrice : item.prodMarketPrice,
             availableSaleQty : item.availableSaleQty,
             pickUpPointNames: item.pickUpPointNames
           }
         })
         that.setData({
           prodList: nowprodList
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

  //选择商品
  bindPickerProd:function(e){
    let that=this;
    let index=e.detail.value;
    let nowprodList = this.data.prodList;
    let nowfunctionProdData = this.data.functionProdData;
    

    let prodInfo = nowprodList.find(item => item.id == nowprodList[index].id);
    let nowisPickUp = that.data.isPickUp;


    //自提区
    if (prodInfo.delivWays!=null){
      let ztIndex = prodInfo.delivWays.indexOf("4");
      if (ztIndex != -1) {
        nowisPickUp = true;
      } else {
        nowisPickUp = false;
      }
    }
    
    nowfunctionProdData.prodShowName = prodInfo.prodShowName;
    nowfunctionProdData.prodTypeName = prodInfo.prodTypeName;
    nowfunctionProdData.prodKindName = prodInfo.prodKindName;
    nowfunctionProdData.prodSupplName = prodInfo.prodSupplName;
    nowfunctionProdData.delivWayNames = prodInfo.delivWayNames;
    nowfunctionProdData.prodWarrantyPeriod = prodInfo.prodWarrantyPeriod;
    nowfunctionProdData.prodUnitMeasure = prodInfo.prodUnitMeasure;
    nowfunctionProdData.prodSupplyPrice = prodInfo.prodSupplyPrice;
    nowfunctionProdData.prodRetailPrice = prodInfo.prodRetailPrice;
    nowfunctionProdData.prodMarketPrice = prodInfo.prodMarketPrice;
    nowfunctionProdData.availableSaleQty = prodInfo.availableSaleQty;
    nowfunctionProdData.pickUpPointNames = prodInfo.pickUpPointNames;

    nowfunctionProdData.hotelProdId = nowprodList[index].id;
    


    this.setData({
      prodIndex: index,
      functionProdData: nowfunctionProdData,
      isPickUp: nowisPickUp,
    })


  },

  //展开未展开
  switchClose:function(){
    this.setData({
      opencloseJudge: !this.data.opencloseJudge,
      
    })
  },

  //排序
  sortpx:function(e){
    let value=e.detail.value;
    this.setData({
      'functionProdData.sort': value
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