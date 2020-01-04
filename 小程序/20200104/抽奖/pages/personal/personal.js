// pages/personal/personal.js
const app = getApp()
import wxrequest from '../../request/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalMenu:[
      {
        iconPath:'../../images/personal/infos/coupon.png',
        desc:'优惠券',
        urlPath:'/pages/coupon/coupon'
      },
      {
        iconPath:'../../images/personal/infos/wxpic.png',
        desc:'官方微信',
        urlPath:'/pages/wxcount/wxcount'
      },
      {
        iconPath:'../../images/personal/infos/helpcenter.png',
        desc:'帮助中心',
        urlPath:'/pages/help/help'
      },
      {
        iconPath:'../../images/personal/infos/about.png',
        desc:'关于智盒',
        urlPath:'/pages/about/about'
      },
      // {
      //   iconPath:'../../images/personal/infos/lingdang.png',
      //   desc:'通知推送',
      //   urlPath:'/pages/message/message'
      // },
      {
        iconPath:'../../images/personal/infos/records.png',
        desc:'投资记录',
        urlPath:'/pages/records/records'
      }
    ],
    title:'个人中心',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    isShare: false,
    isSalesman: false,
    personalItems:[],
    isRich: false,
    richLevel: 1,
    isChannel:'',
    cabNum:0,
    caseNum:0,
    fortunePartnerCount:0,
    ifshowShare: app.globalData.loginInfo.upperShareCode,
    specialEnvoy:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //渠道-退出登录
  exitlogin: function(){
    wx.removeStorage({
      key: 'isChannel',
      success: function(res) {
        wx.reLaunch({
          url: '../index/index'
        })
      },
    })
  },

  upGrade(){
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否确认升级为财富特使？',
      cancelText:'取消',
      confirmText:'确认',
      success(res){
        if(res.confirm){
          wx.showLoading({
            title:'加载中',
            mask:true
          })
          wxrequest.upgrades(wx.getStorageSync('userAuth').id).then(res => {
            wx.hideLoading()
            if(res.data.code == 0){
              wx.showToast({
                title: '恭喜你！成为了财富特使！',
                icon: 'none'
              })
              that.relogin()
            }else{
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }
          }).catch(err => {
            wx.hideLoading()      
            console.log(err)
          })
        }
      }
    })
  },
  share(){
    wx.navigateTo({
      url: '/pages/ChannelReg/ChannelReg'
    })
  },
  setUserData(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },
  getUserInfo(e){
    app.globalData.userInfo = e.detail.userInfo
    console.log(e.detail)
    if(e.detail.userInfo){
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.showLoading({
        title: '加载中',
        mask: true
      });
      wx.login({
        success: function(res) {
          if(res.code) {
            let params = {
              encryptedData: e.detail.encryptedData,
              code: res.code,
              iv:e.detail.iv,
            }
            wxrequest.wxgetaAuth(params).then(res => {
              wx.hideLoading();
              if (res.data.code == 0) {
                console.log(res.data)
              }
            }).catch(err => {
              wx.hideLoading()
              console.log(err)
            })
          } else {
            console.log(res.errMsg)
          }
        }
      })
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
  onLoad: function () {
    this.setUserData();
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    let personalItems = [{
      name:'我的智盒',
      iconpath:'../../images/personal/block.png',
      num: '',
      urlpath:'/pages/equipdetail/equipdetail'
    }];
    let loginInfo = app.globalData.loginInfo;
    if(wx.getStorageSync('isChannel')){
      this.setData({
        isChannel: wx.getStorageSync('isChannel')
      })
      personalItems.push({
        name: '渠道链接',
        iconpath: '../../images/channellink/linkicon.png',
        num: '',
        urlpath: '/pages/channellink/channellink'
      })
      if(wx.getStorageSync('isMember')){
        this.setData({
          isShare: true
        })
      }
    }else if(wx.getStorageSync('isMember')){
      this.setData({
        isShare: true
      })
      if(loginInfo.specialEnvoyLevel && loginInfo.specialEnvoyLevel!='-1'){
        this.setData({
          richLevel: loginInfo.specialEnvoyLevel,
          isRich: true
        })
        personalItems.push({
          name:'我的团队',
          iconpath:'../../images/personal/sanhuan.png',
          num: '',
          urlpath:'/pages/myCommunity/myCommunity'
        })
        personalItems.push({
          name:'我的余额',
          iconpath:'../../images/personal/coin.png',
          num: '',
          urlpath:'/pages/restMoney/restMoney'
        })
        personalItems.push({
          name:'我的红包',
          iconpath:'../../images/personal/redpack.png',
          num: '',
          urlpath:'/pages/myenvelope/myenvelope'
        })
      }else{
        personalItems.push({
          name:'我的余额',
          iconpath:'../../images/personal/coin.png',
          num: '',
          urlpath:'/pages/restMoney/restMoney'
        })
        personalItems.push({
          name:'我的红包',
          iconpath:'../../images/personal/redpack.png',
          num: '',
          urlpath:'/pages/myenvelope/myenvelope'
        })
      }
    }
    this.setData({
      personalItems: personalItems
    })
  },
  onShow(){
    this.setData({
      specialEnvoy:app.globalData.loginInfo.specialEnvoyLevel
    })
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
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    wxrequest.mypersonnalRecords().then(res => {
      wx.hideLoading()
      if(res.data.code == 0){
        const resData = res.data.data
        this.setData({
          cabNum: resData.cabCount,
          caseNum: resData.balance,
          fortunePartnerCount: resData.fortunePartnerCount
        })
        this.setData({
          'personalItems[0].num':this.data.cabNum + '台'
        });
        let loginInfo = app.globalData.loginInfo;
        if(wx.getStorageSync('isMember') && !wx.getStorageSync('isChannel')){
          if(loginInfo.specialEnvoyLevel && loginInfo.specialEnvoyLevel != '-1'){
            this.setData({
              'personalItems[1].num':this.data.fortunePartnerCount + '个',
              'personalItems[2].num':this.data.caseNum.toFixed(2) + '元',
            });
          }else{
            this.setData({
              'personalItems[1].num':this.data.caseNum.toFixed(2)+'元',
            });
          }
        }
      }
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  relogin(){
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    wx.login({
      success: res => {
        wx.request({
          url: app.globalData.apiUrl + '/fs/investor/loginByWX', //仅为示例，并非真实的接口地址
          method: 'POST',
          data: {code: res.code},
          header: {'content-type': 'application/json'},
          success (res) {
            wx.hideLoading()
            if(res.data.code == 0){
              let resData = res.data.data.fsInvestorDTO
              wx.setStorageSync('userAuth', {
                openid: resData.openId,
                id: resData.id
              })
              wx.setStorageSync('token',resData.token)
              wx.setStorageSync('isMember',resData.isMember)
              app.globalData.loginInfo = resData;         
            }
            wx.reLaunch({
              url:'/pages/personal/personal'
            })
          },
          fail: function() {
            wx.hideLoading();
            console.log(err)
          }
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    let shareCode = app.globalData.loginInfo.shareCode
    return {
      title:'您有10000元现金券待领取',
      imageUrl: 'cloud://fortunestar-pics-p6drx.666f-fortunestar-pics-p6drx-1300540775/券好友分享.jpg',
      path:'/pages/smartCab/smartCab?shareCode=' + shareCode
    }
  }
})