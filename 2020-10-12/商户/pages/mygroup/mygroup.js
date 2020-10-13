// pages/mygroup/mygroup.js
const app = getApp()
let apiUrl = app.globalData.requestUrl;
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
    groupjudge:false,
    // numberjudge:true,
    rulesjudge:true,
    invitecode:true,
    autokey:false,
    yqmcode:'',
    teamData:null,  //社群成员数据
    teamCount:0, //社群成员个数

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getgroupData();
  },


getgroupData:function(){
  let that=this;
  wx.showLoading({
    title: "加载中"
  });
  wx.request({
    url: apiUrl + 'mktg/team/mine',
    data: {
      hotelId: wx.getStorageSync("hotelId")
    },
    method: 'GET',
    header: {
      'content-type': 'application/json',
      'Authorization': wx.getStorageSync("token")
    },
    success: function (res) {
      wx.hideLoading()
      if (res.statusCode == 401) {
        app.overtime(res.statusCode)
        return false;
      }
      if (res.data.code == 0) {
        let nowteamCount
        console.log(res)
        console.log(res.data.data.isCaptain)
        if (res.data.data.team===null){
          nowteamCount=0;
        }else{
          nowteamCount=res.data.data.team.length
        }
        that.setData({
          groupjudge: res.data.data.isCaptain,
          teamCount: nowteamCount,
          teamData: res.data.data.team,
          yqmcode: res.data.data.invitationCode
        })
      }
    },
    fail: function (error) {
      wx.hideLoading()
      alertViewWithCancel("提示", error, function () {
      });
    }
  })

},


  copybtn:function(){
    var self = this;
    wx.setClipboardData({
      data: self.data.yqmcode,
      success: function (res) {
       
      }
    })
  },

  invitecode:function(){
    this.setData({
      invitecode:false,
      autokey:true,
    })
  },
  

  btnitemsure:function(){
    let that=this;
    this.setData({
      invitecode: true,
      autokey:false
    })
    wx.showToast({
      title: '',
      icon:'success'
    })
  },

  cancelyqm: function () {
    this.setData({
      invitecode: true,
      autokey:false
    })
  },

  rulesdesc:function(){
    this.setData({
      rulesjudge:false,
    })
  },

  knowbtn:function(){
    this.setData({
      rulesjudge: true,
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