// pages/channelcode/channelcode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeurl: '',
    imglist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      codeurl: options.qrurl
    });
  },
  //分享转发
  onShareAppMessage: function(options){
    let that = this;
    //设置转发内容
    let shareObj = {
      title: "这是转发标题",
      path: '/pages/channelcode/channelcode',
      imageUrl: '',
      success: function(res){
        // console.log(1111111);
      },
      fail: function(res){
        // console.log(222222222);
        //转发失败之后的回调
        if(res.errMsg == 'shareAppMessage:fail cancel'){
          //用户取消转发
          console.log('用户取消转发');
        }else if(res.errMsg == 'shareAppMessage:fail'){
          //转发失败，其中detail message为详细失败信息
          console.log('转发失败');
        }
      },
      complete: function(){
        //转发结束
        // console.log('转发结束');
      }
    };
    // //来自页面内的按钮转发
    // if(options.from == 'button'){
    //   let eData = options.target.dataset;
    //   console.log(eData.name);   //shareBtn
    //   //此处可修改shareObj中的内容
    //   shareObj.path = '/pages/channelcode/channelcode?btn_name=' + eData.name;
    // }
    //返回shareObj
    return shareObj;
  },
  //图片预览
  previewImage: function (e) {
    var current = e.target.dataset.src;
    let listimg = [];
    listimg[0] = current;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: listimg // 需要预览的图片http链接列表  
    })
  } ,

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
})