const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    showtype: false,
    redcode: '',
    ishasmnb: '',
    //是否有迷你吧商品 0-有，1-没有
    pagetype: '',
    funcId: '',
    user_name: '',
    orderid: '',
    //订单id
    recommendprodlist: [],
    cabopentype: false
  },
  onLoad: function (options) {
    const that = this;
    let red_code = options.redcode;

    if (red_code == '' || red_code == 'null') {
      red_code = -1;
    }

    that.setData({
      orderid: options.orderid,
      ishasmnb: options.ishasmnb,
      redcode: red_code
    });
    wx2my.getStorage({
      key: 'funcAreaId',
      success: function (res) {
        that.setData({
          funcId: res.data
        });
      },
      fail: function () {
        that.setData({
          funcId: ''
        });
      }
    });
    wx2my.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          user_name: res.data.nickName
        });
      },
      fail: function () {
        that.setData({
          user_name: ''
        });
      }
    });
    that.changestorage(); // that.get_recommendprodlist(options.orderid);//获取推荐商品

    if (options.ishasmnb == 0) {
      that.get_cabopentype(options.orderid);
    }
  },
  onShow: function () {
    wx.hideHomeButton();
  },
  backfun: function () {
    //返回列表页
    const pagetype = this.data.pagetype;
    const funcId = this.data.funcId;

    if (funcId == '' || funcId == null) {
      wx2my.reLaunch({
        url: '../index/index'
      });
    } else {
      wx2my.reLaunch({
        url: '../specialty/specialty?&id=' + funcId
      });
    }
  },
  orderdetails: function () {
    //订单详情
    wx2my.navigateTo({
      url: '../myorderDetail/myorderDetail?orderid=' + this.data.orderid + '&pagetype=1'
    });
  },
  orderlist: function () {
    //订单列表
    wx2my.navigateTo({
      url: '../prodOrder/prodOrder?typeindex=all'
    });
  },
  changestorage: function () {
    //清空购物车
    let kong = [];
    wx2my.setStorage({
      key: 'deliverylist1',
      data: kong
    });
    wx2my.setStorage({
      key: 'deliverylist2',
      data: kong
    });
    wx2my.setStorage({
      key: 'deliverylist3',
      data: kong
    });
    wx2my.setStorage({
      key: 'orderlist1',
      data: kong
    });
    wx2my.setStorage({
      key: 'orderlist2',
      data: kong
    });
    wx2my.setStorage({
      key: 'orderlist3',
      data: kong
    });
    wx2my.setStorage({
      key: 'buylist',
      data: kong
    });
  },
  sharefun: function () {
    //打开分享窗口
    this.setData({
      showtype: true
    });
    wxrequest.putredbagtype(that.data.redcode).then(res => {
      const resdata = res.data;

      if (resdata.code == 0) {} else {
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  },
  closefun: function () {
    //关闭分享窗口
    this.setData({
      showtype: false
    });
  },
  onShareAppMessage: function (options) {
    const that = this;
    that.setData({
      showtype: false
    });
    return {
      title: that.data.user_name ? that.data.user_name + '邀你一起领红包' : '好友邀你一起领红包',
      path: 'pages/login/login?sharecode=' + that.data.redcode,
      // 路径，传递参数到指定页面。
      imageUrl: 'cloud://hotelconsumption-e23cl.686f-hotelconsumption-e23cl-1300251335/shareimg.jpg',
      // 分享的封面图
      success: function (res) {// 转发成功
      },
      fail: function (res) {
        // 转发失败
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          //用户取消转发
          console.log('用户取消转发');
        } else if (res.errMsg == 'shareAppMessage:fail') {
          //转发失败，其中detail message为详细失败信息
          console.log('转发失败');
        }
      }
    };
  },
  openagain: function (e) {
    //再次开门
    const that = this;
    wxrequest.getaginopen2(that.data.orderid).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        wx2my.showToast({
          title: '柜门已开启，请取走您的商品',
          icon: 'none',
          duration: 3000
        });
      } else {
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  },
  get_recommendprodlist: function (orderid) {
    //获取推荐商品
    const that = this;
    let linkData = {
      orderId: orderid
    };
    wxrequest.getrecommendprodlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          recommendprodlist: resdatas
        });
      } else {
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  },
  detailfun: function (e) {
    const that = this;
    const edata = e.currentTarget.dataset;
    const funcid = edata.funcid;

    if (funcid == 2) {
      let prodcode = edata.prodcode;
      let latticeId = edata.latticeid;
      let latticeCode = edata.latticecode;
      let hotelprodid = edata.hotelprodid;
      let img = edata.img;
      let ptype = edata.ptype;
      let funcprodid = edata.funcprodid;
      let isempty = edata.isempty;
      let prodamt = edata.prodamt;
      let prodnumtype = edata.prodnumtype;
      wx2my.navigateTo({
        url: '../details/details?latticeid=' + latticeId + '&latticecode=' + latticeCode + '&prodcode=' + prodcode + '&hotelprodid=' + hotelprodid + '&img=' + img + '&ptype=' + ptype + '&funcprodid=' + funcprodid + '&isempty=' + isempty + '&prodamt=' + prodamt + '&prodnumtype=' + prodnumtype
      });
    } else {
      wx2my.navigateTo({
        url: '../hotelmalldetails/hotelmalldetails?funcprodid=' + edata.funcprodid
      });
    }
  },
  get_cabopentype: function (orderid) {
    //检查柜门打开状态
    const that = this;
    let linkData = {
      orderId: orderid
    };
    wxrequest.getcabopentype(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          cabopentype: resdatas
        });
      } else {
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  }
});