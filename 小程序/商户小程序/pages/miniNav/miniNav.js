// pages/miniNav/miniNav.js
const app = getApp();
import wxrequest from '../../utils/api'
import WxValidate from '../../utils/WxValidate'
app.Base({
  data: {
    pageAuthority: {}, //功能权限
    globalData: '',
    form: {
      userName: '',
      passWord: ''
    }
  },
  onShow: function () {
    wx.hideHomeButton();
    // var denyFunction = ['alert']//初始不执行函数，全部不执行则传字符all
    // var denyFunction = 'all' //初始不执行函数，全部不执行则传字符all
    // this.init(denyFunction)

  },
  onLoad: function (options) {
    let that=this;
    this.setData({
      pageAuthority: wx.getStorageSync("pageAuthority"),
    })

    let popup = this.selectComponent("#tabbar");
    if (options.tabindex) {
      that.setData({
        Tabindex: options.tabindex
      })
    } else {
      that.setData({
        Tabindex: 1
      })
    }
    popup.dabdata()
    popup.tabzhixing(that.data.Tabindex)
  },
  //安装
  install:function(){
    wx.navigateTo({
      url: '/pages/cabinetlist/cabinetlist?navindex=0',
    })
  },
  //更换
  replace:function(){
    wx.navigateTo({
      url: '/pages/cabinetlist/cabinetlist?navindex=2',
    })
  },
  //维修
  repair:function(){
    wx.navigateTo({
      url: '/pages/cabinetlist/cabinetlist?navindex=1',
    })
  },
  //补货
  replenishment:function(){
    wx.navigateTo({
      url: '/pages/housematterlist/housematterlist',
    })
  },
  
})
