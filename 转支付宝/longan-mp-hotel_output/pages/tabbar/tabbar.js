const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
// pages/tabbar/tabbar.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    authzData: wx2my.getStorageSync("tabbardata"),
    tabbardata: [// { icon: "iconguanli", name: "管理", url: "/pages/login/login?tabindex=" + 0, authz:''},
    {
      icon: "iconanzhuang",
      name: "安装",
      url: "/pages/cabinetlist/cabinetlist?tabindex=" + 0,
      authz: 'M:MH_CAB_INSTALL',
      id: 0
    }, {
      icon: "iconbuhuo",
      name: "补货",
      url: "/pages/housematterlist/housematterlist?tabindex=" + 1,
      authz: 'M:MH_REPL_RESTOCK',
      id: 1
    }, {
      icon: "iconbuhuo1",
      name: "配送",
      url: "/pages/deliveredlist/deliveredlist?tabindex=" + 2,
      authz: 'M:MH_DELIV_DELIVERY',
      id: 2
    }, {
      icon: "iconpeisong",
      name: "我的",
      url: "/pages/personalcenter/personalcenter?tabindex=" + 3,
      authz: 'M:MH_USER_MY_RESTOCK',
      id: 3
    }],
    currentid: '' //当前id

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  tabevent: function (e) {
    let id = e.currentTarget.dataset.id;
    let url = e.currentTarget.dataset.url;
    let nowId = wx2my.getStorageSync("currentId");

    if (id != nowId) {
      console.log("zou");
      wx2my.redirectTo({
        url: url
      });
    }
  },
  //高亮选择
  tabzhixing: function (e) {
    let that = this;
    let id = e;
    wx2my.setStorageSync("currentId", id);
    console.log(e);
    that.setData({
      currentid: e
    });
  },
  dabdata: function () {
    let that = this;
    that.setData({
      authzData: wx2my.getStorageSync("tabbardata")
    });
    let nowtabbardata = that.data.tabbardata;
    console.log(that.data.authzData);

    for (var i = 0; i < that.data.tabbardata.length; i++) {
      if (!that.data.authzData['M:MH_CAB_INSTALL']) {
        if (that.data.tabbardata[i].authz == 'M:MH_CAB_INSTALL') {
          let nownavtext1 = that.data.tabbardata.splice(i, 1);
          that.setData({
            tabbardata: that.data.tabbardata
          });
        }
      }

      if (!that.data.authzData['M:MH_REPL_RESTOCK']) {
        if (that.data.tabbardata[i].authz == 'M:MH_REPL_RESTOCK') {
          let nownavtext2 = that.data.tabbardata.splice(i, 1);
          that.setData({
            tabbardata: that.data.tabbardata
          });
        }
      }

      if (!that.data.authzData['M:MH_DELIV_DELIVERY']) {
        if (that.data.tabbardata[i].authz == 'M:MH_DELIV_DELIVERY') {
          let nownavtext3 = that.data.tabbardata.splice(i, 1);
          that.setData({
            tabbardata: that.data.tabbardata
          });
        }
      }

      if (!that.data.authzData['M:MH_USER_MY_RESTOCK']) {
        if (that.data.tabbardata[i].authz == 'M:MH_USER_MY_RESTOCK') {
          let nownavtext4 = that.data.tabbardata.splice(i, 1);
          that.setData({
            tabbardata: that.data.tabbardata
          });
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});