// pages/myincome/myincome.js
const app = getApp()
let apiUrl = app.getApiUrl();
let token = app.globalData.token
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
    startdate: "",  //当前日期
    startdate2:"",  //开始日期
    buhuodetail:"", //补货明细数据
    jine:null,    //金额
    userid:81,   //用户id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let  that=this;
    that.getmoney();
    that.getriqi();
    that.getrecord()
    
  },


  bindDateChange:function(e){
    let that=this;
    let counttime = 90 * 1000 * 60 * 60 * 24;
    let startdate = e.detail.value;
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

  getrecord:function(){
    let that=this;
    wx.request({
      url: apiUrl +'/fin/repl',
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      data:{
        // encryptedOrgId: wx.getStorageSync("organizationid"),
        applyStartTime:that.data.startdate2,
        applyEndTime:that.data.startdate
      },
      method:"GET",
      success:function(res){
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code==0){
          that.setData({
            buhuodetail:res.data.data.list
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
      url: '../getcash/getcash?jine=' + this.data.jine,
    })
  },

  getmoney:function(){
    let that=this;
    let useid = wx.getStorageSync("userid");
    wx.request({
      url: apiUrl + '/user/emp/' + useid,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      method:"GET",
      success:function(res){
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if(res.data.code==0){
          that.setData({
            jine: res.data.data.empReplAmount
          })
        }
      },
      fail: function (error){
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },

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