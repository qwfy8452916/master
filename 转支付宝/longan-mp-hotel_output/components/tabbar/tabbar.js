const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');

Component({
  mixins: [],
  data: {
     authzData: wx2my.getStorageSync("tabbardata"),
    tabbardata: [
    {
      icon: "iconanzhuang",
      name: "安装",
      url: "/pages/cabinetlist/cabinetlist?tabindex=" + 1,
      authz: 'M:MH_CAB_INSTALL',
      id: 1
    }, {
      icon: "iconbuhuo",
      name: "补货",
      url: "/pages/housematterlist/housematterlist?tabindex=" + 2,
      authz: 'M:MH_REPL_RESTOCK',
      id: 2
    }, {
      icon: "iconbuhuo1",
      name: "配送",
      url: "/pages/deliveredlist/deliveredlist?tabindex=" + 3,
      authz: 'M:MH_DELIV_DELIVERY',
      id: 3
    }, {
      icon: "iconpeisong",
      name: "我的",
      url: "/pages/personalcenter/personalcenter?tabindex=" + 4,
      authz: 'M:MH_USER_MY_RESTOCK',
      id: 4
    }],
    currentid: '' //当前id
  },
  props: {
    tabindex:String,
  },
  didMount() {
    this.tabzhixing();
  },
  didUpdate() {},
  didUnmount() {},
  methods: {

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
    // let id = e;
    let id=this.props.tabindex
    wx2my.setStorageSync("currentId", id);
    console.log(id);
    that.setData({
      currentid: id
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


  },
});
