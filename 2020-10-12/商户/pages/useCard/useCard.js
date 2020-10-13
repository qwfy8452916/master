// pages/useCard/useCard.js
const app=getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    switchJudge: false,
    cardData: [], //卡券列表
    cardBatchData:[], //卡券批次数据
    cardIndex:'', 
    batchId:'', //卡券批次id
    batchName:'', //卡券名称
    scenData: [], //场景数据
    index:'',
    scenId: '', //使用场景id
    scenName:'', //场景名称
    cardUserData: [], // 顾客数据
    userIndex:'',
    userId:'', //顾客id
    userName:'', //顾客名称
    date:"",
    date2:"",
    sizejudge: 0,
    pageNum: 1,
    searchData: [
      { name: "卡券名称", desc: "", codeName: 'batchId' },
      { name: "顾客", desc: "", codeName: 'userId' },
      { name: "使用场景", desc: "", codeName: 'scenId' },
      { name: "有效期", desc: "", desc2: '', codeName: 'date' },
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
    this.getUseCardticketList();
    this.getUseScene();
    this.getCardUser();
    this.getUserCardCoupon()
  },


  //删除条件
  delTerm: function (e) {
    let index = e.currentTarget.dataset.index;
    let nowsearchData = this.data.searchData;
    let codeName = e.currentTarget.dataset.name;
    if (codeName === 'batchId') {
      this.setData({
        batchId: '',
        cardIndex: ''
      })
    } else if (codeName === 'userId') {
      this.setData({
        userId: '',
        userIndex: ''
      })
    } else if (codeName === 'scenId') {
      this.setData({
        scenId: '',
        index:''
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
    this.getUserCardCoupon()
  },


  //获取用户卡券
  getUserCardCoupon:function(){
    let that=this;
    let tempDataSet = [];

    if (!this.data.date && !this.data.date2) {
    } else if (this.data.date && this.data.date2) {
    } else {
      wx.showToast({
        title: '请选择完整的有效期',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    let linkData={
      pageNo: that.data.pageNum,
      pageSize: 20,
      orgAs: 3,
      batchId: that.data.batchId,
      cusId: that.data.userId,
      vouUseScene: that.data.scenId,
      vouStartDate: that.data.date,
      vouEndDate: that.data.date2,
    }

    let excessive = JSON.stringify(this.data.searchDatabak)
    let nowsearchData = JSON.parse(excessive);
    nowsearchData.map(item => {
      if (item.codeName === 'batchId') {
        item.desc = this.data.batchId ? this.data.batchName:'';
      } else if (item.codeName === 'userId') {
        item.desc = this.data.userId ? this.data.userName: '';
      } else if (item.codeName === 'scenId') {
        item.desc = this.data.scenId ? this.data.scenName: '';
      }else {
        item.desc = this.data.date.trim();
        item.desc2 = this.data.date2.trim();
      }
      return item;
    })
    this.setData({
      searchData: nowsearchData
    })
    console.log(this.data.searchData)

    wx.showLoading({
      title: '加载中',
    })
    wxrequest.getUseCardticketList(linkData).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      if(resdata.code==0){
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
          tempDataSet = that.data.cardData.concat(resdata.data.records)
        } else {
          tempDataSet = res.data.data.records
        }
        that.setData({
          cardData: tempDataSet
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

  searchBtn:function(){
    this.setData({
      switchJudge: false,
      pageNum:1
    })
    this.getUserCardCoupon();
  },


  //使用场景
  bindPickerChange: function (e) {
    let that = this;
    this.setData({
      index: e.detail.value,
      scenId: that.data.scenData[e.detail.value].dictValue,
      scenName: that.data.scenData[e.detail.value].dictName,
    })
  },


  //获取场景
  getUseScene: function () {
    let that = this;
    let linkData = {
      key: "VOU_USE_SCENE",
      orgId: '0'
    }
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.basicDataItems(linkData).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        let nowscenData = resdata.data;
        let allObj = {
          dictName: "全部",
          dictValue: "",
        }
        nowscenData.unshift(allObj)
        that.setData({
          scenData: nowscenData
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


  //选择顾客
  bindPickerUser: function (e) {
    let that = this;
    this.setData({
      userIndex: e.detail.value,
      userId: that.data.cardUserData[e.detail.value].id,
      userName: that.data.cardUserData[e.detail.value].nickName
    })
  },

  //获取顾客数据
  getCardUser:function(){
    let that=this;
    let linkData={
      hotelId: wx.getStorageSync("hotelId")
    }
    wx.showLoading()
    wxrequest.getCardUser(linkData).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      let nowcardUserData = resdata.data
      if(resdata.code==0){
        let allObj = {
          nickName: "全部",
          id: "",
        }
        nowcardUserData.unshift(allObj)
         that.setData({
           cardUserData: nowcardUserData
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
        icon:"none",
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

 //延长有效期
  bindExtendChange:function(e){
    console.log(e)
    let that=this;
    let id=e.currentTarget.dataset.id;
    let extendDate = e.detail.value;
    wx.showLoading({
      title: '加载中',
    })
    let linkData={
      vouEndDate: extendDate
    }
    wxrequest.delayCardticketDate(linkData,id).then(res=>{
       wx.hideLoading()
       let resdata=res.data;
       if(resdata.code==0){
         wx.showToast({
           title: '操作成功',
           icon:'none',
           duration:2000
         })
         that.getUserCardCoupon();
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


  //重置
  reset:function(){
    this.setData({
      batchId:'',
      cardIndex:'',
      index:'',
      userIndex:'',
      scenId:'',
      userId:'',
      date:'',
      date2:''
    })
    this.getUserCardCoupon();
  },

  //选择卡券批次
  bindPickerCard: function (e) {
    let that = this;
    this.setData({
      cardIndex: e.detail.value,
      batchId: that.data.cardBatchData[e.detail.value].id,
      batchName: that.data.cardBatchData[e.detail.value].vouName
    })
  },

  //获取卡券批次数据
  getUseCardticketList:function(){
    let that=this;
    let linkData={
      orgAs: 3,
    };
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.getCardticketList(linkData).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      let nowcardBatchData = resdata.data.records;
      if(resdata.code==0){
        let allObj = {
          vouName: "全部",
          id: "",
        }
        nowcardBatchData.unshift(allObj)
        that.setData({
          cardBatchData: nowcardBatchData
        })
      }else{
        wx.showToast({
          title:resdata.msg,
          icon:"none",
          duration:2000
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

  //转赠记录
  giveRecord:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../transferRecord/transferRecord?id='+id,
    })
  },
  
  //查看详情
  checkDetail:function(e){
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../useCardDetail/useCardDetail?id='+id,
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
      pageNum:1
    })
    this.getUserCardCoupon();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
    let that = this;
    let page = that.data.pageNum
    if (that.data.sizejudge) {
      that.setData({
        pageNum: ++page
      })
      that.getUserCardCoupon();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})