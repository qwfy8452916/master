// pages/functionDetail/functionDetail.js
const app=getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    functionDetail:{},
    isPickUp: false,  //是否自提取
    isTakeout: false, //是否支持外卖
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.hotelFunctionDetail(options.id)
  },


  //获取功能区详情
  hotelFunctionDetail:function(id){
    let that=this;
    wxrequest.hotelFunctionDetail(id).then(res=>{
      let resdata=res.data;

      let ztIndex;
      let wmIndex;
      if (resdata.data.delivWays != null) {
        ztIndex = resdata.data.delivWays.indexOf("4");
        wmIndex = resdata.data.delivWays.indexOf("7");
      }
      //自提区

      let nowisPickUp = that.data.isPickUp;
      if (ztIndex != -1) {
        nowisPickUp = true;
      } else {
        nowisPickUp = false;
      }

      //外卖

      let nowisTakeout = that.data.isTakeout;
      if (wmIndex != -1) {
        nowisTakeout = true;
      } else {
        nowisTakeout = false;
      }

      if (resdata.code==0){
         that.setData({
           functionDetail:resdata.data,
           isPickUp: nowisPickUp,
           isTakeout: nowisTakeout
         })
       }else{
         wx.showToast({
           title: resdata.msg,
           icon:'none',
           duration:2000
         })
       }
    }).catch(err=>{
      wx.showToast({
        title: err,
        icon:'none',
        duration:2000
      })
    })
  },

  //排序提示
  sorttip: function () {
    wx.showModal({
      title: '提示',
      content: '排序是根据数字的大小从大到小排列，数字越大越靠前，支持整数，默认为0。'
    })
  },

  //多次下的提示
  moretip: function () {
    wx.showModal({
      title: '提示',
      content: '如果开关打开，表示多人扫码，进入的是同一个订单，并可以多人多次点单。如果开关关闭，表示用户扫码下单，每个人都会生成一个新的订单。'
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