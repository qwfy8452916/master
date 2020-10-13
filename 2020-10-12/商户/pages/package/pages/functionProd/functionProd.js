// pages/package/pages/functionProd/functionProd.js
const app = getApp();
import wxrequest from '../../../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    switchJudge: false,
    formdata: {
      funcId: '', //功能区id
      funcName: '',  //功能区名
      prodCode:'', //商品id
      prodName: '', //商品名
      isOnShelf:'', //上下架id
      isOnShelfName:'', //上下架名称
    },
 

    functionData: [], //功能区数据
    functionIndex:"",
    prodList: [], //商品数据
    prodIndex: "",
    prodStatusData:[
      {"name":"全部","id":""},
      { "name": "下架", "id": 0 },
      { "name": "上架", "id": 1 },
    ], //状态数据
    prodStatusIndex:'',
    pageNum: 1,
    sizejudge: 0,
    functionProdDataList: [], //功能区商品列表
    searchData: [
      { name: "功能区", desc: "", codeName: 'funcId' },
      { name: "商品名称", desc: "", codeName: 'prodCode' },
      { name: "状态", desc: "", codeName: 'isOnShelf' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      pathUrl: app.globalData.imgUrl,
      authzData: wx.getStorageSync("pageAuthority"),
    })
    this.getFunctionList();
    this.getProdList();


  },


  //删除条件
  delTerm: function (e) {
    let nowsearchData = this.data.searchData;
    let index = e.currentTarget.dataset.index;
    let codeName = e.currentTarget.dataset.name;
    let nowfunctionIndex = this.data.functionIndex;
    let nowprodIndex = this.data.prodIndex;
    let nowformdata = this.data.formdata;
    let nowprodStatusIndex = this.data.prodStatusIndex;
    if (codeName === 'funcId') {
      nowformdata.funcId = ''
      nowformdata.funcName = ''
      nowfunctionIndex = ''
    } else if (codeName === 'prodCode'){
      nowformdata.prodCode = ''
      nowformdata.prodName = ''
      nowprodIndex = ''
    } else if (codeName === 'isOnShelf') {
      nowformdata.isOnShelf = ''
      nowformdata.isOnShelfName = ''
      nowprodStatusIndex = ''
    }
    nowsearchData.splice(index, 1)
    this.setData({
      searchData: nowsearchData,
      formdata: nowformdata,
      functionIndex: nowfunctionIndex,
      prodIndex: nowprodIndex,
      prodStatusIndex: nowprodStatusIndex
    })
    this.functionProdList()
  },

  //新增功能区商品
  funProdAdd: function () {
    wx.navigateTo({
      url: '../functionProdAdd/functionProdAdd',
    })
  },

  //修改功能区商品
  edit: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../functionProdEdit/functionProdEdit?id=' + id,
    })
  },
  //功能区商品详情
  detail: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../functionProdDetail/functionProdDetail?id=' + id,
    })
  },

  //功能区列表
  getFunctionList:function(){
    let that=this;
    let linkData={
      hotelId: wx.getStorageSync("hotelId"),
      funcName: '',
      pageNo: 1,
      pageSize: 100
    }
    wxrequest.hotelFunctionList(linkData).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
         let nowfunctionData = that.data.functionData;
         if(resdata.data.records!=null){
           nowfunctionData = resdata.data.records.map(item=>{
             return {
               id:item.id,
               funcCnName: item.funcCnName
             }
           })
           const functionAll = {
                id: '',
                funcCnName: '全部'
              };
           nowfunctionData.unshift(functionAll)
         }
         that.setData({
           functionData: nowfunctionData
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
  bindPickerChange: function (e) {
    let that = this;
    this.setData({
      'functionIndex': e.detail.value,
      'formdata.funcId': that.data.functionData[e.detail.value].id,
      'formdata.funcName': that.data.functionData[e.detail.value].funcCnName,
    })
  },

  //商品列表
  getProdList:function(){
    let that=this;
    let linkData={
      prodOwnerOrgKind: 0,
      hotelId: wx.getStorageSync('hotelId'),
      prodName: '',
      pageNo: 1,
      pageSize: 100,
    }
    wxrequest.ownCommodityList(linkData).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
         let nowprodList = that.data.prodList;
         nowprodList=resdata.data.records.map(item=>{
           return{
             id: item.prodCode,
             prodName: item.prodProductDTO.prodName
           }
         })
         const prodAll = {
           id: '',
           prodName: '全部'
         };
         nowprodList.unshift(prodAll)
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
  bindPickerChangeProd: function (e) {
    let that = this;
    this.setData({
      'prodIndex': e.detail.value,
      'formdata.prodCode': that.data.prodList[e.detail.value].id,
      'formdata.prodName': that.data.prodList[e.detail.value].prodName,
    })
  },

  //选择状态
  bindPickerChangeStatus: function (e) {
    let that = this;
    this.setData({
      'prodStatusIndex': e.detail.value,
      'formdata.isOnShelf': that.data.prodStatusData[e.detail.value].id,
      'formdata.isOnShelfName': that.data.prodStatusData[e.detail.value].name,
    })
  },


  //功能区商品列表
  functionProdList: function () {
    let that = this;
    let tempData = [];
    let linkData = {
      hotelId: wx.getStorageSync('hotelId'),
      funcId: that.data.formdata.funcId,
      prodCode: that.data.formdata.prodCode,
      isOnShelf: that.data.formdata.isOnShelf,
      pageNo: this.data.pageNum,
      pageSize: 20,
    }

    let excessive = JSON.stringify(this.data.searchDatabak)
    let nowsearchData = JSON.parse(excessive);
    nowsearchData.map(item => {
      if (item.codeName === 'funcId') {
        item.desc = this.data.formdata.funcId.toString().length ? this.data.formdata.funcName.trim() : '';
      } else if (item.codeName === 'prodCode'){
        item.desc = this.data.formdata.prodCode.toString().length ? this.data.formdata.prodName.trim() : '';
      } else if (item.codeName === 'isOnShelf') {
        item.desc = this.data.formdata.isOnShelf.toString().length ? this.data.formdata.isOnShelfName.trim() : '';
      }
      return item;

    })
    this.setData({
      searchData: nowsearchData
    })

    wx.showLoading({
      title: '加载中',
    })
    wxrequest.functionProdList(linkData).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        if (resdata.data.records.length < 20 && resdata.data.records.length > 0) {
          that.setData({
            sizejudge: 0
          })
        } else {
          that.setData({
            sizejudge: 1
          })
        }
        if (that.data.pageNum > 1) {
          tempData = that.data.functionProdDataList.concat(resdata.data.records)
        } else {
          tempData = resdata.data.records
        }
        if (tempData != null) {
          tempData.map(item => {
            item.switchJudge = false;
            return item;
          })
        }
        that.setData({
          functionProdDataList: tempData
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

  //搜索
  searchBtn: function () {
    let that = this;
    that.setData({
      switchJudge: false,
      pageNum: 1
    })
    that.functionProdList();
  },

  //重置
  reset: function () {
    this.setData({
      'formdata.funcId': '',
      'formdata.funcName': '',
      functionIndex:'',
      'formdata.prodCode': '',
      'formdata.prodName': '',
      prodIndex: '',
      'formdata.isOnShelf': '',
      'formdata.isOnShelfName': '',
      prodStatusIndex: '',
      pageNum: 1
    })
    this.functionProdList();
  },




  //开关
  switch1Change: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.functionProdStatus(id).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '操作成功',
          icon: 'none',
          duration: 2000
        })
        that.functionProdList();
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000,
        })
        setTimeout(function () {
          that.functionProdList();
        }, 500)
      }
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  },

 


  switchdj: function () {
    this.setData({
      switchJudge: !this.data.switchJudge
    })
  },





  

  //删除
  deleBtn: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定删除该功能区商品',
      success(res) {
        if (res.confirm) {
          that.functionProdDelete(id);
        }
      }
    })
  },

  functionProdDelete: function (id) {
    let that = this;
    wxrequest.functionProdDelete(id).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '操作成功',
          icon: 'none',
          duration: 2000
        })
        that.functionProdList();
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

  //功能关闭展开
  swtichbtn: function (e) {
    let index = e.currentTarget.dataset.index;
    let nowjudge = e.currentTarget.dataset.judge;
    let nowswitchJudge = "functionProdDataList[" + index + "].switchJudge"
    this.setData({
      [nowswitchJudge]: !nowjudge
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
    this.setData({
      searchDatabak: this.data.searchData
    })
    this.functionProdList();
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
    let that = this;
    let nowpage = that.data.pageNum;
    if (that.data.sizejudge) {
      that.setData({
        pageNum: ++nowpage
      })
      that.functionProdList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})