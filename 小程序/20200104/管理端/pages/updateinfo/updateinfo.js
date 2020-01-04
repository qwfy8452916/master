// pages/updateinfo/updateinfo.js
const app = getApp();
const apiUrl = app.getApiUrl();
let token = app.globalData.token;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    empid: '',   //empId
    uid: '',   //用户id
    userinfoData: {    //用户信息
      type: "",
      uscc: "",
      idno: "",
      name: "",
      contact: "",
      phone: "",
      region: [],
      address: ""
    },
    isSubmit: true,
    regionCode: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //获取用户id
    wx.getStorage({
      key: 'empid',
      success: function (res) {
        that.setData({
          empid: res.data
        });
        //获取用户信息
        wx.request({
          url: apiUrl + '/ally/empId',
          header: {
            'content-type': 'application/json',
            'Authorization': wx.getStorageSync("Token")
          },
          method: 'get',
          data: {
            empId: res.data
          },
          success(res) {
            if (res.statusCode == 401) {
              app.overtime(res.statusCode)
              return false;
            }
            const resdata = res.data;
            if (resdata.code == '0') {
              that.setData({
                uid: resdata.data.id
              });
              let userdata = {
                type: resdata.data.type,
                uscc: resdata.data.uscc,
                idno: resdata.data.idno,
                name: resdata.data.name,
                contact: resdata.data.contact,
                phone: resdata.data.contactPhone,
                region: [resdata.data.provinceName.dictName, resdata.data.cityName.dictName, resdata.data.areaName.dictName],
                address: resdata.data.address
              };
              that.setData({
                userinfoData: userdata
              });
              let regionData = [resdata.data.province, resdata.data.city, resdata.data.area];
              that.setData({
                regionCode: regionData
              });
            }
          }
        })
      },
    })
  },
  //选择省、市、区
  bindRegionChange: function (e) {
    this.setData({
      'userinfoData.region': e.detail.value
    })
    this.setData({
      regionCode: e.detail.code
    })
  },
  //确认修改信息
  infoSubmit: function (e) {
    let that = this;
    let formData = e.detail.value;
    if (formData.phone == "" || formData.name == "" || formData.address == "") {
      wx.showToast({
        title: '请输入完整信息',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let phonePass = this.checkPhoneNum(formData.phone);
    if (phonePass) {
      let uid = this.data.empid;
      if (that.data.isSubmit) {
        this.setData({
          isSubmit: false
        })
        wx.request({
          url: apiUrl + '/ally/' + that.data.uid,
          header: {
            'content-type': 'application/json',
            'Authorization': wx.getStorageSync("Token")
          },
          method: 'put',
          data: {
            name: formData.name,
            contact: formData.contact,
            contactPhone: formData.phone,
            province: that.data.regionCode[0],
            city: that.data.regionCode[1],
            area: that.data.regionCode[2],
            address: formData.address
          },
          success(res) {
            if (res.statusCode == 401) {
              app.overtime(res.statusCode)
              return false;
            }
            const resdata = res.data;
            if (resdata.code == '0') {
              wx.showToast({
                title: '信息修改成功！',
                icon: 'none',
                duration: 1000
              })
              setTimeout(function () {
                wx.navigateTo({
                  url: '../user/user',
                })
              }, 1000)
            } else {
              that.setData({
                isSubmit: true
              })
              wx.showToast({
                title: resdata.msg,
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
    }
  },
  //手机号验证
  checkPhoneNum: function (phoneNumber) {
    let str = /^1\d{10}$/
    if (str.test(phoneNumber)) {
      return true
    } else {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none',
        duration: 2000
      })
      return false
    }
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