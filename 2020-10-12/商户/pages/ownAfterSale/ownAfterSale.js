// pages/ownAfterSale/ownAfterSale.js
const app=getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    id:'', //处理id
    switchJudge: false,
    orderStatusData: [
      { name: "全部", id: "" },
      { name: "待处理", id: "1" },
      { name: "已通过", id: "2" },
      { name: "已拒绝", id: "3" },
      { name: "已撤销", id: "4" },
    ],
    orderStatusId:1, //订单状态id
    orderStatusName:'待处理', //订单状态名称
    orderStatusIndex:1,
    csCode:'', //服务单号
    functionList: [], //功能区数据
    funcId: '', //功能区id
    funcIndex: '',
    funcName: '', //功能区名称
    date:'',
    date2:'',
    sizejudge: 0,
    searchData: [
      { name: "订单状态", desc: "", codeName: 'orderStatusId' },
      { name: "服务单号", desc: "", codeName: 'csCode' },
      { name: "功能区", desc: "", codeName: 'funcId' },
      { name: "申请时间", desc: "", desc2: '', codeName: 'date' },
    ],
    selfAfterSaleData:[], //售后数据
    pageNum:1,
    diajudge:false,
    diajudge2: false,
    supplierLogisticsInfo:'',
    supplierLogisticsCode:'',
    refoundAmount:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      authzData: wx.getStorageSync("pageAuthority"),
      searchDatabak: this.data.searchData
    })
    this.hotelFunctionList();
    this.selfAfterSale()
  },


  //处理
  refundbtn:function(e){
    let type = e.currentTarget.dataset.cstype;
    let refoundAmount = e.currentTarget.dataset.refoundamount;
    let id = e.currentTarget.dataset.id;
    
    // let handleRemark = e.currentTarget.dataset.handleremark;
    // let supplierLogisticsCode = e.currentTarget.dataset.supplierlogisticscode;
    // let supplierLogisticsInfo = e.currentTarget.dataset.logistics;
    if (type == 2 || type==4){
      this.setData({
        diajudge: true,
        cstype: type,
        refoundAmount: refoundAmount,
        handleRemark: "",
        supplierLogisticsCode: "",
        supplierLogisticsInfo: "",
        id: id,
      })
    } else if (type==1){
      this.setData({
        diajudge2: true,
        handleRemark: "",
        supplierLogisticsCode:"",
        supplierLogisticsInfo: "",
        refoundAmount:"",
        id: id,
      })
    }
    
  },

  //拒绝
  refusebtn:function(e){
    let that=this;
    let refusebtn = e.currentTarget.dataset.refusebtn;
    if (refusebtn ==='diajudge'){
      if (!this.data.handleRemark.toString()) {
        wx.showToast({
          title: '请填写备注',
          icon:'none',
          duration:2000
        })
        return false;
      }

    }
    
    that.handleaftersale(3) 
  },

  //通过
  adoptbtn:function(e){
    let that=this;
    let adoptbtn = e.currentTarget.dataset.adoptbtn;
    
    if (adoptbtn === 'diajudge2'){
      if (!that.data.supplierLogisticsInfo.toString()){
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
      // that.setData({
      //   diajudge2: false
      // })
    } 
    that.handleaftersale(2)
  },

  //通过拒绝请求
  handleaftersale: function (status){
    let that=this;
    let refoundAmount = that.data.refoundAmount;
    if (refoundAmount!=''){
      refoundAmount = parseFloat(refoundAmount)
      refoundAmount = refoundAmount.toFixed(2);
      that.setData({
        refoundAmount: refoundAmount
      })
    }
    
    let linkData={
      supplierLogisticsCode: that.data.supplierLogisticsCode,
      supplierLogisticsInfo: that.data.supplierLogisticsInfo,
      autualRefoundAmount: that.data.refoundAmount,
      handleRemark: that.data.handleRemark,
      result:status,
    }
    wx.showLoading({
      title: '处理中',
    })
    wxrequest.handleSaleApply(linkData,that.data.id).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      if (resdata.code==0){
        wx.showToast({
          title: "操作成功",
          icon:'none',
          duration:2000
        })
        that.setData({
        diajudge: false,
        diajudge2: false
      })
        that.selfAfterSale();
      }else{
        wx.showToast({
          title: resdata.msg,
          icon: "none",
          duration: 2000
        })
      }

    }).catch(err=>{
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon:"none",
        duration:2000
      })
    })
  },

  //退款金额
  inputrefoundAmount(e){
    let refoundAmount=e.detail.value;
    this.setData({
      refoundAmount: refoundAmount
    })
  },

  //备注
  inputhandleRemark:function(e){
    let handleRemark=e.detail.value;
    this.setData({
      handleRemark: handleRemark
    })
  },

  //商家物流公司
  logisticsInfo:function(e){
    let supplierLogisticsInfo = e.detail.value;
    this.setData({
      supplierLogisticsInfo: supplierLogisticsInfo
    })
  },

  //商家物流单号
  logisticsCode:function(e){
    let supplierLogisticsCode = e.detail.value;
    this.setData({
      supplierLogisticsCode: supplierLogisticsCode
    })
  },


  //售后数据
  selfAfterSale:function(){
    let that=this;
    let linkData={
      hotelId: wx.getStorageSync("hotelId"),
      csCode: that.data.csCode,
      funcId: that.data.funcId,
      status: that.data.orderStatusId,
      applTimeFrom:that.data.date,
      applTimeTo:that.data.date2,
      pageNo: that.data.pageNum,
      pageSize:20,
      orgAs: 3,
    }
    let tempData=[];

    let excessive = JSON.stringify(that.data.searchDatabak)
    let nowsearchData = JSON.parse(excessive);
    nowsearchData.map(item => {
      if (item.codeName === 'orderStatusId') {
        item.desc = that.data.orderStatusId.toString().length ? that.data.orderStatusName.trim() : '';
      } else if (item.codeName === 'csCode') {
        item.desc = that.data.csCode.trim();
      } else if (item.codeName === 'funcId') {
        item.desc = that.data.funcId.toString().length ? that.data.funcName.trim() : '';
      } else {
        item.desc = that.data.date.trim();
        item.desc2 = that.data.date2.trim();
      }
      return item;
    })
    this.setData({
      searchData: nowsearchData
    })

    wx.showLoading();
    wxrequest.selfAfterSale(linkData).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      if(resdata.code==0){
        if (resdata.data.records.length > 0 && resdata.data.records<20){
           that.setData({
             sizejudge:0
           })
         }else{
          that.setData({
            sizejudge: 1
          })
         }
        if (that.data.pageNum>1){
          tempData = that.data.selfAfterSaleData.concat(resdata.data.records)
         }else{
          tempData = resdata.data.records
         }
         that.setData({
           selfAfterSaleData: tempData
         })
      }else{
        wx.showToast({
          title: resdata.msg,
          icon:'none',
          duration:2000
        })
      }
    }).catch(err=>{
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon:'none',
        duration:2000
      })
    })
  },


  //删除条件
  delTerm: function (e) {
    let index = e.currentTarget.dataset.index;
    let nowsearchData = this.data.searchData;
    let codeName = e.currentTarget.dataset.name;
    if (codeName === 'orderStatusId') {
      this.setData({
        orderStatusId: '',
        orderStatusIndex: ''
      })
    } else if (codeName === 'csCode') {
      this.setData({
        csCode: '',
      })
    } else if (codeName === 'funcId') {
      this.setData({
        funcIndex: '',
        funcId: ''
      })
    } else {
      this.setData({
        date: '',
        date2: '',
      })
    }
    nowsearchData.splice(index, 1)
    this.setData({
      searchData: nowsearchData
    })
    this.selfAfterSale()
  },

  //搜索自营售后
  searchBtn: function () {
    
    this.setData({
      pageNum: 1,
      switchJudge: false
    })
    this.selfAfterSale()
  },


  //获取酒店功能区
  hotelFunctionList:function(){
    let that=this;
    wxrequest.hotelFunctionList().then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
        let nowfunctionList = resdata.data.records;
        let allObject={
          funcCnName:'全部',
          id:''
        }
        nowfunctionList.unshift(allObject)
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

  // 时间段选择  
  bindDateChange(e) {
    let that = this;
    let startdate = e.detail.value
    that.setData({
      date: e.detail.value,
      pageNum: 1,
    })
  },

  bindDateChange2(e) {
    let that = this;
    let enddate = e.detail.value;
    that.setData({
      date2: e.detail.value,
      pageNum: 1,
    })
  },

  //选择功能区
  bindPickerFun: function (e) {
    let index = e.detail.value;
    this.setData({
      funcIndex: index,
      funcId: this.data.functionList[index].id,
      funcName: this.data.functionList[index].funcCnName,
    })
  },

  //服务单号
  serverCode: function (e) {
    this.setData({
      csCode: e.detail.value
    })
  },


  //自营售后状态
  bindPickerOrder: function (e) {
    let that = this;
    let index = e.detail.value;
    this.setData({
      orderStatusIndex: index,
      orderStatusId: that.data.orderStatusData[index].id,
      orderStatusName: that.data.orderStatusData[index].name,
    })
  },


  switchdj: function () {
    this.setData({
      switchJudge: !this.data.switchJudge
    })
  },

  //重置
  reset:function(){
    this.setData({
      orderStatusId:'',
      orderStatusIndex:'',
      csCode:'',
      funcId:'',
      funcIndex:'',
      date:'',
      date2:''
    })
    this.selfAfterSale()
  },

  //获取详情
  detailbtn:function(e){
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../ownAfterSaleDetail/ownAfterSaleDetail?id='+id,
    })
  },

  //关闭
  saleDoalog:function(){
    this.setData({
      diajudge:false,
      diajudge2:false,
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
    this.setData({
      pageNum: 1
    })
    this.selfAfterSale()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let nowpageNum = this.data.pageNum;
    if (this.data.sizejudge){
       this.setData({
         pageNum: ++nowpageNum
       })
    }
    this.selfAfterSale()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})