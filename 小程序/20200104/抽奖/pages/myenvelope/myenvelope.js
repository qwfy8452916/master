const app = getApp()
import wxrequest from '../../request/api'
Page({
  data: {
    listdata: [],
    envelopelist: [],
    showtype: false,
    index: 0,
    edata: '',
    sharecode: '',
    name: '',
    ifenvelope:false
  },
  onLoad: function (options) {
    const that = this;
    wx.hideShareMenu();
    if (options.sharecode){
      that.setData({
        sharecode: options.sharecode,
        showtype: true
      });
    }
    let name = app.globalData.loginInfo.nickName ? app.globalData.loginInfo.nickName : '有人';
    that.setData({
      name: name
    })
  },
  onShow: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    const params = {
      investorId: wx.getStorageSync('userAuth').id
    }
    wxrequest.getredPacket(params).then(res => {
      wx.hideLoading();
      if (res.data.code == 0) {
        this.setData({
          listdata: res.data.data
        });
        if(!res.data.data[0]){
          this.setData({
            ifenvelope:true
          })
        }
      } else if (res.data.code == 1) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  showbox: function (e) {//打开分享窗口
    let edata = e.currentTarget.dataset;
    edata = JSON.stringify(edata);
    wx.navigateTo({
      url: '../createenvelope/createenvelope?edata=' + edata
    });
  },
  closefun: function () {//关闭分享窗口
    this.setData({
      showtype: false
    })
  },
  onShareAppMessage: function (options) {
    const that = this;
    that.setData({
      showtype: false
    });
    const optionsdata = options.target.dataset;
    let share_code = '';
    if (optionsdata.type == 1) {
      share_code = that.data.sharecode;
    } else {
      share_code = optionsdata.sharecode;
    }
    console.log(share_code);
    return {
      title: that.data.name+'给你发了一个现金红包！',
      path: 'pages/smartCab/smartCab?shareCode=' + share_code,  // 路径，传递参数到指定页面。
      imageUrl: 'cloud://fortunestar-pics-p6drx.666f-fortunestar-pics-p6drx-1300540775/5f06ab79-94a0-4f5c-9402-181ebabb2cce.png', // 分享的封面图
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
  }
})