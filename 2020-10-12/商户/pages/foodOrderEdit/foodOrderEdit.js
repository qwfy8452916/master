// pages/foodOrderEdit/foodOrderEdit.js
const app=getApp();
import wxrequest from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    detailId:'',
    funcId: "",
    foodData:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      authzData: wx.getStorageSync("pageAuthority"),
    })
    if (options.prodAdd){
      let nowfoodData = wx.getStorageSync('foodData');
      let prodAddData = wx.getStorageSync('prodAdd');
      let funcId = wx.getStorageSync('funcId');
        nowfoodData.push(prodAddData)
      this.setData({
        foodData: nowfoodData,
        funcId: funcId
      })
      console.log(this.data.foodData)
    }else{
      this.hotelOrderDetails(options.id);
    }
    
    this.setData({
      detailId: options.id
    })
  },


  //确定
  surebtn:function(){
    let that=this;
    if (this.data.foodData.length==0){
       wx.showToast({
         title: '商品列表不能为空！',
         icon:'none',
         duration:2000
       })
       return false;
    }
    let modifyProdData = this.data.foodData.map(item => {
      return {
        id: item.id,
        prodCode: item.prodCode,
        prodCount: item.prodCount,
        prodPrice: item.prodPrice,
        funcProdId: item.funcProdId,
        funcProdSpecId: item.funcProdSpecId,
        hotelProdId: item.hotelProdId,
        prodCategoryId: item.prodCategoryId,
        funcId: that.data.funcId,
        hotelId: wx.getStorageSync('hotelId'),
      }
      
    });
   
    let linkData={
      id: that.data.detailId,
      orderDetailDTOList: modifyProdData
    }
    for (let i= 0; i < modifyProdData.length;i++){
      if (modifyProdData[i].prodCount==='0'){
         wx.showToast({
           title: '商品数量不能为0',
           icon:'none',
           duration:2000
         })
         return false;
      } else if (modifyProdData[i].prodCount ==''){
        wx.showToast({
          title: '请添加商品数量',
          icon: 'none',
          duration: 2000
        })
        return false;
       }
       if (modifyProdData[i].prodPrice == '') {
        wx.showToast({
          title: '请填写商品金额',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
    }
    wx.showLoading({
      title: '加载中',
      icon: 'none',
      duration: 2000
    })
    wxrequest.hotelEatinOrderModify(linkData).then(res=>{
      wx,wx.hideLoading()
      let resdata=res.data;
      if(resdata.code==0){
        wx.showToast({
          title: '修改订单成功',
          icon:'none',
          duration:2000
        })
        wx.redirectTo({
          url: '../foodOrderDetail/foodOrderDetail?id=' + that.data.detailId,
        })
      }else{
        wx.showToast({
          title: resdata.msg,
          icon:'none',
          duration:2000
        })
      }
    }).catch(err=>{
      wx,wx.hideLoading()
      wx.showToast({
        title: err,
        icon:'none',
        duration:2000
      })
    })

  },


  //获取数据
  hotelOrderDetails: function (id) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.hotelOrderDetails(id).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        let nowdata
        if (resdata.data.orderDetailDTOList.length!=0){
          nowdata = resdata.data.orderDetailDTOList.map(item => {
              return {
                id: item.id,
                prodCode: item.prodCode,
                prodName: item.prodProductDTO.prodName,
                prodShowName: item.prodProductDTO.prodShowName,
                prodLogoUrl: item.prodProductDTO.prodLogoUrl,
                prodCount: item.prodCount,
                prodPrice: item.prodPrice,
                funcProdId: item.funcProdId,
                funcProdSpecId: item.funcProdSpecId,
                hotelProdId: item.hotelProdId,
                prodCategoryId: item.prodCategoryId,
                prodSpecs: item.prodSpecs
              }
          });
        }
        
        wx.setStorageSync('funcId', resdata.data.orderDetailDTOList[0].funcId)
        that.setData({
          foodData: nowdata,
          funcId: resdata.data.orderDetailDTOList[0].funcId
        })
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



  //商品价格
  inputmoney:function(e){
    let index=e.currentTarget.dataset.index;
    let amount = e.detail.value;
    let nowAmount = "foodData[" + index + "].prodPrice";
    this.setData({
      [nowAmount]: amount
    })
  },


  //加
  plus:function(e){
    let index=e.currentTarget.dataset.index;
    let number = this.data.foodData[index].prodCount;
    let nowNum = "foodData[" + index +"].prodCount";
    this.setData({
      [nowNum]: ++number
    })
  },

  //减
  reduce:function(e){
    let index = e.currentTarget.dataset.index;
    let number = this.data.foodData[index].prodCount;
    let nowNum = "foodData[" + index + "].prodCount";
    if (number>1){
      this.setData({
        [nowNum]: --number
      })
     }
  },

  //添加商品
  addProd:function(e){
    wx.setStorageSync('foodData', this.data.foodData)
    let id=e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '../addProd/addProd?id='+id,
    })
  },

  //移除
  removebtn:function(e){
    let that=this;
    let index=e.currentTarget.dataset.index;
    let nowfoodData = this.data.foodData;
    nowfoodData.splice(index,1);
    this.setData({
      foodData: nowfoodData
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