const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    userbalancedata: '',
    detailList:[], //收支列表
    totalData:'', //收入总额
    cashtotalData:'', //提现总额
    waitIncomeData:'', //待入账收入
    balanceData:'', //可提现余额
  },
  onShow: function () {
    // this.getbalancedata();
    this.getDetailList();
    this.getTotal();
    this.cashTotal();
    this.waitIncome();
    this.getBalance();
  },


  getbalancedata: function () {//获取用户余额、收支明细
    const that = this;
    wxrequest.getuserbalance(app.globalData.userId).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          userbalancedata: resdatas
        });
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },


  //获取用户收支列表
  getDetailList: function () {
    const that = this;
    let data = {
      userId: app.globalData.userId
    }
    wxrequest.getDetailList(data,2).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          detailList: resdatas.records
        });
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
      .catch(err => {
        wx.hideLoading();
        console.log(err)
      });
  },

  //小程序---获取用户(员工或顾客)收入总额
  getTotal: function () {
    const that = this;
    let data={
      userType:2,
      userId: app.globalData.userId
    }
    wxrequest.getTotal(data).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          totalData: resdatas
        });
        console.log(that.data.totalData)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
      .catch(err => {
        wx.hideLoading();
        console.log(err)
      });
  },


  //小程序---获取用户(员工或顾客)提现总额
  cashTotal: function () {
    const that = this;
    let data = {
      userType: 2,
      userId: app.globalData.userId
    }
    wxrequest.cashTotal(data).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          cashtotalData: resdatas
        });
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
      .catch(err => {
        wx.hideLoading();
        console.log(err)
      });
  },

  //小程序--- 获取用户(员工或顾客)待收入总额
  waitIncome: function () {
    const that = this;
    let data = {
      userType: 2,
      userId: app.globalData.userId
    }
    wxrequest.waitIncome(data).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          waitIncomeData: resdatas
        });
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
      .catch(err => {
        wx.hideLoading();
        console.log(err)
      });
  },


  //小程序---获取用户(员工或顾客)可提现余额
  getBalance: function () {
    const that = this;
    let data = {
      userType: 2,
      userId: app.globalData.userId
    }
    wxrequest.getBalance(data).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          balanceData: resdatas
        });
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
      .catch(err => {
        wx.hideLoading();
        console.log(err)
      });
  },




  gowithdraw: function () {//提现
    wx.navigateTo({
      url: '../mywithdraw/mywithdraw?balance=' + this.data.balanceData
    })
  },

  //待入账收入
  waiteEnter:function(){
    wx.navigateTo({
      url: '../waitAccountIncome/waitAccountIncome',
    })
  },

  //收支记录详情
  incomeRecordDetail: function (e) {
    let id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../incomeRecordDetail/incomeRecordDetail?id='+id,
    })
  },
})