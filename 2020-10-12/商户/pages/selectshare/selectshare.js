
const app = getApp()
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
    listData:[],  //页面渲染数据
    modelType:'', //分享类型
    modelId:'', //功能区id
    hotelId:'', //酒店id
    shareObj: '', //1：商品分享，2：房源分享，
    selectIndex:'', //选择索引
    shareObjId:'',  //分享类型id
    shareCode:'',  //分享码
    btntype:'', //判断海报还是转发
    pageSize:30,
    nowpage:1,
    sizeJudge:0,

    showHide: true,
    haibaoUrl: '', //海报地址
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that=this;
    that.setData({
      modelType: options.modelType,
      modelId: options.modelId,
      hotelId: options.hotelId,
      btntype: options.btntype,
    })
    if (options.modelType==1){
      that.setData({
        shareObj:1,
      })
      that.get_FunData();
    } else if (options.modelType == 2){
      that.setData({
        modelId: -1,  //客房协议价获取code传-1
        shareObj:2
      })
      that.get_RoomxieyiData();

    }
    

  },


  get_FunData:function(){
    let that = this;
    let tempData=[];
    wx.showLoading({
      title: "加载中"
    });
    let params = {
      funcId: that.data.modelId,
      hotelId: that.data.hotelId
    };
    wxrequest.getFunData(params).then(res => {
      wx.hideLoading()
      if (res.statusCode == 401) {
        app.overtime(res.statusCode)
        return false;
      }
      if (res.data.code == 0) {
        console.log(res.data.data.records)
        let nowlistData = res.data.data.records;
        if (res.data.data.records.length < that.data.pageSize && res.data.data.records.length>0){
            that.setData({
              sizeJudge:0
            })
        }else{
          that.setData({
            sizeJudge: 1
          })
        }
        
        nowlistData.map(item=>{
          item.select=false
        })
        tempData = that.data.listData.concat(nowlistData)
        that.setData({
          listData: tempData
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },


  get_RoomxieyiData: function () {
    let that = this;
    wx.showLoading({
      title: "加载中"
    });
    let params = {
      hotelId: that.data.hotelId,
    };
    wxrequest.getRoomxieyiData(params).then(res => {
      wx.hideLoading()
      if (res.statusCode == 401) {
        app.overtime(res.statusCode)
        return false;
      }
      if (res.data.code == 0) {

        let nowlistData = res.data.data;
        nowlistData.map(item => {
          item.select = false
        })
        that.setData({
          listData: nowlistData
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },


  surebtn:function(){
    let that = this;
    wx.showLoading({
      title: "加载中"
    });
    let params = {
      hotelId: that.data.hotelId,
      funcId: that.data.modelId,
      shareObj: that.data.shareObj,
      shareObjId: that.data.shareObjId,
      shareUserId: app.globalData.empId, 
      shareUserType:1,
      shareType:2
    };
    wxrequest.postsure(params).then(res => {
      wx.hideLoading()
      if (res.statusCode == 401) {
        app.overtime(res.statusCode)
        return false;
      }
      if (res.data.code == 0) {
        that.setData({
          shareCode: res.data.data.shareCode
        })
        if (that.data.btntype === 'haibao'){
          that.get_haibaodata(res.data.data.id)
        } else if (that.data.btntype === 'zhuanfa'){
          wx.navigateToMiniProgram({
            appId: 'wxe4bc42f44b79c8dc',
            path: 'pages/login/login?employee=' + res.data.data.shareCode,
            // extraData: {
            //   employee: res.data.data.shareCode
            // },
            envVersion: 'release',
            success(res) {
              console.log('打开成功');
            }
          })

          }
          

      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },



  // 获取海报
  get_haibaodata: function (codeId) {
    let that = this;
    wx.showLoading({
      title: "加载中"
    });
    wxrequest.postsure(codeId).then(res => {
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
    let that = this;
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


  radiochange: function (e) {
    let nowdate = this.data.listData;
    let index = e.detail.value;
    let nowshareObjId = this.data.shareObjId;
    nowdate.map(item => {
      item.select = false
    })
    nowdate[index].select = true
    if (this.data.modelType==1){
      nowshareObjId = nowdate[index].funcProdId
    } else if (this.data.modelType == 2){
      nowshareObjId = nowdate[index].id
    }
    this.setData({
      listData: nowdate,
      selectIndex: index,
      shareObjId: nowshareObjId
    })
  },

  downLoad:function(){
    let that=this;
    let page = that.data.nowpage;
    if (that.data.sizeJudge){
      that.setData({
        nowpage:++page
      })
      that.get_FunData();
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