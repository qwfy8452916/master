// pages/hexCardTicket/hexCardTicket.js
const app=getApp();
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
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    sweepcardcode:'',
    cardId:'', //卡券id
    cardDetail:{}, //卡券详情

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let str = options.sweepcardcode.split(":")[1];

    that.setData({
      sweepcardcode: options.sweepcardcode,
      cardId: str
    })
    this.getCardDetail()

  },

  //确认核销
  surehx:function(){
    this.getCartdata();
  },

  //获取卡券详情
  getCardDetail:function(){
    let that=this;
    wx.showLoading()
    wx.request({
      url: apiUrl + 'vou/voucher/' + that.data.cardId,
      method: "GET",
      data: {},
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.statusCode)
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }

        if (res.data.code == 0) {
          that.setData({
            cardDetail: res.data.data
          })
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
            wx.redirectTo({
              url: '../faceServer/faceServer',
            })
          });
        }
      },
      fail: function (error) {
        console.log(res.statusCode)
        wx.hideLoading()
        alertViewWithCancel("提示", error, function () {
          wx.redirectTo({
            url: '../faceServer/faceServer',
          })
        });
      }
    })

  },

  getCartdata:function(){
    let that=this;
    wx.showLoading()
    wx.request({
      url: apiUrl +'vou/voucher/verify',
      method: "PUT",
      data:{
        hotelId: wx.getStorageSync("hotelId"),
        verifiedCode: that.data.sweepcardcode,
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      success:function(res){
        wx.hideLoading()
        if (res.data.code==0){
          if (res.data.data==0){
              wx.redirectTo({
                url: '../hexiaosuccess/hexiaosuccess',
              })
            }else{
              wx.redirectTo({
                url: '../hexiaofail/hexiaofail?failStatus=' + res.data.data,
              })
            }
            
        }else{
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error){
        wx.hideLoading()
        alertViewWithCancel("提示", error, function () {
        });
      }
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