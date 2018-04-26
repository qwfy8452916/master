// pages/play_detail/play_detail.js
let app = getApp();
let apiUrl = app.getApiUrl();
const imgUrl = app.getImgUrl();
const collect = require('../../utils/collectTool.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailInfo:{},
    imgUrl: imgUrl,
    bofangkz:false,
    bofangtsxx:false,
    pageId:null,
    bofangshujv:[],
    recommendshujv:[],
    imgUrl: imgUrl,
    zan:true,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    collect.collect.collectInit(this, "recommendshujv",true);//收藏引用

    let that = this;
    that.setData({ pageId: options.id });
    that.ajaxsend();


  
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
  tiaozbj:function(){
    wx.navigateTo({
      url:'../jsq/jsq'
    })
  },

  startbf:function(){
    let that = this;
    that.setData({
      bofangkz: false
    })
    
    wx.onNetworkStatusChange(function (res) {
      console.log(res.isConnected)
      console.log(res.networkType)
      if (res.isConnected==true){
        if (res.networkType == "3g" || res.networkType == "4g" || res.networkType == "2g"){
           that.setData({
             bofangtsxx:true,
           })

           setTimeout(function () {
             that.setData({
               bofangtsxx: false
             })
           }, 2000)

         }
      }else{
         console.log("无网络类型")
      }
    })
 

  },

  stopbf:function(){
    let that=this;
    that.setData({
      bofangkz:true
    })
    

  },
  bofchufa:function(){
    let that=this;
    that.videoContext = wx.createVideoContext('myVideo')
    that.videoContext.play();
  },
  djstop:function(){
    let that = this;
    that.videoContext = wx.createVideoContext('myVideo')
    that.videoContext.pause();
  },

  bofangtiao:function(x){
    let that=this;
    let tuijianid = x.currentTarget.dataset.id;
    that.setData({
      pageId: tuijianid,
    })

    that.ajaxsend();

  },

  ajaxsend:function(){
    let that=this;

    wx.request({
      url: apiUrl + '/appletgonglue/getVideoDetail',
      header: { 'content-type': 'application/json' },
      dataType: 'json',
      data: { id: that.data.pageId },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          bofangshujv: res.data.data.videoDetail,
          recommendshujv: res.data.data.videoRecommend,
        })
      }
    })

  },

  dianzan: function () {
    let that = this;
    let user = app.getNewStorage('user');
    let bofangshujv = that.data.bofangshujv;
    let bool = true;
    console.log(that.data.bofangshujv.id)
    if (user) {
      for (let i = 0; i < user.length; i++) {
        if (user[i] == bofangshujv.id) {
          bool = false;

          that.setData({ zan: false })
          break;
        } else {
          bool = true;
        }
      }
      if (bool) {
        wx.request({
          url: apiUrl + '/appletcarousel/like',
          data: {
            id: that.data.bofangshujv.id
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.data.state === 1) {
              // let dianzanNow = that.data.bofangshujv;
              // dianzanNow.likes = parseInt(dianzanNow.likes) + 1;
              // console.log(dianzanNow)
              that.setData({
              // bofangshujv: dianzanNow,
              zan: false
               });
              user.push(that.data.bofangshujv.id)
              app.setNewStorage('user', user);
            }
          }
        });
      } else {
        wx.showModal({
          title: '您已经点过了',
          showCancel: false,
          success: function (res) {

          }
        });
      }
    } else {
      let user = [];
      wx.request({
        url: apiUrl + '/appletcarousel/like',
        data: {
          id: that.data.bofangshujv.id
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data.state === 1) {
            // let dianzanNow = that.data.bofangshujv;
            // dianzanNow.likes = parseInt(bofangshujv.likes) + 1;
            // console.log(dianzanNow)
            that.setData({ 
            // bofangshujv: dianzanNow,
            zan: false });
            user.push(that.data.bofangshujv.id)
            app.setNewStorage('user', user);
          }
        }
      });
    }

  },
  /**
    * 用户点击右上角分享
    */
  onShareAppMessage: function () {

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