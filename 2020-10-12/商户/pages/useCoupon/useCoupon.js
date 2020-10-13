// pages/useCoupon/useCoupon.js
const app = getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    switchJudge: false,
    couponList: [], //优惠券数据
    cardData: [], //卡券列表
    batchData:[], //优惠券批次数据
    batchIndex: '',
    batchId: '', //卡券批次id
    batchName: '', //批次名称
    cusId:'', //用户id
    cusPhone:'', //手机号
    
    
    statusData: [
      {name:"全部",id:""},
      { name: "未使用", id: 0 },
      { name: "已使用", id: 1 },
    ], //优惠券状态数据
    statusId:'', //优惠券状态id
    statusIndex:0, 
    statusName:'', //优惠券状态名
    isAciveData:[
      { name: "全部", id: "" },
      { name: "无效", id: 0 },
      { name: "有效", id: 1 },
    ],//是否有效数据
    isAciveId:'',
    isAciveIndex: 0,
    isAciveName:'',
    cardUserData: [], // 顾客数据
    userIndex: '',
    userId: '', //顾客id
    userName: '', //顾客名称
    date: "",
    date2: "",
    sizejudge: 0,
    pageNum: 1,
    searchData: [
      { name: "用户id", desc: "", codeName: 'cusId' },
      { name: "手机号", desc: "", codeName: 'cusPhone' },
      { name: "批次名称", desc: "", codeName: 'batchId' },
      { name: "优惠券状态", desc: "", codeName: 'statusId' },
      { name: "是否有效", desc: "", codeName: 'isAciveId' },
      { name: "使用有效期", desc: "", desc2: '', codeName: 'date' },
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
    this.getCouponBatch();
    this.getCardUser();
    this.getCouponList();
  },


  //删除条件
  delTerm: function (e) {
    let index = e.currentTarget.dataset.index;
    let nowsearchData = this.data.searchData;
    let codeName = e.currentTarget.dataset.name;
    if (codeName === 'cusId') {
      this.setData({
        cusId: '',
      })
    } else if (codeName === 'cusPhone') {
      this.setData({
        cusPhone: '',
      })
    } else if (codeName === 'batchId') {
      this.setData({
        batchId: '',
        batchIndex: ''
      })
    } else if (codeName === 'statusId') {
      this.setData({
        statusId: '',
        statusIndex: ''
      })
    } else if (codeName === 'isAciveId') {
      this.setData({
        isAciveId: '',
        isAciveIndex: ''
      })
    }else {
      this.setData({
        date: '',
        date2: '',
      })
    }
    nowsearchData.splice(index, 1)
    this.setData({
      searchData: nowsearchData
    })
    this.getCouponList()
  },

  //获取所有优惠券列表
  getCouponList(){
    let that=this;

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
      pageNo: this.data.pageNum,
      pageSize: 20,
      orgAs: 3,
      discountWay:'',
      cusId: this.data.cusId,
      cusPhone: this.data.cusPhone,
      batchId: this.data.batchId,
      isUsed: this.data.statusId,
      isActive: this.data.isAciveId,
      couponStartDate: this.data.date,
      couponEndDate: this.data.date2,
    }
    let excessive = JSON.stringify(this.data.searchDatabak)
    let nowsearchData = JSON.parse(excessive);
    nowsearchData.map(item => {
      if (item.codeName === 'cusId') {
        item.desc = this.data.cusId.trim();
      } else if (item.codeName === 'cusPhone') {
        item.desc = this.data.cusPhone.trim();
      } else if (item.codeName === 'batchId') {
        item.desc = this.data.batchId ? this.data.batchName : '';
      } else if (item.codeName === 'statusId') {
        item.desc = this.data.statusId !== '' ? this.data.statusName : '';
      } else if (item.codeName === 'isAciveId') {
        item.desc = this.data.isAciveId !== '' ? this.data.isAciveName : '';
      } else {
        item.desc = this.data.date.trim();
        item.desc2 = this.data.date2.trim();
      }
      return item;
    })
    this.setData({
      searchData: nowsearchData
    })


    wx.showLoading({
      title: '加载中',
    })

    let tempdata=[];
    wxrequest.getCouponList(linkData).then(res=>{
       wx.hideLoading();
       let resdata=res.data;
       if(resdata.code==0){
         if (resdata.data.records.length >0 && resdata.data.records.length<20){
           that.setData({
             sizejudge: 0
           })
         }else{
           that.setData({
             sizejudge:1
           })
         }
         if (that.data.pageNum>1){
           tempdata=that.data.couponList.concat(resdata.data.records)
         }else{
           tempdata = resdata.data.records
         }
         that.setData({
           couponList: tempdata
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

  
  searchBtn: function () {
    this.setData({
      switchJudge: false,
      pageNum: 1
    })
    this.getCouponList();
  },


  //优惠券状态
  bindChangeStatus: function (e) {
    let that = this;
    this.setData({
      statusIndex: e.detail.value,
      statusId: that.data.statusData[e.detail.value].id,
      statusName: that.data.statusData[e.detail.value].name,
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
  getCardUser: function () {
    let that = this;
    let linkData = {
      hotelId: wx.getStorageSync("hotelId")
    }
    wx.showLoading()
    wxrequest.getCardUser(linkData).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      let nowcardUserData = resdata.data
      if (resdata.code == 0) {
        let allObj = {
          nickName: "全部",
          id: "",
        }
        nowcardUserData.unshift(allObj)
        that.setData({
          cardUserData: nowcardUserData
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
        icon: "none",
        duration: 2000
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
  bindExtendChange: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let extendDate = e.detail.value;
    let batchname = e.currentTarget.dataset.batchname;
    let couponname = e.currentTarget.dataset.couponname;
    wx.showLoading({
      title: '加载中',
    })
    let linkData = {
      couponBatchName: batchname,
      couponName: couponname,
      couponEndDate: extendDate,
    }
    wxrequest.extendTime(linkData, id).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '操作成功',
          icon: 'none',
          duration: 2000
        })
        that.getCouponList();
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

  //开关
  switch1Change: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.getCouponisActive(id).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '操作成功',
          icon: 'none',
          duration: 2000
        })
        that.getCouponList();
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000,
        })
        setTimeout(function () {
          that.getCouponList();
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



  //重置
  reset: function () {
    this.setData({
      batchId: '',
      batchIndex: '',
      statusId: '',
      statusIndex: 0,
      isAciveId: '',
      isAciveIndex: 0,
      cusId: '',
      cusPhone: '',
      date: '',
      date2: ''
    })
    this.getCouponList();
  },

  //选择是否有效
  bindChangeAcive:function(e){
    let that=this;
    that.setData({
      isAciveIndex: e.detail.value,
      isAciveId: that.data.isAciveData[e.detail.value].id,
      isAciveName: that.data.isAciveData[e.detail.value].name
    })
  },

  //选择优惠券批次
  bindPickerBatch: function (e) {
    let that = this;
    this.setData({
      batchIndex: e.detail.value,
      batchId: that.data.batchData[e.detail.value].id,
      batchName: that.data.batchData[e.detail.value].couponBatchName
    })
  },

  //获取优惠券批次数据
  getCouponBatch: function () {
    let that = this;
    let linkData = {
      orgAs: 3,
    };
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.getCouponBatch(linkData).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      let nowbatchData = resdata.data.records;
      if (resdata.code == 0) {
        let allObj = {
          couponBatchName: "全部",
          id: "",
        }
        nowbatchData.unshift(allObj)
        that.setData({
          batchData: nowbatchData
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

  //转赠记录
  giveRecord: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../transferRecord/transferRecord?id=' + id,
    })
  },

  //查看详情
  checkDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../useCardDetail/useCardDetail?id=' + id,
    })
  },


  switchdj: function () {
    this.setData({
      switchJudge: !this.data.switchJudge
    })
  },

  //用户id
  cusIdInput:function(e){
    this.setData({
      cusId:e.detail.value
    })
  },

  //手机号
  cusPhoneInput:function(e){
    this.setData({
      cusPhone: e.detail.value
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
    this.getCouponList();
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
      that.getCouponList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})