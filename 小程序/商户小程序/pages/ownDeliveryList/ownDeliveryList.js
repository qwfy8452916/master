// pages/ownDeliveryList/ownDeliveryList.js
const app=getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    switchJudge:false,
    orderStatusData:[
      {name:"全部",id:""},
      { name: "待确认", id: "0" },
      { name: "已确认", id: "1" },
      { name: "已发货", id: "2" },
    ],
    pdId:'', //配送单id
    orderStatusIndex:1,
    orderStatusId:0, //订单状态id
    orderStatusName:'', //订单状态名称
    deliveryCode:'', //配送单号
    functionList: [], //功能区数据
    funcId:'', //功能区id
    funcName:'', //功能区名称
    funcIndex:'', 
    deliStatusData:[
      {name:"全部",id:""},
      { name: "待接单", id: "1" },
      { name: "待取货", id: "2" },
      { name: "配送中", id: "3" },
      { name: "已完成", id: "4" },
      { name: "已取消", id: "5" },
      { name: "异常", id: "6" },
    ],
    deliStausId:'',
    deliStausIndex:'',
    deliStausName:'', //外卖状态名称
    date:'',
    date2:'',
    pageNum:1,
    deliveryDataList:[], //配送单数据
    sizejudge:0,
    wlcompany:'', //物流公司
    wlcode:'', //物流单号
    fahuodate:'', //发货时间
    searchData: [
      { name: "配送单状态", desc: "", codeName: 'orderStatusId' },
      { name: "配送单号", desc: "", codeName: 'deliveryCode' },
      { name: "功能区", desc: "", codeName: 'funcId' },
      { name: "支付时间", desc: "", desc2: '', codeName: 'date' },
      { name: "外卖状态", desc: "", codeName: 'deliStausId' },
    ],
    deliveryId:'', //物流方式
    logisticsList:[], //物流数据
    logisticsIndex:'',
    logisticsId:'', //物流id
    fahuojudge:false,
    diajudge:false, 
    isSubmit: false,
    isLgcSubmit: false,
    firstOrder:true,
    nowDelivCode:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      authzData: wx.getStorageSync("pageAuthority"),
      searchDatabak: this.data.searchData,
    })
    this.getHotelFunctionList();
    this.delivList();
    this.getLgcList();
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
    } else if (codeName === 'deliveryCode') {
      this.setData({
        deliveryCode: '',
      })
    } else if (codeName === 'funcId') {
      this.setData({
        funcIndex: '',
        funcId:''
      })
    } else if (codeName === 'deliStausId') {
      this.setData({
        deliStausId: '',
        deliStausIndex:''
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
    this.delivList()
  },


  //获取配送数据
  delivList:function(){
    let that=this;

    if (!this.data.date && !this.data.date2) {
    } else if (this.data.date && this.data.date2) {
    } else {
      wx.showToast({
        title: '请选择完整支付时间',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    let linkData={
      pageNo: that.data.pageNum,
      pageSize:20,
      chooseAs: 1,
      deliveryCode: that.data.deliveryCode,
      funcId: that.data.funcId,
      status: that.data.orderStatusId,
      payStartTime:that.data.date,
      payEndTime: that.data.date2,
      lgcStatus: that.data.deliStausId,
      contactPhone:'',
    };

    let excessive = JSON.stringify(that.data.searchDatabak)
    let nowsearchData = JSON.parse(excessive);
    nowsearchData.map(item => {
      if (item.codeName === 'orderStatusId') {
        item.desc = that.data.orderStatusId.toString().length ? that.data.orderStatusName.trim() : '';
      } else if (item.codeName === 'deliveryCode') {
        item.desc = that.data.deliveryCode.trim();
      } else if (item.codeName === 'funcId') {
        item.desc = that.data.funcId.toString().length ? that.data.funcName.trim() : '';
      } else if (item.codeName === 'deliStausId') {
        item.desc = that.data.deliStausId.toString().length ? that.data.deliStausName.trim() : '';
      } else {
        item.desc = that.data.date.trim();
        item.desc2 = that.data.date2.trim();
      }
      return item;

    })
    this.setData({
      searchData: nowsearchData
    })


    wx.showLoading({
      title: '加载中',
    })
    wxrequest.delivList(linkData).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      let tempdata=[];
      if(resdata.code==0){
        if (resdata.data.records.length > 0 && resdata.data.records.length<20){
             that.setData({
               sizejudge:0
             })
         }else{
          that.setData({
            sizejudge: 1
          })
         }
        if (that.data.pageNum>1){
          tempdata = that.data.deliveryDataList.concat(resdata.data.records)
         }else{
          tempdata = resdata.data.records
         }
         that.setData({
           deliveryDataList: tempdata
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

  //详情
  btndetail:function(e){
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../ownDeliveryDetail/ownDeliveryDetail?id='+id,
    })
  },

  //配送单号
  deliveryCode:function(e){
    this.setData({
      deliveryCode: e.detail.value
    })
  },

  //发货时间
  bindDateChangefh(e) {
    this.setData({
      fahuodate: e.detail.value,
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

  //选择配送状态
  bindPickerDeliv:function(e){
    let index=e.detail.value;
    this.setData({
      deliStausId: this.data.deliStatusData[index].id,
      deliStausIndex:index,
      deliStausName: this.data.deliStatusData[index].name,
    })
  },

  //选择物流方式
  radioChange:function(e){
    this.setData({
      deliveryId:e.detail.value,
      logisticsId:''
    })
  },

  //确认配送单
  delisure(e){
    let that=this;
    let id=e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '是否确认该订单',
      success(res){
        if(res.confirm){
          that.delisureRequest(id)
        }
      }
    })
   
  },

  delisureRequest:function(id){
    let that=this;
    wx.showLoading({
      title: '确认中',
    })
    wxrequest.ensurePlatDelivery(id).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '配送单确认成功!',
        })
        that.delivList();
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }

    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  },

  //重新发单
  againShipmentsDelivery:function(e){
    this.setData({
      nowDelivCode: e.currentTarget.dataset.delivcode,
      fahuojudge:true,
      firstOrder:false,
    })
  },

  //更新状态
  updateLgcStatus(e){
    let that=this;
    let delivCode = e.currentTarget.dataset.delivcode;
    let linkData={
      delivCode: delivCode
    }
    wx.showLoading({
      title: '更新中',
    })
    wxrequest.updateLgcStatus(linkData).then(res=>{
      wx.hideLoading();
      let resdata=res.data;
      if (resdata.code==0){
        wx.showToast({
          title: '更新状态成功！',
          icon: 'none',
          duration: 2000
        })
        that.delivList();
      }else{
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
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

  //点击弹窗
  fahuo:function(e){
    let that=this;
    let delivway = e.currentTarget.dataset.delivway;
    if (delivway==7){
      that.setData({
        firstOrder:true,
        pdId: e.currentTarget.dataset.id,
        fahuojudge: true,
        deliveryId:'',
        logisticsId:'',
        logisticsIndex:'',
        wlcompany:'',
        wlcode:'',
        fahuodate:'',
      })
    }else{
      that.setData({
        pdId: e.currentTarget.dataset.id,
        diajudge: true,
        deliveryId:'',
        logisticsId:'',
        logisticsIndex:'',
        wlcompany: '',
        wlcode: '',
        fahuodate: '',
      })
      
    }  
  },

  //非外卖取消
  fahuocancel:function(){
    this.setData({
      diajudge: false,
    })
  },

  //非外卖发货
  delivfahuo:function(){
    let that=this;
    if (!that.data.wlcompany.toString()){
      wx.showToast({
        title: '请填写物流公司',
        icon: 'none',
        duration: 2000
      })
      return false;
     }
    if (!that.data.wlcode.toString()) {
      wx.showToast({
        title: '请填写快递单号',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (!that.data.fahuodate.toString()) {
      wx.showToast({
        title: '请选择发货时间',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    let linkData={
      deliveryId: that.data.pdId,
      logistics: that.data.wlcompany,
      logisticsCode: that.data.wlcode,
      shipmentsTime: that.data.fahuodate,
    };
    wx.showLoading({
      title: '请求中',
    })
    wxrequest.shipmentsPlatDelivery(linkData).then(res=>{
       wx.hideLoading()
       let resdata=res.data;
       if(resdata.code==0){
         wx.showToast({
           title: '配送单发货成功！',
           icon:'none',
           duration:2000
         })
         that.delivList();
         this.setData({
           diajudge: false,
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

  //取消发货
  fahuocan:function(){
    
    this.setData({
      fahuojudge: false
    })
  },

  //确认发货
  fahuosure:function(){
    let that=this;
    if (!that.data.deliveryId.toString().length){
       wx.showToast({
         title: '请选择配送方式',
         icon:'none',
         duration:2000
       })
       return false;
    }
    if (that.data.deliveryId==2){
      that.setData({
        logisticsId:-99
      })
    }else{
      if (!that.data.logisticsId.toString().length) {
        wx.showToast({
          title: '请选择物流',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
    }
    if (that.data.firstOrder){
      let linkData = {
        deliveryId: that.data.pdId,
        lgcHotelId: that.data.logisticsId,
      }
      wx.showLoading({
        title: '请求中',
      })
      wxrequest.shipmentsPlatDelivery(linkData).then(res => {
        wx.hideLoading()
        let resdata = res.data;
        if (resdata.code == 0) {
          wx.showToast({
            title: '配送单发货成功！',
            icon: 'none',
            duration: 2000
          })
          that.delivList();
          this.setData({
            fahuojudge: false,
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
    }else{
      let linkData = {
        orderDelivId: that.data.nowDelivCode,
        hotelLgcId: that.data.logisticsId,
      }
      wx.showLoading({
        title: '请求中',
      })
      wxrequest.againShipmentsDelivery(linkData).then(res => {
        wx.hideLoading()
        let resdata = res.data;
        if (resdata.code == 0) {
          wx.showToast({
            title: '重新发单成功！',
            icon: 'none',
            duration: 2000
          })
          that.delivList();
          this.setData({
            fahuojudge: false,
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
    }
    
  },


  //物流公司
  inputwlcompany:function(e){
    this.setData({
      wlcompany:e.detail.value
    })
  },

  //快递单号
  inputwlcode:function(e){
    this.setData({
      wlcode: e.detail.value
    })
  },

  //获取功能区
  getHotelFunctionList:function(){
    let that=this;
    let linkData={
      hotelId: wx.getStorageSync('hotelId'),
    }
    wxrequest.getHotelFunctionList(linkData).then(res=>{
       let resdata=res.data;

       if(resdata.code==0){
         let nowfunctionList = resdata.data.map(item=>{
           return {
             id: item.id,
             funcCnName: item.funcCnName
           }
         })
         let functionAll = {
           id: '',
           funcCnName: '全部'
         };
         nowfunctionList.unshift(functionAll)
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

  //选择功能区
  bindPickerFun:function(e){
    let index=e.detail.value;
    this.setData({
      funcIndex:index,
      funcId: this.data.functionList[index].id,
      funcName: this.data.functionList[index].funcCnName,
    })
  },

  //订单状态
  bindPickerOrder:function(e){
    let that=this;
    let index = e.detail.value;
    this.setData({
      orderStatusIndex:index,
      orderStatusId: that.data.orderStatusData[index].id,
      orderStatusName: that.data.orderStatusData[index].name,
    })
  },

  //搜索自营配送
  searchBtn: function () {
    this.setData({
      pageNum: 1,
      switchJudge: false
    })
    this.delivList()
  },


  //重置
  reset: function () {
    this.setData({
      orderStatusIndex: '',
      orderStatusId: '',
      deliveryCode: '',
      funcId: '',
      funcIndex: '',
      deliStausId: '',
      deliStausIndex: '',
      date: '',
      date2: '',
      pageNum:1,
    })
    this.delivList()
  },


  switchdj: function () {
    this.setData({
      switchJudge: !this.data.switchJudge
    })
  },

  //选择物流
  bindPickerlogistics:function(e){
    let that=this;
    let index=e.detail.value;
    that.setData({
      logisticsIndex: index,
      logisticsId: that.data.logisticsList[index].id
    })
  },

  //获取指定酒店的全部外部物流
  getLgcList(){
    let that=this;
    let linkData={
      hotelId: wx.getStorageSync('hotelId')
    }
    wxrequest.getLgcList(linkData).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
        let nowlogisticsList=[];
        if (resdata.data.length!=0){
          nowlogisticsList = resdata.data.map(item=>{
            return {
              id:item.id,
              logisticsName: item.lgcName
            }
          })
        }
        that.setData({
          logisticsList: nowlogisticsList,
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
    this.setData({
      pageNum: 1
    })
    this.delivList();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let nowpageNum = this.data.pageNum;
    if(this.data.sizejudge){
       this.setData({
         pageNum: ++nowpageNum
       })
      this.delivList();
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})