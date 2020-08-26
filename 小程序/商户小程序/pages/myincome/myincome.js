// pages/myincome/myincome.js

const app = getApp();
let apiUrl = app.globalData.requestUrl;
// import wxrequest from '../../request/api.js';
function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    confirmColor: "#ff9700",
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      } else if (res) { }
    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {},
    startdate: "",  //当前日期
    startdate2:"",  //开始日期
    buhuodetail:"", //补货明细数据
    jine:'',    //金额
    userid:81,   //用户id
    totalData:'', //收入总额
    waitTotalData:'', //待入账金额
    cashTotal:'', //提现总额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let  that=this;
    that.setData({
      authzData: wx.getStorageSync('pageAuthority')
    })
    that.getTotal();
    that.waitTotalData();
    that.getcashTotal();
    that.getmoney();
    that.getriqi();
    that.getrecord()
    
    
  },


  bindDateChange:function(e){
    let that=this;
    let counttime = 90 * 1000 * 60 * 60 * 24;
    let startdate = e.detail.value;
    console.log(startdate)
    let startdatetwo = new Date(startdate)
    let datetime = startdatetwo.getTime() - counttime;
    let date2 = new Date(datetime)
    let year2 = date2.getFullYear();
    let month2 = date2.getMonth() + 1;
    let nowdate2 = date2.getDate();
    let startdate2 = year2 + '-' + month2 + '-' + nowdate2
    that.setData({
      startdate: startdate,
      startdate2: startdate2
    })
    this.getrecord()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //收支记录详情
  incomeRecordDetail:function(e){
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../rewardDetail/rewardDetail?id=' + id,
    })
  },

  //获取用户收支列表信息
  getrecord:function(){
    let that=this;
    let userType=1;
    wx.request({
      url: apiUrl + 'fin/user/account/detail/'+userType,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      data:{
        userId: wx.getStorageSync("empid")
      },
      method:"GET",
      success:function(res){
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code==0){
          that.setData({
            buhuodetail:res.data.data.records
          })
        }
      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },

  //酒店小程序---获取用户(员工或顾客)收入总额
  getTotal:function(){
    let that = this;
    let userType = 1;
    let userId = wx.getStorageSync("empId")
    wx.request({
      url: apiUrl + 'fin/user/account/detail/income/' + userType + '/' + userId,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      data: {},
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          that.setData({
            totalData: res.data.data
          })
        }
      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },


  //酒店(购物)小程序---获取用户(员工或顾客)提现总额
  getcashTotal: function () {
    let that = this;
    let userType = 1;
    let userId = wx.getStorageSync("empId")
    wx.request({
      url: apiUrl + 'fin/user/account/detail/withdraw/' + userType + '/' + userId,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      data: {},
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          that.setData({
            cashTotal: res.data.data
          })
        }
      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },



  //酒店(购物)小程序---获取用户(员工或顾客)待收入总额
  waitTotalData: function () {
    let that = this;
    let userType = 1;
    let userId = wx.getStorageSync("empId")
    wx.request({
      url: apiUrl + 'fin/user/pending/pending/' + userType + '/' + userId,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      data: {},
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          that.setData({
            waitTotalData: res.data.data
          })
        }
      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },

  linkrecord:function(){
    wx.navigateTo({
      url: '../getcashrecord/getcashrecord',
    })
  },

  linkcarry:function(){
    wx.navigateTo({
      url: '../getCashPri/getCashPri?jine=' + this.data.jine,
    })
  },

  //酒店(购物)小程序---获取用户(员工或顾客)可提现余额
  getmoney:function(){
    let that=this;
    let userType = 1;
    let useid = wx.getStorageSync("empId");
    wx.request({
      url: apiUrl + 'fin/user/account/detail/canWithdraw/' + userType + '/' + useid,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      method:"GET",
      success:function(res){
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if(res.data.code==0){
          that.setData({
            jine: res.data.data
          })
        }
      },
      fail: function (error){
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },

  //

//获取日期
getriqi:function(){
  let that=this;

  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let nowdate = date.getDate();
  let startdate = year + '-' + month + '-' + nowdate

  let counttime = 90 * 1000 * 60 * 60 * 24;
  let datetime = date.getTime() - counttime;

  let date2 = new Date(datetime)
  let year2 = date2.getFullYear();
  let month2 = date2.getMonth() + 1;
  let nowdate2 = date2.getDate();
  let startdate2 = year2 + '-' + month2 + '-' + nowdate2
  that.setData({
    startdate: startdate,
    startdate2: startdate2
  })


},

  waiteEnter:function(){
    wx.navigateTo({
      url: '../waitAccountIncome/waitAccountIncome',
    })
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getmoney();
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