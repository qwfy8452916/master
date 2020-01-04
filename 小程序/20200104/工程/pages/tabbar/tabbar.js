// pages/tabbar/tabbar.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: wx.getStorageSync("tabbardata"),
    tabbardata: [
      // { icon: "iconguanli", name: "管理", url: "/pages/login/login?tabindex=" + 0, authz:''},
      { icon: "iconjiance", name: "测试", url: "/pages/test/test?tabindex=" + 0, authz: 'M:MH_CAB_INSTALL' },
      { icon: "iconzhuangxiujiajuanzhuangzuantoukaiqiangdadongchuankong", name: "安装", url: "/pages/cabinetlist/cabinetlist?tabindex=" + 1, authz: 'M:MH_CAB_INSTALL' },
      { icon: "iconanzhuang", name: "维修", url: "/pages/maintenance/maintenance?tabindex=" + 2, authz: 'M:MH_CAB_INSTALL' },
      { icon: "iconpeisong", name: "我的", url: "/pages/personalcenter/personalcenter?tabindex=" + 3, authz: 'M:MH_USER_MY_RESTOCK' },
    ],
    tabjudge: [false, false, false, false],
    panduan: 1,
    curIndex: '',  //判断当前index
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // tabdianji:function(e){
  //   let that=this;
  //   let index=e.currentTarget.dataset.index
  //   console.log(index)
  //   let nowtabjudge = [false,false,false,false,false]
  //   nowtabjudge[index]=true
  //   that.setData({
  //     tabjudge: nowtabjudge
  //   })

  // },

  tabevent: function (e) {

    let index = e.currentTarget.dataset.index;
    let url = e.currentTarget.dataset.url;
    let nowIndex = wx.getStorageSync("currentIndex")
    if (index != nowIndex) {
      console.log("zou")
      wx.redirectTo({
        url: url,
      })
    }
  },


  tabzhixing: function (e) {
    let that = this;
    let index = e
    console.log(index)
    wx.setStorageSync("currentIndex", index)
    // console.log(that.data.authzData)
    let nowtabjudge = [false, false, false, false]
    nowtabjudge[index] = true
    that.setData({
      tabjudge: nowtabjudge
    })
  },

  dabdata: function () {
    let that = this;
    that.setData({
      authzData: wx.getStorageSync("tabbardata")
    })


    let nowtabbardata = that.data.tabbardata
    console.log(that.data.authzData)
    for (var i = 0; i < that.data.tabbardata.length; i++) {
      if (!that.data.authzData['M:MH_CAB_INSTALL']) {
        if (that.data.tabbardata[i].authz == 'M:MH_CAB_INSTALL') {
          let nownavtext1 = that.data.tabbardata.splice(i, 1)
          that.setData({
            tabbardata: that.data.tabbardata
          })
        }
      }
      if (!that.data.authzData['M:MH_REPL_RESTOCK']) {
        if (that.data.tabbardata[i].authz == 'M:MH_REPL_RESTOCK') {
          let nownavtext2 = that.data.tabbardata.splice(i, 1)
          that.setData({
            tabbardata: that.data.tabbardata
          })
        }
      }
      if (!that.data.authzData['M:MH_DELIV_DELIVERY']) {
        if (that.data.tabbardata[i].authz == 'M:MH_DELIV_DELIVERY') {
          let nownavtext3 = that.data.tabbardata.splice(i, 1)
          that.setData({
            tabbardata: that.data.tabbardata
          })
        }
      }
      if (!that.data.authzData['M:MH_USER_MY_RESTOCK']) {
        if (that.data.tabbardata[i].authz == 'M:MH_USER_MY_RESTOCK') {
          let nownavtext4 = that.data.tabbardata.splice(i, 1)
          that.setData({
            tabbardata: that.data.tabbardata
          })
        }
      }
    }

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