const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
// pages/updatepwd/updatepwd.js
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
      oldpwd: "",
      newpwd: "",
      confirmpwd: ""
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
        });
      }
    });
  },
  //确认修改密码
  infoSubmit: function (e) {
    let formData = e.detail.value;
    let that = this;

    if (formData.oldpwd == "" || formData.newpwd == "" || formData.confirmpwd == "") {
      wx2my.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (formData.newpwd.length < 6) {
      wx2my.showToast({
        title: '新密码长度至少6位',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (formData.newpwd != formData.confirmpwd) {
      wx2my.showToast({
        title: '新密码与确认密码不一致',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    let uid = this.data.empid;

    if (that.data.isSubmit) {
      this.setData({
        isSubmit: false
      });
      wx2my.request({
        url: apiUrl + '/user/emp/modifyPW/' + uid,
        header: {
          'content-type': 'application/json',
          'Authorization': wx2my.getStorageSync("Token")
        },
        method: 'put',
        data: {
          oldPassword: formData.oldpwd,
          newPassword: formData.newpwd
        },

        success(res) {
          if (res.statusCode == 401) {
            app.overtime(res.statusCode);
            return false;
          }

          const resdata = res.data;

          if (resdata.code == '0') {
            wx2my.showToast({
              title: '密码修改成功！',
              icon: 'none',
              duration: 1000
            });
            setTimeout(function () {
              wx2my.navigateTo({
                url: '../login/login'
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