const app=getApp();
Page({
  data: {
    tpcodeval: '',
    SubList: [],
    prompt: [],
    forminp1: '',
    forminp2: '',
    telval: '',
    emailval: ''
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      tpcodeval: app.globalData.tpcode,
      SubList: app.globalData.subscriptionDetails
    })
  },
  changetype(e){
    const that = this;
    const indexval = e.currentTarget.dataset.index;
    let SubListdata = that.data.SubList;
    if(SubListdata[indexval].isSubscribe == 0) {
      SubListdata[indexval].isSubscribe = 1;
    } else {
      SubListdata[indexval].isSubscribe = 0;
    }
    that.setData({
      SubList: SubListdata
    })
  },
  subfun(){
    const that = this;
    let url = 'user/subscribe/update';
    let listdata = JSON.stringify(that.data.SubList);
    if(app.globalData.requestUrl.charAt(app.globalData.requestUrl.length-1) != '/'){
      url = '/user/subscribe/update';
    }
    wx.request({
      url: app.globalData.requestUrl + url,
      data: {
        isSubscribe: 1,
        specifyClassify: listdata,
        tpCode: that.data.tpcodeval
      },
      method: "POST",
      header: {
        'content-type': 'application/json',
        'Authorization': app.globalData.token,
      },
      success: function (res) {
        if (res.statusCode != 200) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          });
          return false;
        }
        if (res.data.code == 0) {
          let type1 = -1;
          let type2 = -1;
          if(res.data.data.length > 0) {
            type1 = res.data.data.findIndex(item => {
              return item.ctpType === 3
            });
            type2 = res.data.data.findIndex(item => {
              return item.ctpType === 4
            });
          } else {
            wx.showToast({
              title: '操作成功',
              icon: 'success'
            });
          }
          that.setData({
            forminp1: type1,
            forminp2: type2,
            prompt: res.data.data
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      },
      fail: function (error) {
        wx.showToast({
          title: error.msg,
          icon: 'none'
        })
      }
    })
  },
  closefun () {
    this.setData({
      prompt: []
    })
  },
  telfun(e){
    this.setData({
      telval: e.detail.value
    })
  },
  emailfun(e){
    this.setData({
      emailval: e.detail.value
    })
  },
  bindfun(){
    const that = this;
    const phone = that.data.telval;
    const empEmail = that.data.emailval;
    const forminp1 = that.data.forminp1;
    const forminp2 = that.data.forminp2;
    if(forminp1 != -1 && phone != '' && !/^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return false;
    }
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if(forminp2 != -1 && empEmail != '' && !str.test(empEmail)) {
      wx.showToast({
        title: '请填写正确的邮箱号',
        icon: 'none'
      });
      return false;
    }
    let url = 'user/subscribe/bind';
    let listdata = JSON.stringify(that.data.SubList);
    if(app.globalData.requestUrl.charAt(app.globalData.requestUrl.length-1) != '/'){
      url = '/user/subscribe/bind';
    }
    wx.request({
      url: app.globalData.requestUrl + url,
      data: {
        specifyClassify: listdata,
        tpCode: that.data.tpcodeval,
        phone: phone,
        empEmail: empEmail
      },
      method: "PUT",
      header: {
        'content-type': 'application/json',
        'Authorization': app.globalData.token,
      },
      success: function (res) {
        if (res.statusCode != 200) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          });
          return false;
        }
        if (res.data.code == 0 && res.data.data) {
          that.subfun();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      },
      fail: function (error) {
        wx.showToast({
          title: error.msg,
          icon: 'none'
        })
      }
    })
  }
})