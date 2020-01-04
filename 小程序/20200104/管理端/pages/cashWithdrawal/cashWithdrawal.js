// pages/cashWithdrawal/cashWithdrawal.js
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
    showjudge:true,
    getbankid:'',  //获取银行账户信息id
    bankid:'', //银行id
    bankinfo: {
      
    },  //银行账户信息
    bank: '',
    bankAccountName: '',
    bankAccount: '',
    getjine:'',   //提现金额
    getcashid:'',  //提现id
    accountType:'', //账户类型

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    console.log(options.getcashid)
    that.setData({
      getbankid: options.getbankid,
      getcashid: options.getcashid,
      
    })
    that.getBank();

  },

  fillbank: function (e) {
    let that = this;
    that.setData({
      bank: e.detail.value
    })
  },

  fillaccountname: function (e) {
    let that = this;
    that.setData({
      bankAccountName: e.detail.value
    })
  },

  fillbankaccount: function (e) {
    let that = this;
    that.setData({
      bankAccount: e.detail.value
    })
  },

  //获取组织银行账户信息
  getBank: function () {
    let that = this;
    wx.request({
      url: apiUrl + '/fin/bank/account',
      data: {
        orgId: that.data.getbankid
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
            bankinfo: res.data.data,
            bank: res.data.data.bank,
            bankAccountName: res.data.data.bankAccountName,
            bankAccount: res.data.data.bankAccount,
            bankid:res.data.data.id
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

  jine:function(e){
    let getjine = parseFloat(e.detail.value);
    getjine = Math.floor(getjine*100)/100;
    this.setData({
      getjine: getjine
    })
  },

  getcashbtn:function(){
    let that=this;
    console.log(that.data.getjine)

    if (that.data.getjine==''){
      wx.showToast({
        title: '请输入提现金额',
        icon: 'none',
        duration: 1200
      });
      return false;
    }
    if (isNaN(that.data.getjine)) {
      wx.showToast({
        title: '请输入正确的金额',
        icon: 'none',
        duration: 1200
      });
      return false;
    }
    if (that.data.getjine <=0) {
      wx.showToast({
        title: '请输入正确的金额',
        icon: 'none',
        duration: 1200
      });
      return false;
    }
    if (that.data.getjine > that.data.bankinfo.withdrawMayAmount) {
      wx.showToast({
        title: '提现金额不能大于可提现金额',
        icon: 'none',
        duration: 1200
      });
      return false;
    }
    console.log(that.data.bank)
    console.log(that.data.bankAccountName)
    console.log(that.data.bankAccount)
    if (that.data.bank == '' || that.data.bank == null) {
      wx.showToast({
        title: '账户信息不完整',
        icon: 'none',
        duration: 1200
      });
      return false;
    }
    if (that.data.bankAccountName == '' || that.data.bankAccountName == null) {
      wx.showToast({
        title: '账户信息不完整',
        icon: 'none',
        duration: 1200
      });
      return false;
    }
    if (that.data.bankAccount == '' || that.data.bankAccount == null) {
      wx.showToast({
        title: '账户信息不完整',
        icon: 'none',
        duration: 1200
      });
      return false;
    }
    if (that.data.accountStatus == '1') {
      wx.showToast({
        title: '您的账户已被冻结',
        icon: 'none',
        duration: 1200
      });
      return false;
    }
    wx.request({
      url: apiUrl + '/fin/withdraw',
      data: {
        withdrawalAmount: that.data.getjine,
        bank: that.data.bank,
        accountName: that.data.bankAccountName,
        account: that.data.bankAccount,
        oprId: that.data.bankinfo.oprId,
        accountId: that.data.getcashid
      },
      method: "POST",
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
             showjudge:false
            })
          if (that.data.accountType=='p'){
             that.savebankinfo();
           } 
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


  savebankinfo: function () {
    let that = this;
    wx.request({
      url: apiUrl + '/fin/alter/account',
      data: {
        bank: that.data.bank,
        bankAccountName: that.data.bankAccountName,
        bankAccount: that.data.bankAccount,
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
          console.log("银行信息修改成功")
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



  checkdetail:function(){
    wx.redirectTo({
      url: '../cashdetail/cashdetail',
    })
  },

  btnsure: function () {
    wx.redirectTo({
      url: '../user/user',
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
      accountType: wx.getStorageSync("accountType"),
      // accountType: 'p',
    })
    console.log(this.data.accountType)
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