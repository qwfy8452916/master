// pages/sharehaibao/sharehaibao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     showHide:true,
     text:"需要复制的内容",
     fenlist:[{a:1,b:2},{a:1},{b:2}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  copyTBL: function (e) {
    var self = this;
    wx.setClipboardData({
      data: self.data.text,
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '复制成功',
          success: function (res) {
            console.log(res)
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    })
  },
   


  closepic:function(){
    this.setData({
      showHide:true
    })
  },

  saveImg:function(){
    wx.showToast({
      icon: 'loading',
      title: '正在保存图片',
      duration: 1000
    })
    let imgUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583573415636&di=44711f954f0a4f831d01794f858ebd26&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F21%2F09%2F01200000026352136359091694357.jpg';
    wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
      url: imgUrl,
      success: function (res) {
        // 下载成功后再保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
          success: function (res) {
            wx.showToast({
              title: '成功保存到相册',
              icon: 'success'
            })
          }
        })
      }
    })
  },

  preview:function(){

    var that = this;
    let imgUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583573415636&di=44711f954f0a4f831d01794f858ebd26&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F21%2F09%2F01200000026352136359091694357.jpg';

    //图片预览
    wx.previewImage({
      current: imgUrl, // 当前显示图片的http链接
      urls: [imgUrl], // 需要预览的图片http链接列表 必须是数组
      success:function(res){
         console.log(res)
      },
      fail:function(err){
        console.log(err)
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
  onShareAppMessage: function (e) {
      console.log("有分享")
      console.log(e)
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    let shareCode = '分享001'
    return {
      title: '酒店星级大厨推荐',
      imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583567939069&di=e630f17406c1f2b6884d6fa7de92a3c7&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F0dd7912397dda144dac4acc9b2b7d0a20df486f8.jpg',
      path: '/pages/myshare/myshare?shareCode=' + shareCode,
    }

  },

})