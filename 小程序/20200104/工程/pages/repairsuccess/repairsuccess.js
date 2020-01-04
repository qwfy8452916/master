// pages/repairsuccess/repairsuccess.js

const app = getApp()
let apiUrl = app.getApiUrl();
let hotelid = app.globalData.hotelId;
let passid = app.globalData.passId;
let token = app.globalData.token
function alerttishi(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    cancelColor: "#ff9700",
    confirmColor: "#ff9700",
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
    repairpage:1,  //默认页码
    repairlistdata:[],   //维修记录
    sizejudge2:0,     //标记
    gaodu:null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.getrepairrecord();
  },

  handlerecord:function(e){
    wx.navigateTo({
      url: '../detailnormal/detailnormal?id=' + e.currentTarget.dataset.id,
    })
  },

  //获取维修记录


  getrepairrecord: function () {
    let that = this;
    let tempDataSet = [];
    wx.request({
      url: apiUrl + '/mal/project',
      data: {
        pageSize: 20,
        pageNo: that.data.repairpage,
        orgAs: wx.getStorageSync("orgAs")
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          wx.showLoading({
            title: "加载中",
            duration: 500,
          })

          if (res.data.data.records.length < 20 && res.data.data.records.length > 0) {
            that.setData({
              sizejudge2: 0
            })
          } else {
            that.setData({
              sizejudge2: 1
            })
          }
          tempDataSet = that.data.repairlistdata.concat(res.data.data.records)
          that.setData({
            repairlistdata: tempDataSet
          })
        }
      },
      fail: function (error) {
        alerttishi("提示", error, function () {
        });
      }
    });
  },


  downLoad: function () {
    let that = this;
    let page2 = that.data.repairpage;
    if (that.data.sizejudge2) {
      that.setData({
        repairpage: ++page2
      })
      that.getrepairrecord();
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
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        //设置map高度，根据当前设备宽高满屏显示
        that.setData({
          gaodu: res.windowHeight * 2
        })
      }
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