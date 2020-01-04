// pages/cashdetail/cashdetail.js
const app = getApp()
let apiUrl = app.getApiUrl();
let token = app.globalData.token
function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
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
    categorydata: [{ name: '待处理', id: '1' }, { name: '已转账', id: '2' }, { name: '转账失败', id: '3' }],
    getcashstatus:'', //提现状态id
    date: '',//默认起始时间  
    date2: '',//默认结束时间 
    getcashrecord:[],  //提现记录数据
    orgAs:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({
      orgAs: options.orgAs
    })
    console.log(options)
    that.getcashbtn();

  },

  //获取提现明细
  getcashbtn: function () {
    let that = this;
    wx.request({
      url: apiUrl + '/fin/withdraw',
      data: {
        orgAs: that.data.orgAs,
        status: that.data.getcashstatus,
        startDate: that.data.date,
        endDate: that.data.date2
      },
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token"),
      },
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          that.setData({
            getcashrecord: res.data.data.records
          })
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },


  bindPickerChange: function (e) {
    let that = this;
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let index = e.detail.value;
    let getcashstatus = that.data.categorydata[index].id;
    this.setData({
      index: index,
      getcashstatus: getcashstatus,
    })
    that.getcashbtn();
  },

  // 时间段选择  
  bindDateChange(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      date: e.detail.value,
    })
    that.getcashbtn();
  },

  bindDateChange2(e) {
    let that=this;
    console.log(e.detail.value)
    that.setData({
      date2: e.detail.value,
    })
    that.getcashbtn();
  },

  recorditem:function(e){
    let that=this;
    let id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../getcashstatus/getcashstatus?id='+id,
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