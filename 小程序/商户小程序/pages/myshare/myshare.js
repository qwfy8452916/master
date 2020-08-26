// pages/myshare/myshare.js
const app=getApp()
import wxrequest from '../../utils/api'
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
    date: [{ a: false }, { a: false }, { a: false }, { a: false }],
    sharedata:[],
    selectcolor:'', //当前选中

    showHide: true,
    haibaoUrl:'', //海报地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getdata()
  },

  getdata:function(){
    let that=this;
    let hotelId = app.globalData.hotelId;
    let status=1;
    wx.showLoading({
      title: "加载中"
    });
    wxrequest.getInStoredata(hotelId, status).then(res => {
      wx.hideLoading()
      if (res.statusCode == 401) {
        app.overtime(res.statusCode)
        return false;
      }
      if (res.data.code == 0) {
        that.setData({
          sharedata: res.data.data
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },

  forward:function(e){
    let that=this;
    let modelType = e.currentTarget.dataset.modeltype;
    let modelId = e.currentTarget.dataset.modelid;
    let hotelId = e.currentTarget.dataset.hotelid;
    let listordan = e.currentTarget.dataset.listordan;
    let btntype = e.currentTarget.dataset.btntype;
    let shareObj;
    if (modelType==1){
      shareObj=1
    } else if (modelType == 2){
      shareObj = 2
      modelId= -1  //客房协议价获取code传-1
    }
    if (listordan === 'itemOnOff') {
      wx.navigateTo({
        url: '../selectshare/selectshare?modelType=' + modelType + '&modelId=' + modelId + '&hotelId=' + hotelId + '&btntype=' + btntype,
      })
    } else if (listordan === 'listOnOff'){
      console.log("列表转发")
      that.createCode(hotelId, modelId, shareObj, btntype)
    }
    
  },

  createCode: function (hotelId, modelId, shareObj, btntype){
    let that=this;
    wx.showLoading({
      title: "加载中"
    });
    let params = {
      hotelId: hotelId,
      funcId: modelId,
      shareObj: shareObj,
      shareObjId: -1,
      shareUserId: app.globalData.empId,
      shareUserType: 1,
      shareType: 1
    };
    wxrequest.postcreateCode(params).then(res => {
      wx.hideLoading()
      if (res.statusCode == 401) {
        app.overtime(res.statusCode)
        return false;
      }
      if (res.data.code == 0) {
        console.log(btntype)
        if (btntype ==='zhuanfa'){
          console.log(res.data.data.shareCode)
          that.openApp(res.data.data.shareCode)
        } else if (btntype === 'haibao'){
          that.get_haibaodata(res.data.data.id);
        }
        
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1200
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },

  openApp: function (shareCode){
    wx.navigateToMiniProgram({
      appId: 'wxe4bc42f44b79c8dc',
      path: 'pages/login/login?employee=' + shareCode,
      // extraData: {
      //   employee: shareCode
      // },
      envVersion: 'release',
      success(res) {
        console.log('打开成功');
      }
    })
  },

  haibaoshare:function(e){
    let that = this;
    let modelType = e.currentTarget.dataset.modeltype;
    let modelId = e.currentTarget.dataset.modelid;
    let hotelId = e.currentTarget.dataset.hotelid;
    let btntype = e.currentTarget.dataset.btntype;
    let shareType = e.currentTarget.dataset.sharetype;
    let shareObj;
    if (shareType==2){
      wx.navigateTo({
        url: '../selectshare/selectshare?modelType=' + modelType + '&modelId=' + modelId + '&hotelId=' + hotelId + '&btntype=' + btntype,
      })
      return false;
    }
    if (modelType == 1) {
      shareObj = 1
    } else if (modelType == 2) {
      shareObj = 2
      modelId = -1  //客房协议价获取code传-1
    }
    that.createCode(hotelId, modelId, shareObj, btntype)
    
  },

  // 获取海报
  get_haibaodata:function(codeId){
    let that=this;
    wx.showLoading({
      title: "加载中"
    });
    wxrequest.gethaibaodata(codeId).then(res => {
      wx.hideLoading()
      if (res.statusCode == 401) {
        app.overtime(res.statusCode)
        return false;
      }
      if (res.data.code == 0) {
        console.log(res.data.data)
        
        that.setData({
          haibaoUrl: res.data.data,
          showHide: false
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },


  closepic: function () {
    this.setData({
      showHide: true
    })
  },

  saveImg: function () {
    let that=this;
    wx.showToast({
      icon: 'loading',
      title: '正在保存图片',
      duration: 1000
    })
    let imgUrl = that.data.haibaoUrl;
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
          },
          fail: function (err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
              wx.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success: modalSuccess => {
                  wx.openSetting({
                    success(settingdata) {
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限成功,再次点击保存图片按钮即可保存',
                          showCancel: false,
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限失败，将无法保存到相册哦~',
                          showCancel: false,
                        })
                      }
                    },
                    fail(failData) {
                      console.log("failData", failData)
                    },
                    complete(finishData) {
                      console.log("finishData", finishData)
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  },

  preview: function () {

    let that = this;
    let imgUrl = that.data.haibaoUrl;

    //图片预览
    wx.previewImage({
      current: imgUrl, // 当前显示图片的http链接
      urls: [imgUrl], // 需要预览的图片http链接列表 必须是数组
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
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
  onShareAppMessage: function () {

  }
})