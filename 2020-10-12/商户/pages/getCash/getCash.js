// pages/getCash/getCash.js
const app=getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    bankInfoData:{}, //银行账户信息
    getjine: '',   //提现金额
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      authzData: wx.getStorageSync("pageAuthority"),
    })
    this.getBank();
  },
  


  //获取银行信息
  getBank: function () {
    let that = this;
    let linkData={
      orgId: wx.getStorageSync("orgId")
    }
    wx.showLoading({
      title: "加载中"
    })
    wxrequest.getBankInfo(linkData).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      if (resdata.code == 0) {
        that.setData({
          bankInfoData: resdata.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.hideLoading();
      console.log(err)
    })
  },

  //提现金额
  jine:function(e){
    let getjine = parseFloat(e.detail.value);
    getjine = Math.floor(getjine * 100) / 100;
    this.setData({
      getjine: getjine
    })
  },


  //确定
  sureBtn:function(){
    let that=this;
    if (that.data.getjine == '') {
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
    if (that.data.getjine <= 0) {
      wx.showToast({
        title: '请输入正确的金额',
        icon: 'none',
        duration: 1200
      });
      return false;
    }
    if (that.data.getjine > that.data.bankInfoData.withdrawMayAmount) {
      wx.showToast({
        title: '提现金额不能大于可提现金额',
        icon: 'none',
        duration: 1200
      });
      return false;
    }
    if (that.data.bankInfoData.bank == '' || that.data.bankInfoData.bank == null) {
      wx.showToast({
        title: '账户信息不完整',
        icon: 'none',
        duration: 1200
      });
      return false;
    }
    if (that.data.bankInfoData.bankAccountName == '' || that.data.bankInfoData.bankAccountName == null) {
      wx.showToast({
        title: '账户信息不完整',
        icon: 'none',
        duration: 1200
      });
      return false;
    }
    if (that.data.bankInfoData.bankAccount == '' || that.data.bankInfoData.bankAccount == null) {
      wx.showToast({
        title: '账户信息不完整',
        icon: 'none',
        duration: 1200
      });
      return false;
    }
    if (that.data.bankInfoData.accountStatus == '1') {
      wx.showToast({
        title: '您的账户已被冻结',
        icon: 'none',
        duration: 1200
      });
      return false;
    }
    wx.showLoading({
      title: '加载中',
    })
    let linkData={
      withdrawalAmount: that.data.getjine,
      bank: that.data.bankInfoData.bank,
      account: that.data.bankInfoData.bankAccount,
    }
    wxrequest.withdrawal(linkData).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      if (resdata.code==0){
        wx.redirectTo({
          url: '../applysuccess/applysuccess',
        })
      }else{
        wx.showToast({
          title:res.data.msg,
          icon: 'none',
          duration: 1200
        })
      }

    }).catch(err=>{
      wx.hideLoading()
      console.log(err)
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