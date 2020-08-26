const app = getApp();
import wxrequest from '../../utils/api'
import WxValidate from '../../utils/WxValidate'
app.Base({
  data: {
    showform: false,
    globalData: '',
    form: {
      userName: '',
      passWord: ''
    },
    bindFlag: 1
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      globalData: app.globalData
    });
    that.initValidate();//验证规则函数
    if (options.param){
      this.setData({
        showform:true,
      })
    }else{
      wx.login({// 静默登录
        success: res => {
          that.wxlogin(res.code);
        }
      });
    }
  },
  onShow: function () {
    // var denyFunction = ['alert']//初始不执行函数，全部不执行则传字符all
    // var denyFunction = 'all' //初始不执行函数，全部不执行则传字符all
    // this.init(denyFunction)
    // this.showModal({msg:'ahhah'})
  },
  wxlogin: function (wxCode) {//微信小程序员工登录，返回 null 表示当前微信用户没有绑定过此小程序
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    let linkData = {
      cabCode: '',
      mpCode: 'MP_EMP_HOTEL',
      wxCode: wxCode
    };
    wxrequest.postwxlogin(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if(resdatas != null){
          that.savedata(resdatas);
        } else {
          wx.hideLoading();
          that.setData({
            showform: true
          });
        }
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        });
        that.setData({
          showform: true
        });
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  wxloginaccount: function (wxCode, formdata) {//微信小程序员工账号登录
    const that = this;
    let linkData = {
      account: formdata.userName,
      password: formdata.passWord,
      bindFlag: that.data.bindFlag,
      cabCode: '',
      mpCode: 'MP_EMP_HOTEL',
      orgTypes: [3],
      wxCode: wxCode
    };
    wxrequest.postwxloginaccount(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if(resdatas != null){
          that.savedata(resdatas);
        }
      } else {
        wx.showToast({
          title: resdata.msg,
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
  initValidate() {//验证规则函数
    const that = this;
    const rules = {
      userName: {
        required: true
      },
      passWord:{
        required:true
      }
    }
    const msgs = {
      userName: {
        required: '请输入账号'
      },
      passWord:{
        required:'请输入密码'
      }
    }
    that.WxValidate = new WxValidate(rules, msgs)
  },
  formSubmit: function(e) {//提交表单
    const params = e.detail.value;
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      this.showModal(error);
      return false
    }
    this.setData({
      form: params
    });
    wx.login({// 静默登录 
      success: res => {
        this.wxloginaccount(res.code, params);
      }
    });
  },
  changebindFlag: function () {//是否绑定微信号
    const that = this;
    let bind_Flag = that.data.bindFlag;
    if(bind_Flag == 1) {
      bind_Flag = 0;
    } else {
      bind_Flag = 1;
    }
    that.setData({
      bindFlag: bind_Flag
    })
  },
  savedata: function (data) {//保存数据
    const that = this;
    const empDTO_data = data.empDTO;//员工用户信息
    const orgDTO_data = data.orgDTO;//员工所属组织信息
    const orgAs_data = data.orgAs;//此次登陆可用的阻止身份
    const oprDTO_data = data.oprDTO;//运营商信息
    const hotelDTO_data = data.hotelDTO;//酒店信息
    const merchantDTO_data = data.merchantDTO;//入驻商信息
    const allyDTO_data = data.allyDTO;//合作伙伴信息
    const empIsBind_data = data.empIsBind;//员工是否绑定当前微信号
    const permCodes_data = data.permCodes;//员工权限

    app.globalData.empDTO = data.empDTO;
    app.globalData.orgDTO = data.orgDTO;
    app.globalData.orgAs = data.orgAs;
    app.globalData.oprDTO = data.oprDTO;
    app.globalData.hotelDTO = data.hotelDTO;
    app.globalData.merchantDTO = data.merchantDTO;
    app.globalData.allyDTO = data.allyDTO;
    app.globalData.empIsBind = data.empIsBind;
    app.globalData.permCodes = data.permCodes;

    let token = "Bearer" + data.token;
    app.globalData.token = token;
    wx.setStorageSync("token", token);
    app.globalData.userName = that.data.form.userName;
    app.globalData.empId = empDTO_data.id;
    app.globalData.userId = hotelDTO_data.adminEmpId;
    app.globalData.hotelId = hotelDTO_data.id;
    wx.setStorageSync("userName", empDTO_data.account);
    wx.setStorageSync("empId", empDTO_data.id);
    wx.setStorageSync("userId", hotelDTO_data.adminEmpId);
    wx.setStorageSync("hotelId", hotelDTO_data.id);
    wx.setStorageSync("empIsBind", empIsBind_data);
    wx.setStorageSync("orgId", hotelDTO_data.orgId);
    that.get_tabAuthority();
    that.get_pageAuthority();
    
  },
  get_tabAuthority: function () {//获取tab权限
    let linkData = {
      resType: 1
    };
    wxrequest.getAuthority(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        console.log('zou')
        app.globalData.tabAuthority = resdatas;
        wx.setStorageSync("tabAuthority", resdatas)

      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        });
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  get_pageAuthority: function () {//获取页面功能权限
    let linkData = {
      resType: 3
    };
    wxrequest.getAuthority(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        app.globalData.pageAuthority = resdatas;
        wx.setStorageSync("pageAuthority", resdatas)
        wx.reLaunch({
          url: '../index/index'
        })
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        });
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },



})