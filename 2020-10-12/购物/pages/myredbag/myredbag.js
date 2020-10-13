const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    global_Data: '',
    moretype: false,
    pageNo: 1,
    pageSize: 20,
    redbaglist: [],
    shareredcode: '',
    shareCode: '',
    user_name: '',
    showtype: false,
    sharetype:false,
    showPoster:false,
    imgurldata: '',
    shareTitle: '',
    posterurl: '',
    pages: '',
  },
  onLoad: function (options) {
    const that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          user_name: res.data.nickName
        });
      },
      fail: function(){
        that.setData({
          user_name: ''
        });
      }
    });
    that.setData({
      global_Data: app.globalData
    });
    that.get_myredbaglist(that.data.pageNo);
  },
  get_myredbaglist: function (pageNo) {//获取我的红包
    wx.showLoading({
      title: '加载中',
    })
    const that = this;
    let linkData = {
      pageNo: pageNo,
      pageSize: 20,
      hotelId: app.globalData.hotelId
    };
    wxrequest.getmyredbaglist(linkData).then(res => {
      const resdata = res.data;
      const resdatas = res.data.data;
      let redbag_list = that.data.redbaglist;
      if (resdata.code == 0) {
        if(redbag_list.length == 0) {
          redbag_list = resdatas.records;
        } else {
          redbag_list = redbag_list.concat(resdatas.records);
        }
        that.setData({
          redbaglist: redbag_list,
          pages: resdatas.pages
        });
      } else {
        that.setData({
          searchLoadingComplete: false
        });
      }
      wx.hideNavigationBarLoading();// 隐藏导航栏加载框
      wx.stopPullDownRefresh();// 停止下拉动作
      wx.hideLoading();// 隐藏加载框
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  onPullDownRefresh: function () {//下拉刷新
    const that = this;
    that.setData({
      moretype: true,
      pageNum: 1,
      redbaglist: []
    });
    that.get_myredbaglist(1);
  },
  onReachBottom: function () {//上拉加载
    var that = this;
    let page_No = that.data.pageNo;
    let pages = that.data.pages;
    if (pages == page_No) {
      that.setData({
        moretype: false
      })
    } else {
      wx.showLoading({// 显示加载图标
        title: '玩命加载中',
      });
      page_No = page_No + 1;// 页数+1
      that.setData({
        pageNo: page_No
      })
      that.get_myredbaglist(page_No);
    }
  },
  shareredbagfun: function (e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      shareCode: e.currentTarget.dataset.code
    })
    let posterflag = e.currentTarget.dataset.posterflag
    this.sharefun(posterflag)
  },
  getTitle: function(){//朋友圈分享获取海报
    const that = this;
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    wxrequest.getTitle({code: this.data.shareredcode}).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
          this.setData({
            imgurldata: resdatas.picUrl,
            shareTitle: resdatas.title,
          })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none', 
          duration: 2000
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  get_poster: function(){//朋友圈分享获取海报
    const that = this;
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    wxrequest.getNewPoster(that.data.shareredcode).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          posterurl: resdatas,
          showPoster:true
        });
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none', 
          duration: 2000
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  closefuns: function () {//关闭分享窗口
    this.setData({
      sharetype: false
    })
  },
  sharefun1(){
    this.setData({
      showtype: true,
      sharetype: false
    });
  },
  sharefun(posterflag){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    wxrequest.postmyredbagsharecode(this.data.shareCode).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        this.setData({
          sharetype: posterflag?true:false,
          shareredcode: resdatas
        });
        if(!posterflag){
          this.sharefun1()
        }
        this.getTitle()
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  closefun: function () {//关闭分享窗口
    this.setData({
      showtype: false
    })
  },
  closefunP: function () {//关闭分享窗口
    this.setData({
      showPoster: false
    })
  },
  viewDetail(e){
    let redpack = JSON.stringify(e.currentTarget.dataset.redpack)
    wx.navigateTo({
      url: '/pages/redbagDetail/redbagDetail?redpack='+redpack
    })
  },
  saveimg: function(){
    const that = this;
    wx.showToast({
      icon: 'loading',
      title: '正在保存图片',
      duration: 1000
    })
    let imgUrl = that.data.posterurl;
    console.log(imgUrl);
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
                success:modalSuccess=>{
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
                      console.log("failData",failData)
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
  previewImg: function () {
    const that = this;
    let imglist = [];
    imglist.push(that.data.posterurl);
    wx.previewImage({
      current: imglist[0],     //当前图片地址
      urls: imglist               //所有要预览的图片的地址集合 数组形式
    })
  },
  onShareAppMessage: function (options) {
    const that = this;
    that.setData({
      showtype: false
    });
    this.post_sharehistory()
    return {
      title: that.data.shareTitle?that.data.shareTitle:(that.data.user_name?that.data.user_name+'给你发了一个现金红包，领取后可提入微信零钱':'好友给你发了一个现金红包，领取后可提入微信零钱'),
      path: 'pages/login/login?sharecode=' + that.data.shareredcode,  // 路径，传递参数到指定页面。
      imageUrl: that.data.imgurldata?that.data.imgurldata:(that.data.global_Data.imgurldata + 'shareimg.png'), // 分享的封面图
      success: function (res) {// 转发成功

      },
      fail: function (res) {// 转发失败
        if (res.errMsg == 'shareAppMessage:fail cancel') {//用户取消转发
          console.log('用户取消转发');
        } else if (res.errMsg == 'shareAppMessage:fail') {//转发失败，其中detail message为详细失败信息
          console.log('转发失败');
        }
      }
    }
  },
  post_sharehistory: function(){//新增酒店分享记录
    const that = this;
    const linkData = {
      shareCode: that.data.shareredcode
    }
    wxrequest.postsharehistory(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {} else {
        console.log(err)
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  }
})