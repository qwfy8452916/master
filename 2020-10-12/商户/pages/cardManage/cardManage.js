// pages/cardManage/cardManage.js
const app=getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    switchJudge: false,
    // switch1Checked:true,
    formdata:{
      cardName: '', //卡券名称
      scenId: '', //使用场景id
      scenName:'',  //场景名
      index:'',
    },
    
    scenData:[], //场景数据
    
    pageNum:1,
    sizejudge:0,
    cardData:[], //卡券列表
    searchData: [
      { name: "卡券名称", desc: "", codeName: 'cardName' },
      { name: "使用场景", desc: "", codeName: 'scenId' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      authzData: wx.getStorageSync("pageAuthority"),
      searchDatabak: this.data.searchData
    })
    this.getUseScene();
    this.getData();
  },


  //删除条件
  delTerm: function (e) {
    let index = e.currentTarget.dataset.index;
    let nowsearchData = this.data.searchData;
    let codeName = e.currentTarget.dataset.name;
    let nowformdata = this.data.formdata;
    if (codeName === 'cardName') {
      nowformdata.cardName=''
    } else {
      nowformdata.scenId = ''
      nowformdata.scenName = ''
      nowformdata.index = ''
    }
    nowsearchData.splice(index, 1)
    this.setData({
      searchData: nowsearchData,
      formdata: nowformdata
    })
    this.getData()
  },

  //新增卡券
  addCard:function(){
    wx.navigateTo({
      url: '../addCard/addCard',
    })
  },

  //修改卡券
  editCard:function(e){
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../editCard/editCard?id='+id,
    })
  },
  //卡券详情
  cardDetail:function(e){
    let id =e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../cardDetail/cardDetail?id=' + id,
    })
  },

  //删除卡券
  deleteCard:function(e){
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '是否删除此卡券',
      confirmText: "删除",
      showCancel: true,
      success: function (res) {
        if (res.confirm){
        that.sureDele(id)
        }
      }
    });
    
    
  },

  //确认删除
  sureDele:function(id){
    let that=this;
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.deleCardticket(id).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '操作成功',
          icon: 'none',
          duration: 2000
        })
        that.getData();

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

  //卡券名称
  nameInput:function(e){
    let that=this;
    this.setData({
      'formdata.cardName':e.detail.value
    })
  },

  //使用场景
  bindPickerChange:function(e){
    let that=this;
    this.setData({
      'formdata.index': e.detail.value,
      'formdata.scenId': that.data.scenData[e.detail.value].dictValue,
      'formdata.scenName': that.data.scenData[e.detail.value].dictName,
    })
  },

  //获取卡券数据
  getData:function(){
    let that=this;
    let tempData=[];
    let linkData={
      orgAs: 3,
      vouName: this.data.formdata.cardName,
      vouUseScene: this.data.formdata.scenId,
      pageNo: this.data.pageNum,
      pageSize: 20,
    }

    let excessive = JSON.stringify(this.data.searchDatabak)
    let nowsearchData = JSON.parse(excessive);
    nowsearchData.map(item => {
      if (item.codeName === 'cardName') {
        item.desc = this.data.formdata.cardName.trim();
      } else {
        item.desc = this.data.formdata.scenId ? this.data.formdata.scenName.trim():'';
      }
      return item;

    })
    this.setData({
      searchData: nowsearchData
    })

    wx.showLoading({
      title: '加载中',
    })
    wxrequest.getCardticketList(linkData).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      if(resdata.code==0){
        if (resdata.data.records.length < 20 && resdata.data.records.length>0){
           that.setData({
             sizejudge:0
           })
        }else{
          that.setData({
            sizejudge: 1
          })
        }
        if (that.data.pageNum>1){
          tempData = that.data.cardData.concat(resdata.data.records)
        }else{
          tempData = resdata.data.records
        }
        that.setData({
          cardData: tempData
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

  //搜索
  searchBtn:function(){
    let that=this;
    that.setData({
      switchJudge: false,
      pageNum:1
    })
    that.getData();
  },

  //重置
  reset:function(){
    this.setData({
      'formdata.index':'',
      'formdata.scenId':'',
      'formdata.cardName':'',
      pageNum:1
    })
    this.getData();
  },

  //开关
  switch1Change:function(e){
    let that=this;
    let id=e.currentTarget.dataset.id;
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.cardSwitch(id).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      if(resdata.code==0){
         wx.showToast({
           title: '操作成功',
           icon:'none',
           duration:2000
         })
        that.getData();
      }else{
        wx.showToast({
          title: resdata.msg,
          icon:'none',
          duration:2000,
        })
        setTimeout(function(){
          that.getData();
        },500)
      }
    }).catch(err=>{
      wx.showToast({
        title:err,
        icon:'none',
        duration:2000
      })
    })
  },

  //获取场景
  getUseScene:function(){
    let that=this;
    let linkData={
      key: "VOU_USE_SCENE",
      orgId: '0'
    }
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.basicDataItems(linkData).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      if(resdata.code==0){
        let nowscenData = resdata.data;
        let allObj = {
          dictName: "全部",
          dictValue: "",
        }
        nowscenData.unshift(allObj)
        that.setData({
          scenData: nowscenData
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
    this.getData();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that=this;
    let nowpage=that.data.pageNum;
    if(that.data.sizejudge){
      that.setData({
        pageNum: ++nowpage
      })
      that.getData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})