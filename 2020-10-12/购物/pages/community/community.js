const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    ruletype: false,
    invitationcodetype: false,
    invitationcode: '',
    mycommunitylist: ''
  },
  onLoad: function () {
    const that = this;
    that.get_mycommunitylist();
  },
  onShow: function () {
    wx.hideHomeButton();
  },
  get_mycommunitylist: function () {//获取我的社群成员
    const that = this;
    let linkData = {
      hotelId: app.globalData.hotelId
    };
    wxrequest.getmycommunitylist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          mycommunitylist: resdatas
        })
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
  invitationcodeinp: function (e) {
    this.setData({
      invitationcode: e.detail.value
    })
  },
  subinvitationcodefun: function () {//提交邀请码
    const that = this;
    let invitation_code = that.data.invitationcode;
    if(invitation_code == ''){
      wx.showToast({
        title: '请填写邀请码',
        icon: 'none',
        duration: 2000
      });
      return false;
    } else {
      wxrequest.putinvitationcode(app.globalData.hotelId, invitation_code).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data;
        if (resdata.code == 0) {
          that.setData({
            invitationcodetype: false
          });
          wx.showToast({
            title: '恭喜您已成为团长',
            icon: 'success',
            duration: 2000
          });
          setTimeout(that.get_mycommunitylist(), 2000);
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
  },
  rulefun: function () {//规则弹窗
    this.setData({
      ruletype: !this.data.ruletype
    })
  },
  invitationcodefun: function () {//邀请码弹窗
    this.setData({
      invitationcodetype: !this.data.invitationcodetype
    })
  },
  copyinvitationcode: function (e) {//复制
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  memberdetilefun: function () {//社员信息
  }
})