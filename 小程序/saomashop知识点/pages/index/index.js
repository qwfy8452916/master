//index.js
//获取应用实例
const app = getApp()
function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: true,
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}
Page({
  data: {
    shangpin: [1,2,3,4,5,6,7,8],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    yanse:"7天",
    getsign:null,
    backgroundColor:"#f5a033",
    backgroundColor2: { headtone:"#f5a033"},
    footimg: [{ "id": 0, "iconPath": '././img/cc1.png', "selectedIconPath": '././img/cc2.png' }, { "id": 1, "iconPath": '././img/cc1.png', "selectedIconPath": '././img/cc2.png'}]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var skindata = [{ skintone: "#xxxxxx", headtone: "#xxxxxx", foottone: "#xxxxxx", footcolor: "#xxxxxx", selectfootcolor: "#xxxxxx", }]
    
  //  头部
    wx.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: this.data.backgroundColor2.headtone,
      animation: { // 可选项
        duration: 400,
        timingFunc: 'easeIn'
      }
    });

// 底部导航
    wx.setTabBarStyle({
      color: '#fff',
      selectedColor: '#ff0000',
      backgroundColor: this.data.backgroundColor,
      borderStyle: 'white'
    });
   
    var lengthcd = this.data.footimg.length;
    for (var i = 0; i < lengthcd;i++){
      wx.setTabBarItem({
        index: this.data.footimg[i].id,
        // text: 'text',
        iconPath: this.data.footimg[i].iconPath,
        selectedIconPath: this.data.footimg[i].selectedIconPath
      });
    }
    




  //  获取标记
  this.setData({
    getsign: app.globalData.sign
  })
    console.log(this.data.getsign)


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  xinxi:function(e){
    wx.getUserInfo({
      success:res=>{
        console.log(res)
      }
    })
  },

  phoneCall:function(){
    wx.makePhoneCall({
      phoneNumber: '4008-659-600' //拨打400电话
    })
  },

  lingqu:function(){
    alertViewWithCancel("提示", "领取成功，稍后我们将联系您", function () {
      console.log(11)
     });
  },

  tiaozhuan:function(){
    wx.navigateTo({
      url: '../map/map',
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (e) {
    console.log(e)
    wx.stopPullDownRefresh()
    
  },

  onReachBottom: function (e) {
    console.log(e)
  },

// 建立一个缓冲 回调在主js里
  setdata:function(){

    // 第一种建立缓存
    wx.setStorageSync("backdata","aapjs")

    // 第二种建立缓存
    wx.setStorage({
      key: 'backdata02',
      data: 'aapjs02',
    })
  }
})
