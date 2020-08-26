// pages/couponBatch/couponBatch.js
const app = getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    switchJudge: false,
    diajudge:false,
    formdata: {
      couponBatchName: '', //批次名称
      couponName:'', //优惠券名称
      reduceMoney:'', //优惠券金额
      isActive: '', //禁用启用id
      isActiveName: '',  //禁用启用名
      index: '',
      date:'',
      date2:'',
    },
    grantBatchName:'', //发放批次名称
    grantUserCount:'', //发放用户数量
    grantObj:'', //发放对象
    batchId:'',
    couponBatchName:'', //批次名称
    countPerUser:'',  //每用户数量
    users:'',  //发放对象

    isActiveData: [
      {name:"全部",id:""},
      { name: "禁用", id: 0 },
      { name: "启用", id: 1 },
    ], //禁用启数据

    pageNum: 1,
    sizejudge: 0,
    batchData: [], //卡券列表
    searchData: [
      { name: "批次名称", desc: "", codeName: 'couponBatchName' },
      { name: "优惠券名称", desc: "", codeName: 'couponName' },
      { name: "优惠券金额", desc: "", codeName: 'reduceMoney' },
      { name: "禁用启用", desc: "", codeName: 'isActive' },
      { name: "领取/发放有效期", desc: "", desc2: "", codeName: 'date' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    

   
    
  },


  //删除条件
  delTerm: function (e) {
    let index = e.currentTarget.dataset.index;
    let nowsearchData = this.data.searchData;
    let codeName = e.currentTarget.dataset.name;
    let nowformdata = this.data.formdata;
    if (codeName === 'couponBatchName') {
      nowformdata.couponBatchName = ''
    } else if (codeName === 'couponName') {
      nowformdata.couponName = ''
    } else if (codeName === 'reduceMoney') {
      nowformdata.reduceMoney = ''
    } else if (codeName === 'isActive') {
      nowformdata.isActive = ''
      nowformdata.isActiveName = ''
      nowformdata.index = ''
    }else {
      nowformdata.date=""
      nowformdata.date2 = ""
    }
    nowsearchData.splice(index, 1)
    this.setData({
      searchData: nowsearchData,
      formdata: nowformdata
    })
    this.getData()
  },

  //新增批次
  couponAdd: function () {
    wx.navigateTo({
      url: '../couponAdd/couponAdd',
    })
  },

  //修改批次
  couponEdit: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../couponEdit/couponEdit?id=' + id,
    })
  },
  //批次详情
  couponDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../couponDetail/couponDetail?id=' + id,
    })
  },



  //批次名称
  batchInput: function (e) {
    let that = this;
    this.setData({
      'formdata.couponBatchName': e.detail.value
    })
  },

  //优惠券名称
  couponInput: function (e) {
    let that = this;
    this.setData({
      'formdata.couponName': e.detail.value
    })
  },

  //优惠券金额
  moneyInput: function (e) {
    let that = this;
    this.setData({
      'formdata.reduceMoney': e.detail.value
    })
  },

  //禁用启用
  bindPickerChange: function (e) {
    let that = this;
    this.setData({
      'formdata.index': e.detail.value,
      'formdata.isActive': that.data.isActiveData[e.detail.value].id,
      'formdata.isActiveName': that.data.isActiveData[e.detail.value].name,
    })
  },
  

  //获取优惠券批次数据
  getData: function () {
    let that = this;
    let tempData = [];
    let linkData = {
      orgAs: 3,
      couponType: 1,
      couponLimit: 1,
      pageNo: this.data.pageNum,
      pageSize: 20,
      discountWay:'',
      couponBatchName: this.data.formdata.couponBatchName,
      couponName: this.data.formdata.couponName,
      reduceMoney: this.data.formdata.reduceMoney,
      batchStartTime: this.data.formdata.date,
      batchEndTime: this.data.formdata.date2,
      isActive: this.data.formdata.isActive
    }

    let excessive = JSON.stringify(this.data.searchDatabak)
    let nowsearchData = JSON.parse(excessive);
    nowsearchData.map(item => {
      if (item.codeName === 'couponBatchName') {
        item.desc = this.data.formdata.couponBatchName.trim();
      } else if (item.codeName === 'couponName') {
        item.desc = this.data.formdata.couponName.trim();
      } else if (item.codeName === 'reduceMoney') {
        item.desc = this.data.formdata.reduceMoney.trim();
      } else if (item.codeName === 'isActive') {
        item.desc = this.data.formdata.isActive.toString().length ? this.data.formdata.isActiveName.trim() : '';
      }else {
        item.desc = this.data.formdata.date;
        item.desc2 = this.data.formdata.date2;
      }
      return item;

    })
    this.setData({
      searchData: nowsearchData
    })

    wx.showLoading({
      title: '加载中',
    })
    wxrequest.getCouponBatch(linkData).then(res => {
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
          tempData = that.data.batchData.concat(resdata.data.records)
        } else {
          tempData = resdata.data.records
        }
        that.setData({
          batchData: tempData
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
    that.getData();
  },

  //重置
  reset: function () {
    this.setData({
      'formdata.index': '',
      'formdata.isActive': '',
      'formdata.couponBatchName': '',
      'formdata.couponName': '',
      'formdata.reduceMoney': '',
      'formdata.date': '',
      'formdata.date2': '',
      pageNum: 1
    })
    this.getData();
  },


  // 时间段选择  
  bindDateChange(e) {
    let that = this;
    let startdate = e.detail.value
    that.setData({
      'formdata.date': e.detail.value,
      pageNum: 1,
    })
  },

  bindDateChange2(e) {
    let that = this;
    let enddate = e.detail.value;
    that.setData({
      'formdata.date2': e.detail.value,
      pageNum: 1,
    })
  },

  //开关
  switch1Change: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.couponIsActiv(id).then(res => {
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
          duration: 2000,
        })
        setTimeout(function () {
          that.getData();
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

  //发放
  grant: function (e) {
    let id=e.currentTarget.dataset.id;
    let name=e.currentTarget.dataset.name;
    this.setData({
      diajudge: true,
      batchId:id,
      couponBatchName: name,
      countPerUser:'',
      users:''
    })
  },

  switchdj: function () {
    this.setData({
      switchJudge: !this.data.switchJudge
    })
  },

  //关闭
  saleDoalog: function () {
    this.setData({
      diajudge: false,
    })
  },

  //每用户数量
  countPerUser:function(e){
    let countPerUser=e.detail.value;
    this.setData({
      countPerUser: countPerUser
    })
  },

  //发放对象
  users:function(e){
    let users=e.detail.value;
    this.setData({
      users: users
    })
  },

  //确定发放
  adoptbtn:function(){
    let that=this;
    if (this.data.countPerUser==''){
      wx.showToast({
        title: '请填写每用户数量',
        icon:'none',
        duration:2000
      })
      return false;
    } else if (isNaN(this.data.countPerUser)){
      wx.showToast({
        title: '每用户数量有误',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (this.data.users==''){
      wx.showToast({
        title: '请填写发放对象',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    let linkData={
      batchId: that.data.batchId,
      couponBatchName: that.data.couponBatchName,
      countPerUser: that.data.countPerUser,
      users: that.data.users
    }
    wxrequest.grantCoupon(linkData).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
        that.setData({
          diajudge: false,
        })
        wx.showToast({
          title: '操作成功',
          icon:'none',
          duration:2000
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
    this.setData({
      searchDatabak: this.data.searchData
    })
    this.getUseScene();
    this.getData();

    wx.removeStorageSync('selectFunData')
    wx.removeStorageSync('selectprodData')
    wx.removeStorageSync('classIndex')
    wx.removeStorageSync('selectTypeData')
    wx.removeStorageSync('selectResource')
    wx.removeStorageSync('selectScene')
    wx.removeStorageSync('selectDrawWays')
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
      that.getData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})