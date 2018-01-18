// pages/shouyexq/shouyexq.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dianji:false,
    tuwen: [{
      text: '五种客厅墙面漆颜色 不知你喜欢的是？五种客厅墙面漆颜色', time: '2017-05-13', shuliang: '641',
      image: '../../img/tuwenbj.png', image2: '../../img/yuedubj.png', zhixiang: 'zxsjym'
    },
    {
      text: '五种客厅墙面漆颜色 不知你喜欢的是？五种客厅墙面漆颜色', time: '2017-05-13', shuliang: '641',
      image: '../../img/tuwenbj.png', image2: '../../img/yuedubj.png', zhixiang: 'zxsjym1'
    },
    {
      text: '五种客厅墙面漆颜色 不知你喜欢的是？五种客厅墙面漆颜色', time: '2017-05-13', shuliang: '641',
      image: '../../img/tuwenbj.png', image2: '../../img/yuedubj.png', zhixiang: 'zxsjym2'
    },
    {
      text: '五种客厅墙面漆颜色 不知你喜欢的是？五种客厅墙面漆颜色', time: '2017-05-13', shuliang: '641',
      image: '../../img/tuwenbj.png', image2: '../../img/yuedubj.png', zhixiang: 'zxsjym'
    },
    {
      text: '五种客厅墙面漆颜色 不知你喜欢的是？五种客厅墙面漆颜色', time: '2017-05-13', shuliang: '641',
      image: '../../img/tuwenbj.png', image2: '../../img/yuedubj.png', zhixiang: 'zxsjym2'
    }],
    dianzansl:766,
  },

  zxsjym1: function () {
    wx.navigateTo({
      url: '../zhuangxiusj/zhuangxiusj'
    })
  },

   dianjizan:function(){
    var that=this
    console.log(that.data.userInfo)
     if(that.data.dianji==false){
     
       that.setData({
         dianzansl: that.data.dianzansl + 1
       })
       that.setData({
         dianji: true
       })
     }else{
       return;
     }
    
   },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log(this.data.userInfo)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      console.log(this.data.userInfo)
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          console.log(this.data.userInfo)
        }
      })
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