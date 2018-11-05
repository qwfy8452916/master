// pages/shouquan/index.js
const app = getApp();
function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
  },
  bindgetuserinfo:function(e){
    let that = this;
    if (e.detail.userInfo){
      that.setData({
        isAgree: false
      });
      app.getLoginAgain(function(res){
        app.globalData.userInfo=res;
        wx.setStorage({
          key: 'userId',
          data: app.globalData.userInfo.userId,
        })
      });
    }else{
      that.setData({
        isAgree: true
      });
    }
  }
})