const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
// pages/updateinfo/updateinfo.js
const app = getApp();
const apiUrl = app.getApiUrl();
let token = app.globalData.token;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    empid: '',
    //用户id
    userinfoData: {
      //用户信息
      account: "",
      jobnum: "",
      name: "",
      phone: "",
      email: ""
    },
    isSubmit: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this; //获取用户id

    wx2my.getStorage({
      key: 'empid',
      success: function (res) {
        that.setData({
          empid: res.data
        }); //获取用户信息

        wx2my.request({
          url: apiUrl + '/user/emp/' + res.data,
          header: {
            'content-type': 'application/json',
            'Authorization': wx2my.getStorageSync("Token")
          },
          method: 'get',

          success(res) {
            if (res.statusCode == 401) {
              app.overtime(res.statusCode);
              return false;
            }

            const resdata = res.data;

            if (resdata.code == '0') {
              let userdata = {
                account: resdata.data.account,
                jobnum: resdata.data.empNo,
                name: resdata.data.empName,
                phone: resdata.data.empMobile,
                email: resdata.data.empEmail
              };
              that.setData({
                userinfoData: userdata
              });
            }
          }

        });
      }
    });
  },
  //确认修改信息
  infoSubmit: function (e) {
    let that = this;
    let formData = e.detail.value;

    if (formData.name == "" || formData.phone == "") {
      wx2my.showToast({
        title: '请输入完整信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    let phonePass = this.checkPhoneNum(formData.phone);
    let emailPass = this.checkEmail(formData.email);

    if (phonePass) {
      if (formData.email != '') {
        if (!emailPass) {
          return false;
        }
      }

      let uid = this.data.empid;

      if (that.data.isSubmit) {
        this.setData({
          isSubmit: false
        });
        wx2my.request({
          url: apiUrl + '/user/emp',
          header: {
            'content-type': 'application/json',
            'Authorization': wx2my.getStorageSync("Token")
          },
          method: 'put',
          data: {
            id: uid,
            account: formData.account,
            empNo: formData.jobnum,
            empName: formData.name,
            empMobile: formData.phone,
            empEmail: formData.email
          },

          success(res) {
            if (res.statusCode == 401) {
              app.overtime(res.statusCode);
              return false;
            }

            const resdata = res.data;

            if (resdata.code == '0') {
              wx2my.showToast({
                title: '信息修改成功！',
                icon: 'none',
                duration: 1000
              });
              setTimeout(function () {
                wx2my.navigateTo({
                  url: '../personalcenter/personalcenter'
                });
              }, 1000);
            } else {
              that.setData({
                isSubmit: true
              });
              wx2my.showToast({
                title: resdata.msg,
                icon: 'none',
                duration: 2000
              });
            }
          }

        });
      }
    }
  },
  //手机号验证
  checkPhoneNum: function (phoneNumber) {
    let str = /^1\d{10}$/;

    if (str.test(phoneNumber)) {
      return true;
    } else {
      wx2my.showToast({
        title: '手机号格式错误',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
  },
  //邮箱验证
  checkEmail: function (emailInfo) {
    let str = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;

    if (str.test(emailInfo)) {
      return true;
    } else {
      wx2my.showToast({
        title: '邮箱格式错误',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});