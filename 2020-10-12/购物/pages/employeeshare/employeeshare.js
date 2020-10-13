const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    global_Data: '',
    sharetitel: '',
    sharetitel2: '',
    shareimage: '',
    sharecode: '',
    titletype: false
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      global_Data: app.globalData
    })
    wx.hideShareMenu();
    that.get_sharecontent(options.employee);//获取分享信息
  },
  onShow: function(){
    wx.hideHomeButton();
  },
  get_sharecontent: function (code) {
    const that = this;
    const linkData = {
      code: code
    }
    wxrequest.getsharecontent(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          sharetitel: resdatas.title,
          shareimage: resdatas.picUrl,
          sharecode: code
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
  onShareAppMessage: function (options) {
    const that = this;
    that.post_sharehistory();
    return {
      title: that.data.sharetitel,
      path: 'pages/login/login?sharecode=' + that.data.sharecode,  // 路径，传递参数到指定页面。
      imageUrl: that.data.shareimage, // 分享的封面图
      success: function (res) {// 转发成功
        console.log('用户取消转发');
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
  previewImg: function () {
    const that = this;
    let imglist = [];
    imglist.push(that.data.shareimage);
    wx.previewImage({
      current: imglist[0],     //当前图片地址
      urls: imglist               //所有要预览的图片的地址集合 数组形式
    })
  },
  toggletitle: function () {
    this.setData({
      titletype: !this.data.titletype
    })
  },
  changetitle: function (e) {
    this.setData({
      sharetitel2: e.detail.value
    })
  },
  confirmtitle: function () {
    const that = this;
    if(that.data.sharetitel2 == ''){
      wx.showToast({
        title: '标题不可为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      that.toggletitle();
      that.setData({
        sharetitel: that.data.sharetitel2
      })
    }
  },
  post_sharehistory: function(){//新增酒店分享记录
    const that = this;
    const linkData = {
      shareCode: that.data.sharecode
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