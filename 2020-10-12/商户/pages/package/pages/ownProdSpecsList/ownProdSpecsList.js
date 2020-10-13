// pages/package/pages/ownProdSpecsList/ownProdSpecsList.js
const app = getApp();
import wxrequest from '../../../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //商品id
    isInvShow: false,
    isSafeInv: true,
    isFreeShip: false,
    isPickUp: false,
    prodData: {

    }, //商品数据
    prodSpecsDataList: [],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      id: options.id
    })
    this.ownCommodityDetail();
    this.hotelProdSpecsList();
  },


  //获取商品信息
  ownCommodityDetail: function () {
    let that = this;
    let nowprodData = this.data.prodData;
    wxrequest.ownCommodityDetail(that.data.id).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        nowprodData = {
          prodName: resdata.data.prodProductDTO.prodName,
          prodShowName: resdata.data.prodProductDTO.prodShowName,
          prodCode: resdata.data.prodProductDTO.prodCode,
          prodType: resdata.data.prodProductDTO.prodType,
          vouBatchId: resdata.data.prodProductDTO.vouBatchId,
          prodUnitMeasure: resdata.data.prodProductDTO.prodUnitMeasure,
          prodSupplName: resdata.data.prodProductDTO.prodSupplName,
          prodSupplyPrice: resdata.data.prodSupplyPrice,
          prodRetailPrice: resdata.data.prodRetailPrice,
          prodMarketPrice: resdata.data.prodMarketPrice,
          delivWays: resdata.data.delivWays,
          isNeedInv: resdata.data.isNeedInv,
          prodSafeCount: resdata.data.prodSafeCount,
          availableSaleQty: resdata.data.availableSaleQty,
          isFreeShipping: resdata.data.isFreeShipping,
          expressFeeId: resdata.data.expressFeeId,
          pickUpPointIds: resdata.data.pickUpPointIds,
          prodWarrantyPeriod: resdata.data.prodProductDTO.prodWarrantyPeriod,
          delivWayNames: resdata.data.delivWayNames
        }

        //店内送
        let dnsIndex = resdata.data.delivWays.indexOf("1");
        //迷你吧
        let mnbIndex = resdata.data.delivWays.indexOf("3");
        if (dnsIndex == -1 && mnbIndex == -1) {
           that.setData({
             isInvShow:false
           })
        } else {
          that.setData({
            isInvShow: true
          })
        }
        //快递送
        let kdIndex = resdata.data.delivWays.indexOf("2");
        if (kdIndex != -1) {
          that.setData({
            isFreeShip: true
          })
        } else {
          that.setData({
            isFreeShip: false
          })
        }
        //自提区
        let ztIndex = resdata.data.delivWays.indexOf("4");
        if (ztIndex != -1) {
          that.isPickUp = true;
          that.setData({
            isPickUp: true
          })
        } else {
          that.setData({
            isPickUp: false
          })
        }


        that.setData({
          prodData: nowprodData,
        })

      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  },

 //酒店商品规格列表
  hotelProdSpecsList:function(){
    let that=this;
    let linkData={
      hotelProdId:that.data.id
    }
    wxrequest.hotelProdSpecsList(linkData).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
         that.setData({
           prodSpecsDataList:resdata.data
         })
         console.log(that.data.prodSpecsDataList)
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

  //移除
  removeBtn:function(e){
   let that=this;
   let id=e.currentTarget.dataset.id;
   wx.showModal({
     title: '提示',
     content: '确定移除该商品规格',
     success(res){
       if(res.confirm){
         that.removeSure(id);
       }
     }
   })
  },

  removeSure:function(id){
    let that=this;
    wxrequest.hotelProdSpecsDelete(id).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
         wx.showToast({
           title:"移除商品规格成功！",
           icon:'none',
           duration:2000
         })
        that.hotelProdSpecsList();
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



  //展开未展开
  switchClose: function () {
    this.setData({
      opencloseJudge: !this.data.opencloseJudge,
    })
  },

  //添加规格
  addSpec:function(){
    wx.navigateTo({
      url: '../ownProdSpecsAdd/ownProdSpecsAdd?id='+this.data.id,
    })
  },

  //修改规格
  editBtn:function(e){
    let specId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../ownProdSpecsEdit/ownProdSpecsEdit?id=' + specId,
    })
  },

 //规格详情
  detailBtn:function(e){
    let specId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../ownProdSpecsDetail/ownProdSpecsDetail?id=' + specId,
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
    this.hotelProdSpecsList();
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