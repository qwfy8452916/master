// pages/user/user.js
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
    userInfo: {},
    accountdetail:{},  //账户信息
    getbankid:'',   //获取银行信息id
    bankid:'',   //银行的id
    bankinfo:{},  //银行账户信息
    getcashid:'',  //传递提现id
    oprId:'',   //运营商id
    orgAs:'',   //组织身份
    orgId:'',  //组织id
    isBind: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    if (wx.getStorageSync("empIsBind") == 1){
      this.setData({
        isBind: true
      });
    }

    this.getData();
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        userInfojudge: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  }, 
  //绑定
  bindfun: function(){
    let that = this;
    //获取登录凭证code
    wx.login({
      success(resdata) {
        if (resdata.code) {
          wx.request({
            url: apiUrl + '/emp/bind',
            data: {
              appId: 'wx_manage_app_id',
              appSecret: 'wx_manage_app_secret',
              appletType: 'MANAGE_APPLET',
              code: resdata.code,
              empId: wx.getStorageSync("empid")
            },
            method: "POST",
            header: {
              'content-type': 'application/json',
              'Authorization': wx.getStorageSync("Token"),
            },
            success: function (res) {
              if (res.data.code == 0) {
                wx.showToast({
                  title: '绑定成功',
                  icon: 'none',
                  duration: 2000
                })
                wx.setStorageSync("empIsBind", 1)
                that.setData({
                  isBind: true
                });
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
        } else {
          wx.showToast({
            title: '登录失败，' + resdata.errMsg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  //修改密码
  goUpdatePWD: function () {
    wx.navigateTo({
      url: '../updatepwd/updatepwd',
    })
  },
  //信息维护
  goUpdateInfo: function () {
    wx.navigateTo({
      url: '../updateinfo/updateinfo',
    })
  },
  //关联酒店
  goRelatedHotel: function(){
    wx.navigateTo({
      url: '../relatedhotel/relatedhotel',
    })
  },
  //消息设置
  goSetMessage: function(){
    wx.navigateTo({
      url: '../messageset/messageset',
    })
  },

  //获取账户信息
  getData:function(){
    let that=this;
    wx.request({
      url: apiUrl + '/fin/account/org',
      data:{
        // orgAs:3
        orgAs:wx.getStorageSync("orgAs")
      },
      method:"GET",
      header:{
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token"),
      },
      success:function(res){
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if(res.data.code==0){
          that.setData({
            accountdetail: res.data.data,
            getbankid: res.data.data.orgId,
            getcashid: res.data.data.id,
            oprId: res.data.data.oprId,
            orgId: res.data.data.orgId
          })
          console.log(that.data.orgAs)
          that.getBank();
        }else{
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }
      },
      fail:function(error){
        alertViewWithCancel("提示", error, function () {
        });
      }
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
             bankinfo:res.data.data,
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

  fencheng: function () {
    
    let that=this;
    wx.navigateTo({
      url: '../divideintodetail/divideintodetail?orgAs=' + that.data.orgAs + '&oprId=' + that.data.oprId + '&orgId=' + that.data.orgId,
    })
  },
  
  tixian: function () {
    let that = this;
    wx.navigateTo({
      url: '../cashdetail/cashdetail?orgAs=' + that.data.orgAs,
    })
  },

  exit: function () {
    let that = this;
    wx.clearStorage()
    wx.redirectTo({
      url: '../login/login',
    })
  },

  getcash: function () {
    let that = this;
    wx.navigateTo({
      url: '../cashWithdrawal/cashWithdrawal?getbankid=' + that.data.getbankid + '&getcashid=' + that.data.getcashid,
    })
  },
  //收入提醒
  getearn: function(){
    wx.navigateTo({
      url: '../predictearnings/predictearnings'
    })
  },

  addcard: function () {
    let that = this;
    wx.navigateTo({
      url: '../fillinbank/fillinbank?oprId=' + that.data.oprId + '&orgAs=' + that.data.orgAs + '&orgId=' + that.data.orgId + '&bankid=' + that.data.bankid,
    })
  },

  editbank:function(){
    let that = this;
    wx.navigateTo({
      url: '../editbank/editbank?getbankid=' + that.data.getbankid,
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
    this.getData();
    this.setData({
      orgAs:wx.getStorageSync("orgAs")
    })
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