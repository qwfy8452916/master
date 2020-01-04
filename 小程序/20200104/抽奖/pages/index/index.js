//index.js
//获取应用实例
const app = getApp()
import wxrequest from '../../request/api'
Page({
  data: {
    title:'首页',
    indexUrls:[
      {
        itemUrl:'/pages/advantage/advantage',
        itemwords:'项目优势',
        imgUrl:'../../images/index/youshi.png'
      },
      {
        itemUrl:'/pages/prointro/prointro',
        itemwords:'产品介绍',
        imgUrl:'../../images/index/jieshao.png'
      },
      {
        itemUrl:'/pages/earncomputed/earncomputed',
        itemwords:'盈利测算',
        imgUrl:'../../images/index/computed.png'
      },
      {
        itemUrl:'/pages/policy/policy',
        itemwords:'权益保障',
        imgUrl:'../../images/index/zhence.png'
      },
    ],
    isShare:false,
    imgBlock:'none',
    ifshowShare: '',
    isSalesman: ''
  },
  loadImg(){
    this.setData({
      imgBlock:'block'
    })
  },
  
  share(){
    wx.navigateTo({
      url: '/pages/ChannelReg/ChannelReg'
    })
  },
  
  onLoad: function (options) {
  },
 
  onShareAppMessage: function () {
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    setTimeout(res => {
      wx.hideLoading()
    },2000)
    let shareCode = app.globalData.loginInfo.shareCode
    return {
      title:'您有10000元现金券待领取',
      imageUrl: 'cloud://fortunestar-pics-p6drx.666f-fortunestar-pics-p6drx-1300540775/券好友分享.jpg',
      path:'/pages/smartCab/smartCab?shareCode=' + shareCode
    }
  },
  onShow: function () {
    if(wx.getStorageSync('isMember')){
      this.setData({
        isShare:true,
      })
    }
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
    if(app.globalData.loginInfo.isSalesman){
      this.setData({
        isSalesman:true
      })
    }
    if(app.globalData.loginInfo.upperShareCode){
      this.setData({
        ifshowShare:true
      })
    }
  },
})
