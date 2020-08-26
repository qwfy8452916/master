// component/tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // authzData: {
    //   "M:MS_TABBAR_HOMEPAGE":true,
    //   "M:MS_CAB_MINI": true,
    //   "M:MS_ORDER_ORDERDEAL": true,
    //   "M:MS_MY_MY": true,
    // },
    authzData:{},
    tabbardata: [
      { icon: "iconanzhuang", name: "首页", url: "/pages/index/index?tabindex=" + 0, authz: '', id: 0 },
      { icon: "iconbuhuo", name: "迷你吧", url: "/pages/miniNav/miniNav?tabindex=" + 1, authz: 'M:MS_CAB_MINI', id: 1 },
      { icon: "iconbuhuo1", name: "", url: "" + 2, authz: '', id: '10' },
      { icon: "iconcard2", name: "订单处理", url: "/pages/order/order?tabindex=" + 3, authz: 'M:MS_ORDER_ORDERDEAL', id: 3 },
      { icon: "iconpeisong", name: "我的", url: "/pages/personalcenter/personalcenter?tabindex=" + 4, authz: '', id: 4 },

    ],
    currentid: '',  //当前id
    switchonoff:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
   
    tabevent: function (e) {

      let id = e.currentTarget.dataset.id;
      let url = e.currentTarget.dataset.url;
      let nowId = wx.getStorageSync("currentId")
      if (id != nowId) {
        wx.redirectTo({
          url: url,
        })
      }
    },

    //高亮选择
    tabzhixing: function (e) {
      let that = this;
      let id = parseInt(e);
      wx.setStorageSync("currentId", id)
      console.log(e)
      that.setData({
        currentid: e,
      })
    },

    dabdata: function () {
      let that = this;
      that.setData({
        authzData: wx.getStorageSync("tabAuthority")
      })


      let nowtabbardata = that.data.tabbardata
      console.log(that.data.authzData)
      for (var i = 0; i < that.data.tabbardata.length; i++) {
        //没有权限删除对应数据
        if (!that.data.authzData['M:MS_TABBAR_HOMEPAGE']) {
          if (that.data.tabbardata[i].authz == 'M:MS_TABBAR_HOMEPAGE') {
            let nownavtext1 = that.data.tabbardata.splice(i, 1)
            that.setData({
              tabbardata: that.data.tabbardata
            })
          }
        }
        if (!that.data.authzData['M:MS_CAB_MINI']) {
          if (that.data.tabbardata[i].authz == 'M:MS_CAB_MINI') {
            let nownavtext2 = that.data.tabbardata.splice(i, 1)
            that.setData({
              tabbardata: that.data.tabbardata
            })
          }
        }
        // if (!that.data.authzData['M:MH_DELIV_DELIVERY']) {
        //   if (that.data.tabbardata[i].authz == 'M:MH_DELIV_DELIVERY') {
        //     let nownavtext3 = that.data.tabbardata.splice(i, 1)
        //     that.setData({
        //       tabbardata: that.data.tabbardata
        //     })
        //   }
        // }
        if (!that.data.authzData['M:MS_ORDER_ORDERDEAL']) {
          if (that.data.tabbardata[i].authz == 'M:MS_ORDER_ORDERDEAL') {
            let nownavtext4 = that.data.tabbardata.splice(i, 1)
            that.setData({
              tabbardata: that.data.tabbardata
            })
          }
        }
        if (!that.data.authzData['M:MS_MY_MY']) {
          if (that.data.tabbardata[i].authz == 'M:MS_MY_MY') {
            let nownavtext5 = that.data.tabbardata.splice(i, 1)
            that.setData({
              tabbardata: that.data.tabbardata
            })
          }
        }
      }

    },

    tabswitch:function(){
       this.setData({
         switchonoff: !this.data.switchonoff
       })
    },

    
    //卡券
    cardCoupon:function(){
      wx.navigateTo({
        url: '../card/card',
      })
    },

    //财务
    finance:function(){
      wx.navigateTo({
        url: '../finance/finance',
      })
    },

    //基础设置
    basicSet:function(){
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
    orderDeal: function () {
      wx.navigateTo({
        url: '../order/order',
      })
    },
    //优惠券管理
    couponManage:function(){
      wx.navigateTo({
        url: '../couponManage/couponManage',
      })
    },
    //迷你吧
    miniba: function () {
      wx.navigateTo({
        url: '/pages/miniNav/miniNav',
      })
    },

    //分销
    shareTotal: function () {
      wx.navigateTo({
        url: '../shareTotal/shareTotal',
      })
    },



  }
})
