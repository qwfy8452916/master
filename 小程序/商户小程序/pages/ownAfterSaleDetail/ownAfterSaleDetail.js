// pages/ownAfterSaleDetail/ownAfterSaleDetail.js
const app=getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
     id:'', //详情id
     diajudge:false,
     saleDetail:{}, //售后数据
    accessoryPath:[], //退款凭证
    divideDetailData:{}, //退款信息
    diajudge: false,
    diajudge2: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.afterSaleDetail(options.id)
  },

  //获取数据
  afterSaleDetail:function(id){
    let that=this;
    wxrequest.afterSaleDetail(id).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
        that.setData({
          saleDetail:resdata.data,
          accessoryPath: resdata.data.certificateImages
        })
        that.getDiveideDetail(resdata.data.orderDetailId)
      }else{
        wx.showToast({
          title:resdata.msg,
          icon:'nonw',
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

  //订单信息---分成详情
  getDiveideDetail:function(id){
    let that=this;
    let linkData={
      orderDetailId: id,
      orderType:1,
    }
    wxrequest.getDiveideDetail(linkData).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
        that.setData({
          divideDetailData:resdata.data
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


  //处理
  refund: function (e) {
    let type = e.currentTarget.dataset.cstype;
    let refoundAmount = e.currentTarget.dataset.refoundamount;
    let id = e.currentTarget.dataset.id;

    if (type == 2 || type == 4) {
      this.setData({
        diajudge: true,
        cstype: type,
        refoundAmount: refoundAmount,
        handleRemark: "",
        supplierLogisticsCode: "",
        supplierLogisticsInfo: "",
        id: id,
      })
    } else if (type == 1) {
      this.setData({
        diajudge2: true,
        handleRemark: "",
        supplierLogisticsCode: "",
        supplierLogisticsInfo: "",
        refoundAmount: "",
        id: id,
      })
    }

  },

  //拒绝
  refusebtn: function (e) {
    let that = this;
    let refusebtn = e.currentTarget.dataset.refusebtn;
    if (refusebtn === 'diajudge') {
      if (!this.data.handleRemark.toString()) {
        wx.showToast({
          title: '请填写备注',
          icon: 'none',
          duration: 2000
        })
        return false;
      }

    }

    that.handleaftersale(3)
  },

  //通过
  adoptbtn: function (e) {
    let that = this;
    let adoptbtn = e.currentTarget.dataset.adoptbtn;

    if (adoptbtn === 'diajudge2') {
      if (!that.data.supplierLogisticsInfo.toString()) {
        wx.showToast({
          title: '请填写商家发货物流公司',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
      if (!that.data.supplierLogisticsCode.toString()) {
        wx.showToast({
          title: '请填写商家发货物流单号',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
    }
    that.handleaftersale(2)
  },

  //通过拒绝请求
  handleaftersale: function (status) {
    let that = this;
    let refoundAmount = that.data.refoundAmount;
    if (refoundAmount != '') {
      refoundAmount = parseFloat(refoundAmount)
      refoundAmount = refoundAmount.toFixed(2);
      that.setData({
        refoundAmount: refoundAmount
      })
    }

    let linkData = {
      supplierLogisticsCode: that.data.supplierLogisticsCode,
      supplierLogisticsInfo: that.data.supplierLogisticsInfo,
      autualRefoundAmount: that.data.refoundAmount,
      handleRemark: that.data.handleRemark,
      result: status,
    }


    wx.showLoading({
      title: '处理中',
    })
    wxrequest.handleSaleApply(linkData, that.data.id).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: "操作成功",
          icon: 'none',
          duration: 2000
        })
        that.setData({
          diajudge: false,
          diajudge2: false
        })
        wx.redirectTo({
          url: '../ownAfterSale/ownAfterSale',
        })
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: "none",
          duration: 2000
        })
      }

    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon: "none",
        duration: 2000
      })
    })
  },

  //退款金额
  inputrefoundAmount(e) {
    let refoundAmount = e.detail.value;
    this.setData({
      refoundAmount: refoundAmount
    })
  },

  //备注
  inputhandleRemark: function (e) {
    let handleRemark = e.detail.value;
    this.setData({
      handleRemark: handleRemark
    })
  },

  //商家物流公司
  logisticsInfo: function (e) {
    let supplierLogisticsInfo = e.detail.value;
    this.setData({
      supplierLogisticsInfo: supplierLogisticsInfo
    })
  },

  //商家物流单号
  logisticsCode: function (e) {
    let supplierLogisticsCode = e.detail.value;
    this.setData({
      supplierLogisticsCode: supplierLogisticsCode
    })
  },

  //关闭
  diaclose:function(){
    this.setData({
      diajudge: false
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