const app=getApp();

app.Base({
  data: {
    tabAuthority:{}, //菜单权限
    pageAuthority: {}, //功能权限
    switchonoff:'',
    switchJudge:true,
    Tabindex: '',
  },
  onLoad: function (options) {
    let that=this;
    this.setData({
      tabAuthority: wx.getStorageSync("tabAuthority"),
      pageAuthority: wx.getStorageSync("pageAuthority"),
    })





    let popup = this.selectComponent("#tabbar");
    if (options.tabindex) {
      that.setData({
        Tabindex: options.tabindex
      })
    } else {
      that.setData({
        Tabindex: 0
      })
    }
    popup.dabdata()
    popup.tabzhixing(that.data.Tabindex)
    
  },


  //我的应用
  switchdj:function(){
    this.setData({
      switchJudge: !this.data.switchJudge
    })
  },


  miniba:function(){
    wx.navigateTo({
      url: '/pages/miniNav/miniNav',
    })
  },

  person:function(){
    wx.navigateTo({
      url: '../personalcenter/personalcenter',
    })
  },

  //基础设置
  basicSet: function () {
    wx.navigateTo({
      url: '../basicSet/basicSet',
    })
  },
  
  //当面服务
  faceServer:function(){
    wx.navigateTo({
      url: '../faceServer/faceServer',
    })
  },

  //订单处理
  orderDeal:function(){
    wx.navigateTo({
      url: '../order/order',
    })
  },


  //卡券
  cardCoupon: function () {
    wx.navigateTo({
      url: '../card/card',
    })
  },

  //财务
  finance: function () {
    wx.navigateTo({
      url: '../finance/finance',
    })
  },


  //优惠券管理
  couponManage: function () {
    wx.navigateTo({
      url: '../couponManage/couponManage',
    })
  },

  //分销
  shareTotal:function(){
    wx.navigateTo({
      url: '../shareTotal/shareTotal',
    })
  },

  //自营配送单
  ownDeliveryList: function () {
    wx.navigateTo({
      url: '../ownDeliveryList/ownDeliveryList',
    })
  },

  //自营售后
  ownAfterSale: function () {
    wx.navigateTo({
      url: '../ownAfterSale/ownAfterSale',
    })
  },
  //活动
  activeNav:function(){
    wx.navigateTo({
      url: '../package/pages/activeNav/activeNav',
    })
  },


})