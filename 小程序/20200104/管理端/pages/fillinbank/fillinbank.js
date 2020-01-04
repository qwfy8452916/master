// pages/fillinbank/fillinbank.js
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
     bankval:'',      //开户银行
     accountname:'',  //开户名称
     bankaccount:'',  //银行账户
     oprId:'',  //运营商id
     orgAs:'',  //组织身份
     orgId:'',  //组织id
     bankid:'', //银行账户id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    console.log(options)
    that.setData({
      oprId: options.oprId,
      orgAs: options.orgAs,
      orgId: options.orgId,
      bankid: options.bankid
    })

  },

  fillbank:function(e){
    let that=this;
    that.setData({
      bankval: e.detail.value
    })
  },

  fillaccountname: function (e) {
    let that = this;
    that.setData({
      accountname: e.detail.value
    })
  },

  fillbankaccount: function (e) {
    let that = this;
    that.setData({
      bankaccount: e.detail.value
    })
  },

  savebankinfo:function(){
    let that=this;
    wx.request({
      url: apiUrl + '/fin/alter/account',
      data: {
        bank: that.data.bankval,
        bankAccountName: that.data.accountname,
        bankAccount: that.data.bankaccount,
        id: that.data.bankid
      },
      method: "PUT",
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
          wx.showToast({
            title:'操作成功',
            icon:'success',
            duration:1200
          })
          wx.redirectTo({
            url: '../user/user',
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