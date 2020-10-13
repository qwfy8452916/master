const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    type: true,//是否支持 1:普票 2:专票
    totalprice: '',//总价
    isInvoice: '',//是否支持酒店房费发票 0 不支持，1 支持
    customerId: '',
    hotelId: '',
    invType: '',//开票类型 1:普票 2:专票 101:房费票
    listdata: [],//开票商品列表
    enterprise: true,//是否是企业

    mobile: '',//用户手机号码
    remark: '',//用户备注
    invHeadType: 1,//抬头类型（1：企业，2：个人）
    invHead: '',//单位名称
    taxpayerId: '',//纳税人识别码
    amount: '',//金额
    email: '',//邮箱
    registrationAddr: '',//注册地址
    registrationMobile: '',//注册电话
    bank: '',//开户银行
    bankAccount: '',//银行账户
    addresseeName: '',//收票人姓名
    addresseeAddr: ''//收票人地址
  },
  onLoad: function (options) {
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    that.setData({
      customerId: app.globalData.userId,
      hotelId: app.globalData.hotelId
    });
    if (options.bilingtype == 1) {
      that.get_Invstyle();//获取运营商支持的发票类型
    } else {
      that.setData({
        invType: options.bilingtype
      });
      wx.hideLoading();
    }
    wx.getStorage({
      key: 'isInvoice',
      success: function (res) {
        that.setData({
          isInvoice: res.data
        });
      },
    });
    wx.getStorage({
      key: 'kplist',
      success: function(res) {
        that.setData({
          totalprice: options.totalprice,
          listdata: res.data
        });
      },
    })
  },
  get_Invstyle: function () {//获取运营商支持的发票类型
    const that = this;
    let linkData = {
      hotelId: app.globalData.hotelId
    };
    wxrequest.getinvoicetype(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      let type;
      let invType;
      if (resdata.code == 0) {
        if (resdatas.length == 1) {
          type = false;
          invType = resdatas[0];
        } else {
          type = true;
          invType = 1;
        }
        that.setData({
          type: type,
          invType: invType
        });
        wx.hideLoading();
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
  changetype: function (e) {//普票-专票
    this.setData({
      invType: e.currentTarget.dataset.type,
      enterprise: true,
      invHeadType: 1
    })
  },
  mobilefun: function (e) {//用户手机号码
    this.setData({
      mobile: e.detail.value
    })
  },
  remarkfun: function (e) {//用户备注
    this.setData({
      remark: e.detail.value
    })
  },
  invHeadfun: function (e) {//单位名称
    this.setData({
      invHead: e.detail.value
    })
  },
  taxpayerIdfun: function (e) {//纳税人识别码
    this.setData({
      taxpayerId: e.detail.value
    })
  },
  emailfun: function (e) {//邮箱
    this.setData({
      email: e.detail.value
    })
  },
  radioChange: function (e) {//抬头类型
    let enterprise;
    let invHead = '';
    if (e.detail.value == 1){
      enterprise = true;
    } else {
      enterprise = false;
      invHead = '个人';
    }
    this.setData({
      invHeadType: e.detail.value,
      enterprise: enterprise,
      invHead: invHead
    })
  },
  registrationAddrfun: function (e) {//注册地址
    this.setData({
      registrationAddr: e.detail.value
    })
  },
  registrationMobilefun: function (e) {//注册电话
    this.setData({
      registrationMobile: e.detail.value
    })
  },
  bankfun: function (e) {//开户银行
    this.setData({
      bank: e.detail.value
    })
  },
  bankAccountfun: function (e) {//银行账户
    this.setData({
      bankAccount: e.detail.value
    })
  },
  addresseeNamefun: function (e) {//收票人姓名
    this.setData({
      addresseeName: e.detail.value
    })
  },
  addresseeAddrfun: function (e) {//收票人地址
    this.setData({
      addresseeAddr: e.detail.value
    })
  },
  subformfun: function () {//表单验证提交
    const that = this;
    const thatdata = this.data;
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/

    const customerId = thatdata.customerId;
    const hotelId = thatdata.hotelId;
    const invType = thatdata.invType;//开票类型
    const finInvoiceApplProdDTOs = thatdata.listdata;//商品信息

    const mobile = thatdata.mobile;//用户手机号码
    const remark = thatdata.remark;//用户备注
    const invHeadType = thatdata.invHeadType;//抬头类型（1：企业，2：个人）
    const invHead = thatdata.invHead;//单位名称
    const taxpayerId = thatdata.taxpayerId;//纳税人识别码
    const amount = thatdata.totalprice;//金额
    const email = thatdata.email;//邮箱
    const registrationAddr = thatdata.registrationAddr;//注册地址
    const registrationMobile = thatdata.registrationMobile;//注册电话
    const bank = thatdata.bank;//开户银行
    const bankAccount = thatdata.bankAccount;//银行账户
    const addresseeName = thatdata.addresseeName;//收票人姓名
    const addresseeAddr = thatdata.addresseeAddr;//收票人地址

    if (invType == 1) {//普票
      if (invHeadType == 1) {
        if (invHead == '') {
          wx.showToast({
            title: '请输入单位名称',
            icon: 'none',
            duration: 2000
          });
          return;
        }
        if (taxpayerId == '') {
          wx.showToast({
            title: '请输入纳税人识别码',
            icon: 'none',
            duration: 2000
          });
          return;
        }
      }
      if (email == '') {
        wx.showToast({
          title: '请输入电子邮箱',
          icon: 'none',
          duration: 2000
        });
        return;
      } else if (!str.test(email)) {
        wx.showToast({
          title: '请输入正确的电子邮箱',
          icon: 'none',
          duration: 2000
        });
        return;
      }
    } 
    if (invType == 2) {//专票 
      if (invHead == '') {
        wx.showToast({
          title: '请输入单位名称',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if (taxpayerId == '') {
        wx.showToast({
          title: '请输入纳税人识别码',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if (registrationAddr == '') {
        wx.showToast({
          title: '请输入注册地址',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if (bank == '') {
        wx.showToast({
          title: '请输入开户银行',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if (bankAccount == '') {
        wx.showToast({
          title: '请输入银行账户',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      if (addresseeName == '') {
        wx.showToast({
          title: '请输入收票人姓名',
          icon: 'none',
          duration: 2000
        });
        return;
      }      
      if (addresseeAddr == '') {
        wx.showToast({
          title: '请输入收票人地址',
          icon: 'none',
          duration: 2000
        });
        return;
      }
    }
    if (mobile == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      });
      return;
    } else if (!/^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(mobile)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    let linkData = {
      customerId: customerId,
      hotelId: hotelId,
      invType: invType,//开票类型
      finInvoiceApplProdDTOs: finInvoiceApplProdDTOs,//商品信息
      mobile: mobile,//用户手机号码
      remark: remark,//用户备注
      invHeadType: invHeadType,//抬头类型（1：企业，2：个人）
      invHead: invHead,//单位名称
      taxpayerId: taxpayerId,//纳税人识别码
      amount: amount,//金额
      email: email,//邮箱
      registrationAddr: registrationAddr,//注册地址
      registrationMobile: registrationMobile,//注册电话
      bank: bank,//开户银行
      bankAccount: bankAccount,//银行账户
      addresseeName: addresseeName,//收票人姓名
      addresseeAddr: addresseeAddr//收票人地址
    };
    wxrequest.postinvoicing(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if (resdatas){
          wx.showToast({
            title: '提交成功',
            icon: 'none',
            duration: 1500
          });
          setTimeout(function () {
            wx.reLaunch({
              url: '../my/my'
            });
          }, 1500);
        }
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
  }
})